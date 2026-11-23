#!/usr/bin/env python3
"""The small server behind getonsiteapp.com (the Onsite studio page).

It does two things the static page can't:
  POST /api/contact   saves a message from the contact page (the project planner). Nothing is emailed.
  /api/it-console/*   hands those messages to Carl's IT console (it.getonsiteapp.com), and only to it: the console
                      calls from this same server with its own code (see Handler.it_console_door).
Carl's old /admin page is now the console's Messages page; every /admin address forwards there.

Run it:  python3 studio.py --data /var/lib/studio --port 8650
Settings (environment): STUDIO_URL (this page's address), IT_CONSOLE_TOKEN_SHA256 (the SHA-256 of the console's code;
without it the console routes stay closed), IT_CONSOLE_URL (the console's address, where /admin forwards).
"""
import argparse
import datetime
import hashlib
import hmac
import json
import os
import re
import sqlite3
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse

SITE_URL = os.environ.get("STUDIO_URL", "https://getonsiteapp.com")
MAX_PER_HOUR = 5            # messages from one address
MAX_ALL_PER_HOUR = 60       # messages from everyone together, so many made-up addresses can't fill the database
CONFIG = {"data": "data"}
_lock = threading.Lock()
_recent = {}                # ip -> [timestamps] for the contact form
_all_recent = []            # every accepted message, newest last


def it_console_hash(value):
    """The console's code as this server keeps it: a SHA-256 in hex. Anything else counts as not set."""
    value = (value or "").strip().lower()
    return value if re.fullmatch(r"[0-9a-f]{64}", value) else ""


IT_CONSOLE_URL = (os.environ.get("IT_CONSOLE_URL") or "https://it.getonsiteapp.com").rstrip("/")
IT_CONSOLE_TOKEN_SHA256 = it_console_hash(os.environ.get("IT_CONSOLE_TOKEN_SHA256"))
IT_CONSOLE_BODY = 16 * 1024     # the console only sends small JSON
IT_MESSAGES = 300               # newest messages in the overview
IT_RECENT = 30


def path_of(name):
    return os.path.join(CONFIG["data"], name)


def connect():
    conn = sqlite3.connect(path_of("studio.db"))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    os.makedirs(CONFIG["data"], exist_ok=True)
    try:
        os.chmod(CONFIG["data"], 0o700)   # the messages are for the studio service only
    except OSError:
        pass
    conn = connect()
    conn.executescript("""
    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL, business TEXT, contact TEXT NOT NULL,
      needs TEXT, style TEXT, budget TEXT, timeline TEXT, message TEXT, brief TEXT, ip TEXT, read_at TEXT);
    """)
    conn.commit()
    conn.close()


def now():
    return datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat()


def utc_z(iso):
    """A stored time as the console wants it, 2026-11-23T01:30:00Z (UTC), or None."""
    if not iso:
        return None
    try:
        d = datetime.datetime.fromisoformat(str(iso).replace("Z", "+00:00"))
    except ValueError:
        return None
    if d.tzinfo is None:
        d = d.replace(tzinfo=datetime.timezone.utc)
    return d.astimezone(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


# ---------------------------------------------------------------- what the IT console sees

MESSAGE_FIELDS = ("business", "needs", "style", "budget", "timeline", "message", "brief")


def message_json(e):
    """One planner message for the console. The sender's address (kept only for the hourly limit) stays here."""
    out = {"id": str(e["id"]), "at": utc_z(e["created_at"]), "name": e["name"], "contact": e["contact"]}
    for key in MESSAGE_FIELDS:
        out[key] = e[key] or None
    out["read"] = bool(e["read_at"])
    out["read_at"] = utc_z(e["read_at"])
    return out


def database_bytes():
    total = 0
    for suffix in ("", "-wal", "-shm"):
        try:
            total += os.path.getsize(path_of("studio.db" + suffix))
        except OSError:
            pass
    return total


def overview():
    conn = connect()
    try:
        total = conn.execute("SELECT count(*) FROM enquiries").fetchone()[0]
        unread = conn.execute("SELECT count(*) FROM enquiries WHERE read_at IS NULL").fetchone()[0]
        rows = conn.execute("SELECT id, created_at, name, contact, " + ", ".join(MESSAGE_FIELDS) + ", read_at FROM enquiries "
                            "ORDER BY id DESC LIMIT ?", (IT_MESSAGES,)).fetchall()
    finally:
        conn.close()
    messages = [message_json(e) for e in rows]
    db = database_bytes()
    return {
        "product": "Onsite studio page",
        "mode": "live",
        "public_url": SITE_URL,
        "groups_label": None,
        "figures": [{"label": "Messages", "value": str(total)}, {"label": "Unread", "value": str(unread)}],
        "groups": [],
        "people": [],
        "storage": {"total_bytes": db, "parts": [{"label": "Database", "bytes": db}]},
        "recent": [{"at": m["at"], "text": "New message from {}".format(m["name"])} for m in messages[:IT_RECENT]],
        "messages": messages,
        "it_landing": None,
    }


# ---------------------------------------------------------------- the server

class Handler(BaseHTTPRequestHandler):
    server_version = "studio"
    timeout = 20   # a connection that goes quiet is dropped, so slow clients can't hold threads

    def log_message(self, fmt, *args):
        pass

    # -- helpers
    def ip(self):
        """The visitor's address. Only Caddy reaches this server (127.0.0.1), and it puts the visitor's address last
        in X-Forwarded-For; anything earlier in the list could have been typed by the visitor. From any other
        sender the header is ignored. IPv6 visitors count by their /64, so one person can't switch addresses freely."""
        peer = self.client_address[0]
        addr = peer
        if peer in ("127.0.0.1", "::1"):
            parts = [x.strip() for x in (self.headers.get("X-Forwarded-For") or "").split(",") if x.strip()]
            if parts:
                addr = parts[-1]
        if ":" in addr:
            addr = ":".join(addr.lower().split(":")[:4])
        return addr[:64]

    def it_console_door(self):
        """True only for Carl's IT console calling from this same server. Caddy connects from 127.0.0.1 too, but it
        always adds X-Forwarded-For, so loopback alone proves nothing: the call must also carry no forwarding header
        and the console's own code, which this server keeps only as a SHA-256. Never ip() here."""
        if not IT_CONSOLE_TOKEN_SHA256:
            return False
        if self.client_address[0] not in ("127.0.0.1", "::1"):
            return False
        for name in ("X-Forwarded-For", "Forwarded", "X-Real-IP"):
            if self.headers.get(name) is not None:
                return False
        token = self.headers.get("X-IT-Console-Token")
        if not token:
            return False
        try:
            digest = hashlib.sha256(token.encode("latin-1")).hexdigest()
        except UnicodeEncodeError:
            return False
        return hmac.compare_digest(digest, IT_CONSOLE_TOKEN_SHA256)

    def send(self, status, body, ctype="text/html; charset=utf-8", extra=None):
        data = body.encode("utf-8") if isinstance(body, str) else body
        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Robots-Tag", "noindex")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Strict-Transport-Security", "max-age=31536000")
        if ctype.startswith("text/html"):
            self.send_header("X-Frame-Options", "DENY")
            self.send_header("Content-Security-Policy", "default-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'")
        for k, v in (extra or {}).items():
            self.send_header(k, v)
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(data)

    def send_json(self, status, obj):
        self.send(status, json.dumps(obj), "application/json; charset=utf-8")

    def not_found(self):
        self.send_json(404, {"error": "Not found"})

    def to_console(self):
        """Carl's old /admin page lives in the IT console now, on its Messages page."""
        self.send(301, "", extra={"Location": IT_CONSOLE_URL + "/messages"})

    def body(self, limit=64 * 1024):
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > limit:
            return b""
        return self.rfile.read(length)

    # -- verbs
    def do_HEAD(self):
        self.do_GET()

    def do_GET(self):
        path = urlparse(self.path).path
        if path.startswith("/api/it-console/"):
            if not self.it_console_door():   # before anything else, and the same answer as any unknown address
                return self.not_found()
            if path == "/api/it-console/overview":
                return self.send_json(200, overview())
            return self.not_found()
        if path == "/api/health":
            return self.send_json(200, {"ok": True})
        if path == "/admin" or path.startswith("/admin/"):
            return self.to_console()
        self.not_found()

    def do_POST(self):
        path = urlparse(self.path).path
        if path.startswith("/api/it-console/"):
            if not self.it_console_door():
                return self.not_found()
            if path == "/api/it-console/message-read":
                return self.message_read()
            return self.not_found()
        if path == "/api/contact":
            return self.contact()
        if path == "/admin" or path.startswith("/admin/"):
            return self.to_console()
        self.not_found()

    def message_read(self):
        """{"id": 5, "read": true} marks that message read now; false marks it unread. Set, never flipped."""
        try:
            data = json.loads(self.body(IT_CONSOLE_BODY).decode("utf-8") or "{}")
        except ValueError:
            data = None
        if not isinstance(data, dict):
            return self.send_json(400, {"error": "Please try again."})
        eid, read = data.get("id"), data.get("read")
        if isinstance(eid, str) and re.fullmatch(r"[0-9]{1,18}", eid):
            eid = int(eid)
        if isinstance(eid, bool) or not isinstance(eid, int) or not 0 < eid < 2 ** 63 or not isinstance(read, bool):
            return self.send_json(400, {"error": "Please send the message's id, and read as true or false."})
        at = now() if read else None
        conn = connect()
        try:
            changed = conn.execute("UPDATE enquiries SET read_at = ? WHERE id = ?", (at, eid)).rowcount
            conn.commit()
        finally:
            conn.close()
        if not changed:
            return self.send_json(400, {"error": "That message isn't here any more."})
        self.send_json(200, {"ok": True, "id": str(eid), "read": read, "read_at": utc_z(at)})

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
            _all_recent[:] = [t for t in _all_recent if t > time.time() - 3600]
            if len(stamps) >= MAX_PER_HOUR or len(_all_recent) >= MAX_ALL_PER_HOUR:
                return self.send_json(429, {"error": "That's a few messages in a row. Please try again in an hour, or call us."})
            stamps.append(time.time())
            _all_recent.append(time.time())
            _recent[ip] = stamps
            if len(_recent) > 5000:   # forget addresses that haven't written for an hour
                for k in [k for k, v in _recent.items() if not v or v[-1] < time.time() - 3600]:
                    del _recent[k]
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
    args = parser.parse_args()
    CONFIG["data"] = args.data
    init_db()
    httpd = ThreadingHTTPServer((args.host, args.port), Handler)
    httpd.daemon_threads = True
    print("studio running at http://{}:{}".format(args.host, args.port), flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    main()
