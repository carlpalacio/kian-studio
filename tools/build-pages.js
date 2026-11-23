#!/usr/bin/env node
/*
  Writes every page shell (index.html, work.html, …, 404.html and work/<slug>.html for each project)
  from one template, each with its own title and description, and sets the ?v= number that every
  page loads its styles and scripts with.

    node tools/build-pages.js 19     # raise the number on every publish, so visitors get the new files

  The project pages come from content/projects.js: add a project there, run this, and /work/<slug> exists.
  Page text itself lives in /content and is drawn by assets/js/main.js; this only writes the <head>.
*/
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const version = process.argv[2];
if (!/^\d+$/.test(version || "")) {
  console.error("Usage: node tools/build-pages.js <version number>, e.g. 19");
  process.exit(1);
}

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ["site.js", "projects.js"]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, "content", f), "utf8"), sandbox, { filename: f });
}
const SITE = sandbox.window.SITE;
const PROJECTS = sandbox.window.PROJECTS;
const NAME = SITE.studioName;

const own = PROJECTS.filter((p) => !p.forClient).map((p) => p.title);
const clients = PROJECTS.filter((p) => p.forClient).map((p) => p.title);
const and = (list) => (list.length > 1 ? list.slice(0, -1).join(", ") + " and " + list[list.length - 1] : list[0] || "");

const PAGES = [
  { file: "index.html", page: "home", title: NAME + " — " + SITE.tagline.replace(/\.$/, ""), description: SITE.seo.description },
  { file: "work.html", page: "work", title: "Work", description: "Systems built for clients (" + clients.join(", ") + ") and our own products (" + own.join(", ") + ")." },
  { file: "services.html", page: "services", title: "Services", description: "Brand, websites, apps, business systems, AI and ads, in any style. Every project is quoted for you." },
  { file: "brand-scaling.html", page: "scaling", title: "Brand scaling", description: "Ads on Facebook, Instagram, Google Search, Google Maps, TikTok, YouTube, Messenger and WhatsApp, planned, made and tested every week." },
  { file: "styles.html", page: "styles", title: "Styles", description: "One made-up coffee shop in 20 design styles. Pick one, or try it with your business name." },
  { file: "about.html", page: "about", title: "About", description: SITE.owner + ", founder of " + NAME + ". Designer and developer of " + and(PROJECTS.map((p) => p.title)) + "." },
  { file: "contact.html", page: "contact", title: "Contact", description: "Plan your project in about two minutes and send it to " + NAME + ". You get a clear quote back." },
  { file: "404.html", page: "404", title: "Page not found", description: "This page doesn’t exist.", noindex: true,
    comment: "Caddy serves this page, with status 404, for any address that has no page." },
];
for (const p of PROJECTS) {
  PAGES.push({ file: "work/" + p.slug + ".html", page: "project", slug: p.slug, title: p.title, description: p.summary });
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function shell(o) {
  const title = o.page === "home" ? o.title : o.title + " — " + NAME;
  const v = version;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">${o.comment ? `\n  <!-- ${o.comment} -->` : ""}
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(o.description)}">${o.noindex ? `\n  <meta name="robots" content="noindex">` : ""}
  <meta name="theme-color" content="#f5f4f0">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(o.description)}">
  <meta property="og:image" content="https://getonsiteapp.com/og-image.png?v=${v}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="/assets/css/style.css?v=${v}">
  <script src="/content/site.js?v=${v}" defer></script>
  <script src="/content/projects.js?v=${v}" defer></script>
  <script src="/content/services.js?v=${v}" defer></script>
  <script src="/content/resume.js?v=${v}" defer></script>
  <script src="/assets/js/main.js?v=${v}" defer></script>
</head>
<body data-page="${o.page}"${o.slug ? ` data-slug="${esc(o.slug)}"` : ""}>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="guides" aria-hidden="true"></div>
  <div id="site-header"></div>
  <main id="main" tabindex="-1"></main>
  <div id="site-footer"></div>
  <noscript><p>This site needs JavaScript turned on to show its content.</p></noscript>
</body>
</html>
`;
}

// Project pages that no longer have a project are removed.
const workDir = path.join(ROOT, "work");
fs.mkdirSync(workDir, { recursive: true });
const keep = new Set(PROJECTS.map((p) => p.slug + ".html"));
for (const f of fs.readdirSync(workDir)) {
  if (f.endsWith(".html") && !keep.has(f)) { fs.unlinkSync(path.join(workDir, f)); console.log("removed work/" + f); }
}
for (const o of PAGES) {
  fs.writeFileSync(path.join(ROOT, o.file), shell(o));
  console.log("wrote " + o.file);
}

// The sitemap lists every page except 404.
const site = SITE.seo.siteUrl.replace(/\/$/, "");
const urls = ["/", "/work", "/services", "/brand-scaling", "/styles", "/about", "/contact"].concat(PROJECTS.map((p) => "/work/" + p.slug));
fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => "  <url><loc>" + site + u + "</loc></url>").join("\n") + "\n</urlset>\n");
console.log("wrote sitemap.xml");
