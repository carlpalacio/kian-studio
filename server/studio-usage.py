#!/usr/bin/env python3
"""Measures what each website on this server takes up and writes /var/lib/studio/usage.json for Carl's page
(studio.py reads it). Runs as root from cron every 10 minutes, because the data folders belong to other users."""
import datetime
import json
import os
import re
import shutil
import subprocess

OUT = "/var/lib/studio/usage.json"
SITES = [
    {"name": "Onsite (studio page)", "url": "https://getonsiteapp.com", "code": ["/opt/kian-studio", "/opt/studio"], "data": ["/var/lib/studio"], "backups": [], "service": "studio"},
    {"name": "OnCon", "url": "https://oncon.getonsiteapp.com", "code": ["/opt/onsite/app"], "data": ["/opt/onsite/app/data"],
     "backups": ["/opt/onsite/app/data/backups", "/opt/onsite/code-before-*"], "service": "onsite", "code_minus": ["/opt/onsite/app/data"]},
    {"name": "OnTrack", "url": "https://pos.getonsiteapp.com", "code": ["/opt/ontrack"], "data": ["/var/lib/ontrack"], "backups": ["/var/backups/ontrack"], "service": "ontrack"},
    {"name": "Middleware", "url": "https://middleware.getonsiteapp.com", "code": ["/opt/middleware"], "data": ["/var/lib/middleware"], "backups": ["/var/backups/middleware"], "service": "middleware"},
]


def size(patterns):
    total = 0
    for pattern in patterns:
        import glob
        for path in glob.glob(pattern):
            try:
                out = subprocess.run(["du", "-sb", path], capture_output=True, text=True, timeout=120).stdout
                total += int(out.split()[0])
            except (ValueError, IndexError, subprocess.SubprocessError):
                pass
    return total


def service_state(name):
    if not name:
        return None
    return subprocess.run(["systemctl", "is-active", name], capture_output=True, text=True).stdout.strip() or "unknown"


def meminfo():
    kv = {}
    with open("/proc/meminfo") as fh:
        for line in fh:
            k, v = line.split(":", 1)
            kv[k] = int(v.split()[0]) * 1024
    return {"total": kv.get("MemTotal", 0), "used": kv.get("MemTotal", 0) - kv.get("MemAvailable", 0)}


def domains():
    try:
        text = open("/etc/caddy/Caddyfile").read()
    except OSError:
        return []
    out = []
    for line in text.splitlines():
        line = line.strip()
        if line.endswith("{") and not line.startswith(("@", "#", "handle", "tls", "request_body", "servers", "timeouts", "on_demand_tls", "{")):
            out += [h.strip() for h in line[:-1].split(",") if h.strip() and not h.strip().startswith("http")]
    return out


def main():
    sites = []
    for s in SITES:
        code = size(s["code"]) - size(s.get("code_minus", []))
        sites.append({"name": s["name"], "url": s["url"], "code": max(code, 0), "data": size(s["data"]) - size(s.get("backups", [])) * (1 if s["backups"] and s["backups"][0].startswith(s["data"][0]) else 0),
                      "backups": size(s["backups"]), "service_state": service_state(s["service"])})
    disk = shutil.disk_usage("/")
    ip = ""
    try:
        ip = re.search(r"src (\S+)", subprocess.run(["ip", "route", "get", "1.1.1.1"], capture_output=True, text=True).stdout).group(1)
    except (AttributeError, subprocess.SubprocessError):
        pass
    result = {"measured_at": datetime.datetime.now(datetime.timezone.utc).replace(microsecond=0).isoformat(), "ip": ip,
              "disk": {"size": disk.total, "used": disk.used, "free": disk.free}, "memory": meminfo(), "sites": sites, "domains": domains()}
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    tmp = OUT + ".tmp"
    with open(tmp, "w") as fh:
        json.dump(result, fh)
    os.chmod(tmp, 0o644)
    os.replace(tmp, OUT)


if __name__ == "__main__":
    main()
