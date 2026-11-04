/*
  Renders every page from the files in /content.
  You shouldn't need to edit this file to change text, projects or services.
*/
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var SERVICES = window.SERVICES || [];
  var RESUME = window.RESUME || {};
  var PRICING = window.PRICING || {};
  var FAQ = window.FAQ || [];
  var C = SITE.contact || {};
  var page = document.body.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  // The Style Lab: one made-up coffee shop, redesigned in every style. Each id matches a
  // .lab[data-lab] block in style.css. `g` lists Google Fonts families, loaded only when
  // the lab comes near the screen. `sw` is the two-color swatch on its chip.
  var STYLES = [
    { id: "minimal", label: "Minimal", font: "Inter Tight", sw: ["#ffffff", "#111111"], kicker: "Coffee & pastries", sticker: "Open daily",
      note: "Quiet, airy and precise. Plenty of white space, one typeface and nothing extra." },
    { id: "editorial", label: "Editorial", font: "Instrument Serif", sw: ["#f3ede2", "#8c6f4e"], kicker: "Issue no. 01 · Coffee", sticker: "Since 2026",
      note: "Magazine-style serif headlines and warm paper tones, for brands with a story to tell." },
    { id: "bold", label: "Bold", font: "Archivo Black", g: ["Archivo+Black"], sw: ["#2547e8", "#ffd60a"], kicker: "Coffee. Pastries. Now.", sticker: "New!",
      note: "Big, loud and confident. Strong color and heavy type that stops the scroll." },
    { id: "playful", label: "Playful", font: "Fredoka", g: ["Fredoka:wght@700"], sw: ["#ffe3ef", "#ff6b3d"], kicker: "Coffee & treats", sticker: "Yum!",
      note: "Rounded shapes, bright colors and a little attitude. Fun without being messy." },
    { id: "luxury", label: "Luxury", font: "Cormorant Garamond", g: ["Cormorant+Garamond:wght@500"], sw: ["#0e0d0b", "#c9a96e"], kicker: "Private roastery", sticker: "Est. 2026",
      note: "Dark, spacious and refined, with gold details and elegant capitals." },
    { id: "techwear", label: "Techwear", font: "Space Grotesk", g: ["Space+Grotesk:wght@700"], sw: ["#4f6679", "#eef3f7"], kicker: "Coffee_sys v2.6", sticker: "SYS/01",
      note: "Cool tones, monospace details and sharp cut corners. Technical and modern." },
    { id: "brutalist", label: "Brutalist", font: "Inter Tight & JetBrains Mono", sw: ["#ffe600", "#000000"], kicker: "Coffee. No nonsense.", sticker: "No decaf",
      note: "Raw borders, hard shadows and no apologies. Honest and hard to forget." },
    { id: "retro", label: "Retro", font: "Shrikhand", g: ["Shrikhand"], sw: ["#f6e3c3", "#d9541e"], kicker: "Far-out coffee", sticker: "Groovy",
      note: "Warm 70s colors, rainbow stripes and chunky type. Nostalgic and friendly." },
    { id: "y2k", label: "Y2K", font: "Unbounded", g: ["Unbounded:wght@800"], sw: ["#ffb3e6", "#7cf7ff"], kicker: "Coffee 2K", sticker: "So fresh",
      note: "Chrome, sparkles and bubblegum gradients, straight out of the year 2000." },
    { id: "neon", label: "Neon", font: "Orbitron", g: ["Orbitron:wght@800"], sw: ["#0d0221", "#ff2bd6"], kicker: "Open till 2 a.m.", sticker: "Open late",
      note: "Glowing type on deep night colors, for brands that come alive after dark." },
    { id: "swiss", label: "Swiss", font: "Inter Tight", sw: ["#ffffff", "#e30613"], kicker: "Coffee / Pastries / 2026", sticker: "No. 1",
      note: "A strict grid, big lowercase type and one bold red. Clean and timeless." },
    { id: "zen", label: "Zen", font: "Zen Old Mincho", g: ["Zen+Old+Mincho:wght@700"], sw: ["#f4f1ea", "#b5543c"], kicker: "Coffee · Quiet · Light", sticker: "Slow",
      note: "Calm, natural and unhurried. Soft tones, quiet type and room to breathe." },
    { id: "deco", label: "Art Deco", font: "Poiret One", g: ["Poiret+One"], sw: ["#10302e", "#d4af37"], kicker: "The coffee salon", sticker: "Grand opening",
      note: "Gold lines, sunbursts and elegant capitals. Old Hollywood glamour." },
    { id: "memphis", label: "Memphis", font: "Bungee", g: ["Bungee"], sw: ["#ff5d8f", "#00c2d1"], kicker: "Coffee & chaos", sticker: "Rad!",
      note: "Squiggles, confetti and clashing colors. Loud 80s fun, with a plan." },
    { id: "newspaper", label: "Newspaper", font: "Playfair Display & UnifrakturCook", g: ["Playfair+Display:wght@800", "UnifrakturCook:wght@700"], sw: ["#f4f0e6", "#111111"],
      kicker: "Morning edition · Est. 2026", sticker: "Extra!",
      note: "Mastheads, rules and black ink. Classic, trustworthy and full of character." },
    { id: "terminal", label: "Terminal", font: "VT323", g: ["VT323"], sw: ["#050a05", "#33ff66"], kicker: "$ brew --fresh", sticker: "> open_",
      note: "Green-screen pixels and a blinking cursor, for brands with a little hacker in them." },
    { id: "zine", label: "Zine", font: "Permanent Marker", g: ["Permanent+Marker"], sw: ["#f2efe9", "#ff2e88"], kicker: "Issue #1 · Cut & paste", sticker: "DIY",
      note: "Cut-and-paste letters, tape and marker. Raw, handmade and impossible to ignore." },
    { id: "glass", label: "Glass", font: "Plus Jakarta Sans", g: ["Plus+Jakarta+Sans:wght@800"], sw: ["#7b5cff", "#ff7ac6"], kicker: "Coffee, refined", sticker: "2.0",
      note: "Frosted glass, soft light and glowing gradients. Sleek, modern and premium." },
    { id: "bauhaus", label: "Bauhaus", font: "Josefin Sans", g: ["Josefin+Sans:wght@700"], sw: ["#d62828", "#1d4e89"], kicker: "Form & coffee", sticker: "Form + function",
      note: "Circles, squares and primary colors. Geometric design that never gets old." },
    { id: "organic", label: "Organic", font: "Young Serif", g: ["Young+Serif"], sw: ["#c9d8b6", "#d9825b"], kicker: "Coffee, naturally", sticker: "Fresh daily",
      note: "Soft shapes, earthy greens and friendly serifs. Warm, natural and welcoming." },
  ];
  var LAB = {
    brand: "Mesa",
    title: "Good coffee, close to home.",
    sub: "Fresh roasts, warm pastries and a seat by the window.",
    items: [["Oat latte", "$4.50"], ["Croissant", "$3.20"], ["Cold brew", "$5.00"]],
    // Only these characters are downloaded for the lab fonts, which keeps them tiny.
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÑÓÚÜáéíñóúü .,:;!?&'’\"-–—/$#()@+·*~_>[]%|\\`",
  };

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function isPh(s) { return typeof s === "string" && /^\s*\[[\s\S]*\]\s*$/.test(s); }
  // Text from /content. [Bracketed] text renders as a visible placeholder.
  function t(s) {
    if (isPh(s)) return '<span class="ph" title="Placeholder: replace this in the /content folder">' + esc(s) + "</span>";
    return esc(s);
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function projectUrl(p) { return "project.html?p=" + encodeURIComponent(p.slug); }
  function isPortrait(im) { return im && im.h > im.w; }
  function isPlaceholderImg(im) { return /placeholders\//.test(im.src); }
  function telHref() { return "tel:" + (C.phoneLink || C.phoneDisplay || "").replace(/[^+\d]/g, ""); }

  var ICON = {
    arrow: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    download: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 2.5v8M4.5 7.5L8 11l3.5-3.5M3 13.5h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6L12.6 8z" fill="currentColor"/></svg>',
  };

  function img(im, opts) {
    opts = opts || {};
    if (!im) return "";
    var attrs = [
      'src="' + esc(im.small || im.src) + '"',
      'alt="' + esc(opts.decorative ? "" : im.alt || "") + '"',
      im.w ? 'width="' + im.w + '"' : "",
      im.h ? 'height="' + im.h + '"' : "",
      'loading="' + (opts.eager || opts.high ? "eager" : "lazy") + '"',
      'decoding="async"',
    ];
    if (im.small) {
      attrs.push('srcset="' + esc(im.small) + " 800w, " + esc(im.src) + " " + (im.w || 1600) + 'w"');
      attrs.push('sizes="' + (opts.sizes || "100vw") + '"');
    }
    if (opts.high) attrs.push('fetchpriority="high"');
    return "<img " + attrs.filter(Boolean).join(" ") + ">";
  }

  function browser(im, opts) {
    return '<div class="browser"><div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i></div>' + img(im, opts) + "</div>";
  }
  function phone(im, opts) { return '<div class="phone">' + img(im, opts) + "</div>"; }

  // A video player that only downloads when someone presses play.
  function video(v) {
    var el = '<video controls playsinline preload="none"' + (v.poster ? ' poster="' + esc(v.poster) + '"' : "") +
      (v.w ? ' width="' + v.w + '" height="' + v.h + '"' : "") + ' aria-label="' + esc(v.title || "Project video") + '">' +
      '<source src="' + esc(v.src) + '" type="video/mp4"></video>';
    return v.frame === "browser" ? '<div class="browser"><div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i></div>' + el + "</div>" : el;
  }

  // A project card's picture, with its muted preview clip on top when it has one.
  function cardMedia(p, opts) {
    var cover = p.images && p.images[0];
    var clip = p.loop
      ? '<video class="card__video" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1" data-src="' + esc(p.loop) + '"></video>'
      : "";
    var badge = p.videos && p.videos.length ? '<span class="card__badge">' + ICON.play + "Video</span>" : "";
    return '<div class="card__img">' + img(cover, opts) + clip + badge + "</div>";
  }

  // Real (non-placeholder) screenshots, taking one per project in turn.
  function realShots(portrait) {
    var lists = PROJECTS.filter(function (p) { return p.featured; }).map(function (p) {
      return (p.images || []).filter(function (im) { return !isPlaceholderImg(im) && !im.art && isPortrait(im) === !!portrait; });
    });
    var out = [];
    for (var round = 0; round < 6; round++) {
      lists.forEach(function (l) { if (l[round]) out.push(l[round]); });
    }
    return out;
  }

  // Letters that drop in one at a time (the hero title, the intro and the footer wordmark).
  // `start` carries the stagger on from an earlier word.
  function letters(text, start) {
    var n = start || 0;
    return String(text).split("").map(function (c) {
      var i = n++;
      return c === " " ? " " : '<span class="ltr" style="--i:' + i + ";--r:" + ((i * 37) % 17 - 8) + 'deg">' + esc(c) + "</span>";
    }).join("");
  }

  // A price whose characters roll up into place when it comes on screen.
  function roll(text) {
    if (isPh(text)) return t(text);
    return '<span class="sr-only">' + esc(text) + '</span><span class="roll" aria-hidden="true">' +
      String(text).split("").map(function (c, i) { return '<span style="--n:' + i + '">' + esc(c) + "</span>"; }).join("") + "</span>";
  }

  function categories() {
    var seen = {};
    PROJECTS.forEach(function (p) { if (p.category) seen[p.category] = (seen[p.category] || 0) + 1; });
    return Object.keys(seen).map(function (k) { return { name: k, count: seen[k] }; });
  }

  function setMeta(title, description) {
    var name = SITE.studioName || "";
    document.title = title ? title + " — " + name : name + " — " + (SITE.tagline || "").replace(/\.$/, "");
    var desc = description || SITE.seo && SITE.seo.description || "";
    setTag('meta[name="description"]', "content", desc);
    setTag('meta[property="og:title"]', "content", document.title);
    setTag('meta[property="og:description"]', "content", desc);
    setTag('meta[property="og:site_name"]', "content", name);
  }
  function setTag(sel, attr, val) {
    var el = document.head.querySelector(sel);
    if (!el) {
      el = document.createElement("meta");
      var m = sel.match(/\[(\w+)="([^"]+)"\]/);
      el.setAttribute(m[1], m[2]);
      document.head.appendChild(el);
    }
    el.setAttribute(attr, val);
  }

  /* ---------- shared layout ---------- */
  var NAV = [
    { key: "work", label: "Work", href: "work.html" },
    { key: "services", label: "Services", href: "services.html" },
    { key: "scaling", label: "Brand scaling", href: "brand-scaling.html" },
    { key: "about", label: "About", href: "about.html" },
    { key: "resume", label: "Resume", href: "resume.html" },
  ];

  // Profiles and chat apps that have a link set in content/site.js.
  function listed(arr) { return (arr || []).filter(function (m) { return m && m.url && !isPh(m.url); }); }
  function chatApps() {
    var out = [];
    if (C.whatsapp) out.push({ label: "WhatsApp", url: C.whatsapp });
    if (C.viber) out.push({ label: "Viber", url: C.viber });
    return out;
  }
  function outLink(m, cls, inner) {
    return '<a' + (cls ? ' class="' + cls + '"' : "") + ' href="' + esc(m.url) + '" target="_blank" rel="noopener">' + (inner || esc(m.label)) + "</a>";
  }
  var activeKey = page === "project" ? "work" : page;

  // The stock-ticker strip across the top of every page (SITE.ticker).
  function ticker() {
    var items = SITE.ticker || [];
    if (!items.length) return "";
    var list = "<ul>" + items.map(function (it) {
      var m = String(it).match(/^(.*?)\s*([▲▼])\s*(.*)$/);
      return m
        ? "<li>" + esc(m[1]) + ' <span class="' + (m[2] === "▲" ? "up" : "down") + '">' + m[2] + " " + esc(m[3]) + "</span></li>"
        : "<li>" + esc(it) + "</li>";
    }).join("") + "</ul>";
    return '<div class="ticker" aria-hidden="true"><div class="ticker__track">' + list + list + list + list + "</div></div>";
  }

  function header() {
    var cur = function (k) { return k === activeKey ? ' aria-current="page"' : ""; };
    var links = NAV.slice(0, 3).map(function (n, i) {
      return '<a class="nav__link nav__link--' + (i + 1) + ' plus" href="' + n.href + '"' + cur(n.key) + "><span>" + n.label + "</span></a>";
    }).join("");
    return (
      ticker() +
      '<header class="site-header" id="top"><nav class="nav wrap" aria-label="Main">' +
      '<a class="nav__logo" href="index.html" aria-label="' + esc(SITE.studioName) + ', home">' +
      '<span class="mark" aria-hidden="true">' + esc(monogram()) + '</span><span class="nav__wordmark" aria-hidden="true">' + esc(SITE.studioName) + "</span></a>" +
      '<div class="nav__links">' + links + "</div>" +
      '<div class="nav__end">' +
      '<a class="nav__link plus" href="' + NAV[3].href + '"' + cur(NAV[3].key) + "><span>" + NAV[3].label + "</span></a>" +
      '<a class="btn btn--dark btn--sm nav__contact" href="contact.html#planner"' + cur("contact") + ">Get a quote</a>" +
      '<button class="btn btn--line btn--sm menu-btn" type="button" aria-expanded="false" aria-controls="menu">Menu</button>' +
      "</div></nav></header>" +
      '<div class="menu" id="menu" aria-label="Menu" role="dialog" aria-modal="true" data-lenis-prevent>' +
      '<nav class="menu__links" aria-label="Mobile">' +
      [{ label: "Home", href: "index.html", key: "home" }].concat(NAV).concat([{ label: "Contact", href: "contact.html", key: "contact" }])
        .map(function (n, i) { return '<a href="' + n.href + '"' + cur(n.key) + ">" + n.label + "<span>" + pad(i + 1) + "</span></a>"; }).join("") +
      "</nav>" +
      '<div class="menu__foot">' +
      (C.phoneDisplay ? '<a class="btn btn--dark" href="' + telHref() + '">Call ' + esc(C.phoneDisplay) + "</a>" : "") +
      chatApps().map(function (m) { return outLink(m, "btn btn--line"); }).join("") +
      "</div></div>"
    );
  }

  function monogram() {
    return (SITE.studioName || "")
      .split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w[0].toUpperCase(); }).join("");
  }

  function footer() {
    var year = new Date().getFullYear();
    var findUs = listed(SITE.marketplaces).concat(listed(SITE.socials)).map(function (s) { return "<li>" + outLink(s) + "</li>"; }).join("");
    return (
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer__top">' +
      '<div class="footer__col"><h2 class="eyebrow">' + esc(SITE.studioName) + '</h2><p class="muted" style="max-width:380px">' + t(SITE.shortBio) + "</p></div>" +
      '<div class="footer__col"><h2 class="eyebrow">Pages</h2><ul>' +
      [{ label: "Home", href: "index.html" }].concat(NAV).concat([{ label: "Contact", href: "contact.html" }])
        .map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
      "</ul></div>" +
      '<div class="footer__col"><h2 class="eyebrow">Contact</h2><ul>' +
      (C.phoneDisplay ? '<li><a href="' + telHref() + '">' + esc(C.phoneDisplay) + "</a></li>" : "") +
      (C.email ? '<li><a href="mailto:' + esc(C.email) + '">' + esc(C.email) + "</a></li>" : "") +
      chatApps().map(function (m) { return "<li>" + outLink(m) + "</li>"; }).join("") +
      "</ul></div>" +
      (findUs ? '<div class="footer__col"><h2 class="eyebrow">Find us on</h2><ul>' + findUs + "</ul></div>" : "") +
      "</div>" +
      '<p class="footer__big display" aria-hidden="true" data-reveal="letters"><span>' + letters(SITE.studioName || "") + "</span></p>" +
      '<div class="footer__bottom"><span>© ' + year + " " + esc(SITE.studioName) + ". All rights reserved.</span>" +
      "<span>" + t(SITE.location) + "</span>" +
      '<a href="#top">Back to top ↑</a></div>' +
      "</div></footer>"
    );
  }

  function cta() {
    var links = [];
    if (C.phoneDisplay) links.push('<a class="cta__link" href="' + telHref() + '"><span><small>Call or text</small>' + esc(C.phoneDisplay) + "</span>" + ICON.arrow + "</a>");
    if (C.email) links.push('<a class="cta__link" href="mailto:' + esc(C.email) + '"><span><small>Email</small>' + esc(C.email) + "</span>" + ICON.arrow + "</a>");
    chatApps().forEach(function (m) { links.push(outLink(m, "cta__link", "<span><small>Chat</small>" + esc(m.label) + "</span>" + ICON.arrow)); });
    listed(SITE.marketplaces).forEach(function (m) { links.push(outLink(m, "cta__link", "<span><small>Hire us on</small>" + esc(m.label) + "</span>" + ICON.arrow)); });
    links.push('<a class="cta__link" href="contact.html#planner"><span><small>Two-minute planner</small>Plan your project</span>' + ICON.arrow + "</a>");
    return (
      '<section class="cta section" aria-labelledby="cta-title"><div class="wrap cta__inner">' +
      '<div data-reveal><p class="eyebrow" style="margin-bottom:20px">Have a project in mind?</p>' +
      '<h2 class="display cta__title" id="cta-title">Let’s build<br>it <span class="serif">together.</span></h2>' +
      (PRICING.startingAt ? '<p class="cta__price">Websites start as low as <strong>' + esc(PRICING.startingAt) + "</strong>. Tell us what you need, and we’ll handle the rest." +
        (C.replyTime ? " We reply " + esc(C.replyTime) + "." : "") + "</p>" : "") +
      "</div>" +
      '<div class="cta__links" data-reveal style="--d:.1s">' + links.join("") + "</div>" +
      "</div></section>"
    );
  }

  /* ---------- shared sections ---------- */
  // Two crossing tapes: everything the studio takes on, and the reasons to pick it.
  function tapes() {
    var caps = SITE.capabilities || [];
    var proms = SITE.promises || [];
    if (!caps.length) return "";
    var list = function (arr, hidden) {
      return "<ul" + (hidden ? ' aria-hidden="true"' : "") + ">" + arr.map(function (c) { return "<li>" + t(c) + "</li>"; }).join("") + "</ul>";
    };
    return '<section class="tapes" aria-labelledby="tapes-title"><h2 class="sr-only" id="tapes-title">What we can take on</h2>' +
      '<div class="tape tape--ink"><div class="tape__track">' + list(caps) + list(caps, true) + "</div></div>" +
      (proms.length ? '<div class="tape tape--red" aria-hidden="true"><div class="tape__track">' + list(proms) + list(proms, true) + list(proms, true) + list(proms, true) + "</div></div>" : "") +
      "</section>";
  }

  function pricing(id) {
    var plans = PRICING.plans || [];
    if (!plans.length) return "";
    var cards = plans.map(function (pl, i) {
      return '<div class="plan' + (pl.featured ? " plan--featured" : "") + '" data-reveal="ticket" style="--d:' + i * 0.08 + 's">' +
        '<p class="plan__num">' + pad(i + 1) + "</p>" +
        '<h3 class="plan__name">' + t(pl.name) + "</h3>" +
        '<p class="plan__for">' + t(pl.for) + "</p>" +
        '<p class="plan__price">' + (pl.price ? roll(pl.price) : "Custom quote") + "</p>" +
        '<ul class="plan__list">' + (pl.includes || []).map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul>" +
        '<a class="btn ' + (pl.featured ? "btn--light" : "btn--line") + '" href="contact.html?plan=' + encodeURIComponent(pl.name) + '#planner">' + (pl.price ? "Choose " + esc(pl.name) : "Get a quote") + " " + ICON.arrow + "</a></div>";
    }).join("");
    return '<section class="section wrap" id="pricing" aria-labelledby="' + id + '">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">Pricing</p>' +
      '<h2 class="h2" id="' + id + '" data-reveal>Starts as low<br>as <span class="serif">' + esc(PRICING.startingAt || "") + ".</span></h2></div>" +
      "<p data-reveal>" + t(PRICING.note || "") + " Not sure what you need? Tell us about your business and we’ll suggest the right mix.</p></div>" +
      '<div class="plans">' + cards + '</div><p class="swipe-hint" aria-hidden="true">Swipe to see all ' + plans.length + " plans →</p></section>";
  }

  /* ---------- home sections ---------- */
  // "We design, build and grow brands." with the last word cycling through SITE.rotating.
  function heroLead() {
    var words = SITE.rotating || [];
    if (!SITE.heroLead || !words.length) return SITE.tagline ? '<p class="hero__lead" data-reveal style="--d:.2s">' + t(SITE.tagline) + "</p>" : "";
    var bare = words.map(function (w) { return w.replace(/[.!]$/, ""); });
    var spoken = SITE.heroLead + " " + (bare.length > 1 ? bare.slice(0, -1).join(", ") + " and " + bare[bare.length - 1] : bare[0]) + ".";
    return '<p class="hero__lead" data-reveal style="--d:.2s"><span class="sr-only">' + esc(spoken) + "</span>" +
      '<span aria-hidden="true">' + esc(SITE.heroLead) + ' <span class="rot">' + words.map(function (w, i) {
        return '<span class="rot__w' + (i === 0 ? " is-on" : "") + '">' + esc(w) + "</span>";
      }).join("") + "</span></span></p>";
  }

  function labLabel(name, s) {
    return "Example website for " + (name || "a made-up coffee shop called " + LAB.brand) + ", designed in the " + s.label + " style";
  }

  function lab() {
    var s = STYLES[0];
    var k = 0;
    var step = function () { return ' style="--k:' + k++ + '"'; };
    var chips = STYLES.map(function (st, i) {
      return '<button class="chip" type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '" style="--c1:' + st.sw[0] + ";--c2:" + st.sw[1] + '">' +
        '<i aria-hidden="true"></i>' + esc(st.label) + "</button>";
    }).join("");
    // Every letter gets a span so the Zine style can cut them out like a ransom note.
    var title = LAB.title.split(" ").map(function (w) {
      return '<span class="w">' + w.split("").map(function (c) { return '<span class="ch">' + esc(c) + "</span>"; }).join("") + "</span>";
    }).join(" ");
    var mock = '<div class="mock" role="img" aria-label="' + esc(labLabel("", s)) + '">' +
      '<div class="mock__nav"' + step() + '><span class="mock__logo">' + esc(LAB.brand) + '</span><span class="mock__links"><i>Menu</i><i>Visit</i><i>Story</i></span><span class="mock__bag">Bag (2)</span></div>' +
      '<div class="mock__hero"><p class="mock__kicker"' + step() + ">" + esc(s.kicker) + '</p><p class="mock__title"' + step() + ">" + title + "</p>" +
      '<p class="mock__sub"' + step() + ">" + esc(LAB.sub) + '</p><p class="mock__btns"' + step() + '><span class="mock__btn">Order ahead</span><span class="mock__more">See the menu</span></p></div>' +
      '<div class="mock__art"><span class="a1"></span><span class="a2"></span><span class="a3"></span></div>' +
      '<div class="mock__row">' + LAB.items.map(function (it) {
        return '<span class="mock__card"' + step() + "><i></i><b>" + esc(it[0]) + "</b><span>" + esc(it[1]) + "</span></span>";
      }).join("") + "</div>" +
      '<span class="mock__sticker">' + esc(s.sticker) + '</span><span class="mock__fx"></span></div>';
    var panel = '<div class="lab__panel">' +
      '<div class="lab__meta"><span class="lab__count"><b>01</b> / ' + pad(STYLES.length) + '</span><span class="lab__progress" aria-hidden="true"><i></i></span>' +
      '<button class="lab__play" type="button" hidden>Pause</button></div>' +
      '<p class="lab__name">' + esc(s.label) + "</p>" +
      '<p class="lab__note">' + esc(s.note) + "</p>" +
      '<div class="lab__specs"><ul class="lab__swatches" aria-hidden="true"><li></li><li></li><li></li><li></li></ul><p class="lab__font">Type · <span>' + esc(s.font) + "</span></p></div>" +
      '<div class="lab__field"><label for="lab-name">Try it with your business name</label>' +
      '<input id="lab-name" type="text" maxlength="18" autocomplete="organization" spellcheck="false" placeholder="' + esc(LAB.brand) + '"></div>' +
      '<div class="lab__actions"><a class="btn btn--dark lab__cta" href="contact.html?style=' + s.id + '#planner">Start in this style ' + ICON.arrow + "</a>" +
      '<button class="btn btn--line lab__shuffle" type="button">Surprise me</button></div>' +
      '<p class="sr-only" id="lab-status" aria-live="polite"></p></div>';
    return '<section class="lab" data-lab="' + s.id + '" aria-labelledby="styles-title"><div class="wrap">' +
      '<div class="lab__head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">Style lab · ' + STYLES.length + " looks, one brand</p>" +
      '<h2 class="h2 lab__title" id="styles-title" data-reveal>Any design. <span class="lab__line">Any <span class="lab__word">style.</span></span></h2></div>' +
      "<p data-reveal>Minimal or loud, playful or premium: tell us the feeling you want and we’ll design it from scratch, never from a template. " +
      "Here’s one made-up coffee shop in " + STYLES.length + " styles. Pick one, or type your business name and try them on.</p></div>" +
      '<div class="lab__grid"><div class="lab__stage" data-reveal>' + mock + "</div>" +
      '<div class="lab__chips" role="group" aria-label="Choose a design style">' + chips + "</div>" + panel + "</div>" +
      "</div></section>";
  }

  function whyUs() {
    var R = SITE.reasons || [];
    if (!R.length) return "";
    var live = PROJECTS.filter(function (p) { return p.link; });
    var tiles = R.map(function (r, i) {
      var links = r.live && live.length
        ? '<ul class="why__live">' + live.map(function (p) {
            return '<li><a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")) + " " + ICON.arrow + "</a></li>";
          }).join("") + "</ul>"
        : "";
      return '<div class="why__tile' + (links ? " why__tile--live" : "") + '" data-reveal="ticket" style="--d:' + (i % 3) * 0.06 + 's"><span class="why__num">' + pad(i + 1) + "</span>" +
        "<h3>" + t(r.title) + "</h3><p>" + t(r.body) + "</p>" + links + "</div>";
    }).join("");
    var price = PRICING.startingAt
      ? '<div class="why__tile why__tile--price" data-reveal="ticket"><p class="eyebrow">Websites from</p><p class="why__price">' + roll(PRICING.startingAt) + "</p>" +
        "<p>" + t(PRICING.note || "") + '</p><a class="btn btn--light" href="contact.html#planner">Plan your project ' + ICON.arrow + "</a></div>"
      : "";
    var call = C.phoneDisplay
      ? '<a class="why__tile why__tile--call" href="' + telHref() + '" data-reveal="ticket"><span class="eyebrow">The first call is free</span>' +
        '<span class="why__call">' + esc(C.phoneDisplay) + "</span><span>Call or text us today " + ICON.arrow + "</span></a>"
      : "";
    return '<section class="section wrap" aria-labelledby="why-title">' +
      '<div class="section-head"><h2 class="h2" id="why-title" data-reveal>Why work<br>with <span class="serif">us.</span></h2>' +
      "<p data-reveal>A small studio that designs, builds and grows it all. Here’s what you can count on, from the first call to long after launch.</p></div>" +
      '<div class="why">' + price + '<div class="why__reasons">' + tiles + '</div><p class="swipe-hint" aria-hidden="true">Swipe for more reasons →</p>' + call + "</div></section>";
  }

  // Where a service's links go: its own page if it has one, else its row on the Services page.
  function serviceHref(s, i) { return s.page ? s.page : "services.html#service-" + (i + 1); }
  function scalingService() { return SERVICES.filter(function (s) { return s.page === "brand-scaling.html"; })[0]; }
  function quoteHref(need) { return "contact.html" + (need ? "?need=" + encodeURIComponent(need) : "") + "#planner"; }

  // A rising line that draws itself in (decorative).
  function growthChart() {
    var line = "M10 250 C 70 246, 96 262, 150 226 S 232 206, 272 210 S 340 150, 392 158 S 462 92, 512 98 S 566 40, 590 26";
    return '<svg class="growth-chart" viewBox="0 0 600 280" aria-hidden="true">' +
      '<defs><linearGradient id="gc-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor" stop-opacity=".28"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs>' +
      [70, 140, 210].map(function (y) { return '<line x1="0" x2="600" y1="' + y + '" y2="' + y + '" class="growth-chart__grid"/>'; }).join("") +
      '<path class="growth-chart__area" d="' + line + ' L 590 280 L 10 280 Z" fill="url(#gc-fill)"/>' +
      '<path class="growth-chart__line" d="' + line + '" pathLength="1"/>' +
      [[150, 226], [272, 210], [392, 158], [512, 98], [590, 26]].map(function (pt, i) {
        return '<circle class="growth-chart__dot" cx="' + pt[0] + '" cy="' + pt[1] + '" r="7" style="--i:' + i + '"/>';
      }).join("") + "</svg>";
  }

  // The scaling loop as numbered steps.
  function loopSteps(cls) {
    var steps = (window.GROWTH && GROWTH.steps) || [];
    return '<ol class="' + cls + '">' + steps.map(function (st, i) {
      return '<li data-reveal="ticket" style="--d:' + i * 0.07 + 's"><span class="loop__num">' + pad(i + 1) + "</span><b>" + t(st.name) + "</b><span>" + t(st.body) + "</span></li>";
    }).join("") + "</ol>";
  }

  // Home: the bright band that says what the studio wants to be known for.
  function growthBand() {
    var G = window.GROWTH;
    if (!G) return "";
    var svc = scalingService();
    var chans = (G.channels || []).map(function (c) { return '<li class="plus">' + t(c.name) + "</li>"; }).join("");
    return '<section class="growth-band" aria-labelledby="growth-title"><div class="wrap">' +
      '<div class="growth-band__head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">Brand scaling &amp; ads</p>' +
      '<h2 class="h2" id="growth-title" data-reveal>Don’t just launch.<br><span class="serif">Scale.</span></h2></div>' +
      '<div class="growth-band__side"><p data-reveal>We plan, make and run the ads that bring in customers, then test every week and put more behind what works. Your brand, content and landing pages, built to back them up.</p>' +
      '<ul class="growth-band__chans" data-reveal>' + chans + "</ul>" +
      '<div class="growth-band__btns" data-reveal><a class="btn btn--light" href="brand-scaling.html">How we scale brands ' + ICON.arrow + "</a>" +
      '<a class="btn btn--ghost-light" href="' + quoteHref(svc && svc.name) + '">Get an ads quote</a></div></div>' +
      '<div class="growth-band__chart" data-reveal>' + growthChart() + "</div></div>" +
      loopSteps("loop loop--band") +
      "</div></section>";
  }

  // Home: what we do with AI, an example chat that plays itself, and how fast we reply.
  function aiSection() {
    var A = SITE.ai || {};
    var chat = A.chat || [];
    if (!chat.length && !(A.points || []).length) return "";
    var brand = LAB.brand;
    var msgs = chat.map(function (m) {
      var ai = m.from === "ai";
      return '<li class="msg ' + (ai ? "msg--ai" : "msg--them") + '">' + (ai ? '<span class="msg__who">AI</span>' : "") + "<p>" + t(m.text) + "</p></li>";
    }).join("");
    var window_ = chat.length
      ? '<figure class="ai-chat" data-reveal aria-label="Example: a conversation with an AI assistant for ' + esc(brand) + ', a made-up café">' +
        '<div class="ai-chat__head"><span class="ai-chat__avatar" aria-hidden="true">' + esc(brand.charAt(0)) + "</span>" +
        "<div><b>" + esc(brand) + " · AI assistant</b><span><i aria-hidden=\"true\"></i>Online now · answers in seconds</span></div></div>" +
        '<ol class="ai-chat__log" aria-live="off">' + msgs + '<li class="msg msg--ai msg--typing" aria-hidden="true"><p><i></i><i></i><i></i></p></li></ol>' +
        '<div class="ai-chat__input" aria-hidden="true"><span>Type a message…</span><i>' + ICON.right + "</i></div>" +
        '<figcaption>Example conversation. ' + esc(brand) + " is a made-up café.</figcaption></figure>"
      : "";
    var points = (A.points || []).map(function (pt, i) {
      return '<li data-reveal style="--d:' + i * 0.06 + 's"><span class="ai__num">' + pad(i + 1) + "</span><div><h3>" + t(pt.title) + "</h3><p>" + t(pt.body) + "</p></div></li>";
    }).join("");
    var fast = C.replyTime
      ? '<div class="ai__fast" data-reveal><p class="eyebrow">Responsive, both ways</p>' +
        '<div class="ai__fast-row"><p><strong>' + esc(C.replyTime.replace(/^within /, "")) + "</strong>Reply time, any day of the week</p>" +
        "<p><strong>Every screen</strong>What we build fits phones, tablets and desktops</p></div></div>"
      : "";
    return '<section class="section wrap ai" aria-labelledby="ai-title"><div class="ai__grid">' +
      '<div class="ai__head"><p class="eyebrow" data-reveal style="margin-bottom:16px">AI, used well</p>' +
      '<h2 class="h2" id="ai-title" data-reveal>AI that works.<br><span class="serif">People who answer.</span></h2>' +
      "<p data-reveal>We build AI into your business where it actually helps, and we use it ourselves to work faster. You still get real people who reply quickly and care how it turns out.</p></div>" +
      window_ + '<div class="ai__rest"><ol class="ai__points">' + points + "</ol>" + fast +
      '<div class="ai__btns" data-reveal><a class="btn btn--dark" href="' + quoteHref("AI Assistants & Automation") + '">Get an AI assistant ' + ICON.arrow + "</a>" +
      '<a class="btn btn--line" href="services.html">All services</a></div></div></div></section>';
  }

  // Reviews, once there are real ones in content/site.js (about.testimonials).
  function quotes() {
    var Q = (SITE.about && SITE.about.testimonials) || [];
    if (!Q.length) return "";
    return '<section class="section wrap" aria-labelledby="quotes-title" style="padding-top:0"><div class="section-head"><h2 class="h2" id="quotes-title" data-reveal>Kind <span class="serif">words.</span></h2>' +
      "<p data-reveal>What clients say after working with us.</p></div>" +
      '<div class="quotes">' + Q.map(function (q) {
        return '<blockquote class="quote" data-reveal><p>“' + t(q.quote) + '”</p><cite>' + t(q.name) + (q.title ? ", " + t(q.title) : "") + "</cite></blockquote>";
      }).join("") + "</div></section>";
  }

  /* ---------- pages ---------- */
  function home() {
    setMeta("", SITE.seo && SITE.seo.description);
    var land = realShots(false);
    var port = realShots(true);
    // The stage's phone shows the project marked heroPhone: true, or else the first phone screenshot.
    var heroPhone = PROJECTS.filter(function (p) { return p.heroPhone; })[0];
    var phoneShot = heroPhone && (heroPhone.images || []).filter(function (im) { return isPortrait(im) && !isPlaceholderImg(im); })[0] || port[0];
    var words = (SITE.studioName || "").split(/\s+/);
    var at = 0;
    var title = '<span class="sr-only">' + esc(SITE.studioName) + '</span><span aria-hidden="true">' + words.map(function (w) {
      var word = '<span class="hero__word">' + letters(w, at) + "</span>";
      at += w.length;
      return word;
    }).join("") + "</span>";

    var iso = land.slice(0, 3).map(function (im, i) {
      return '<div class="iso__layer" style="--i:' + (i + 1) + '">' + img(im, { decorative: true, eager: true, sizes: "320px" }) + "</div>";
    }).join("");

    // Featured work runs sideways in one row, each project on a panel in its own color.
    var featured = PROJECTS.filter(function (p) { return p.featured; });
    var reel = featured.map(function (p, i) {
      var n = PROJECTS.indexOf(p) + 1;
      return '<li class="reel__item" data-reveal="ticket" style="--d:' + Math.min(i, 3) * 0.08 + "s;--accent:" + esc(p.accent || "#e9dfcf") + ";--tilt:" + (i % 2 ? 2.5 : -2.5) + 'deg">' +
        '<a class="card" href="' + projectUrl(p) + '" draggable="false"><div class="reel__panel">' + cardMedia(p, { sizes: "(min-width: 760px) 34vw, 80vw" }) + "</div>" +
        '<div class="card__foot"><div><h3 class="card__title">' + esc(p.title) + '</h3><p class="card__meta">' + esc(p.category) + "</p></div>" +
        '<span class="card__num">' + pad(n) + "</span></div></a></li>";
    }).join("");

    // Every service as a colored pill that slides in from the left.
    var tones = [["#e9dfcf", "#0f0f0e"], ["#f2c230", "#0f0f0e"], ["#c8341c", "#ffffff"], ["#b9d4f0", "#0f0f0e"], ["#0f0f0e", "#f7f2ea"], ["#c5e35a", "#0f0f0e"]];
    var svc = SERVICES.map(function (s, i) {
      var tone = tones[i % tones.length];
      return '<li style="--i:' + Math.min(i, 11) + ";--pill-bg:" + tone[0] + ";--pill-fg:" + tone[1] + '"><a class="pills__pill" href="' + serviceHref(s, i) + '">' +
        '<span class="pills__num" aria-hidden="true">' + pad(i + 1) + '</span><span class="pills__name">' + t(s.name) + "</span>" +
        (s.price ? '<span class="pills__tag">' + t(s.price) + "</span>" : "") + "</a></li>";
    }).join("");

    var thumb = land[3] || land[1] || land[0];
    var stats = [
      [PROJECTS.length, "Products designed & built"],
      [SERVICES.length, "Services under one roof"],
      [STYLES.length, "Design styles, and counting"],
    ].map(function (s, i) {
      return '<div class="stat" data-reveal style="--d:' + i * 0.1 + 's"><p class="stat__num"><span data-count="' + s[0] + '">' + s[0] + "</span><sup>+</sup></p>" +
        '<p class="stat__label">' + s[1] + "</p></div>";
    }).join("");
    var avail = (C.availability || "").split(". ")[0].replace(/\.$/, "");
    var hire = listed(SITE.marketplaces);

    return (
      '<section class="hero wrap" aria-labelledby="hero-title"><div class="hero__grid">' +
      '<div><p class="eyebrow hero__eyebrow" data-reveal>' + (SITE.eyebrow ? t(SITE.eyebrow) : esc(SITE.owner) + " · " + t(SITE.role)) + "</p>" +
      '<h1 class="display hero__title" id="hero-title">' + title + "</h1>" + heroLead() + "</div>" +
      '<div class="hero__copy" data-reveal style="--d:.25s">' +
      (avail ? '<p class="pill"><span class="pill__dot" aria-hidden="true"></span>' + t(avail) + "</p>" : "") +
      "<p>" + t(SITE.taglineSub) + "</p>" +
      '<div class="hero__ctas"><a class="btn btn--dark" href="contact.html#planner">Get a quote ' + ICON.arrow + '</a><a class="btn btn--line" href="work.html">View work</a></div>' +
      (hire.length ? '<p class="hero__hire">Also on ' + hire.map(function (m) { return outLink(m); }).join(" · ") + "</p>" : "") +
      (PRICING.startingAt ? '<p class="hero__price" data-reveal="slap" style="--d:.7s"><span>Websites from</span> <strong>' + roll(PRICING.startingAt) + "</strong></p>" : "") + "</div>" +
      '<div class="hero__visual" data-reveal style="--d:.35s"><div class="iso" aria-hidden="true"><div class="iso__stage"><div class="iso__base"></div>' + iso + "</div></div></div>" +
      "</div></section>" +

      '<section class="stage" aria-label="Screens from recent projects">' +
      '<div class="curtain curtain--l"></div><div class="curtain curtain--c"></div><div class="curtain curtain--r"></div>' +
      '<div class="lamp" aria-hidden="true"></div><div class="platform" aria-hidden="true"></div><div class="pedestal" aria-hidden="true"></div>' +
      (land[1] ? '<figure class="device device--side">' + browser(land[1], { sizes: "(min-width: 700px) 25vw, 1px" }) + "</figure>" : "") +
      (land[0] ? '<figure class="device device--main">' + browser(land[0], { high: true, sizes: "(min-width: 700px) 44vw, 66vw" }) + "</figure>" : "") +
      (phoneShot ? '<figure class="device device--phone">' + phone(phoneShot, { sizes: "(min-width: 700px) 10vw, 25vw" }) + "</figure>" : "") +
      '<p class="stage__caption">Live work: ' + featured.filter(function (p) { return p.link; }).map(function (p) { return esc(p.title); }).join(" · ") + "</p>" +
      "</section>" +

      tapes() +

      '<section class="section wrap" aria-labelledby="about-title"><div class="about-strip">' +
      '<div class="about-strip__side"><h2 class="eyebrow" id="about-title" data-reveal>About the studio</h2>' +
      (thumb ? '<div class="about-strip__thumb" data-reveal>' + img(thumb, { sizes: "220px", decorative: true }) + '<a class="plus" href="work.html">Our work</a></div>' : "") +
      "</div>" +
      '<div class="about-strip__main"><p class="lead" data-reveal>Good design should be easy for everybody. At ' + esc(SITE.studioName) +
      ", we design and build the brands, websites, apps and systems that run a business, then scale it with ads and AI. One team for all of it, in any style.</p>" +
      '<div class="stats">' + stats + "</div></div></div></section>" +

      growthBand() +

      lab() +

      '<section class="featured section" aria-labelledby="featured-title">' +
      '<div class="wrap featured__head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">Selected work · ' + pad(featured.length) + " projects</p>" +
      '<h2 class="h2" id="featured-title" data-reveal>Where style<br>meets function.</h2></div>' +
      '<div class="featured__side"><p data-reveal>Platforms, apps and business systems we designed and built, each around the people who use it every day. Swipe through, and open any project to watch it in action.</p>' +
      '<div class="featured__ctrl" data-reveal><a class="btn btn--light" href="work.html">View all work ' + ICON.arrow + "</a>" +
      '<div class="reel__nav"><button class="reel__btn" type="button" data-dir="-1" aria-controls="reel" aria-label="Previous project">' + ICON.left + "</button>" +
      '<span class="reel__count" aria-hidden="true"><b>01</b> / ' + pad(featured.length) + "</span>" +
      '<button class="reel__btn" type="button" data-dir="1" aria-controls="reel" aria-label="Next project">' + ICON.right + "</button></div></div></div></div>" +
      '<div class="reel"><ul class="reel__track" id="reel" aria-label="Featured projects">' + reel + "</ul></div>" +
      '<div class="wrap reel__foot"><div class="reel__bar" aria-hidden="true"><i></i></div>' +
      '<ul class="featured__cats">' + categories().map(function (c) { return '<li class="plus">' + esc(c.name) + "</li>"; }).join("") + "</ul></div>" +
      "</section>" +

      aiSection() +

      whyUs() +

      '<section class="section wrap" aria-labelledby="svc-title" style="padding-top:0">' +
      '<div class="section-head"><h2 class="h2" id="svc-title" data-reveal>Everything,<br>under one <span class="serif">roof.</span></h2>' +
      '<p data-reveal>From the logo on the door to the system behind the counter, the AI that answers your customers and the ads that bring them in. If your business needs it, we’ll handle it.</p></div>' +
      '<ul class="pills" data-reveal="pills">' + svc + "</ul>" +
      '<div style="margin-top:32px" data-reveal><a class="btn btn--line" href="services.html">See what’s included ' + ICON.arrow + "</a></div>" +
      "</section>" +
      quotes() +
      pricing("pricing-title") +
      cta()
    );
  }

  function pageHead(eyebrow, title, text, aside) {
    return '<section class="page-head wrap"><p class="eyebrow" data-reveal>' + eyebrow + "</p>" +
      '<h1 class="display page-head__title" data-reveal>' + title + "</h1>" +
      '<div class="page-head__row"><p data-reveal>' + text + "</p>" + (aside ? "<div data-reveal>" + aside + "</div>" : "") + "</div></section>";
  }

  function work() {
    setMeta("Work", "Platforms, apps and business systems designed and built by " + SITE.studioName + ".");
    var cats = categories();
    var params = new URLSearchParams(location.search);
    var initial = params.get("category") || "All";
    var filters = [{ name: "All", count: PROJECTS.length }].concat(cats).map(function (c) {
      return '<button class="filter" type="button" data-filter="' + esc(c.name) + '" aria-pressed="' + (c.name === initial) + '">' + esc(c.name) + "<span>" + c.count + "</span></button>";
    }).join("");
    var cards = PROJECTS.map(function (p, i) {
      return '<a class="card" href="' + projectUrl(p) + '" data-cat="' + esc(p.category) + '" data-reveal>' +
        cardMedia(p, { sizes: "(min-width: 760px) 50vw, 100vw", eager: i < 2 }) +
        '<div class="card__foot"><div><h2 class="card__title">' + esc(p.title) + '</h2><p class="card__meta">' + esc(p.category) + " · " + t(p.year) + "</p></div>" +
        '<span class="card__num">' + pad(i + 1) + "</span></div></a>";
    }).join("");
    return pageHead("Selected work", "Work", "Platforms, apps and business systems, each designed in the style that fits and built to be used every day. Pick a category or browse everything.") +
      '<section class="wrap" style="padding-bottom:clamp(64px,10vw,140px)" aria-label="Projects">' +
      '<div class="filters" role="group" aria-label="Filter projects by category">' + filters + "</div>" +
      '<p class="sr-only" aria-live="polite" id="filter-status"></p>' +
      '<div class="work-grid">' + cards + "</div></section>" + cta();
  }

  function project() {
    var slug = new URLSearchParams(location.search).get("p");
    var idx = -1;
    PROJECTS.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) {
      setMeta("Project not found");
      return '<section class="wrap notfound"><p class="eyebrow">404</p><h1 class="display page-head__title">Not found.</h1>' +
        '<p>That project doesn’t exist, or its link changed.</p><div><a class="btn btn--dark" href="work.html">See all work</a></div></section>';
    }
    var p = PROJECTS[idx];
    var next = PROJECTS[(idx + 1) % PROJECTS.length];
    setMeta(p.title, isPh(p.summary) ? p.title + ": a project by " + SITE.studioName + "." : p.summary);
    var accent = p.accent || "#e2442a";
    var images = p.images || [];
    var cover = images[0];
    var rest = images.slice(1);

    var meta = [["Client", p.client], ["Year", p.year], ["Role", p.role], ["Category", p.category]].filter(function (kv) { return kv[1]; }).map(function (kv) {
      return "<div><dt>" + kv[0] + "</dt><dd>" + t(kv[1]) + "</dd></div>";
    }).join("");

    var secs = (p.sections || []).map(function (s) {
      return '<div class="psec" data-reveal><h2>' + t(s.heading) + "</h2><p>" + t(s.body) + "</p></div>";
    }).join("");
    if (p.tools && p.tools.length) {
      secs += '<div class="psec" data-reveal><h2>Tools</h2><ul class="tags">' + p.tools.map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul></div>";
    }
    if (p.results && p.results.length) {
      secs += '<div class="psec" data-reveal><h2>Results</h2><ul>' + p.results.map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul></div>";
    }
    var features = (p.features || []).length
      ? '<section class="features" aria-labelledby="features-title"><div class="features__head" data-reveal><h2 class="h3" id="features-title">What it does</h2>' +
        '<span class="eyebrow">' + pad(p.features.length) + " features</span></div>" +
        '<ul class="features__list">' + p.features.map(function (x, i) {
          return '<li data-reveal><span class="features__num">' + pad(i + 1) + "</span>" + t(x) + "</li>";
        }).join("") + "</ul></section>"
      : "";

    // With a video, the video is the cover and every image goes to the gallery.
    var videos = p.videos || [];
    if (videos.length) rest = images;
    var more = videos.slice(1).map(function (v) {
      return '<figure class="watch__item" data-reveal>' + video(v) + "<figcaption>" + esc(v.title) + (v.duration ? " · " + esc(v.duration) : "") + "</figcaption></figure>";
    }).join("");

    // Lay out the remaining images: phones pair with a screenshot, screenshots pair up.
    var rows = [];
    for (var i = 0; i < rest.length; ) {
      var a = rest[i], b = rest[i + 1];
      if (b && isPortrait(a) !== isPortrait(b)) {
        rows.push(isPortrait(a) ? [["phone", a], ["wide", b]] : [["wide", a], ["phone", b]]);
        i += 2;
      } else if (b && !isPortrait(a)) {
        rows.push([["half", a], ["half", b]]);
        i += 2;
      } else {
        rows.push([[isPortrait(a) ? "phone-solo" : "full", a]]);
        i += 1;
      }
    }
    var gallery = rows.map(function (row) {
      return row.map(function (cell) {
        var kind = cell[0], im = cell[1];
        if (kind === "phone" || kind === "phone-solo") {
          return '<figure class="gallery__item gallery__item--phone"' + (kind === "phone-solo" ? ' style="grid-column:1/-1"' : "") + ' data-reveal>' + phone(im, { sizes: "260px" }) + "</figure>";
        }
        var cls = kind === "wide" ? " gallery__item--wide-with-phone" : kind === "half" ? " gallery__item--half" : "";
        var sizes = kind === "full" ? "100vw" : "(min-width: 900px) 60vw, 100vw";
        return '<figure class="gallery__item' + cls + '" data-reveal>' + img(im, { sizes: sizes }) + "</figure>";
      }).join("");
    }).join("");

    var coverHtml = videos.length
      ? '<div class="stage-mini stage-mini--video"><figure class="cover-video">' + video(videos[0]) +
        '<figcaption><span class="cover-video__dot" aria-hidden="true"></span>' + esc(videos[0].title) + (videos[0].duration ? " · " + esc(videos[0].duration) : "") + "</figcaption></figure></div>"
      : cover
      ? isPlaceholderImg(cover)
        ? '<div class="stage-mini ph-cover">' + img(cover, { eager: true }) + "</div>"
        : isPortrait(cover)
          ? '<div class="stage-mini" style="display:grid;place-items:center;padding-bottom:clamp(16px,5vw,72px)"><div style="width:min(300px,70%)">' + phone(cover, { eager: true, sizes: "300px" }) + "</div></div>"
          : '<div class="stage-mini">' + browser(cover, { eager: true, sizes: "(min-width: 1440px) 1200px, 90vw" }) + "</div>"
      : "";

    return '<article style="--accent:' + esc(accent) + '"><div class="wrap project-head">' +
      '<a class="back-link" href="work.html">' + ICON.left + " All work</a>" +
      '<p class="eyebrow" data-reveal>' + pad(idx + 1) + " / " + pad(PROJECTS.length) + " · " + esc(p.category) + "</p>" +
      '<h1 class="display project-title" data-reveal>' + esc(p.title) + "</h1>" +
      '<div class="project-intro"><p class="lead" data-reveal>' + t(p.summary) + "</p>" +
      '<div data-reveal><dl class="meta">' + meta + "</dl>" +
      (p.link ? '<div style="margin-top:24px"><a class="btn btn--dark" href="' + esc(p.link) + '" target="_blank" rel="noopener">Visit ' + esc(p.link.replace(/^https?:\/\//, "").replace(/\/$/, "")) + " " + ICON.arrow + "</a></div>" : "") +
      "</div></div></div>" +
      '<div class="wrap project-cover" data-reveal>' + coverHtml + "</div>" +
      '<div class="wrap">' +
      (secs ? '<div class="project-sections">' + secs + "</div>" : "") +
      features +
      (gallery ? '<div class="gallery">' + gallery + "</div>" : "") +
      (more ? '<section class="watch" aria-labelledby="watch-title"><h2 class="h3" id="watch-title" data-reveal>More to watch</h2><div class="watch__grid">' + more + "</div></section>" : "") +
      '<aside class="like" data-reveal aria-label="Start a similar project"><p class="like__title">Want something like <span class="serif">' + esc(p.title) + "</span>?</p>" +
      '<p class="like__text">We can design and build one for your business, in your style, with a clear quote after a free call.</p>' +
      '<div class="like__btns"><a class="btn btn--dark" href="contact.html?like=' + encodeURIComponent(p.title) + '#planner">Plan your project ' + ICON.arrow + "</a>" +
      (C.phoneDisplay ? '<a class="btn btn--line" href="' + telHref() + '">Call ' + esc(C.phoneDisplay) + "</a>" : "") + "</div></aside>" +
      (next && next !== p ? '<a class="next-project" href="' + projectUrl(next) + '"><span class="eyebrow">Next project</span><span class="display next-project__title">' + esc(next.title) + ICON.arrow + "</span></a>" : "") +
      "</div></article>" + cta();
  }

  function services() {
    setMeta("Services & pricing", "Brand identity, websites, online stores, apps, POS and inventory systems, AI assistants, ads and more, in any style. Websites start at " + (PRICING.startingAt || "$80") + ".");
    var list = SERVICES.map(function (s, i) {
      return '<li class="svc" id="service-' + (i + 1) + '" data-reveal><span class="svc__num">' + pad(i + 1) + "</span>" +
        '<h2 class="svc__name">' + t(s.name) + "</h2>" +
        '<p class="svc__desc">' + t(s.description) + "</p>" +
        '<ul class="svc__includes" aria-label="Included">' + (s.includes || []).map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul>" +
        '<span class="svc__price">' + (s.price ? t(s.price) : '<span class="muted">Quoted per project</span>') +
        '<a class="svc__ask" href="contact.html?need=' + encodeURIComponent(s.name) + '#planner">Get a quote<span class="sr-only"> for ' + esc(s.name) + "</span> " + ICON.arrow + "</a>" +
        (s.page ? '<a class="svc__ask" href="' + esc(s.page) + '">How it works<span class="sr-only"> for ' + esc(s.name) + "</span> " + ICON.arrow + "</a>" : "") + "</span></li>";
    }).join("");
    var steps = [
      ["Talk", "A quick call or chat about your business, your customers and the style you like."],
      ["Design", "We design in your chosen style and refine it with your feedback until it feels right."],
      ["Build", "We build it mobile-first, fast and easy for your team to use and update."],
      ["Launch & scale", "We launch, hand everything over, and stay on to run your ads and keep the brand growing."],
    ].map(function (s, i) {
      return '<div class="step" data-reveal style="--d:' + i * 0.08 + 's"><span class="step__num">' + pad(i + 1) + "</span><h3>" + s[0] + "</h3><p>" + s[1] + "</p></div>";
    }).join("");
    var faq = FAQ.length
      ? '<section class="section wrap" aria-labelledby="faq-title" style="padding-top:0"><div class="section-head"><h2 class="h2" id="faq-title" data-reveal>Questions</h2>' +
        "<p data-reveal>The things people usually ask before we start. Anything else, just call or message us" + (C.replyTime ? ". We reply " + esc(C.replyTime) : "") + ".</p></div>" +
        '<div class="faq">' + FAQ.map(function (f) {
          return '<details class="faq__item" data-reveal><summary>' + t(f.q) + '<span class="faq__icon" aria-hidden="true"></span></summary><p>' + t(f.a) + "</p></details>";
        }).join("") + "</div></section>"
      : "";
    return pageHead("What we do", "Services",
      "Everything a business needs to look professional, run smoothly and grow, from the brand and website to the apps, AI and ads behind it. Designed in any style.",
      '<a class="btn btn--dark" href="contact.html#planner">Get a quote ' + ICON.arrow + "</a>") +
      '<section class="wrap" aria-label="All services"><ul class="svc-list">' + list + "</ul></section>" +
      pricing("pricing-title") +
      '<section class="section wrap" aria-labelledby="process-title" style="padding-top:0"><div class="section-head"><h2 class="h2" id="process-title" data-reveal>How it works</h2>' +
      "<p data-reveal>Simple from start to finish. You always talk to the people designing and building your project.</p></div>" +
      '<div class="steps">' + steps + "</div></section>" + faq + cta();
  }

  function scaling() {
    var G = window.GROWTH || {};
    var svc = scalingService();
    var need = svc ? svc.name : "";
    setMeta("Brand scaling & ads", "Brand scaling and ads by " + SITE.studioName + ": strategy, ad creative, AI-made variations, landing pages and weekly tuning on Facebook, Instagram, Google and TikTok.");
    var chans = (G.channels || []).map(function (c, i) {
      return '<li class="chan" data-reveal="ticket" style="--d:' + (i % 3) * 0.07 + 's"><span class="chan__num">' + pad(i + 1) + "</span><h3>" + t(c.name) + "</h3><p>" + t(c.body) + "</p></li>";
    }).join("");
    var gets = (G.deliverables || []).map(function (d) { return "<li>" + t(d) + "</li>"; }).join("");
    var bars = [38, 52, 47, 66, 74, 92];
    var report = '<figure class="report" data-reveal aria-label="Sample monthly report for ' + esc(LAB.brand) + ', a made-up café, with made-up numbers">' +
      '<div class="report__head"><b>' + esc(LAB.brand) + ' · Monthly report</b><span class="report__tag">Sample · made-up numbers</span></div>' +
      '<div class="report__kpis"><p><small>Ad spend</small>$600</p><p><small>Bookings from ads</small>148</p><p><small>Cost per booking</small>$4.05</p></div>' +
      '<div class="report__bars" aria-hidden="true">' + bars.map(function (h, i) { return '<i style="--h:' + h + "%;--i:" + i + '"></i>'; }).join("") + "</div>" +
      '<div class="report__rows"><p><span>Best ad</span>“Sunday brunch” video, Instagram</p><p><span>Next month</span>Move budget to video, test 3 new offers</p></div>' +
      "<figcaption>What a monthly report looks like. Yours shows your real numbers.</figcaption></figure>";
    var faq = (G.faq || []).length
      ? '<section class="section wrap" aria-labelledby="gfaq-title" style="padding-top:0"><div class="section-head"><h2 class="h2" id="gfaq-title" data-reveal>Ads, <span class="serif">answered.</span></h2>' +
        "<p data-reveal>What people usually ask before we run their ads.</p></div>" +
        '<div class="faq">' + G.faq.map(function (f) {
          return '<details class="faq__item" data-reveal><summary>' + t(f.q) + '<span class="faq__icon" aria-hidden="true"></span></summary><p>' + t(f.a) + "</p></details>";
        }).join("") + "</div></section>"
      : "";
    var quick = '<div class="page-head__btns"><a class="btn btn--dark" href="' + quoteHref(need) + '">Get an ads quote ' + ICON.arrow + "</a>" +
      '<a class="btn btn--line" href="#loop-title">See how it works</a></div>';
    return pageHead("Brand scaling &amp; ads", "Scale your <span class=\"serif\">brand.</span>",
      "We plan, make and run ads on Facebook, Instagram, Google and TikTok, then test every week and put more behind what works. Your brand, content and landing pages, built to back them up.", quick) +
      '<section class="growth-band growth-band--page" aria-labelledby="chan-title"><div class="wrap">' +
      '<div class="growth-band__head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">Where we run your ads</p>' +
      '<h2 class="h2" id="chan-title" data-reveal>Wherever your<br>customers <span class="serif">scroll.</span></h2></div>' +
      '<div class="growth-band__chart" data-reveal>' + growthChart() + "</div></div>" +
      '<ul class="chans">' + chans + "</ul></div></section>" +
      '<section class="section wrap" aria-labelledby="loop-title"><div class="section-head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">The scaling loop</p>' +
      '<h2 class="h2" id="loop-title" data-reveal>Test. Learn.<br><span class="serif">Scale.</span></h2></div>' +
      "<p data-reveal>Scaling isn’t one big launch. It’s a loop we run with you every week, with AI helping us make and test more ideas, faster.</p></div>" +
      loopSteps("loop") + "</section>" +
      '<section class="section wrap" aria-labelledby="gets-title" style="padding-top:0"><div class="gets">' +
      '<div><h2 class="h2" id="gets-title" data-reveal>What you <span class="serif">get.</span></h2>' +
      '<ul class="gets__list" data-reveal>' + gets + "</ul>" +
      '<p class="gets__note" data-reveal>Brand scaling is quoted per project after a free call. The ad budget itself is paid straight to Meta, Google or TikTok, so you see every peso and dollar.</p>' +
      '<div class="ai__btns" data-reveal><a class="btn btn--dark" href="' + quoteHref(need) + '">Plan your ads ' + ICON.arrow + "</a>" +
      (C.phoneDisplay ? '<a class="btn btn--line" href="' + telHref() + '">Call ' + esc(C.phoneDisplay) + "</a>" : "") + "</div></div>" +
      report + "</div></section>" + faq + cta();
  }

  function about() {
    setMeta("About", SITE.shortBio);
    var A = SITE.about || {};
    var photo = SITE.photo
      ? '<div class="about-photo" data-reveal><img src="' + esc(SITE.photo) + '" alt="Portrait of ' + esc(SITE.owner) + '" loading="eager"></div>'
      : '<div class="about-photo ph-box" data-reveal title="Placeholder: set photo in content/site.js">Profile photo<br>placeholder</div>';
    var bio = (SITE.fullBio || []).map(function (para) { return "<p data-reveal>" + t(para) + "</p>"; }).join("");
    var list = function (arr) { return '<ul class="tags">' + (arr || []).map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul>"; };
    var clients = (A.clients || []).length
      ? '<section class="section--tight"><h2 class="eyebrow" style="margin-bottom:16px">Clients & brands</h2>' + list(A.clients.map(function (c) { return c.name || c; })) + "</section>"
      : "";
    var quotes = (A.testimonials || []).length
      ? '<section class="section--tight"><h2 class="eyebrow" style="margin-bottom:16px">Kind words</h2><div class="quotes">' +
        A.testimonials.map(function (q) {
          return '<blockquote class="quote" data-reveal><p>“' + t(q.quote) + '”</p><cite>' + t(q.name) + (q.title ? ", " + t(q.title) : "") + "</cite></blockquote>";
        }).join("") + "</div></section>"
      : "";
    return pageHead("About", "Hi, I’m " + esc((SITE.owner || "").split(" ")[0]) + ".", t(SITE.role) + " · " + t(SITE.location)) +
      '<section class="wrap" style="padding-bottom:clamp(64px,10vw,140px)"><div class="about-grid">' + photo +
      '<div><div class="about-bio">' + bio + "</div>" +
      '<div class="kv" style="margin-top:48px"><div data-reveal><h2 class="eyebrow">Skills</h2>' + list(A.skills) + "</div>" +
      '<div data-reveal><h2 class="eyebrow">Tools</h2>' + list(A.tools) + "</div></div>" +
      clients + quotes +
      '<div style="margin-top:40px;display:flex;gap:10px;flex-wrap:wrap" data-reveal><a class="btn btn--dark" href="resume.html">View resume ' + ICON.arrow + '</a><a class="btn btn--line" href="contact.html">Get in touch</a></div>' +
      "</div></div></section>" + cta();
  }

  function resume() {
    setMeta("Resume", "Experience, education and skills of " + SITE.owner + ".");
    var tl = function (items) {
      return '<div class="timeline">' + (items || []).map(function (e) {
        return '<div class="tl" data-reveal><p class="tl__period">' + t(e.period) + "</p><div>" +
          '<h3 class="tl__title">' + t(e.title) + '</h3><p class="tl__org">' + t(e.org) + "</p>" +
          (e.points && e.points.length ? "<ul>" + e.points.map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul>" : "") +
          "</div></div>";
      }).join("") + "</div>";
    };
    var dl = RESUME.pdf ? '<a class="btn btn--dark" href="' + esc(RESUME.pdf) + '" download>Download resume (PDF) ' + ICON.download + "</a>" : "";
    return pageHead(esc(SITE.owner), "Resume", t(RESUME.summary), dl) +
      '<section class="wrap" style="padding-bottom:clamp(64px,10vw,140px)">' +
      '<div class="resume-block" style="margin-top:0"><h2 class="eyebrow">Experience</h2>' + tl(RESUME.experience) + "</div>" +
      '<div class="resume-block"><h2 class="eyebrow">Education</h2>' + tl(RESUME.education) + "</div>" +
      '<div class="resume-block"><h2 class="eyebrow">Skills</h2><ul class="tags">' + (RESUME.skills || []).map(function (x) { return "<li>" + t(x) + "</li>"; }).join("") + "</ul></div>" +
      (dl ? '<div class="resume-block" data-reveal>' + dl + "</div>" : "") +
      "</section>" + cta();
  }

  function contact() {
    setMeta("Contact", "Plan your project in two minutes and send it to " + SITE.studioName + " by email or text. We reply " + (C.replyTime || "quickly") + ". Websites start at " + (PRICING.startingAt || "$80") + ".");
    var params = new URLSearchParams(location.search);
    var styleId = params.get("style") || "";
    var needs = params.getAll("need");
    var message = [];
    (PRICING.plans || []).forEach(function (pl) {
      if (pl.name !== params.get("plan")) return;
      message.push("I’m interested in the " + pl.name + " plan" + (pl.price ? " (" + pl.price + ")" : "") + ".");
      if (pl.need && needs.indexOf(pl.need) < 0) needs.push(pl.need);
    });
    PROJECTS.forEach(function (p) { if (p.title === params.get("like")) message.push("I’d like something like " + p.title + "."); });
    var req = C.formEndpoint ? " required" : "";

    var links = [];
    if (C.phoneDisplay) links.push('<a class="cta__link" href="' + telHref() + '"><span><small>Call or text</small>' + esc(C.phoneDisplay) + "</span>" + ICON.arrow + "</a>");
    if (C.email) links.push('<a class="cta__link" href="mailto:' + esc(C.email) + '"><span><small>Email</small>' + esc(C.email) + "</span>" + ICON.arrow + "</a>");
    chatApps().forEach(function (m) { links.push(outLink(m, "cta__link", "<span><small>Chat</small>" + esc(m.label) + "</span>" + ICON.arrow)); });
    listed(SITE.marketplaces).forEach(function (m) { links.push(outLink(m, "cta__link", "<span><small>Hire us on</small>" + esc(m.label) + "</span>" + ICON.arrow)); });
    listed(SITE.socials).forEach(function (s) {
      links.push(outLink(s, "cta__link", "<span><small>" + esc(s.label) + "</small>" + esc(s.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")) + "</span>" + ICON.arrow));
    });

    var pick = function (type, name, value, checked, swatch) {
      return '<label class="pick"><input type="' + type + '" name="' + name + '" value="' + esc(value) + '"' + (checked ? " checked" : "") + ">" +
        "<span>" + (swatch ? '<i aria-hidden="true" style="--c1:' + swatch[0] + ";--c2:" + swatch[1] + '"></i>' : "") + esc(value) + "</span></label>";
    };
    var step = function (n, title, hint, body) {
      return '<fieldset class="plan-step"><legend><span class="plan-step__num">' + pad(n) + "</span>" + title + "</legend>" +
        (hint ? '<p class="plan-step__hint">' + hint + "</p>" : "") + body + "</fieldset>";
    };
    var picks = function (html) { return '<div class="picks">' + html + "</div>"; };
    var field = function (id, label, attrs, value) {
      return '<div class="field"><label for="' + id + '">' + label + '</label><input id="' + id + '" ' + attrs + (value ? ' value="' + esc(value) + '"' : "") + "></div>";
    };
    var steps =
      step(1, "What do you need?", "Pick as many as you like.", picks(SERVICES.map(function (s) { return pick("checkbox", "need", s.name, needs.indexOf(s.name) > -1); }).join(""))) +
      step(2, "Pick a style", 'Not sure? <a href="index.html#styles-title">Try them on in the Style Lab</a>.',
        picks(STYLES.map(function (s) { return pick("radio", "style", s.label, s.id === styleId, s.sw); }).join("") + pick("radio", "style", "Not sure yet", false))) +
      step(3, "Budget", PRICING.startingAt ? "Websites start at " + esc(PRICING.startingAt) + "." : "", picks((PRICING.budgets || []).map(function (b) { return pick("radio", "budget", b, false); }).join(""))) +
      step(4, "Timeline", "", picks((PRICING.timelines || []).map(function (x) { return pick("radio", "timeline", x, false); }).join(""))) +
      step(5, "About you", "", '<div class="plan-fields">' +
        field("p-name", "Your name", 'name="name" autocomplete="name"' + req) +
        field("p-business", "Business name", 'name="business" autocomplete="organization"', (params.get("name") || "").slice(0, 60)) +
        field("p-contact", "Email or phone", 'name="contact" autocomplete="email"' + req) +
        '<div class="field plan-fields__wide"><label for="p-msg">Anything else?</label><textarea id="p-msg" data-lenis-prevent name="message" maxlength="1500" ' +
        'placeholder="What your business does, sites you like, deadlines…">' + esc(message.join(" ")) + "</textarea></div></div>");

    var send = [];
    if (C.formEndpoint) send.push('<button class="btn btn--light" type="submit">Send now ' + ICON.arrow + "</button>");
    if (C.email) send.push('<a class="btn ' + (C.formEndpoint ? "btn--ghost-light" : "btn--light") + '" data-send="email" href="mailto:' + esc(C.email) + '">Email it ' + ICON.arrow + "</a>");
    if (C.phoneLink) send.push('<a class="btn btn--ghost-light" data-send="sms" href="sms:' + esc(C.phoneLink) + '">Text it ' + ICON.arrow + "</a>");
    send.push('<button class="btn btn--ghost-light" type="button" data-send="copy">Copy brief</button>');
    var brief = '<aside class="brief" aria-labelledby="brief-title"><div class="brief__head"><h3 class="h3" id="brief-title">Your brief</h3><span class="eyebrow">Updates as you go</span></div>' +
      '<div class="brief__text" tabindex="0" role="region" aria-label="Your project brief" data-lenis-prevent></div>' +
      '<div class="brief__send">' + send.join("") + "</div>" +
      '<p class="brief__status" role="status" aria-live="polite"></p>' +
      '<ol class="brief__next"><li>Send your brief, any way you like.</li><li>We reply ' + esc(C.replyTime || "quickly") + ' with questions, or set up a free first call.</li><li>You get a clear quote before any work starts.</li></ol></aside>';

    var quick = '<div class="page-head__btns"><a class="btn btn--dark" href="#planner">Start the planner ' + ICON.arrow + "</a>" +
      (C.phoneDisplay ? '<a class="btn btn--line" href="' + telHref() + '">Call ' + esc(C.phoneDisplay) + "</a>" : "") + "</div>";

    return pageHead("Contact", "Let’s talk.", "Tell us about your business and what you need, whatever it is. Plan it below in two minutes, or just call, text or email." + (C.replyTime ? " We reply " + esc(C.replyTime) + "." : ""), quick) +
      '<section class="wrap planner-wrap" id="planner" aria-labelledby="planner-title">' +
      '<div class="section-head"><div><p class="eyebrow" data-reveal style="margin-bottom:16px">Project planner · about 2 minutes</p>' +
      '<h2 class="h2" id="planner-title" data-reveal>Plan your<br><span class="serif">project.</span></h2></div>' +
      "<p data-reveal>Tap what you need and the look you like. We turn it into a brief you can email, text or copy into any chat, and you get a clear quote back." +
      (PRICING.startingAt ? " Websites start at " + esc(PRICING.startingAt) + "." : "") + "</p></div>" +
      '<form class="planner" data-planner novalidate' + (C.formEndpoint ? ' action="' + esc(C.formEndpoint) + '" method="POST"' : "") + ">" +
      '<div class="planner__steps">' + steps + "</div>" + brief + "</form></section>" +
      '<section class="wrap section" aria-labelledby="direct-title" style="padding-top:0"><div class="contact-grid">' +
      '<div data-reveal><h2 class="h2" id="direct-title">Rather<br>just <span class="serif">talk?</span></h2>' +
      '<p class="muted" style="margin-top:20px;max-width:420px">Call, text or email us, whatever is easiest for you.</p>' +
      (C.availability ? '<p class="contact-note">' + t(C.availability) + "</p>" : "") + "</div>" +
      '<div class="cta__links" data-reveal>' + links.join("") + "</div></div></section>";
  }

  function notFound() {
    setMeta("Page not found");
    return '<section class="wrap notfound"><p class="eyebrow">404</p><h1 class="display page-head__title">Lost?</h1>' +
      '<p>This page doesn’t exist. Let’s get you back.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><a class="btn btn--dark" href="index.html">Home</a><a class="btn btn--line" href="work.html">See work</a></div></section>';
  }

  /* ---------- behaviour ---------- */
  function initMenu() {
    var btn = document.querySelector(".menu-btn");
    var menu = document.getElementById("menu");
    if (!btn || !menu) return;
    function set(open) {
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "Close" : "Menu";
      if (open) { var first = menu.querySelector("a"); if (first) first.focus(); } else { btn.focus(); }
    }
    btn.addEventListener("click", function () { set(!menu.classList.contains("is-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("is-open")) set(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960 && menu.classList.contains("is-open")) set(false); });
  }

  function initReveal() {
    var els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
      // The huge top margin counts anything already scrolled past as seen, so a fast
      // scroll or an anchor jump never leaves content invisible above the viewport.
    }, { rootMargin: "100000px 0px -8% 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initCounters() {
    var els = document.querySelectorAll("[data-count]");
    if (!els.length || reduceMotion || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = +el.getAttribute("data-count"), start = performance.now(), dur = 1200;
        el.textContent = "0";
        (function tick(now) {
          var k = Math.min(1, (now - start) / dur);
          el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        })(start);
      });
    }, { rootMargin: "100000px 0px -10% 0px", threshold: 0 });
    els.forEach(function (el) { io.observe(el); });
  }

  function initLab() {
    var root = document.querySelector(".lab");
    if (!root) return;
    var mock = root.querySelector(".mock");
    var chips = root.querySelectorAll(".chip");
    var row = root.querySelector(".lab__chips");
    var nameEl = root.querySelector(".lab__name");
    var note = root.querySelector(".lab__note");
    var fontEl = root.querySelector(".lab__font span");
    var count = root.querySelector(".lab__count b");
    var kicker = mock.querySelector(".mock__kicker");
    var sticker = mock.querySelector(".mock__sticker");
    var logo = mock.querySelector(".mock__logo");
    var cta = root.querySelector(".lab__cta");
    var input = root.querySelector("#lab-name");
    var status = root.querySelector("#lab-status");
    var play = root.querySelector(".lab__play");
    var bar = root.querySelector(".lab__progress i");
    var current = 0, auto = false, fontsLink = null;

    function faces(s) {
      return (s.g || []).map(function (g) {
        var w = (g.match(/@(\d+)/) || [])[1] || "400";
        return w + ' 1em "' + g.split(":")[0].replace(/\+/g, " ") + '"';
      });
    }
    function warm(s) {
      if (!fontsLink || !document.fonts || !document.fonts.load) return;
      faces(s).forEach(function (f) { document.fonts.load(f).catch(function () {}); });
    }
    // All lab fonts in one small request, cut down to the characters the lab uses.
    function loadFonts() {
      if (fontsLink) return;
      var fams = [];
      STYLES.forEach(function (s) { (s.g || []).forEach(function (g) { if (fams.indexOf(g) < 0) fams.push(g); }); });
      fontsLink = document.createElement("link");
      fontsLink.rel = "stylesheet";
      fontsLink.href = "https://fonts.googleapis.com/css2?family=" + fams.join("&family=") + "&display=swap&text=" + encodeURIComponent(LAB.chars);
      fontsLink.onload = function () { warm(STYLES[current]); warm(STYLES[(current + 1) % STYLES.length]); };
      document.head.appendChild(fontsLink);
    }
    function brand() { return input.value.replace(/\s+/g, " ").trim(); }
    function sync() {
      var s = STYLES[current], name = brand();
      mock.setAttribute("aria-label", labLabel(name, s));
      cta.href = "contact.html?style=" + s.id + (name ? "&name=" + encodeURIComponent(name) : "") + "#planner";
    }
    function restartBar() {
      if (!auto) return;
      bar.style.animation = "none";
      void bar.offsetWidth;
      bar.style.animation = "";
    }
    function apply(i, announce) {
      current = (i + STYLES.length) % STYLES.length;
      var s = STYLES[current];
      root.setAttribute("data-lab", s.id);
      chips.forEach(function (c, j) { c.setAttribute("aria-pressed", String(j === current)); });
      nameEl.textContent = s.label;
      note.textContent = s.note;
      fontEl.textContent = s.font;
      count.textContent = pad(current + 1);
      kicker.textContent = s.kicker;
      sticker.textContent = s.sticker;
      sync();
      if (!reduceMotion) {
        mock.classList.remove("is-switch");
        nameEl.classList.remove("is-switch");
        void mock.offsetWidth;
        mock.classList.add("is-switch");
        nameEl.classList.add("is-switch");
      }
      // Keep the active chip in view inside its own row, without ever scrolling the page.
      var chip = chips[current];
      if (row.scrollWidth > row.clientWidth + 1) {
        row.scrollTo({ left: Math.max(0, chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2), behavior: reduceMotion ? "auto" : "smooth" });
      }
      if (announce) status.textContent = s.label + " style. " + s.note;
      warm(s);
      warm(STYLES[(current + 1) % STYLES.length]);
      restartBar();
    }
    function setAuto(on) {
      auto = on && !reduceMotion;
      root.classList.toggle("is-auto", auto);
      play.textContent = auto ? "Pause" : "Play";
      play.setAttribute("aria-label", (auto ? "Pause" : "Play") + " the style slideshow");
      restartBar();
    }

    chips.forEach(function (c, i) {
      c.addEventListener("click", function () { loadFonts(); setAuto(false); apply(i, true); });
    });
    root.querySelector(".lab__shuffle").addEventListener("click", function () {
      loadFonts();
      setAuto(false);
      var n = current;
      while (n === current) n = Math.floor(Math.random() * STYLES.length);
      apply(n, true);
    });
    play.addEventListener("click", function () {
      setAuto(!auto);
      if (auto) apply(current + 1, false);
    });
    input.addEventListener("input", function () {
      logo.textContent = brand() || LAB.brand;
      sync();
    });
    // Hold the slideshow while someone types their name, so the style doesn't change mid-word.
    input.addEventListener("focus", function () { root.classList.add("is-typing"); });
    input.addEventListener("blur", function () { root.classList.remove("is-typing"); });
    row.addEventListener("pointerdown", function () { if (auto) setAuto(false); });
    bar.addEventListener("animationend", function (e) {
      if (e.animationName === "labProg" && auto) apply(current + 1, false);
    });
    mock.addEventListener("pointerenter", function () { root.classList.add("is-hover"); });
    mock.addEventListener("pointerleave", function () { root.classList.remove("is-hover"); });

    // The slideshow only runs while the lab is on screen, until someone takes over.
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting) loadFonts(); }, { rootMargin: "900px 0px" }).observe(root);
      new IntersectionObserver(function (en) { root.classList.toggle("is-live", en[0].isIntersecting); }, { threshold: 0.35 }).observe(mock);
    } else {
      loadFonts();
      root.classList.add("is-live");
    }
    play.hidden = reduceMotion;
    setAuto(true);
  }

  function initRotator() {
    var words = document.querySelectorAll(".rot__w");
    var hero = document.querySelector(".hero");
    if (words.length < 2 || !hero || reduceMotion) return;
    var i = 0, ticks = 0, timer = null;
    // Three rounds, then it rests on the first word.
    var limit = words.length * 3;
    function tick() {
      var out = words[i];
      i = (i + 1) % words.length;
      out.classList.remove("is-on");
      out.classList.add("is-out");
      words[i].classList.remove("is-out");
      words[i].classList.add("is-on");
      setTimeout(function () { out.classList.remove("is-out"); }, 700);
      if (++ticks >= limit) stop();
    }
    function start() { if (!timer && ticks < limit) timer = setInterval(tick, 2300); }
    function stop() { clearInterval(timer); timer = null; }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { if (en[0].isIntersecting) start(); else stop(); }).observe(hero);
    } else {
      start();
    }
  }

  function initFilters() {
    var buttons = document.querySelectorAll(".filter");
    if (!buttons.length) return;
    var cards = document.querySelectorAll(".work-grid .card");
    var status = document.getElementById("filter-status");
    function apply(cat) {
      var shown = 0;
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === cat)); });
      cards.forEach(function (c) {
        var on = cat === "All" || c.getAttribute("data-cat") === cat;
        c.hidden = !on;
        if (on) { shown++; c.classList.add("is-in"); }
      });
      if (status) status.textContent = shown + (shown === 1 ? " project" : " projects") + " shown";
      var url = new URL(location.href);
      if (cat === "All") url.searchParams.delete("category"); else url.searchParams.set("category", cat);
      history.replaceState(null, "", url);
    }
    buttons.forEach(function (b) { b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); }); });
    var pressed = document.querySelector('.filter[aria-pressed="true"]');
    apply(pressed ? pressed.getAttribute("data-filter") : "All");
  }

  // The project planner: builds a brief from the picks and sends it by email or text, copies it
  // for any chat (WhatsApp, Fiverr, Upwork…), or posts it to Formspree when contact.formEndpoint is set.
  function initPlanner() {
    var form = document.querySelector("[data-planner]");
    if (!form) return;
    var out = form.querySelector(".brief__text");
    var status = form.querySelector(".brief__status");
    var email = form.querySelector('[data-send="email"]');
    var sms = form.querySelector('[data-send="sms"]');
    var copyBtn = form.querySelector('[data-send="copy"]');
    function val(n) { var el = form.elements[n]; return el ? String(el.value || "").trim() : ""; }
    function picked(n) {
      return [].slice.call(form.querySelectorAll('input[name="' + n + '"]:checked')).map(function (i) { return i.value; });
    }
    function brief() {
      var name = val("name"), biz = val("business");
      var hi = "Hi " + SITE.studioName + "!" + (name && biz ? " I’m " + name + " from " + biz + "." : name ? " I’m " + name + "." : biz ? " I’m reaching out from " + biz + "." : "");
      var details = [];
      var need = picked("need"), style = picked("style")[0], budget = picked("budget")[0], time = picked("timeline")[0];
      if (need.length) details.push("What I need: " + need.join(", "));
      if (style) details.push("Style: " + style);
      if (budget) details.push("Budget: " + budget);
      if (time) details.push("Timeline: " + time);
      if (val("contact")) details.push("Reach me at: " + val("contact"));
      var msg = val("message");
      if (!details.length && !msg) return hi + " I’d like to talk about a project.";
      return hi + (details.length ? "\n\n" + details.join("\n") : "") + (msg ? "\n\n" + msg : "");
    }
    function update() {
      var text = brief();
      out.textContent = text;
      var who = val("business") || val("name");
      if (email) email.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("New project" + (who ? ": " + who : "")) + "&body=" + encodeURIComponent(text.replace(/\n/g, "\r\n"));
      if (sms) sms.href = "sms:" + C.phoneLink + "?&body=" + encodeURIComponent(text);
    }
    function copy(text) {
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        return ok;
      }
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).then(function () { return true; }, fallback);
      return Promise.resolve(fallback());
    }
    // A rubber stamp that thumps onto the brief when it's sent or copied.
    var panel = form.querySelector(".brief");
    function stamp(text) {
      if (reduceMotion || !panel) return;
      var old = panel.querySelector(".stamp");
      if (old) panel.removeChild(old);
      var el = document.createElement("span");
      el.className = "stamp";
      el.setAttribute("aria-hidden", "true");
      el.textContent = text;
      panel.appendChild(el);
      el.addEventListener("animationend", function () { if (el.parentNode) el.parentNode.removeChild(el); });
    }
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    if (email) email.addEventListener("click", function () { status.className = "brief__status"; status.textContent = "Your email app should open with the brief ready to send."; stamp("Ready!"); });
    if (sms) sms.addEventListener("click", function () { status.className = "brief__status"; status.textContent = "Your messages app should open with the brief ready to send."; stamp("Ready!"); });
    // Copies the brief so it can be pasted into any chat or message.
    if (copyBtn) copyBtn.addEventListener("click", function () {
      copy(brief()).then(function (ok) {
        status.className = "brief__status";
        status.textContent = ok ? "Brief copied. Paste it into any chat or message to send it to us." : "Select the brief above and copy it, then paste it into any chat or message.";
        if (ok) stamp("Copied!");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!C.formEndpoint) return;
      if (!form.checkValidity()) {
        status.className = "brief__status is-error";
        status.textContent = "Please add your name and an email or phone number.";
        var bad = form.querySelector(":invalid");
        if (bad) bad.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.className = "brief__status";
      status.textContent = "Sending…";
      var data = new FormData(form);
      data.append("brief", brief());
      data.append("_subject", "New project from the website");
      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          status.textContent = "Thanks! Your brief was sent. We’ll get back to you soon.";
        })
        .catch(function () {
          status.className = "brief__status is-error";
          status.textContent = "Something went wrong. Please email or text us instead.";
        })
        .then(function () { btn.disabled = false; });
    });
  }

  // Card preview clips: load and play only while on screen, never with reduced motion or Save-Data.
  function initVideos() {
    var clips = document.querySelectorAll(".card__video");
    var saveData = navigator.connection && navigator.connection.saveData;
    if (clips.length && !reduceMotion && !saveData && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target;
          if (en.isIntersecting) {
            if (!v.src) {
              v.src = v.getAttribute("data-src");
              v.addEventListener("playing", function () { v.classList.add("is-playing"); });
            }
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else if (v.src) {
            v.pause();
          }
        });
      }, { threshold: 0.35 });
      clips.forEach(function (v) { io.observe(v); });
    }
    // Only one project video plays at a time.
    document.addEventListener("play", function (e) {
      if (!e.target.controls) return;
      document.querySelectorAll("video[controls]").forEach(function (v) { if (v !== e.target) v.pause(); });
    }, true);
  }

  // Phone-sized "Get a quote / Call" bar, shown once the top of the page has scrolled away.
  function quickBar() {
    if (page === "contact") return "";
    return '<div class="quickbar" role="region" aria-label="Quick contact"><a class="btn btn--dark" href="contact.html#planner">Get a quote' +
      (PRICING.startingAt ? "<small>from " + esc(PRICING.startingAt) + "</small>" : "") + "</a>" +
      (C.phoneDisplay ? '<a class="btn btn--line" href="' + telHref() + '">Call</a>' : "") + "</div>";
  }
  function initQuickBar() {
    var bar = document.querySelector(".quickbar");
    var top = document.querySelector("#main .hero, #main .page-head, #main .project-head, #main .notfound");
    if (!bar || !top || !("IntersectionObserver" in window)) return;
    document.body.classList.add("has-quickbar");
    var past = false, ends = 0;
    function set() { bar.classList.toggle("is-on", past && !ends); }
    new IntersectionObserver(function (en) {
      past = !en[0].isIntersecting && en[0].boundingClientRect.top < 0;
      set();
    }).observe(top);
    var tails = document.querySelectorAll("#main .cta, .site-footer");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.__in = en.isIntersecting; });
      ends = [].filter.call(tails, function (el) { return el.__in; }).length;
      set();
    });
    tails.forEach(function (el) { io.observe(el); });
  }

  // A "View" bubble that follows the mouse over project cards (mouse and trackpad only).
  function initCursor() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || !document.querySelector(".card")) return;
    var dot = document.createElement("div");
    dot.className = "cursor";
    dot.setAttribute("aria-hidden", "true");
    dot.textContent = "View";
    document.body.appendChild(dot);
    var on = false;
    document.addEventListener("pointermove", function (e) {
      dot.style.transform = "translate(" + e.clientX + "px," + e.clientY + "px)";
      var over = !!(e.target.closest && e.target.closest(".card"));
      if (over !== on) { on = over; dot.classList.toggle("is-on", on); }
    }, { passive: true });
    document.addEventListener("pointerleave", function () { on = false; dot.classList.remove("is-on"); });
  }

  // Structured data, so search engines understand the studio and the FAQ.
  function jsonLd() {
    function add(obj) {
      var s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(obj).replace(/</g, "\\u003c");
      document.head.appendChild(s);
    }
    if (page === "home") {
      var site = ((SITE.seo && SITE.seo.siteUrl) || "").replace(/\/$/, "");
      add({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE.studioName,
        description: SITE.seo && SITE.seo.description,
        founder: { "@type": "Person", name: SITE.owner },
        telephone: C.phoneLink || undefined,
        email: C.email || undefined,
        priceRange: PRICING.startingAt ? PRICING.startingAt + "+" : undefined,
        areaServed: "Worldwide",
        url: site || undefined,
        image: site ? site + "/og-image.png" : undefined,
        sameAs: listed(SITE.marketplaces).concat(listed(SITE.socials)).map(function (s) { return s.url; }),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: SERVICES.filter(function (s) { return !isPh(s.name); }).map(function (s) {
            return { "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.description } };
          }),
        },
      });
    }
    if (page === "scaling" && window.GROWTH && (GROWTH.faq || []).length) {
      add({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: GROWTH.faq.map(function (f) { return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }; }),
      });
    }
    if (page === "services" && FAQ.length) {
      add({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ.map(function (f) { return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }; }),
      });
    }
  }

  // Pages are drawn by this script, so jump to #planner (or any #id) once it exists.
  // Where an element will sit once its reveal finishes. offsetTop ignores the reveal's
  // transforms, so anchors don't land a few pixels under the sticky header.
  function restingTop(el) {
    var y = 0;
    for (var n = el; n; n = n.offsetParent) y += n.offsetTop;
    var gap = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    return Math.max(0, y - gap);
  }

  function scrollToHash() {
    var id = location.hash.slice(1);
    var el = id && document.getElementById(decodeURIComponent(id));
    if (!el) return;
    var html = document.documentElement;
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, restingTop(el));
    html.style.scrollBehavior = "";
  }

  // In-page links glide to their target and stop just below the sticky header.
  var lenis = null;
  function initAnchors() {
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a || a.classList.contains("skip-link") || a.target) return;
      if (a.origin !== location.origin || a.pathname !== location.pathname || a.search !== location.search) return;
      var id = decodeURIComponent(a.hash.slice(1));
      if (!id) return;
      var el = id === "top" ? null : document.getElementById(id);
      if (id !== "top" && !el) return;
      e.preventDefault();
      var y = el ? restingTop(el) : 0;
      if (lenis) lenis.scrollTo(y);
      else window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
      if (el) {
        if (!el.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) el.setAttribute("tabindex", "-1");
        el.focus({ preventScroll: true });
      }
      if (history.replaceState) history.replaceState(null, "", a.hash);
    });
  }

  // Splitting a word into one span per letter drops the font's kerning, so
  // letters like "Ki" crowd each other. Measure each pair and add it back.
  function kernLetters() {
    var c = document.createElement("canvas").getContext("2d");
    if (!c) return;
    document.querySelectorAll(".ltr").forEach(function (el) {
      var next = el.nextSibling;
      if (!next || next.nodeType !== 1 || !next.classList.contains("ltr")) return;
      var a = getComputedStyle(el), b = getComputedStyle(next);
      var font = a.fontStyle + " " + a.fontWeight + " 100px " + a.fontFamily;
      if (font !== b.fontStyle + " " + b.fontWeight + " 100px " + b.fontFamily) return;
      c.font = font;
      var x = el.textContent, y = next.textContent;
      var k = c.measureText(x + y).width - c.measureText(x).width - c.measureText(y).width;
      el.style.marginRight = Math.abs(k) > 0.05 ? (k / 100).toFixed(4) + "em" : "";
    });
  }

  // Size the giant footer wordmark so it spans the full width, whatever the studio name.
  function fitFooter() {
    var p = document.querySelector(".footer__big");
    if (!p) return;
    var span = p.firstChild;
    function fit() {
      p.style.fontSize = "";
      var w = span.getBoundingClientRect().width;
      if (w) p.style.fontSize = (parseFloat(getComputedStyle(p).fontSize) * p.clientWidth / w) * 0.995 + "px";
    }
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    var raf;
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(fit); });
  }

  // A short curtain with the wordmark the first time someone lands on the home page in a
  // visit. The hero's letters drop in as it lifts. Skipped with reduced motion.
  function initIntro() {
    var title = document.querySelector(".hero__title");
    function go() { if (title) title.classList.add("is-go"); }
    var seen = true;
    try { seen = !!sessionStorage.getItem("ks-intro"); sessionStorage.setItem("ks-intro", "1"); } catch (e) {}
    if (page !== "home" || reduceMotion || seen) return go();
    var el = document.createElement("div");
    el.className = "intro";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<p class="intro__mark display">' + letters(SITE.studioName || "") + '</p><p class="intro__tag">' + esc(SITE.eyebrow || "") + "</p>";
    document.body.appendChild(el);
    document.documentElement.classList.add("has-intro");
    function done() { if (el.parentNode) el.parentNode.removeChild(el); }
    el.addEventListener("animationend", function (e) { if (e.animationName === "introLift") done(); });
    setTimeout(go, 1150);
    setTimeout(done, 2600);
  }

  // The example AI chat: messages arrive one by one while it's on screen, then it starts over.
  function initAiChat() {
    var log = document.querySelector(".ai-chat__log");
    if (!log || reduceMotion || !("IntersectionObserver" in window)) return;
    var msgs = [].slice.call(log.querySelectorAll(".msg:not(.msg--typing)"));
    var typing = log.querySelector(".msg--typing");
    log.classList.add("is-playing");
    // The first message is already there, so the window never starts empty.
    msgs[0].classList.add("is-on");
    var i = 1, timer = null, visible = false;
    function next() {
      timer = null;
      if (!visible) return;
      if (i >= msgs.length) {
        timer = setTimeout(function () { timer = null; msgs.forEach(function (m, k) { m.classList.toggle("is-on", k === 0); }); i = 1; tick(); }, 4200);
        return;
      }
      var m = msgs[i];
      var ai = m.classList.contains("msg--ai");
      // The customer "types" for a moment; the assistant shows its typing dots first.
      if (ai) { log.insertBefore(typing, m); typing.classList.add("is-on"); }
      timer = setTimeout(function () {
        timer = null;
        typing.classList.remove("is-on");
        m.classList.add("is-on");
        i++;
        tick();
      }, ai ? 1300 : 900);
    }
    function tick() { if (!timer) timer = setTimeout(next, 500); }
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) tick();
      else if (timer) { clearTimeout(timer); timer = null; }
    }, { threshold: 0.35 }).observe(log);
  }

  // The sideways work reel: swipe it, drag it with the mouse, or use the arrows.
  function initReel() {
    var track = document.querySelector(".reel__track");
    if (!track) return;
    var items = [].slice.call(track.children);
    var btns = document.querySelectorAll(".reel__btn");
    var count = document.querySelector(".reel__count b");
    var thumb = document.querySelector(".reel__bar i");
    if (!items.length) return;
    function step() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth; }
    function max() { return track.scrollWidth - track.clientWidth; }
    // A stop this close to the end counts as the end, so no click ever nudges a few pixels.
    var NEAR = 48;
    function at(i) { var x = Math.min(max(), items[i].offsetLeft - items[0].offsetLeft); return max() - x < NEAR ? max() : x; }
    function atEnd() { return track.scrollLeft >= max() - NEAR; }
    function current() { return atEnd() ? items.length - 1 : Math.round(track.scrollLeft / step()); }
    function go(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      track.scrollTo({ left: at(i), behavior: reduceMotion ? "auto" : "smooth" });
    }
    function update() {
      if (count) count.textContent = pad(current() + 1);
      if (btns[0]) btns[0].disabled = track.scrollLeft <= 2;
      if (btns[1]) btns[1].disabled = max() <= 2 || atEnd();
      if (thumb && track.scrollWidth) {
        thumb.style.width = (track.clientWidth / track.scrollWidth) * 100 + "%";
        thumb.style.transform = "translateX(" + (track.scrollLeft / track.clientWidth) * 100 + "%)";
      }
    }
    [].forEach.call(btns, function (b) {
      // Next: the first card that starts right of where we are. Prev: the last one left of it.
      b.addEventListener("click", function () {
        var left = track.scrollLeft, i;
        if (+b.getAttribute("data-dir") > 0) for (i = 0; i < items.length - 1 && at(i) <= left + 2; i++);
        else for (i = items.length - 1; i > 0 && at(i) >= left - NEAR; i--);
        go(i);
      });
    });
    var raf;
    track.addEventListener("scroll", function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener("resize", update);
    update();

    // Mouse drag. Snapping is paused while dragging, then the reel settles on the next card.
    var down = null, moved = false, settle;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = { x: e.clientX, left: track.scrollLeft };
      moved = false;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - down.x;
      if (!moved && Math.abs(dx) > 6) {
        moved = true;
        clearTimeout(settle);
        track.classList.add("is-drag");
      }
      if (moved) track.scrollLeft = down.left - dx;
    });
    window.addEventListener("pointerup", function (e) {
      if (!down) return;
      var dx = e.clientX - down.x;
      down = null;
      if (!moved) return;
      setTimeout(function () { moved = false; }, 0); // after the click this release fires, if any
      var pos = track.scrollLeft / step();
      go(dx < -40 ? Math.ceil(pos) : dx > 40 ? Math.floor(pos) : Math.round(pos));
      settle = setTimeout(function () { track.classList.remove("is-drag"); }, 700);
    });
    // A drag shouldn't also open the card it ended on.
    track.addEventListener("click", function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  // Smooth, weighty scrolling on desktops (Lenis). Phones and touch screens keep their
  // native scrolling, and sideways swipes pass through to the work reel and style chips.
  function initSmooth() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    var s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js";
    s.async = true;
    s.onload = function () {
      if (typeof window.Lenis !== "function") return;
      lenis = new window.Lenis({
        lerp: 0.12,
        virtualScroll: function (e) { return Math.abs(e.deltaX) <= Math.abs(e.deltaY); },
      });
      (function raf(time) { lenis.raf(time); requestAnimationFrame(raf); })(performance.now());
    };
    document.head.appendChild(s);
  }

  /* ---------- boot ---------- */
  var pages = { home: home, work: work, project: project, services: services, scaling: scaling, about: about, resume: resume, contact: contact, "404": notFound };
  document.getElementById("site-header").innerHTML = header();
  document.getElementById("main").innerHTML = (pages[page] || notFound)();
  document.getElementById("site-footer").innerHTML = footer();
  document.body.insertAdjacentHTML("beforeend", quickBar() + '<div class="progress" aria-hidden="true"></div>');
  jsonLd();

  initMenu();
  initIntro();
  initReveal();
  initCounters();
  initLab();
  initRotator();
  initFilters();
  initPlanner();
  initVideos();
  initReel();
  initAiChat();
  initQuickBar();
  initCursor();
  kernLetters();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(kernLetters);
  fitFooter();
  scrollToHash();
  initAnchors();
  initSmooth();
})();
