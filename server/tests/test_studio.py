"""Starts studio.py on a free port with a temporary data folder and probes it.

Run:  python3 -m unittest discover -s tests   (from the server folder)
"""
import http.client
import json
import os
import socket
import sqlite3
import subprocess
import sys
import tempfile
import time
import unittest

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://getonsiteapp.com"


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


class StudioTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.port = free_port()
        sys.path.insert(0, HERE)
        import studio
        studio.CONFIG["data"] = cls.tmp.name
        studio.init_db()
        conn = sqlite3.connect(os.path.join(cls.tmp.name, "studio.db"))
        conn.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('admin_password', ?)", (studio.hash_password("correct horse battery"),))
        conn.commit()
        conn.close()
        with open(os.path.join(cls.tmp.name, "usage.json"), "w") as fh:
            json.dump({"sites": [{"name": "<b>x</b>", "url": "javascript:alert(1)", "code": 1, "data": 1, "backups": 1}], "domains": ["<i>d</i>"]}, fh)
        cls.proc = subprocess.Popen([sys.executable, os.path.join(HERE, "studio.py"), "--data", cls.tmp.name, "--port", str(cls.port)],
                                    stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, env=dict(os.environ, STUDIO_URL=SITE))
        for _ in range(50):
            try:
                cls.request("GET", "/api/health")
                break
            except OSError:
                time.sleep(0.1)

    @classmethod
    def tearDownClass(cls):
        cls.proc.terminate()
        cls.proc.wait(5)
        cls.tmp.cleanup()

    @classmethod
    def request(cls, method, path, body=b"", headers=None, declare=None):
        c = http.client.HTTPConnection("127.0.0.1", cls.port, timeout=10)
        h = dict(headers or {})
        h["Content-Length"] = str(len(body) if declare is None else declare)
        c.putrequest(method, path, skip_accept_encoding=True)
        for k, v in h.items():
            c.putheader(k, v)
        c.endheaders()
        if body:
            c.send(body)
        r = c.getresponse()
        out = (r.status, r.headers, r.read().decode("utf-8", "replace"))
        c.close()
        return out

    def contact(self, data, ip, origin=SITE):
        headers = {"Content-Type": "application/json", "X-Forwarded-For": ip}
        if origin is not None:
            headers["Origin"] = origin
        return self.request("POST", "/api/contact", json.dumps(data).encode(), headers)

    def login(self, password, ip):
        return self.request("POST", "/admin/login", ("password=" + password).encode(),
                            {"Content-Type": "application/x-www-form-urlencoded", "X-Forwarded-For": ip})

    # -- contact form

    def test_contact_needs_the_websites_own_origin(self):
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "10.0.0.1", origin=None)[0], 403)
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "10.0.0.1", origin="https://evil.example")[0], 403)
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "10.0.0.1", origin="null")[0], 403)
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "10.0.0.1")[0], 200)

    def test_contact_checks_and_trims_what_it_gets(self):
        self.assertEqual(self.contact({"name": "", "contact": "b"}, "10.0.1.1")[0], 400)
        self.assertEqual(self.contact([1, 2], "10.0.1.1")[0], 400)
        self.assertEqual(self.request("POST", "/api/contact", b"{nope", {"Origin": SITE})[0], 400)
        # too big a body is refused, not read
        self.assertEqual(self.request("POST", "/api/contact", b"{}", {"Origin": SITE}, declare=10 * 1024 * 1024)[0], 400)
        self.assertEqual(self.request("POST", "/api/contact", b"{}", {"Origin": SITE}, declare=-1)[0], 400)
        self.contact({"name": "N" * 500, "contact": "c", "message": "m" * 5000, "brief": "b" * 9000}, "10.0.1.2")
        conn = sqlite3.connect(os.path.join(self.tmp.name, "studio.db"))
        row = conn.execute("SELECT name, message, brief FROM enquiries WHERE ip = '10.0.1.2'").fetchone()
        conn.close()
        self.assertEqual((len(row[0]), len(row[1]), len(row[2])), (80, 1500, 3000))

    def test_honeypot_saves_nothing(self):
        self.assertEqual(self.contact({"name": "Bot", "contact": "bot", "website": "http://spam"}, "10.0.2.1")[0], 200)
        conn = sqlite3.connect(os.path.join(self.tmp.name, "studio.db"))
        self.assertEqual(conn.execute("SELECT count(*) FROM enquiries WHERE name = 'Bot'").fetchone()[0], 0)
        conn.close()

    def test_limit_is_per_visitor_address_and_cannot_be_dodged_by_a_typed_header(self):
        for n in range(5):
            self.assertEqual(self.contact({"name": "A", "contact": "b"}, "10.0.3.1")[0], 200)
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "10.0.3.1")[0], 429)
        # a visitor who writes their own earlier X-Forwarded-For entries still counts as the last one (what Caddy saw)
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "1.2.3.4, 10.0.3.1")[0], 429)
        self.assertEqual(self.contact({"name": "A", "contact": "b"}, "9.9.9.9, 10.0.3.2")[0], 200)

    # -- admin

    def test_admin_page_is_closed_without_a_session_and_has_safe_headers(self):
        status, h, body = self.request("GET", "/admin")
        self.assertEqual(status, 200)
        self.assertIn("Password", body)
        self.assertNotIn("<h2>Messages", body)
        self.assertIn("frame-ancestors 'none'", h["Content-Security-Policy"])
        self.assertEqual(h["X-Frame-Options"], "DENY")
        self.assertEqual(h["Cache-Control"], "no-store")
        self.assertIn("Strict-Transport-Security", h)
        status, h, _ = self.request("POST", "/admin/read", b"id=1&token=x", {"Content-Type": "application/x-www-form-urlencoded"})
        self.assertEqual((status, h["Location"]), (303, "/admin"))

    def test_wrong_passwords_are_limited_even_when_sent_in_parallel(self):
        import threading
        results = []
        def one():
            try:
                results.append(self.login("wrong", "10.0.4.1")[0])
            except OSError:   # the little server's queue was full for a moment
                pass
        threads = [threading.Thread(target=one) for _ in range(25)]
        [t.start() for t in threads]
        [t.join() for t in threads]
        self.assertLessEqual(results.count(200), 10)   # no more than 10 tries got as far as the password check
        self.assertGreater(results.count(429), 5)
        self.assertEqual(self.login("correct horse battery", "10.0.4.1")[0], 429)
        self.assertEqual(self.login("correct horse battery", "10.0.4.2")[0], 303)

    def test_login_cookie_csrf_and_escaping(self):
        conn = sqlite3.connect(os.path.join(self.tmp.name, "studio.db"))
        conn.execute("INSERT INTO enquiries (created_at, name, contact, message, business) VALUES ('2026-01-01T00:00:00+00:00', '<script>alert(1)</script>', '\"><img src=x onerror=alert(1)>', '<b>hi</b>', '<i>biz</i>')")
        conn.commit()
        conn.close()
        status, h, _ = self.login("correct horse battery", "10.0.5.1")
        cookie = h["Set-Cookie"]
        for flag in ("HttpOnly", "Secure", "SameSite=Strict", "Path=/admin"):
            self.assertIn(flag, cookie)
        jar = cookie.split(";")[0]
        _, _, page = self.request("GET", "/admin", headers={"Cookie": jar})
        self.assertIn("<h2>Messages from the contact page", page)
        for raw in ("<script>alert(1)</script>", "<img src=x", "<b>hi</b>", "<i>biz</i>", "<b>x</b>", "<i>d</i>", 'href="javascript:'):
            self.assertNotIn(raw, page)
        self.assertIn("&lt;script&gt;", page)
        self.assertNotIn(jar.split("=")[1], page)   # the login token itself is never in the page
        # a post without the page's hidden code does nothing
        status, h, _ = self.request("POST", "/admin/read", b"id=1&token=wrong", {"Cookie": jar, "Content-Type": "application/x-www-form-urlencoded"})
        self.assertEqual(status, 303)
        import re
        token = re.search(r'name="token" value="([0-9a-f]{64})"', page).group(1)
        status, _, _ = self.request("POST", "/admin/logout", ("token=" + token).encode(), {"Cookie": jar, "Content-Type": "application/x-www-form-urlencoded"})
        self.assertEqual(status, 303)
        self.assertNotIn("<h2>Messages", self.request("GET", "/admin", headers={"Cookie": jar})[2])

    # -- everything else

    def test_health_and_unknown_paths_tell_nothing(self):
        self.assertEqual(self.request("GET", "/api/health")[2], '{"ok": true}')
        for path in ("/", "/studio.py", "/usage.json", "/../etc/passwd", "/api/", "/admin/../studio.db"):
            status, _, body = self.request("GET", path)
            self.assertEqual(status, 404)
            self.assertEqual(json.loads(body), {"error": "Not found"})

    def test_forwarded_header_is_ignored_unless_it_comes_from_caddy(self):
        import studio

        class Fake:
            def __init__(self, peer, fwd):
                self.client_address = (peer, 1)
                self.headers = {"X-Forwarded-For": fwd}
                self.headers = type("H", (), {"get": lambda s, k, d=None: fwd})()
        self.assertEqual(studio.Handler.ip(Fake("203.0.113.9", "1.1.1.1")), "203.0.113.9")
        self.assertEqual(studio.Handler.ip(Fake("127.0.0.1", "5.5.5.5, 1.1.1.1")), "1.1.1.1")
        self.assertEqual(studio.Handler.ip(Fake("127.0.0.1", "2001:db8:1:2:aaaa::1")), studio.Handler.ip(Fake("127.0.0.1", "2001:db8:1:2:bbbb::9")))


if __name__ == "__main__":
    unittest.main()
