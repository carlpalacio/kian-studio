#!/usr/bin/env python3
"""The small server behind getonsiteapp.com (the Onsite studio page).

It does two things the static page can't:
  POST /api/contact   saves a message from the contact page (the project planner). Nothing is emailed.
  /admin              Carl's own page: the messages, and what each website on the server takes up.

Run it:  python3 studio.py --data /var/lib/studio --port 8650
Set the admin password (typed here, never through a browser):  python3 studio.py --data /var/lib/studio --set-password
Storage figures come from /var/lib/studio/usage.json, written every 10 minutes by studio-usage.py (root cron),
because the data folders belong to other users.
"""
import argparse
import datetime
import getpass
import hashlib
import hmac
import html
import json
import os
import re
import secrets
import sqlite3
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

SITE_URL = os.environ.get("STUDIO_URL", "https://getonsiteapp.com")
COOKIE = "studio_admin"
SESSION_SECONDS = 12 * 3600
PBKDF2_ROUNDS = 310000
MAX_PER_HOUR = 5            # messages from one address
CONFIG = {"data": "data"}
_lock = threading.Lock()
_recent = {}                # ip -> [timestamps] for the contact form


def path_of(name):
    return os.path.join(CONFIG["data"], name)


def connect():
    conn = sqlite3.connect(path_of("studio.db"))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    os.makedirs(CONFIG["data"], exist_ok=True)
    conn = connect()
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL, business TEXT, contact TEXT NOT NULL,
      needs TEXT, style TEXT, budget TEXT, timeline TEXT, message TEXT, brief TEXT, ip TEXT, read_at TEXT);
    CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, created_at TEXT NOT NULL, expires_at TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    """)
    conn.commit()
    conn.close()


def now():
    return datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()


def manila(iso):
    """A UTC time as Carl reads it: 21 Nov 2026, 6:05 PM."""
    try:
        d = datetime.datetime.fromisoformat(iso).astimezone(datetime.timezone(datetime.timedelta(hours=8)))
        return d.strftime("%-d %b %Y, %-I:%M %p")
    except ValueError:
        return iso


# ---------------------------------------------------------------- the admin password

def hash_password(pw):
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, PBKDF2_ROUNDS)
    return "pbkdf2${}${}${}".format(PBKDF2_ROUNDS, salt.hex(), digest.hex())


def check_password(stored, pw):
    try:
        _, rounds, salt, digest = stored.split("$")
        got = hashlib.pbkdf2_hmac("sha256", pw.encode(), bytes.fromhex(salt), int(rounds))
        return hmac.compare_digest(got.hex(), digest)
    except (ValueError, AttributeError):
        return False


def set_password():
    init_db()
    while True:
        pw = getpass.getpass("New admin password (at least 10 characters): ")
        if len(pw) < 10:
            print("  Too short. Try a short phrase.")
            continue
        if pw != getpass.getpass("Type it again: "):
            print("  They don't match. Try again.")
            continue
        break
    conn = connect()
    conn.execute("INSERT OR REPLACE INTO settings (key, value) VALUES ('admin_password', ?)", (hash_password(pw),))
    conn.execute("DELETE FROM sessions")
    conn.commit()
    conn.close()
    print("  Done. Every signed-in admin page is signed out; sign in again at {}/admin".format(SITE_URL))


# ---------------------------------------------------------------- what the server holds

def usage():
    """What studio-usage.py wrote last (sizes in bytes), or None before its first run."""
    try:
        with open(path_of("usage.json"), encoding="utf-8") as fh:
            return json.load(fh)
    except (OSError, ValueError):
        return None


def human(n):
    n = float(n or 0)
    for unit in ("B", "KB", "MB", "GB"):
        if n < 1024 or unit == "GB":
            return ("{:.0f} {}" if unit in ("B", "KB") else "{:.1f} {}").format(n, unit)
        n /= 1024
    return "{:.1f} GB".format(n)


# ---------------------------------------------------------------- pages

CSS = """
*{box-sizing:border-box}body{margin:0;background:#f5f4f0;color:#15140f;font:15px/1.5 "Inter Tight",system-ui,sans-serif}
a{color:inherit}.wrap{max-width:1040px;margin:0 auto;padding:28px 20px 80px}
.top{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:28px}
.mark{display:inline-flex;align-items:center;gap:10px;font-weight:700;text-decoration:none}
.mark i{display:inline-grid;place-items:center;width:34px;height:34px;border-radius:10px;background:#15140f;color:#fff;font-style:normal;font-size:13px}
h1{font-size:30px;margin:0 0 6px;letter-spacing:-.02em}h2{font-size:18px;margin:0 0 14px}
.muted{color:#6b6960}.eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#6b6960;margin:0 0 8px}
.grid{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin-bottom:28px}
.tile{background:#fff;border:1px solid #e6e3da;border-radius:16px;padding:18px}
.tile b{display:block;font-size:26px;letter-spacing:-.02em;margin:4px 0}
.bar{height:8px;border-radius:99px;background:#eceae3;overflow:hidden;margin-top:10px}.bar i{display:block;height:100%;background:#15140f;border-radius:99px}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e6e3da;border-radius:16px;overflow:hidden}
th,td{text-align:left;padding:12px 14px;border-top:1px solid #eeece6;vertical-align:top}th{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b6960;border-top:0;background:#faf9f6}
td.num,th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.ok{color:#2a7a3b}.bad{color:#b23b2a}.pill{display:inline-block;padding:2px 9px;border-radius:99px;font-size:12px;background:#eceae3}
.pill.new{background:#d9ff4d}.card{background:#fff;border:1px solid #e6e3da;border-radius:16px;padding:18px;margin-bottom:12px}
.card.unread{border-color:#15140f}.card header{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline}
.card pre{white-space:pre-wrap;font:inherit;margin:12px 0 0;color:#2b2a27}
.btn{display:inline-block;border:1px solid #15140f;background:#15140f;color:#fff;border-radius:99px;padding:8px 16px;font:inherit;cursor:pointer;text-decoration:none}
.btn.line{background:transparent;color:#15140f}form.inline{display:inline}
input[type=password]{width:100%;max-width:360px;padding:12px 14px;border:1px solid #cfccc2;border-radius:12px;font:inherit}
.login{max-width:420px;margin:12vh auto 0}.err{color:#b23b2a;margin:10px 0 0}
.section{margin-top:34px}.row{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
@media(max-width:640px){th.hide,td.hide{display:none}.wrap{padding:18px 14px 60px}}
"""


def page(title, body, head=""):
    return ("<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
            "<meta name=\"robots\" content=\"noindex\"><title>{} · Onsite</title>"
            "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700&display=swap\">"
            "<style>{}</style>{}</head><body><div class=\"wrap\">{}</div></body></html>").format(html.escape(title), CSS, head, body)


def esc(s):
    return html.escape(str(s if s is not None else ""))


def login_page(error=""):
    return page("Sign in", (
        "<div class=\"login\"><a class=\"mark\" href=\"/\"><i>On</i>Onsite</a><h1 style=\"margin-top:28px\">Carl's page</h1>"
        "<p class=\"muted\">Messages from the contact page, and what each website takes up on the server.</p>"
        "<form method=\"post\" action=\"/admin/login\"><p><input type=\"password\" name=\"password\" placeholder=\"Password\" autocomplete=\"current-password\" autofocus required></p>"
        "<p><button class=\"btn\" type=\"submit\">Sign in</button></p>{}</form></div>"
    ).format("<p class=\"err\">" + esc(error) + "</p>" if error else ""))


def dashboard(conn, token):
    u = usage() or {}
    disk = u.get("disk") or {}
    mem = u.get("memory") or {}
    sites = u.get("sites") or []
    total_sites = sum((s.get("code") or 0) + (s.get("data") or 0) + (s.get("backups") or 0) for s in sites)
    tiles = ""
    if disk:
        used, size = disk.get("used", 0), disk.get("size", 1)
        tiles += ("<div class=\"tile\"><p class=\"eyebrow\">Disk</p><b>{} <span class=\"muted\" style=\"font-size:15px\">of {}</span></b>"
                  "<span class=\"muted\">{} free</span><div class=\"bar\"><i style=\"width:{:.0f}%\"></i></div></div>").format(
            human(used), human(size), human(disk.get("free", 0)), 100.0 * used / max(size, 1))
    if mem:
        used, total = mem.get("used", 0), mem.get("total", 1)
        tiles += ("<div class=\"tile\"><p class=\"eyebrow\">Memory</p><b>{} <span class=\"muted\" style=\"font-size:15px\">of {}</span></b>"
                  "<span class=\"muted\">right now</span><div class=\"bar\"><i style=\"width:{:.0f}%\"></i></div></div>").format(
            human(used), human(total), 100.0 * used / max(total, 1))
    tiles += "<div class=\"tile\"><p class=\"eyebrow\">Websites</p><b>{}</b><span class=\"muted\">{} together, server at {}</span></div>".format(
        len(sites), human(total_sites), esc(u.get("ip") or ""))
    unread = conn.execute("SELECT count(*) FROM enquiries WHERE read_at IS NULL").fetchone()[0]
    tiles += "<div class=\"tile\"><p class=\"eyebrow\">Messages</p><b>{}</b><span class=\"muted\">{} new</span></div>".format(
        conn.execute("SELECT count(*) FROM enquiries").fetchone()[0], unread)

    rows = ""
    biggest = max([(s.get("code") or 0) + (s.get("data") or 0) + (s.get("backups") or 0) for s in sites] + [1])
    for s in sites:
        tot = (s.get("code") or 0) + (s.get("data") or 0) + (s.get("backups") or 0)
        state = s.get("service_state")
        status = ("<span class=\"ok\">running</span>" if state == "active" else
                  "<span class=\"bad\">{}</span>".format(esc(state)) if state else "<span class=\"muted\">static files</span>")
        rows += ("<tr><td><b>{}</b><br><a class=\"muted\" href=\"{}\">{}</a></td><td class=\"hide\">{}</td>"
                 "<td class=\"num hide\">{}</td><td class=\"num hide\">{}</td><td class=\"num hide\">{}</td>"
                 "<td class=\"num\"><b>{}</b><div class=\"bar\" style=\"width:90px;margin-left:auto\"><i style=\"width:{:.0f}%\"></i></div></td></tr>").format(
            esc(s.get("name")), esc(s.get("url")), esc((s.get("url") or "").replace("https://", "")), status,
            human(s.get("code")), human(s.get("data")), human(s.get("backups")), human(tot), 100.0 * tot / biggest)
    server_section = (
        "<section class=\"section\"><h2>What each website takes up</h2>"
        "<table><thead><tr><th>Website</th><th class=\"hide\">Status</th><th class=\"num hide\">Code</th><th class=\"num hide\">Data</th>"
        "<th class=\"num hide\">Backups</th><th class=\"num\">Total</th></tr></thead><tbody>{}</tbody></table>"
        "<p class=\"muted\" style=\"margin-top:10px\">Measured {}. Data is what people have put in (databases, photos, receipts); backups are the daily copies kept on this server. "
        "Inest runs on its own server and isn't counted here.</p></section>"
    ).format(rows or "<tr><td colspan=\"6\" class=\"muted\">Not measured yet: the first figures arrive within 10 minutes.</td></tr>",
             esc(manila(u.get("measured_at")) if u.get("measured_at") else "never"))
    domains = u.get("domains") or []
    if domains:
        server_section += ("<section class=\"section\"><h2>Addresses on this server</h2><p class=\"muted\">From the web server's own list. The DNS records live at Namecheap, under getonsiteapp.com.</p>"
                           "<div class=\"row\">" + "".join("<span class=\"pill\">{}</span>".format(esc(d)) for d in domains) + "</div></section>")

    cards = ""
    for e in conn.execute("SELECT * FROM enquiries ORDER BY id DESC LIMIT 200"):
        details = [x for x in (("Needs", e["needs"]), ("Style", e["style"]), ("Budget", e["budget"]), ("Timeline", e["timeline"])) if x[1]]
        cards += ("<article class=\"card{unread}\"><header><div><b>{name}</b>{biz} <span class=\"muted\">· {contact}</span></div>"
                  "<div class=\"row\"><span class=\"muted\">{when}</span>{pill}"
                  "<form class=\"inline\" method=\"post\" action=\"/admin/read\"><input type=\"hidden\" name=\"id\" value=\"{id}\"><input type=\"hidden\" name=\"token\" value=\"{token}\">"
                  "<button class=\"btn line\" type=\"submit\">{btn}</button></form></div></header>"
                  "{details}<pre>{text}</pre></article>").format(
            unread="" if e["read_at"] else " unread", name=esc(e["name"]), biz=(" <span class=\"muted\">from</span> " + esc(e["business"])) if e["business"] else "",
            contact=esc(e["contact"]), when=esc(manila(e["created_at"])), pill="" if e["read_at"] else "<span class=\"pill new\">New</span>",
            id=e["id"], token=esc(token), btn="Mark unread" if e["read_at"] else "Mark read",
            details="<p class=\"muted\" style=\"margin:10px 0 0\">" + " · ".join("{}: {}".format(k, esc(v)) for k, v in details) + "</p>" if details else "",
            text=esc(e["message"] or e["brief"] or ""))
    messages = ("<section class=\"section\" id=\"messages\"><h2>Messages from the contact page</h2>{}</section>").format(
        cards or "<p class=\"muted\">None yet. When someone sends the project planner, it shows up here.</p>")

    top = ("<div class=\"top\"><a class=\"mark\" href=\"/\"><i>On</i>Onsite</a>"
           "<form class=\"inline\" method=\"post\" action=\"/admin/logout\"><input type=\"hidden\" name=\"token\" value=\"{}\"><button class=\"btn line\" type=\"submit\">Sign out</button></form></div>"
           "<h1>Carl's page</h1><p class=\"muted\" style=\"margin:0 0 24px\">Only you can see this.</p>").format(esc(token))
    return page("Carl's page", top + "<div class=\"grid\">" + tiles + "</div>" + messages + server_section)


# ---------------------------------------------------------------- the server

class Handler(BaseHTTPRequestHandler):
    server_version = "studio"

    def log_message(self, fmt, *args):
        pass

    # -- helpers
    def ip(self):
        fwd = self.headers.get("X-Forwarded-For") or ""
        return (fwd.split(",")[0].strip() or self.client_address[0])[:64]

    def send(self, status, body, ctype="text/html; charset=utf-8", extra=None):
        data = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Robots-Tag", "noindex")
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(data)

    def send_json(self, status, obj):
        self.send(status, json.dumps(obj), "application/json; charset=utf-8")

    def redirect(self, where, extra=None):
        self.send(303, "", extra=dict({"Location": where}, **(extra or {})))

    def body(self, limit=64 * 1024):
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > limit:
            return b""
        return self.rfile.read(length)

    def form(self):
        return {k: v[0] for k, v in parse_qs(self.body().decode("utf-8", "replace"), keep_blank_values=True).items()}

    def session_token(self):
        for part in (self.headers.get("Cookie") or "").split(";"):
            name, _, value = part.strip().partition("=")
            if name == COOKIE and value:
                return value
        return None

    def admin(self, conn):
        token = self.session_token()
        if not token:
            return None
        row = conn.execute("SELECT token FROM sessions WHERE token = ? AND expires_at > ?", (hashlib.sha256(token.encode()).hexdigest(), now())).fetchone()
        return token if row else None

    # -- verbs
    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        path = urlparse(self.path).path
        if path == "/api/health":
            return self.send_json(200, {"ok": True})
        if path in ("/admin", "/admin/"):
            conn = connect()
            try:
                token = self.admin(conn)
                return self.send(200, dashboard(conn, token) if token else login_page())
            finally:
                conn.close()
        self.send_json(404, {"error": "Not found"})

    def do_POST(self):
        path = urlparse(self.path).path
        if path == "/api/contact":
            return self.contact()
        conn = connect()
        try:
            if path == "/admin/login":
                return self.login(conn)
            token = self.admin(conn)
            if not token or self.form().get("token") != token:
                return self.redirect("/admin")
            if path == "/admin/logout":
                conn.execute("DELETE FROM sessions WHERE token = ?", (hashlib.sha256(token.encode()).hexdigest(),))
                conn.commit()
                return self.redirect("/admin", {"Set-Cookie": "{}=; Path=/admin; Max-Age=0; HttpOnly; Secure; SameSite=Lax".format(COOKIE)})
            if path == "/admin/read":
                try:
                    eid = int(self.form().get("id") or 0)
                except ValueError:
                    eid = 0
                row = conn.execute("SELECT read_at FROM enquiries WHERE id = ?", (eid,)).fetchone()
                if row:
                    conn.execute("UPDATE enquiries SET read_at = ? WHERE id = ?", (None if row["read_at"] else now(), eid))
                    conn.commit()
                return self.redirect("/admin#messages")
            self.send_json(404, {"error": "Not found"})
        finally:
            conn.close()

    def login(self, conn):
        time.sleep(0.4)   # slows guessing
        pw = self.form().get("password") or ""
        stored = conn.execute("SELECT value FROM settings WHERE key = 'admin_password'").fetchone()
        if not stored:
            return self.send(200, login_page("No password is set yet. On the server: python3 studio.py --set-password"))
        if not check_password(stored["value"], pw):
            return self.send(200, login_page("That's not the password."))
        token = secrets.token_urlsafe(32)
        expires = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=SESSION_SECONDS)).replace(microsecond=0).isoformat()
        conn.execute("INSERT INTO sessions (token, created_at, expires_at) VALUES (?,?,?)", (hashlib.sha256(token.encode()).hexdigest(), now(), expires))
        conn.execute("DELETE FROM sessions WHERE expires_at <= ?", (now(),))
        conn.commit()
        self.redirect("/admin", {"Set-Cookie": "{}={}; Path=/admin; Max-Age={}; HttpOnly; Secure; SameSite=Lax".format(COOKIE, token, SESSION_SECONDS)})

    def contact(self):
        origin = (self.headers.get("Origin") or "").rstrip("/")
        if origin != SITE_URL:
            return self.send_json(403, {"error": "Please send this from the website."})
        try:
            data = json.loads(self.body().decode("utf-8") or "{}")
        except ValueError:
            data = None
        if not isinstance(data, dict):
            return self.send_json(400, {"error": "Please try again."})
        if data.get("website"):   # the hidden field only robots fill in
            return self.send_json(200, {"ok": True})
        def text(key, n):
            v = data.get(key)
            if isinstance(v, list):
                v = ", ".join(str(x) for x in v)
            return re.sub(r"\s+", " ", str(v or "")).strip()[:n]
        name, contact = text("name", 80), text("contact", 120)
        if not name or not contact:
            return self.send_json(400, {"error": "Please add your name and an email or phone number."})
        ip = self.ip()
        with _lock:
            stamps = [t for t in _recent.get(ip, []) if t > time.time() - 3600]
            if len(stamps) >= MAX_PER_HOUR:
                return self.send_json(429, {"error": "That's a few messages in a row. Please try again in an hour, or call us."})
            stamps.append(time.time())
            _recent[ip] = stamps
        conn = connect()
        try:
            conn.execute("INSERT INTO enquiries (created_at, name, business, contact, needs, style, budget, timeline, message, brief, ip) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                         (now(), name, text("business", 80), contact, text("need", 300), text("style", 40), text("budget", 40), text("timeline", 40),
                          str(data.get("message") or "").strip()[:1500], str(data.get("brief") or "").strip()[:3000], ip))
            conn.commit()
        finally:
            conn.close()
        self.send_json(200, {"ok": True})


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("--data", default=os.environ.get("STUDIO_DATA", "data"))
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8650")))
    parser.add_argument("--set-password", action="store_true", help="set the admin password, typed here")
    args = parser.parse_args()
    CONFIG["data"] = args.data
    if args.set_password:
        return set_password()
    init_db()
    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    httpd.daemon_threads = True
    print("studio running at http://{}:{}".format(args.host, args.port), flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    main()
