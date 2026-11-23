"""Starts studio.py on a free port with a temporary data folder and probes it.

Run:  python3 -m unittest discover -s tests   (from the server folder)
"""
import hashlib
import http.client
import json
import os
import secrets
import socket
import sqlite3
import subprocess
import sys
import tempfile
import time
import unittest

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://getonsiteapp.com"
CONSOLE = "http://localhost:8670"        # the IT console's address in these tests (IT_CONSOLE_URL)
NOT_FOUND = {"error": "Not found"}


def free_port():
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def start(data, env):
    """studio.py on a free port, once it answers."""
    port = free_port()
    proc = subprocess.Popen([sys.executable, os.path.join(HERE, "studio.py"), "--data", data, "--port", str(port)],
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, env=env)
    for _ in range(50):
        try:
            c = http.client.HTTPConnection("127.0.0.1", port, timeout=10)
            c.request("GET", "/api/health")
            c.getresponse().read()
            c.close()
            break
        except OSError:
            time.sleep(0.1)
    return proc, port


def env_without_console(**extra):
    env = {k: v for k, v in os.environ.items() if not k.startswith("IT_CONSOLE_")}
    env.update(extra)
    return env


class StudioTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        cls.db = os.path.join(cls.tmp.name, "studio.db")
        sys.path.insert(0, HERE)
        import studio
        studio.CONFIG["data"] = cls.tmp.name
        studio.init_db()
        cls.token = secrets.token_urlsafe(32)          # the console's code, made up for these tests
        cls.token_hash = hashlib.sha256(cls.token.encode()).hexdigest()
        cls.proc, cls.port = start(cls.tmp.name, env_without_console(STUDIO_URL=SITE, IT_CONSOLE_TOKEN_SHA256=cls.token_hash, IT_CONSOLE_URL=CONSOLE))

    @classmethod
    def tearDownClass(cls):
        cls.proc.terminate()
        cls.proc.wait(5)
        cls.tmp.cleanup()

    @classmethod
    def request(cls, method, path, body=b"", headers=None, declare=None, port=None):
        c = http.client.HTTPConnection("127.0.0.1", port or cls.port, timeout=10)
        h = dict(headers or {})
        h["Content-Length"] = str(len(body) if declare is None else declare)
        c.putrequest(method, path, skip_accept_encoding=True, skip_host="Host" in h)
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

    def it(self, method, path, data=None, token=True, extra=None, port=None, raw=None):
        """A call the way the IT console makes it: JSON, its code, the public Host, nothing else."""
        headers = {"Content-Type": "application/json", "Host": "getonsiteapp.com"}
        if token is not False:
            headers["X-IT-Console-Token"] = self.token if token is True else token
        headers.update(extra or {})
        body = raw if raw is not None else (b"" if data is None else json.dumps(data).encode())
        return self.request(method, path, body, headers, port=port)

    def overview(self):
        status, _, body = self.it("GET", "/api/it-console/overview")
        self.assertEqual(status, 200)
        return json.loads(body)

    def add_message(self, name, read_at=None, **fields):
        conn = sqlite3.connect(self.db)
        cols = dict({"created_at": "2026-11-23T01:30:00+00:00", "name": name, "contact": "someone@example.test", "read_at": read_at}, **fields)
        eid = conn.execute("INSERT INTO enquiries ({}) VALUES ({})".format(", ".join(cols), ", ".join("?" * len(cols))), list(cols.values())).lastrowid
        conn.commit()
        conn.close()
        return eid

    def read_at(self, eid):
        conn = sqlite3.connect(self.db)
        row = conn.execute("SELECT read_at FROM enquiries WHERE id = ?", (eid,)).fetchone()
        conn.close()
        return row[0]

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

    # -- the IT console's door

    def test_console_routes_are_closed_without_the_consoles_code(self):
        eid = self.add_message("Door Test")
        _, plain_h, plain = self.request("GET", "/no-such-page")
        for token in (False, "", "wrong", self.token + "x", self.token[:-1], self.token_hash):
            for method, path, data in (("GET", "/api/it-console/overview", None), ("POST", "/api/it-console/message-read", {"id": eid, "read": True})):
                status, h, body = self.it(method, path, data, token=token)
                # the same answer as any address that doesn't exist, so the routes don't give themselves away
                self.assertEqual((status, json.loads(body)), (404, NOT_FOUND))
                self.assertEqual((h["Content-Type"], body), (plain_h["Content-Type"], plain))
        self.assertIsNone(self.read_at(eid))
        self.assertEqual(self.it("GET", "/api/it-console/overview")[0], 200)

    def test_console_routes_refuse_anything_forwarded_even_with_the_right_code(self):
        eid = self.add_message("Forwarded Test")
        for name, value in (("X-Forwarded-For", "203.0.113.5"), ("X-Forwarded-For", "127.0.0.1"), ("X-Forwarded-For", ""),
                            ("Forwarded", "for=203.0.113.5"), ("X-Real-IP", "203.0.113.5"), ("X-Real-IP", "127.0.0.1")):
            status, _, body = self.it("GET", "/api/it-console/overview", extra={name: value})
            self.assertEqual((status, json.loads(body)), (404, NOT_FOUND))
            status, _, _ = self.it("POST", "/api/it-console/message-read", {"id": eid, "read": True}, extra={name: value})
            self.assertEqual(status, 404)
        self.assertIsNone(self.read_at(eid))

    def test_console_door_needs_this_server_and_a_set_code(self):
        import studio

        class Fake:
            def __init__(self, peer, headers):
                self.client_address = (peer, 1)
                self.headers = headers
        door = studio.Handler.it_console_door
        saved = studio.IT_CONSOLE_TOKEN_SHA256
        try:
            studio.IT_CONSOLE_TOKEN_SHA256 = self.token_hash
            right = {"X-IT-Console-Token": self.token}
            self.assertTrue(door(Fake("127.0.0.1", right)))
            self.assertTrue(door(Fake("::1", right)))
            for peer in ("203.0.113.9", "10.0.0.1", "127.0.0.2", "::ffff:127.0.0.1", "143.198.207.20"):
                self.assertFalse(door(Fake(peer, right)))   # only a caller on this same server
            self.assertFalse(door(Fake("127.0.0.1", dict(right, **{"X-Real-IP": "1.1.1.1"}))))
            self.assertFalse(door(Fake("127.0.0.1", {"X-IT-Console-Token": "\u20ac" + self.token})))   # odd characters are just wrong
            self.assertFalse(door(Fake("127.0.0.1", {})))
            studio.IT_CONSOLE_TOKEN_SHA256 = ""          # no code set: closed, whatever is sent
            self.assertFalse(door(Fake("127.0.0.1", right)))
            self.assertFalse(door(Fake("127.0.0.1", {"X-IT-Console-Token": ""})))
        finally:
            studio.IT_CONSOLE_TOKEN_SHA256 = saved
        # the setting has to be a SHA-256 in hex, or it counts as not set
        self.assertEqual(studio.it_console_hash(self.token_hash.upper() + "\n"), self.token_hash)
        for bad in (None, "", "   ", "abc", self.token_hash[:-1], self.token_hash + "0", "g" * 64, self.token):
            self.assertEqual(studio.it_console_hash(bad), "")

    def test_without_the_code_setting_every_console_route_is_closed(self):
        for setting in (None, "", "not-a-hash"):
            with tempfile.TemporaryDirectory() as tmp:
                env = env_without_console(STUDIO_URL=SITE)
                if setting is not None:
                    env["IT_CONSOLE_TOKEN_SHA256"] = setting
                proc, port = start(tmp, env)
                try:
                    status, _, body = self.it("GET", "/api/it-console/overview", port=port)
                    self.assertEqual((status, json.loads(body)), (404, NOT_FOUND))
                    self.assertEqual(self.it("POST", "/api/it-console/message-read", {"id": 1, "read": True}, port=port)[0], 404)
                    # and with no IT_CONSOLE_URL, /admin goes to the console's own address
                    status, h, _ = self.request("GET", "/admin", port=port)
                    self.assertEqual((status, h["Location"]), (301, "https://it.getonsiteapp.com/messages"))
                finally:
                    proc.terminate()
                    proc.wait(5)

    # -- what the console gets

    def test_overview_has_every_field_and_the_newest_message_in_full(self):
        eid = self.add_message("Overview Person", business="Biz", contact="op@example.test", needs="A website, A shop", style="Calm",
                               budget="Small", timeline="Soon", message="Hello", brief="The brief", ip="198.51.100.77")
        status, h, body = self.it("GET", "/api/it-console/overview")
        self.assertEqual(status, 200)
        self.assertEqual(h["Cache-Control"], "no-store")
        self.assertTrue(h["Content-Type"].startswith("application/json"))
        o = json.loads(body)
        self.assertEqual(set(o), {"product", "mode", "public_url", "groups_label", "figures", "groups", "people", "storage", "recent", "messages", "it_landing"})
        self.assertEqual((o["product"], o["mode"], o["public_url"], o["groups_label"], o["groups"], o["people"], o["it_landing"]),
                         ("Onsite studio page", "live", SITE, None, [], [], None))
        self.assertEqual(o["messages"][0], {
            "id": str(eid), "at": "2026-11-23T01:30:00Z", "name": "Overview Person", "contact": "op@example.test", "business": "Biz",
            "needs": "A website, A shop", "style": "Calm", "budget": "Small", "timeline": "Soon", "message": "Hello", "brief": "The brief",
            "read": False, "read_at": None})
        self.assertEqual(o["recent"][0], {"at": "2026-11-23T01:30:00Z", "text": "New message from Overview Person"})
        # nothing secret: not the sender's address, not the console's code or its hash
        for secret in ("198.51.100.77", '"ip"', self.token, self.token_hash, "pbkdf2"):
            self.assertNotIn(secret, body)

    def test_overview_figures_and_storage_add_up(self):
        self.add_message("Figures Read", read_at="2026-11-23T02:00:00+00:00")
        self.add_message("Figures Unread")
        o = self.overview()
        conn = sqlite3.connect(self.db)
        total = conn.execute("SELECT count(*) FROM enquiries").fetchone()[0]
        unread = conn.execute("SELECT count(*) FROM enquiries WHERE read_at IS NULL").fetchone()[0]
        conn.close()
        self.assertEqual(o["figures"], [{"label": "Messages", "value": str(total)}, {"label": "Unread", "value": str(unread)}])
        storage = o["storage"]
        self.assertEqual([p["label"] for p in storage["parts"]], ["Database"])
        self.assertIsInstance(storage["total_bytes"], int)
        self.assertGreaterEqual(storage["total_bytes"], os.path.getsize(self.db))
        self.assertEqual(storage["total_bytes"], sum(p["bytes"] for p in storage["parts"]))
        read = [m for m in o["messages"] if m["name"] == "Figures Read"][0]
        self.assertEqual((read["read"], read["read_at"]), (True, "2026-11-23T02:00:00Z"))

    def test_overview_keeps_to_the_newest_300_messages_and_30_recent(self):
        conn = sqlite3.connect(self.db)
        conn.executemany("INSERT INTO enquiries (created_at, name, contact) VALUES (?, ?, ?)",
                         [("2026-11-20T00:00:00+00:00", "Bulk {}".format(i), "bulk@example.test") for i in range(310)])
        conn.commit()
        conn.close()
        o = self.overview()
        self.assertEqual((len(o["messages"]), len(o["recent"])), (300, 30))
        self.assertEqual(o["messages"][0]["name"], "Bulk 309")
        ids = [int(m["id"]) for m in o["messages"]]
        self.assertEqual(ids, sorted(ids, reverse=True))   # newest first
        self.assertEqual([r["text"] for r in o["recent"]], ["New message from " + m["name"] for m in o["messages"][:30]])
        for m in o["messages"]:
            self.assertIsInstance(m["id"], str)
            self.assertIsInstance(m["read"], bool)
            self.assertTrue(m["at"] is None or m["at"].endswith("Z"))

    def test_mark_read_and_unread_sets_it_rather_than_flipping(self):
        eid = self.add_message("Read Test")
        for _ in range(2):   # twice in a row stays read
            status, h, body = self.it("POST", "/api/it-console/message-read", {"id": eid, "read": True})
            self.assertEqual(status, 200)
            self.assertEqual(h["Cache-Control"], "no-store")
            a = json.loads(body)
            self.assertEqual((a["ok"], a["id"], a["read"]), (True, str(eid), True))
            self.assertRegex(a["read_at"], r"^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$")
            self.assertIsNotNone(self.read_at(eid))
        mine = [m for m in self.overview()["messages"] if m["id"] == str(eid)][0]
        self.assertTrue(mine["read"])
        for _ in range(2):   # the id may come as a string too
            status, _, body = self.it("POST", "/api/it-console/message-read", {"id": str(eid), "read": False})
            self.assertEqual((status, json.loads(body)), (200, {"ok": True, "id": str(eid), "read": False, "read_at": None}))
            self.assertIsNone(self.read_at(eid))
        mine = [m for m in self.overview()["messages"] if m["id"] == str(eid)][0]
        self.assertEqual((mine["read"], mine["read_at"]), (False, None))

    def test_mark_read_refuses_what_it_cannot_use(self):
        eid = self.add_message("Refuse Test")
        for data in ({}, {"id": eid}, {"read": True}, {"id": eid, "read": "yes"}, {"id": eid, "read": 1}, {"id": eid, "read": None},
                     {"id": True, "read": True}, {"id": 0, "read": True}, {"id": -1, "read": True}, {"id": 1.5, "read": True},
                     {"id": "1 OR 1=1", "read": True}, {"id": " 1", "read": True}, {"id": 2 ** 70, "read": True},
                     {"id": 999999999, "read": True}, [eid, True], "x", None):
            status, _, body = self.it("POST", "/api/it-console/message-read", raw=json.dumps(data).encode())
            self.assertEqual(status, 400, data)
            self.assertIn("error", json.loads(body))
        self.assertEqual(self.it("POST", "/api/it-console/message-read", raw=b"{nope")[0], 400)
        self.assertEqual(self.it("POST", "/api/it-console/message-read", raw=b"\xff\xfe")[0], 400)
        # more than 16 KB is refused, not read
        big = json.dumps({"id": eid, "read": True, "pad": "x" * 17000}).encode()
        self.assertEqual(self.it("POST", "/api/it-console/message-read", raw=big)[0], 400)
        self.assertIsNone(self.read_at(eid))
        # only the two routes, each with its own verb; the account routes don't exist here (the page has no accounts)
        self.assertEqual(self.it("GET", "/api/it-console/message-read")[0], 404)
        self.assertEqual(self.it("POST", "/api/it-console/overview", {})[0], 404)
        for path in ("/api/it-console/reset-password", "/api/it-console/end-sessions", "/api/it-console/set-active",
                     "/api/it-console/sign-in-ticket", "/api/it-console/", "/api/it-console/overview/"):
            self.assertEqual(self.it("POST", path, {"user_id": "1"})[0], 404)
            self.assertEqual(self.it("GET", path)[0], 404)

    # -- /admin moved to the console

    def test_every_admin_address_forwards_to_the_it_console(self):
        form = {"Content-Type": "application/x-www-form-urlencoded"}
        for method, path in (("GET", "/admin"), ("GET", "/admin/"), ("GET", "/admin/anything?x=1"), ("HEAD", "/admin"),
                             ("POST", "/admin"), ("POST", "/admin/login"), ("POST", "/admin/read"), ("POST", "/admin/logout")):
            status, h, body = self.request(method, path, b"password=correct+horse+battery&id=1" if method == "POST" else b"", form)
            self.assertEqual((status, h["Location"], body), (301, CONSOLE + "/messages", ""), path)
            self.assertIsNone(h["Set-Cookie"])   # no log-in here any more
            self.assertEqual(h["Cache-Control"], "no-store")
            self.assertIn("frame-ancestors 'none'", h["Content-Security-Policy"])
        self.assertEqual(self.request("GET", "/administrator")[0], 404)   # only starts the same way

    # -- everything else

    def test_health_and_unknown_paths_tell_nothing(self):
        self.assertEqual(self.request("GET", "/api/health")[2], '{"ok": true}')
        for method in ("GET", "POST"):
            for path in ("/", "/studio.py", "/usage.json", "/../etc/passwd", "/api/", "/api/it-console", "/api/it-sign-in", "/administrator"):
                status, _, body = self.request(method, path)
                self.assertEqual(status, 404)
                self.assertEqual(json.loads(body), NOT_FOUND)
        # an /admin address that tries to climb out only forwards to the console; nothing is served
        status, h, body = self.request("GET", "/admin/../studio.db")
        self.assertEqual((status, h["Location"], body), (301, CONSOLE + "/messages", ""))

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
