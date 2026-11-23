/*
  Renders every page from the files in /content.
  You shouldn't need to edit this file to change text, projects or services.
*/
(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var SERVICES = window.SERVICES || [];
  var GROUPS = window.SERVICE_GROUPS || [];
  var RESUME = window.RESUME || {};
  var FAQ = window.FAQ || [];
  var GROWTH = window.GROWTH || {};
  var PLANNER = window.PLANNER || {};
  var PROCESS = window.PROCESS || [];
  var CHAT = window.SITE_CHAT || [];
  var C = SITE.contact || {};
  var NAME = SITE.studioName || "Onsite";
  var page = document.body.getAttribute("data-page") || "home";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.documentElement.classList.add("js");

  // The Styles page: one made-up coffee shop, redesigned in every style. Each id matches a
  // .lab[data-lab] block in style.css. `g` lists Google Fonts families, loaded only when
  // the lab comes near the screen. `sw` is the two-colour swatch on its chip.
  var STYLES = [
    { id: "minimal", label: "Minimal", font: "Inter Tight", sw: ["#ffffff", "#111111"], kicker: "Coffee & pastries", sticker: "Open daily",
      note: "Quiet, airy and precise. Plenty of white space, one typeface and nothing extra." },
    { id: "editorial", label: "Editorial", font: "Instrument Serif", sw: ["#f3ede2", "#8c6f4e"], kicker: "Issue no. 01 · Coffee", sticker: "Since 2026",
      note: "Magazine-style serif headlines and warm paper tones, for brands with a story to tell." },
    { id: "bold", label: "Bold", font: "Archivo Black", g: ["Archivo+Black"], sw: ["#2547e8", "#ffd60a"], kicker: "Coffee. Pastries. Now.", sticker: "New!",
      note: "Big, loud and confident. Strong colour and heavy type that stops the scroll." },
    { id: "playful", label: "Playful", font: "Fredoka", g: ["Fredoka:wght@700"], sw: ["#ffe3ef", "#ff6b3d"], kicker: "Coffee & treats", sticker: "Yum!",
      note: "Rounded shapes, bright colours and a little attitude. Fun without being messy." },
    { id: "luxury", label: "Luxury", font: "Cormorant Garamond", g: ["Cormorant+Garamond:wght@500"], sw: ["#0e0d0b", "#c9a96e"], kicker: "Private roastery", sticker: "Est. 2026",
      note: "Dark, spacious and refined, with gold details and elegant capitals." },
    { id: "techwear", label: "Techwear", font: "Space Grotesk", g: ["Space+Grotesk:wght@700"], sw: ["#4f6679", "#eef3f7"], kicker: "Coffee_sys v2.6", sticker: "SYS/01",
      note: "Cool tones, monospace details and sharp cut corners. Technical and modern." },
    { id: "brutalist", label: "Brutalist", font: "Inter Tight & JetBrains Mono", sw: ["#ffe600", "#000000"], kicker: "Coffee. No nonsense.", sticker: "No decaf",
      note: "Raw borders, hard shadows and no apologies. Honest and hard to forget." },
    { id: "retro", label: "Retro", font: "Shrikhand", g: ["Shrikhand"], sw: ["#f6e3c3", "#d9541e"], kicker: "Far-out coffee", sticker: "Groovy",
      note: "Warm 70s colours, rainbow stripes and chunky type. Nostalgic and friendly." },
    { id: "y2k", label: "Y2K", font: "Unbounded", g: ["Unbounded:wght@800"], sw: ["#ffb3e6", "#7cf7ff"], kicker: "Coffee 2K", sticker: "So fresh",
      note: "Chrome, sparkles and bubblegum gradients, straight out of the year 2000." },
    { id: "neon", label: "Neon", font: "Orbitron", g: ["Orbitron:wght@800"], sw: ["#0d0221", "#ff2bd6"], kicker: "Open till 2 a.m.", sticker: "Open late",
      note: "Glowing type on deep night colours, for brands that come alive after dark." },
    { id: "swiss", label: "Swiss", font: "Inter Tight", sw: ["#ffffff", "#e30613"], kicker: "Coffee / Pastries / 2026", sticker: "No. 1",
      note: "A strict grid, big lowercase type and one bold red. Clean and timeless." },
    { id: "zen", label: "Zen", font: "Zen Old Mincho", g: ["Zen+Old+Mincho:wght@700"], sw: ["#f4f1ea", "#b5543c"], kicker: "Coffee · Quiet · Light", sticker: "Slow",
      note: "Calm, natural and unhurried. Soft tones, quiet type and room to breathe." },
    { id: "deco", label: "Art Deco", font: "Poiret One", g: ["Poiret+One"], sw: ["#10302e", "#d4af37"], kicker: "The coffee salon", sticker: "Grand opening",
      note: "Gold lines, sunbursts and elegant capitals. Old Hollywood glamour." },
    { id: "memphis", label: "Memphis", font: "Bungee", g: ["Bungee"], sw: ["#ff5d8f", "#00c2d1"], kicker: "Coffee & chaos", sticker: "Rad!",
      note: "Squiggles, confetti and clashing colours. Loud 80s fun, with a plan." },
    { id: "newspaper", label: "Newspaper", font: "Playfair Display & UnifrakturCook", g: ["Playfair+Display:wght@800", "UnifrakturCook:wght@700"], sw: ["#f4f0e6", "#111111"],
      kicker: "Morning edition · Est. 2026", sticker: "Extra!",
      note: "Mastheads, rules and black ink. Classic, trustworthy and full of character." },
    { id: "terminal", label: "Terminal", font: "VT323", g: ["VT323"], sw: ["#050a05", "#33ff66"], kicker: "$ brew --fresh", sticker: "> open_",
      note: "Green-screen pixels and a cursor, for brands with a little hacker in them." },
    { id: "zine", label: "Zine", font: "Permanent Marker", g: ["Permanent+Marker"], sw: ["#f2efe9", "#ff2e88"], kicker: "Issue #1 · Cut & paste", sticker: "DIY",
      note: "Cut-and-paste letters, tape and marker. Raw, handmade and impossible to ignore." },
    { id: "glass", label: "Glass", font: "Plus Jakarta Sans", g: ["Plus+Jakarta+Sans:wght@800"], sw: ["#7b5cff", "#ff7ac6"], kicker: "Coffee, refined", sticker: "2.0",
      note: "Frosted glass, soft light and glowing gradients. Sleek, modern and premium." },
    { id: "bauhaus", label: "Bauhaus", font: "Josefin Sans", g: ["Josefin+Sans:wght@700"], sw: ["#d62828", "#1d4e89"], kicker: "Form & coffee", sticker: "Form + function",
      note: "Circles, squares and primary colours. Geometric design that never gets old." },
    { id: "organic", label: "Organic", font: "Young Serif", g: ["Young+Serif"], sw: ["#c9d8b6", "#d9825b"], kicker: "Coffee, naturally", sticker: "Fresh daily",
      note: "Soft shapes, earthy greens and friendly serifs. Warm, natural and welcoming." },
  ];
  var LAB = {
    brand: "Mesa",
    title: "Good coffee, close to home.",
    sub: "Fresh roasts, warm pastries and a seat by the window.",
    items: ["Oat latte", "Croissant", "Cold brew"],
    // Only these characters are downloaded for the lab fonts, which keeps them tiny.
    chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ÁÉÍÑÓÚÜáéíñóúü .,:;!?&'’\"-–—/$#()@+·*~_>[]%|\\`",
  };

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function lc(s) { return String(s || "").trim().toLowerCase(); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function projectUrl(p) { return "/work/" + encodeURIComponent(p.slug); }
  function isPortrait(im) { return !!im && im.h > im.w; }
  function telHref() { return "tel:" + (C.phoneLink || C.phoneDisplay || "").replace(/[^+\d]/g, ""); }
  function domain(url) { return String(url).replace(/^https?:\/\//, "").replace(/\/$/, ""); }
  function sentences(text) { return String(text || "").match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || []; }
  var uid = 0;
  function nextId(prefix) { uid += 1; return (prefix || "h") + "-" + uid; }

  var ICON = {
    arrow: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.5 11.5l7-7M5.5 4.5h6v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    right: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    left: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };

  // Pictures are listed as assets/…; pages live at clean addresses like /work/oncon, so the path is made absolute.
  function abs(src) { return /^(\/|https?:)/.test(src || "") ? src : "/" + (src || ""); }
  function img(im, opts) {
    opts = opts || {};
    if (!im) return "";
    var attrs = [
      'src="' + esc(abs(im.small || im.src)) + '"',
      'alt="' + esc(opts.decorative ? "" : im.alt || "") + '"',
      im.w ? 'width="' + im.w + '"' : "",
      im.h ? 'height="' + im.h + '"' : "",
      'loading="' + (opts.eager ? "eager" : "lazy") + '"',
      'decoding="async"',
    ];
    if (im.small) {
      attrs.push('srcset="' + esc(abs(im.small)) + " 800w, " + esc(abs(im.src)) + " " + (im.w || 1600) + 'w"');
      attrs.push('sizes="' + (opts.sizes || "100vw") + '"');
    }
    if (opts.high) attrs.push('fetchpriority="high"');
    return "<img " + attrs.filter(Boolean).join(" ") + ">";
  }
  function browser(im, opts) {
    return '<div class="browser"><div class="browser__bar" aria-hidden="true"><i></i><i></i><i></i></div>' + img(im, opts) + "</div>";
  }
  function phone(im, opts) { return '<div class="phone">' + img(im, opts) + "</div>"; }

  // The hero letters. Each one rises into place (see .ltr in style.css).
  function splitWord(text) {
    return String(text).split("").map(function (c, i) { return '<span class="ltr" style="--i:' + i + '">' + esc(c) + "</span>"; }).join("");
  }

  function setMeta(title) {
    document.title = title ? title + " — " + NAME : NAME + " — " + String(SITE.tagline || "").replace(/\.$/, "");
    var og = document.head.querySelector('meta[property="og:title"]');
    if (og) og.setAttribute("content", document.title);
    // One clean address per page, so /work.html and /work don't count as two pages.
    var site = ((SITE.seo && SITE.seo.siteUrl) || "").replace(/\/$/, "");
    if (site && page !== "404") {
      var path = location.pathname.replace(/(^|\/)(index)?\.html$/, "$1").replace(/\.html$/, "");
      var link = document.head.querySelector('link[rel="canonical"]');
      if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
      link.href = site + (path || "/");
    }
  }

  /* ---------- the shared parts ---------- */
  // One list for the header, the phone menu and the footer.
  var NAV = [
    { key: "work", label: "Work", href: "/work" },
    { key: "services", label: "Services", href: "/services" },
    { key: "scaling", label: "Brand scaling", href: "/brand-scaling" },
    { key: "styles", label: "Styles", href: "/styles" },
    { key: "about", label: "About", href: "/about" },
    { key: "contact", label: "Contact", href: "/contact" },
  ];
  var activeKey = page === "project" ? "work" : page;
  function current(key) { return key === activeKey ? ' aria-current="page"' : ""; }

  // Profiles and chat apps that have a link set in content/site.js.
  function listed(arr) { return (arr || []).filter(function (m) { return m && m.url; }); }
  function chatApps() {
    var out = [];
    if (C.whatsapp) out.push({ label: "WhatsApp", url: C.whatsapp });
    if (C.viber) out.push({ label: "Viber", url: C.viber });
    return out;
  }
  function outLink(m) { return '<a href="' + esc(m.url) + '" target="_blank" rel="noopener">' + esc(m.label) + "</a>"; }

  // The Onsite mark: a sand tile, a drawn "on" (the power symbol) and the red dot. Same drawing as assets/brand.
  var MARK = '<svg viewBox="0 0 256 256" aria-hidden="true"><rect x="8" y="16" width="224" height="224" rx="60" fill="#e9dfcf"/>' +
    '<path d="M78 92 A58 58 0 1 0 162 92" fill="none" stroke="#0f0f0e" stroke-width="22" stroke-linecap="round"/>' +
    '<path d="M120 60 V130" fill="none" stroke="#0f0f0e" stroke-width="22" stroke-linecap="round"/>' +
    '<circle cx="226" cy="30" r="26" fill="#e2442a" stroke="#f5f4f0" stroke-width="10"/></svg>';

  // Every logo links home. The footer one adds the tagline.
  function logo(foot) {
    return '<a class="logo' + (foot ? " logo--foot" : "") + '" href="/" aria-label="' + esc(NAME) + ', home">' +
      '<span class="logo__mark" aria-hidden="true">' + MARK + "</span>" +
      '<span class="logo__text" aria-hidden="true"><span class="logo__word">' + esc(NAME) + "</span>" +
      (foot && SITE.tagline ? '<span class="logo__tag">' + esc(SITE.tagline) + "</span>" : "") + "</span></a>";
  }

  function header() {
    return (
      '<header class="site-header" id="top"><div class="nav wrap">' + logo() +
      '<nav class="nav__links" aria-label="Main">' +
      NAV.slice(0, 5).map(function (n) { return '<a href="' + n.href + '"' + current(n.key) + ">" + n.label + "</a>"; }).join("") +
      "</nav>" +
      '<a class="btn btn--dark btn--sm nav__cta" href="/contact"' + current("contact") + ">Get a quote</a>" +
      '<button class="btn btn--line btn--sm menu-btn" type="button" aria-expanded="false" aria-controls="menu">' +
      '<span data-v="menu">Menu</span><span data-v="close">Close</span></button>' +
      "</div></header>" +
      '<div class="menu" id="menu" data-lenis-prevent><div class="menu__inner"><div class="menu__body">' +
      '<nav class="menu__links" aria-label="Menu">' +
      NAV.map(function (n) { return '<a href="' + n.href + '"' + current(n.key) + ">" + n.label + "</a>"; }).join("") +
      "</nav>" +
      (C.phoneDisplay ? '<a class="btn btn--dark" href="' + telHref() + '">Call ' + esc(C.phoneDisplay) + "</a>" : "") +
      "</div></div></div>"
    );
  }

  function footer() {
    var findUs = listed(SITE.marketplaces).concat(listed(SITE.socials));
    var contact = [];
    if (C.phoneDisplay) contact.push('<a href="' + telHref() + '">' + esc(C.phoneDisplay) + "</a>");
    if (C.email) contact.push(esc(C.email));
    chatApps().forEach(function (m) { contact.push(outLink(m)); });
    if (C.availability) contact.push('<span class="dot" aria-hidden="true"></span>' + esc(C.availability));
    return (
      '<footer class="site-footer"><div class="wrap">' +
      '<div class="footer__top' + (findUs.length ? " has-find" : "") + '">' +
      '<div class="footer__brand">' + logo(true) + "</div>" +
      '<nav class="footer__col" aria-label="Footer"><p class="eyebrow">Pages</p><ul>' +
      NAV.map(function (n) { return '<li><a href="' + n.href + '">' + n.label + "</a></li>"; }).join("") +
      "</ul></nav>" +
      '<div class="footer__col"><p class="eyebrow">Contact</p><ul>' + contact.map(function (c) { return "<li>" + c + "</li>"; }).join("") + "</ul></div>" +
      (findUs.length ? '<div class="footer__col"><p class="eyebrow">Find us</p><ul>' + findUs.map(function (m) { return "<li>" + outLink(m) + "</li>"; }).join("") + "</ul></div>" : "") +
      "</div>" +
      '<div class="footer__bottom"><span>© ' + new Date().getFullYear() + " " + esc(NAME) + "</span>" +
      (C.remote ? "<span>" + esc(C.remote) + "</span>" : "") +
      '<a href="#top">Back to top</a></div>' +
      "</div></footer>"
    );
  }

  // Page head: an optional eyebrow (only when the h1 isn't the page name), the h1, one line, at most two buttons.
  function pageHead(o) {
    return '<header class="page-head wrap' + (o.cls ? " " + o.cls : "") + '">' + (o.before || "") +
      (o.eyebrow ? '<p class="eyebrow page-head__eyebrow" data-reveal>' + o.eyebrow + "</p>" : "") +
      '<h1 class="h1" data-reveal>' + o.title + "</h1>" +
      (o.line ? '<p class="page-head__line" data-reveal>' + o.line + "</p>" : "") +
      (o.btns ? '<div class="btns page-head__btns" data-reveal>' + o.btns + "</div>" : "") +
      (o.after || "") + "</header>";
  }

  // A section: its h2, an optional one-line intro right under it, then the content.
  function sectionHead(title, intro, hid) {
    return '<div class="shead"><h2 class="h2" id="' + hid + '" data-reveal>' + title + "</h2>" +
      (intro ? '<p class="shead__intro" data-reveal>' + intro + "</p>" : "") + "</div>";
  }
  function section(o) {
    var hid = o.id ? o.id + "-title" : nextId("s");
    return '<section class="' + (o.cls || "section") + '"' + (o.id ? ' id="' + o.id + '"' : "") + ' aria-labelledby="' + hid + '"><div class="wrap">' +
      sectionHead(o.title, o.intro, hid) + o.body + "</div></section>";
  }

  // A project card: its picture on its colour, its name and one line. The whole card links to its page.
  function mediaCard(p, o) {
    o = o || {};
    var cover = (p.images || [])[0];
    return '<a class="mcard" href="' + projectUrl(p) + '"' + (o.drag ? ' draggable="false"' : "") + ">" +
      '<div class="mcard__pic' + (isPortrait(cover) ? " mcard__pic--phone" : "") + '" style="--accent:' + esc(p.accent || "#e9dfcf") + '">' +
      '<div class="mcard__shot">' + img(cover, { decorative: true, sizes: o.sizes || "(min-width: 760px) 46vw, 92vw", eager: o.eager }) + "</div></div>" +
      '<h3 class="h3 mcard__title">' + esc(p.title) + '</h3><p class="mcard__line">' + esc(p.line) + "</p></a>";
  }
  function cards(list) {
    return '<ul class="cards">' + list.map(function (p) { return "<li data-reveal>" + mediaCard(p) + "</li>"; }).join("") + "</ul>";
  }

  // A row: hairline, h3, and a line (plus a link, tags or a list).
  function row(title, body, id) {
    return '<div class="row"' + (id ? ' id="' + id + '"' : "") + ' data-reveal><h3 class="h3">' + esc(title) + '</h3><div class="row__body">' + body + "</div></div>";
  }
  function rows(list) {
    return '<div class="rows">' + list.map(function (r) {
      return row(r.title, "<p>" + esc(r.body) + "</p>" + (r.link ? '<p><a class="link" href="' + esc(r.link.href) + '">' + esc(r.link.label) + "</a></p>" : ""));
    }).join("") + "</div>";
  }

  // Numbered steps: the only numbered part of the site.
  function steps(list) {
    return '<ol class="steps steps--' + list.length + '">' + list.map(function (s, i) {
      return '<li class="panel step" data-reveal><span class="label step__n">' + pad(i + 1) + '</span><h3 class="h3">' + esc(s.name) + "</h3><p>" + esc(s.body) + "</p></li>";
    }).join("") + "</ol>";
  }

  function faq(list) {
    return '<div class="faq">' + list.map(function (f) {
      return '<details class="faq__item" data-reveal><summary>' + esc(f.q) + '<span class="faq__icon" aria-hidden="true"></span></summary>' +
        '<div class="faq__a"><p>' + esc(f.a) + "</p></div></details>";
    }).join("") + "</div>";
  }

  function tags(list) { return '<ul class="tags">' + (list || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>"; }

  // The closing block on every page except Contact, Styles and 404.
  function cta(o) {
    o = o || {};
    return '<section class="section cta" aria-labelledby="cta-title"><div class="wrap">' + (o.before || "") +
      '<div class="cta__box" data-reveal><div><h2 class="h2" id="cta-title">' + (o.title || "Start a project") + "</h2>" +
      '<p class="cta__line">Tell us your idea, even a rough one. We reply ' + esc(C.replyTime || "quickly") + ", and the first call is free.</p></div>" +
      '<div class="cta__actions"><a class="btn btn--dark" href="' + esc(o.href || "/contact") + '">Plan your project ' + ICON.arrow + "</a>" +
      (C.phoneDisplay ? '<a class="link" href="' + telHref() + '">Call or text ' + esc(C.phoneDisplay) + "</a>" : "") +
      "</div></div></div></section>";
  }

  // Phone-sized "Get a quote / Call" bar, shown once the top of the page has scrolled away.
  function quickBar() {
    if (page === "contact") return "";
    return '<div class="quickbar" role="region" aria-label="Quick contact"><a class="btn btn--dark" href="/contact">Get a quote</a>' +
      (C.phoneDisplay ? '<a class="btn btn--line" href="' + telHref() + '">Call</a>' : "") + "</div>";
  }

  /* ---------- pages ---------- */
  function home() {
    setMeta("");
    var clients = PROJECTS.filter(function (p) { return p.forClient; });
    var own = PROJECTS.filter(function (p) { return !p.forClient; });

    var stack = PROJECTS.filter(function (p) { return p.hero; })
      .map(function (p) { return (p.images || [])[0]; })
      .filter(function (im) { return im && !isPortrait(im); }).slice(0, 3)
      .map(function (im, i) { return '<div class="iso__layer" style="--i:' + (i + 1) + '">' + img(im, { decorative: true, eager: true, sizes: "320px" }) + "</div>"; }).join("");

    var hero = '<header class="hero wrap"><div class="hero__grid"><div class="hero__text">' +
      '<h1 class="hero__title" aria-label="' + esc(NAME) + '"><span aria-hidden="true">' + splitWord(NAME) + "</span></h1>" +
      (SITE.tagline ? '<p class="hero__tag">' + esc(SITE.tagline) + "</p>" : "") +
      '<p class="hero__intro" data-reveal>' + esc(SITE.intro) + "</p>" +
      '<div class="btns" data-reveal><a class="btn btn--dark" href="/contact">Get a quote ' + ICON.arrow + '</a><a class="btn btn--line" href="#work">See our work</a></div>' +
      "</div>" +
      (stack ? '<div class="hero__visual" data-reveal><div class="iso" aria-hidden="true"><div class="iso__stage"><div class="iso__base"></div>' + stack + "</div></div></div>" : "") +
      "</div></header>";

    // The work band: one row that glides sideways, client work first. Its heading and line change
    // from "Built for clients" to "Our own products" as the row moves (see initReel).
    var G = {
      clients: { title: "Built for clients", intro: "In daily use by the businesses we built them for." },
      own: { title: "Our own products", intro: "Built and run by us." },
    };
    function swap(tag, cls, key, attrs) {
      return "<" + tag + ' class="' + cls + ' swap"' + attrs + ">" + ["clients", "own"].map(function (g) {
        return '<span class="' + (g === "clients" ? "is-on" : "") + '" data-group="' + g + '"' + (tag === "h2" || g !== "clients" ? ' aria-hidden="true"' : "") + ">" + G[g][key] + "</span>";
      }).join("") + "</" + tag + ">";
    }
    var reel = clients.concat(own).map(function (p, i) {
      return '<li class="reel__item" data-group="' + (p.forClient ? "clients" : "own") + '">' +
        mediaCard(p, { drag: true, eager: i < 2, sizes: "(min-width: 1100px) 31vw, (min-width: 760px) 44vw, 84vw" }) + "</li>";
    }).join("");
    var work = '<section class="band band--dark" id="work" aria-labelledby="work-title"><div class="wrap"><div class="shead">' +
      swap("h2", "h2", "title", ' id="work-title" aria-label="' + G.clients.title + " and " + lc(G.own.title) + '" data-reveal') +
      swap("p", "shead__intro", "intro", " data-reveal") + "</div></div>" +
      '<div class="reel" data-reveal><ul class="reel__track" aria-label="Projects">' + reel + "</ul></div>" +
      '<div class="wrap reel__foot"><a class="link" href="/work">View all work</a>' +
      '<div class="reel__nav"><button class="reel__btn" type="button" data-dir="-1" aria-label="Previous project">' + ICON.left + "</button>" +
      '<button class="reel__btn" type="button" data-dir="1" aria-label="Next project">' + ICON.right + "</button></div></div></section>";

    var quotes = (SITE.about && SITE.about.testimonials) || [];
    return hero + work +
      section({ title: "What we do", body: rows(SITE.whatWeDo || []) + '<p class="more"><a class="link" href="/services">All services</a></p>' }) +
      section({ title: "Why " + esc(NAME), body: rows(SITE.reasons || []) }) +
      (quotes.length ? section({ title: "What clients say", body: quoteList(quotes) }) : "") +
      cta();
  }

  // Reviews, once there are real ones in content/site.js (about.testimonials).
  function quoteList(list) {
    return '<div class="rows">' + list.map(function (q) {
      return '<blockquote class="row" data-reveal><p class="h3">“' + esc(q.quote) + '”</p><footer class="row__body">' + esc(q.name) + (q.title ? ", " + esc(q.title) : "") + "</footer></blockquote>";
    }).join("") + "</div>";
  }

  function work() {
    setMeta("Work");
    return pageHead({ title: "Work", line: "Systems we built for clients, and products of our own." }) +
      section({ id: "clients", title: "Built for clients", intro: "In daily use by the businesses we built them for.", body: cards(PROJECTS.filter(function (p) { return p.forClient; })) }) +
      section({ id: "products", title: "Our own products", intro: "Built and run by us.", body: cards(PROJECTS.filter(function (p) { return !p.forClient; })) }) +
      cta();
  }

  function project() {
    var slug = document.body.getAttribute("data-slug") || (location.pathname.match(/^\/work\/([^\/.]+)/) || [])[1] || new URLSearchParams(location.search).get("p") || "";
    var idx = -1;
    PROJECTS.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    if (idx < 0) return notFound(true);
    var p = PROJECTS[idx];
    var next = PROJECTS[(idx + 1) % PROJECTS.length];
    setMeta(p.title);
    var images = p.images || [];
    var cover = images[0];
    var said = sentences(p.summary);

    var facts = [["For", p.forClient ? p.forWho : "Our own product"], ["Status", p.status], ["Built with", p.builtWith], ["Works on", p.worksOn]]
      .filter(function (kv) { return kv[1]; })
      .map(function (kv) { return '<div><dt class="label">' + kv[0] + "</dt><dd>" + esc(kv[1]) + "</dd></div>"; }).join("");
    var head = pageHead({
      cls: "project-head",
      before: '<a class="back" href="/work">' + ICON.left + "All work</a>",
      eyebrow: p.forClient ? "Built for a client" : "Our own product",
      title: esc(p.title),
      line: esc((said[0] || "").trim()),
      after: (said.length > 1 ? '<p class="page-head__more" data-reveal>' + esc(said.slice(1).join("").trim()) + "</p>" : "") +
        '<dl class="facts" data-reveal>' + facts + "</dl>" +
        (p.link ? '<div class="btns page-head__btns" data-reveal><a class="btn btn--dark" href="' + esc(p.link) + '" target="_blank" rel="noopener">Visit ' + esc(domain(p.link)) + " " + ICON.arrow + "</a></div>" : ""),
    });

    var coverHtml = !cover ? "" : isPortrait(cover)
      ? phone(cover, { eager: true, high: true, sizes: "300px" })
      : cover.art ? '<div class="shot__art">' + img(cover, { eager: true, high: true, sizes: "(min-width: 1200px) 1120px, 92vw" }) + "</div>"
      : browser(cover, { eager: true, high: true, sizes: "(min-width: 1200px) 1120px, 92vw" });
    var coverBand = cover ? '<div class="band cover' + (isPortrait(cover) ? " cover--phone" : "") + '"><div class="wrap"><div class="cover__frame" data-reveal>' + coverHtml + "</div></div></div>" : "";

    var does = (p.sections || []).map(function (s) {
      return row(s.heading, "<p>" + esc(s.body) + "</p>" + ((s.points || []).length ? '<ul class="list">' + s.points.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : ""));
    }).join("");

    // Screens: a phone beside the first wide screen (4 + 8), then wide screens in pairs (6 + 6).
    // On phones only the phone screen and the first two wide ones show.
    var rest = images.slice(1), cells = [];
    for (var i = 0; i < rest.length; ) {
      var a = rest[i], b = rest[i + 1];
      if (b && isPortrait(a) !== isPortrait(b)) { cells.push([isPortrait(a) ? a : b, 4], [isPortrait(a) ? b : a, 8]); i += 2; }
      else if (b && !isPortrait(a)) { cells.push([a, 6], [b, 6]); i += 2; }
      else { cells.push([a, 12]); i += 1; }
    }
    var wides = 0;
    var shots = cells.map(function (cell) {
      var im = cell[0], span = cell[1], portrait = isPortrait(im);
      var more = !portrait && ++wides > 2;
      var sizes = span === 12 ? "(min-width: 1440px) 1360px, 100vw" : span === 8 ? "(min-width: 760px) 62vw, 100vw" : "(min-width: 760px) 46vw, 100vw";
      var media = portrait ? '<div class="shot__frame">' + phone(im, { sizes: "220px" }) + "</div>"
        : im.art ? '<div class="shot__art">' + img(im, { sizes: sizes }) + "</div>" : browser(im, { sizes: sizes });
      return '<figure class="shot shot--' + span + (more ? " shot--more" : "") + '" data-reveal>' + media + "<figcaption>" + esc(im.caption || im.alt) + "</figcaption></figure>";
    }).join("");

    var nextRow = next && next !== p
      ? '<nav class="next" aria-label="Next project"><a class="next__link h3" href="' + projectUrl(next) + '"><span>Next project:</span><b>' + esc(next.title) + "</b>" + ICON.right + "</a></nav>"
      : "";

    return '<article style="--accent:' + esc(p.accent || "#e9dfcf") + '">' + head + coverBand +
      (does ? section({ title: "What it does", body: '<div class="rows">' + does + "</div>" }) : "") +
      (shots ? section({ title: "Screens", intro: p.note ? esc(p.note) : "", body: '<div class="shots">' + shots + "</div>" }) : "") +
      ((p.results || []).length ? section({ title: "Results", body: '<ul class="list">' + p.results.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" }) : "") +
      cta({ title: "Want something like " + esc(p.title) + "?", href: "/contact?for=" + encodeURIComponent(p.slug), before: nextRow }) +
      "</article>";
  }

  // The example AI chat for Mesa, a made-up café. The whole conversation shows; nothing plays by itself.
  function chat() {
    if (!CHAT.length) return "";
    return '<figure class="chat" aria-label="Example conversation with an AI assistant for ' + esc(LAB.brand) + ', a made-up café">' +
      '<div class="chat__head"><span class="chat__avatar" aria-hidden="true">' + esc(LAB.brand.charAt(0)) + "</span>" +
      "<div><b>" + esc(LAB.brand) + " · AI assistant</b><span>Answers in seconds</span></div></div>" +
      '<ol class="chat__log">' + CHAT.map(function (m) {
        var ai = m.from === "ai";
        return '<li class="msg msg--' + (ai ? "ai" : "them") + '"><span class="sr-only">' + (ai ? "Assistant: " : "Customer: ") + "</span>" + esc(m.text) + "</li>";
      }).join("") + "</ol>" +
      "<figcaption>Example conversation. " + esc(LAB.brand) + " is a made-up café.</figcaption></figure>";
  }

  function services() {
    setMeta("Services");
    var groups = GROUPS.map(function (g, gi) {
      var list = SERVICES.filter(function (s) { return s.group === g; });
      var body = '<div class="rows">' + list.map(function (s) {
        return row(s.name, "<p>" + esc(s.description) + "</p>" + tags((s.includes || []).slice(0, 4)) +
          (s.page ? '<p><a class="link" href="' + esc(s.page) + '">' + esc(s.pageLabel || "Read more") + "</a></p>" : "") +
          (s.demo === "chat" ? chat() : ""), s.key);
      }).join("") + "</div>" +
        (gi === GROUPS.length - 1 ? '<p class="more">Something not listed? <a class="link" href="/contact">Ask in the planner.</a></p>' : "");
      return section({ title: esc(g), body: body });
    }).join("");
    return pageHead({
      title: "Services",
      line: "Brand, websites, apps, business systems, AI and ads, in any style. Every project is quoted for you.",
      btns: '<a class="btn btn--dark" href="/contact">Get a quote ' + ICON.arrow + "</a>",
    }) + groups +
      (PROCESS.length ? section({ title: "How we work", intro: "Simple from start to finish.", body: steps(PROCESS) }) : "") +
      (FAQ.length ? section({ title: "Questions", body: faq(FAQ) }) : "") +
      cta();
  }

  // The sample monthly report on the Brand scaling page: made-up numbers, no money.
  function report() {
    var bars = [38, 52, 47, 66, 74, 92];
    return '<figure class="panel report" data-reveal aria-label="Sample monthly report for ' + esc(LAB.brand) + ', a made-up café, with made-up numbers">' +
      '<div class="report__head"><b>' + esc(LAB.brand) + ' · Monthly report</b><span class="tag">Sample · made-up numbers</span></div>' +
      '<p class="report__kpi"><span class="label">Bookings from ads</span><span class="report__num">148</span></p>' +
      '<div class="report__bars" aria-hidden="true">' + bars.map(function (h) { return '<i style="--h:' + h + '%"></i>'; }).join("") + "</div>" +
      '<div class="report__rows"><p><span>Best ad</span>“Sunday brunch” video, Instagram</p><p><span>Next month</span>Move budget to video, test 3 new offers</p></div>' +
      "<figcaption>What a monthly report looks like. Yours shows your real numbers.</figcaption></figure>";
  }

  function scaling() {
    setMeta("Brand scaling");
    var quote = "/contact?for=ads";
    var gets = '<div class="gets"><div><ul class="list" data-reveal>' + (GROWTH.deliverables || []).map(function (d) { return "<li>" + esc(d) + "</li>"; }).join("") + "</ul>" +
      '<p class="gets__note" data-reveal>Quoted for you after a free call.</p></div>' + report() + "</div>";
    var chans = '<ul class="chans">' + (GROWTH.channels || []).map(function (c) {
      return '<li class="chan" data-reveal><h3 class="h3">' + esc(c.name) + "</h3><p>" + esc(c.body) + "</p></li>";
    }).join("") + "</ul>";
    return pageHead({
      eyebrow: "Brand scaling",
      title: 'Scale your <span class="serif">brand.</span>',
      line: "We plan, make and run your ads on Facebook, Instagram, Google Search, Google Maps, TikTok, YouTube, Messenger and WhatsApp, then test every week and put more behind what works.",
      btns: '<a class="btn btn--dark" href="' + quote + '">Get a quote ' + ICON.arrow + "</a>",
    }) +
      section({ title: "What you get", body: gets }) +
      section({ cls: "band band--blue", title: "Where we run your ads", intro: "Wherever your customers scroll.", body: chans }) +
      section({ title: "How it works", intro: "Test. Learn. Scale.", body: steps(GROWTH.steps || []) }) +
      ((GROWTH.faq || []).length ? section({ title: "Questions", intro: "What people usually ask before we run their ads.", body: faq(GROWTH.faq) }) : "") +
      cta({ href: quote });
  }

  function about() {
    setMeta("About");
    var A = SITE.about || {};
    var first = String(SITE.owner || "").split(" ")[0];
    var pdf = RESUME.pdfReady && RESUME.pdf
      ? '<a class="btn btn--dark" href="' + esc(abs(RESUME.pdf)) + '" download>Download resume (PDF)</a>' : "";
    var bio = (SITE.bio || []).length
      ? '<div class="bio">' + SITE.bio.map(function (para) { return "<p data-reveal>" + esc(para) + "</p>"; }).join("") +
        '<p data-reveal><a class="link" href="/work">See what we’ve built</a></p></div>'
      : "";
    var photo = SITE.photo ? '<div class="about-photo" data-reveal><img src="' + esc(abs(SITE.photo)) + '" alt="Portrait of ' + esc(SITE.owner) + '" loading="eager"></div>' : "";
    var head = pageHead({ eyebrow: "About", title: "Hi, I’m " + esc(first) + ".", line: esc(SITE.role), btns: pdf, after: bio });
    if (photo) head = '<div class="wrap about-head has-photo">' + head.replace("page-head wrap", "page-head") + photo + "</div>";

    var period = RESUME.startYear ? esc(RESUME.startYear) + " – Present" : "";
    var item = function (p) { return '<li><a class="xp__item" href="' + projectUrl(p) + '"><b>' + esc(p.title) + "</b><span>" + esc(p.line) + "</span></a></li>"; };
    var past = (RESUME.past || []).filter(function (r) { return r && r.title; });
    var experience =
      '<div class="xp__role" data-reveal><p>' + esc(RESUME.role) + ", " + esc(RESUME.org) + (period ? " · " + period : "") + "</p>" +
      (RESUME.line ? "<p>" + esc(RESUME.line) + "</p>" : "") + "</div>" +
      '<div class="xp__groups">' +
      '<div class="xp__group" data-reveal><h3 class="h3">Built for clients</h3><ul>' + PROJECTS.filter(function (p) { return p.forClient; }).map(item).join("") + "</ul></div>" +
      '<div class="xp__group" data-reveal><h3 class="h3">Our own products</h3><ul>' + PROJECTS.filter(function (p) { return !p.forClient; }).map(item).join("") + "</ul></div>" +
      "</div>" +
      (past.length ? '<div class="rows xp__past">' + past.map(function (r) {
        return row(r.title, "<p>" + esc([r.org, r.period].filter(Boolean).join(" · ")) + "</p>" + (r.line ? "<p>" + esc(r.line) + "</p>" : ""));
      }).join("") + "</div>" : "");
    var edu = (RESUME.education || []).filter(function (e) { return e && e.title; });
    return head +
      section({ id: "resume", title: "Experience", body: experience }) +
      (edu.length ? section({ title: "Education", body: '<div class="rows">' + edu.map(function (e) {
        return row(e.title, "<p>" + esc([e.org, e.period].filter(Boolean).join(" · ")) + "</p>");
      }).join("") + "</div>" }) : "") +
      ((A.skills || []).length ? section({ title: "Skills &amp; tools", body: tags(A.skills) }) : "") +
      ((A.testimonials || []).length ? section({ title: "What clients say", body: quoteList(A.testimonials) }) : "") +
      cta();
  }

  // What the planner starts with, from the address:
  //   ?for=<project slug or service key>   (pos is OnTrack; old ?need= and ?like= still work, in any letter case)
  //   ?style=<style id>&name=<business name>   from the Styles page
  function prefill() {
    var q = new URLSearchParams(location.search);
    var out = { needs: [], likes: [], style: "", name: (q.get("name") || "").replace(/\s+/g, " ").trim().slice(0, 60) };
    function service(v) { v = lc(v); return SERVICES.filter(function (s) { return [s.key, s.name, s.label].some(function (x) { return lc(x) === v; }); })[0]; }
    function projectFor(v) {
      v = lc(v);
      if (v === "pos") v = "ontrack";
      return PROJECTS.filter(function (p) { return lc(p.slug) === v || lc(p.title) === v; })[0];
    }
    function need(s) { if (s && out.needs.indexOf(s.name) < 0) out.needs.push(s.name); }
    function like(p) { if (p && out.likes.indexOf(p) < 0) { out.likes.push(p); need(service(p.service || "app")); } }
    q.getAll("for").forEach(function (v) { var p = projectFor(v); if (p) like(p); else need(service(v)); });
    q.getAll("need").forEach(function (v) { need(service(v)); });
    q.getAll("like").forEach(function (v) { like(projectFor(v)); });
    var st = lc(q.get("style"));
    STYLES.forEach(function (s) { if (s.id === st || lc(s.label) === st) out.style = s.label; });
    return out;
  }

  function contact() {
    setMeta("Contact");
    var pre = prefill();
    var titles = pre.likes.map(function (p) { return p.title; });
    var message = titles.length ? "I’d like something like " + (titles.length > 1 ? titles.slice(0, -1).join(", ") + " and " + titles[titles.length - 1] : titles[0]) + "." : "";

    function choice(type, name, value, label, checked, sw) {
      return '<label class="chip"><input type="' + type + '" name="' + name + '" value="' + esc(value) + '"' + (checked ? " checked" : "") + ">" +
        (sw ? '<i aria-hidden="true" style="--c1:' + sw[0] + ";--c2:" + sw[1] + '"></i>' : "") + esc(label) + "</label>";
    }
    function step(n, title, body, hint) {
      return '<fieldset class="pstep"><legend><span class="pstep__n" aria-hidden="true">' + n + "</span>" + title + "</legend>" +
        (hint ? '<p class="pstep__hint">' + hint + "</p>" : "") + body + "</fieldset>";
    }
    function field(id, label, attrs, value, wide) {
      return '<div class="field' + (wide ? " field--wide" : "") + '"><label for="' + id + '">' + label + '</label><input id="' + id + '" ' + attrs + (value ? ' value="' + esc(value) + '"' : "") + "></div>";
    }
    var styleChips = [choice("radio", "style", "Not sure yet", "Not sure yet", !pre.style)].concat(STYLES.map(function (s) {
      return choice("radio", "style", s.label, s.label, s.label === pre.style, s.sw);
    })).join("");
    var form =
      '<form class="planner" data-planner novalidate action="/api/contact" method="POST">' +
      '<p class="sr-only" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></p>' +
      '<div class="planner__steps">' +
      step(1, "What do you need?", '<div class="chips">' + SERVICES.map(function (s) {
        return choice("checkbox", "need", s.name, s.label || s.name, pre.needs.indexOf(s.name) > -1);
      }).join("") + "</div>", "Pick as many as you like, or none.") +
      step(2, "Style and timing",
        '<div class="chips chips--row" data-style-row role="radiogroup" aria-label="Style">' + styleChips + "</div>" +
        '<p class="pstep__more"><a class="link" href="/styles">See all ' + STYLES.length + " on the Styles page</a></p>" +
        '<p class="label pstep__sub" id="timing-label">Timing</p>' +
        '<div class="chips" role="radiogroup" aria-labelledby="timing-label">' + (PLANNER.timelines || []).map(function (x) { return choice("radio", "timeline", x, x, false); }).join("") + "</div>") +
      step(3, "About you", '<div class="fields">' +
        field("p-name", "Your name", 'name="name" autocomplete="name" required') +
        field("p-business", "Business name", 'name="business" autocomplete="organization"', pre.name) +
        field("p-contact", "Email or phone", 'name="contact" autocomplete="email" required', "", true) +
        '<div class="field field--wide"><label for="p-msg">Your idea, in your own words</label><textarea id="p-msg" name="message" maxlength="1500" data-lenis-prevent ' +
        'placeholder="What you want to build, what slows you down, sites you like, deadlines, a rough budget…">' + esc(message) + "</textarea></div></div>") +
      "</div>" +
      '<aside class="panel brief" aria-labelledby="brief-title"><div class="brief__head"><h2 class="h3" id="brief-title">Your brief</h2><span class="label brief__live">Updates as you go</span></div>' +
      '<div class="brief__text" tabindex="0" role="region" aria-label="Your project brief" data-lenis-prevent></div>' +
      '<div class="brief__send"><button class="btn btn--dark" type="submit">Send it to us ' + ICON.arrow + '</button><button class="btn btn--line" type="button" data-send="copy">Copy brief</button></div>' +
      '<p class="brief__status" role="status" aria-live="polite"></p>' +
      '<p class="brief__note">You get a clear quote before any work starts.</p></aside>' +
      "</form>";

    return pageHead({
      eyebrow: "Contact",
      title: "Plan your project",
      line: "Tap what you need and it becomes a short brief. It takes about two minutes, and you get a clear quote back. " +
        "We reply " + esc(C.replyTime || "quickly") + "." +
        (C.phoneDisplay ? ' Rather talk? Call or text <a class="link" href="' + telHref() + '">' + esc(C.phoneDisplay) + "</a>." : ""),
    }) +
      '<section class="section" id="planner" aria-labelledby="brief-title"><div class="wrap">' + form + "</div></section>";
  }

  function styles() {
    setMeta("Styles");
    return pageHead({
      eyebrow: "Styles",
      title: "Any design.<br>Any style.",
      line: "One made-up coffee shop in " + STYLES.length + " styles. Pick one, or try it with your business name.",
    }) + lab();
  }

  function longest(list) { return list.reduce(function (a, b) { return String(b).length > String(a).length ? b : a; }, ""); }
  function labLabel(name, s) {
    return "Example website for " + (name || "a made-up coffee shop called " + LAB.brand) + ", designed in the " + s.label + " style";
  }
  function lab() {
    var s = STYLES[0];
    var chips = STYLES.map(function (st, i) {
      return '<button class="chip" type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' +
        '<i aria-hidden="true" style="--c1:' + st.sw[0] + ";--c2:" + st.sw[1] + '"></i>' + esc(st.label) + "</button>";
    }).join("");
    // Every letter gets a span so the Zine style can cut them out like a ransom note.
    var title = LAB.title.split(" ").map(function (w) {
      return '<span class="w">' + w.split("").map(function (c) { return '<span class="ch">' + esc(c) + "</span>"; }).join("") + "</span>";
    }).join(" ");
    var mock = '<div class="mock lab__fade" role="img" aria-label="' + esc(labLabel("", s)) + '">' +
      '<div class="mock__nav"><span class="mock__logo">' + esc(LAB.brand) + '</span><span class="mock__links"><i>Menu</i><i>Visit</i><i>Story</i></span><span class="mock__bag">Bag (2)</span></div>' +
      '<div class="mock__hero"><p class="mock__kicker">' + esc(s.kicker) + '</p><p class="mock__title">' + title + "</p>" +
      '<p class="mock__sub">' + esc(LAB.sub) + '</p><p class="mock__btns"><span class="mock__btn">Order ahead</span><span class="mock__more">See the menu</span></p></div>' +
      '<div class="mock__art"><span class="a1"></span><span class="a2"></span><span class="a3"></span></div>' +
      '<div class="mock__row">' + LAB.items.map(function (it) { return '<span class="mock__card"><i></i><b>' + esc(it) + "</b></span>"; }).join("") + "</div>" +
      '<span class="mock__sticker">' + esc(s.sticker) + '</span><span class="mock__fx"></span></div>';
    var panel = '<div class="lab__panel">' +
      '<div class="sized lab__fade"><p class="lab__name">' + esc(s.label) + '</p><p class="lab__name sizer" aria-hidden="true">' + esc(longest(STYLES.map(function (x) { return x.label; }))) + "</p></div>" +
      '<div class="sized lab__fade"><p class="lab__note">' + esc(s.note) + '</p><p class="lab__note sizer" aria-hidden="true">' + esc(longest(STYLES.map(function (x) { return x.note; }))) + "</p></div>" +
      '<div class="lab__specs lab__fade"><ul class="lab__swatches" aria-hidden="true"><li></li><li></li><li></li><li></li></ul>' +
      '<div class="sized"><p class="lab__font">Type · <span>' + esc(s.font) + '</span></p><p class="lab__font sizer" aria-hidden="true">Type · ' + esc(longest(STYLES.map(function (x) { return x.font; }))) + "</p></div></div>" +
      '<div class="lab__field"><label for="lab-name">Try it with your business name</label>' +
      '<input id="lab-name" type="text" maxlength="18" autocomplete="organization" spellcheck="false" placeholder="' + esc(LAB.brand) + '"></div>' +
      '<div class="btns"><a class="btn btn--dark lab__cta" href="/contact?style=' + s.id + '">Get a quote in this style ' + ICON.arrow + "</a>" +
      '<button class="btn btn--line lab__shuffle" type="button">Surprise me</button></div>' +
      '<div class="lab__meta"><span class="lab__progress" aria-hidden="true"><i></i></span><button class="lab__play" type="button" hidden>Pause</button></div>' +
      '<p class="sr-only" id="lab-status" aria-live="polite"></p></div>';
    return '<section class="lab" data-lab="' + s.id + '" aria-labelledby="lab-title"><div class="wrap"><div class="lab__grid">' +
      '<div class="lab__stage">' + mock + "</div>" +
      '<div class="lab__pick"><h2 class="h3" id="lab-title">Pick a style</h2><div class="lab__chips" role="group" aria-labelledby="lab-title">' + chips + "</div></div>" +
      panel + "</div></div></section>";
  }

  // 404, and the same block for a project address that doesn't exist.
  function notFound(isProject) {
    isProject = isProject === true || /^\/work\/./.test(location.pathname);
    setMeta("Page not found");
    return pageHead({
      cls: "notfound",
      eyebrow: "404",
      title: "Lost?",
      line: isProject ? "That project doesn’t exist, or its link changed." : "This page doesn’t exist. Let’s get you back.",
      btns: isProject
        ? '<a class="btn btn--dark" href="/work">See all work</a><a class="btn btn--line" href="/">Home</a>'
        : '<a class="btn btn--dark" href="/">Home</a><a class="btn btn--line" href="/work">See work</a>',
    });
  }

  /* ---------- behaviour ---------- */
  function initMenu() {
    var btn = document.querySelector(".menu-btn");
    var menu = document.getElementById("menu");
    if (!btn || !menu) return;
    function set(open, returnFocus) {
      menu.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", String(open));
      if (open) { var first = menu.querySelector("a"); if (first) first.focus({ preventScroll: true }); }
      else if (returnFocus) btn.focus();
    }
    btn.addEventListener("click", function () { set(!menu.classList.contains("is-open"), true); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && menu.classList.contains("is-open")) set(false, true); });
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

  // Questions open and close by easing their height: 0.5s open, 0.2s closed.
  function initFaq() {
    document.querySelectorAll(".faq__item").forEach(function (d) {
      var sum = d.querySelector("summary");
      var body = d.querySelector(".faq__a");
      var anim = null;
      sum.addEventListener("click", function (e) {
        if (reduceMotion || !body.animate) { d.classList.toggle("is-open", !d.open); return; }
        e.preventDefault();
        var from = body.getBoundingClientRect().height;
        if (anim) { anim.cancel(); anim = null; }
        if (!d.classList.contains("is-open")) {
          d.classList.add("is-open");
          d.open = true;
          anim = body.animate([{ height: from + "px" }, { height: body.scrollHeight + "px" }], { duration: 500, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)" });
        } else {
          d.classList.remove("is-open");
          anim = body.animate([{ height: from + "px" }, { height: "0px" }], { duration: 200, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" });
          var mine = anim;
          anim.onfinish = function () {
            if (!d.classList.contains("is-open")) d.open = false;
            mine.cancel();
            if (anim === mine) anim = null;
          };
        }
      });
    });
  }

  // The Styles page: chips, "Surprise me", the business-name field and the slideshow (with Pause).
  function initLab() {
    var root = document.querySelector(".lab");
    if (!root) return;
    var mock = root.querySelector(".mock");
    var chips = root.querySelectorAll(".lab__chips .chip");
    var row = root.querySelector(".lab__chips");
    var nameEl = root.querySelector(".lab__name");
    var note = root.querySelector(".lab__note");
    var fontEl = root.querySelector(".lab__font span");
    var kicker = mock.querySelector(".mock__kicker");
    var sticker = mock.querySelector(".mock__sticker");
    var logoEl = mock.querySelector(".mock__logo");
    var cta = root.querySelector(".lab__cta");
    var input = root.querySelector("#lab-name");
    var status = root.querySelector("#lab-status");
    var play = root.querySelector(".lab__play");
    var bar = root.querySelector(".lab__progress i");
    var current = 0, auto = false, fontsLink = null, swapTimer = null;

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
      cta.href = "/contact?style=" + s.id + (name ? "&name=" + encodeURIComponent(name) : "");
    }
    function restartBar() {
      if (!auto) return;
      bar.style.animation = "none";
      void bar.offsetWidth;
      bar.style.animation = "";
    }
    function show() {
      var s = STYLES[current];
      root.setAttribute("data-lab", s.id);
      nameEl.textContent = s.label;
      note.textContent = s.note;
      fontEl.textContent = s.font;
      kicker.textContent = s.kicker;
      sticker.textContent = s.sticker;
      root.classList.remove("is-out");
      restartBar();
    }
    function apply(i, announce) {
      current = (i + STYLES.length) % STYLES.length;
      var s = STYLES[current];
      chips.forEach(function (c, j) { c.setAttribute("aria-pressed", String(j === current)); });
      sync();
      // Crossfade: 0.2s out, then the new style fades in over 0.5s.
      clearTimeout(swapTimer);
      if (reduceMotion) show();
      else { root.classList.add("is-out"); swapTimer = setTimeout(show, 200); }
      // Keep the active chip in view inside its own row, without ever scrolling the page.
      var chip = chips[current];
      if (row.scrollWidth > row.clientWidth + 1) {
        row.scrollTo({ left: Math.max(0, chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2), behavior: reduceMotion ? "auto" : "smooth" });
      }
      if (announce) status.textContent = s.label + " style. " + s.note;
      warm(s);
      warm(STYLES[(current + 1) % STYLES.length]);
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
      logoEl.textContent = brand() || LAB.brand;
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

  // The project planner: builds a brief from the picks, sends it to us (POST /api/contact),
  // and copies it for any chat.
  function initPlanner() {
    var form = document.querySelector("[data-planner]");
    if (!form) return;
    var out = form.querySelector(".brief__text");
    var status = form.querySelector(".brief__status");
    var copyBtn = form.querySelector('[data-send="copy"]');
    function val(n) { var el = form.elements[n]; return el ? String(el.value || "").trim() : ""; }
    function picked(n) {
      return [].slice.call(form.querySelectorAll('input[name="' + n + '"]:checked')).map(function (i) { return i.value; });
    }
    function brief() {
      var name = val("name"), biz = val("business");
      var hi = "Hi " + NAME + "!" + (name && biz ? " I’m " + name + " from " + biz + "." : name ? " I’m " + name + "." : biz ? " I’m reaching out from " + biz + "." : "");
      var details = [];
      var need = picked("need"), style = picked("style")[0], time = picked("timeline")[0];
      if (need.length) details.push("What I need: " + need.join(", "));
      if (style && style !== "Not sure yet") details.push("Style: " + style);
      if (time) details.push("Timing: " + time);
      if (val("contact")) details.push("Reach me at: " + val("contact"));
      var msg = val("message");
      if (!details.length && !msg) return hi + " I have an idea I’d like to talk about.";
      return hi + (details.length ? "\n\n" + details.join("\n") : "") + (msg ? "\n\n" + msg : "");
    }
    function update() { out.textContent = brief(); }
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
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
    window.addEventListener("pageshow", update);

    // A style chosen on the Styles page scrolls into view inside its own row, never moving the page.
    var row = form.querySelector("[data-style-row]");
    var on = row && row.querySelector("input:checked");
    if (on && row.scrollWidth > row.clientWidth + 1) {
      var chip = on.parentNode;
      row.scrollLeft = Math.max(0, chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2);
    }

    if (copyBtn) copyBtn.addEventListener("click", function () {
      copy(brief()).then(function (ok) {
        status.className = "brief__status";
        status.textContent = ok ? "Brief copied. Paste it into any chat or message to send it to us." : "Select the brief above and copy it, then paste it into any chat or message.";
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.className = "brief__status is-error";
        status.textContent = "Please add your name and an email or phone number.";
        var bad = form.querySelector("input:invalid, textarea:invalid");
        if (bad) bad.focus();
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.className = "brief__status";
      status.textContent = "Sending…";
      var style = picked("style")[0] || "";
      var data = { name: val("name"), business: val("business"), contact: val("contact"), message: val("message"), website: val("website"),
        need: picked("need"), style: style === "Not sure yet" ? "" : style, budget: "", timeline: picked("timeline")[0] || "", brief: brief() };
      fetch("/api/contact", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json", Accept: "application/json" } })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok) { var fail = new Error((res.j && res.j.error) || ""); fail.fromServer = true; throw fail; }
          status.textContent = "Thanks! Your brief is with us. We’ll be in touch soon.";
          form.querySelectorAll("input, textarea").forEach(function (el) {
            if (el.type === "checkbox" || el.type === "radio") el.checked = el.value === "Not sure yet";
            else el.value = "";
          });
          update();
        })
        .catch(function (err) {
          status.className = "brief__status is-error";
          status.textContent = (err && err.fromServer && err.message) || "Something went wrong. Please try again, or use Copy brief and send it to us.";
        })
        .then(function () { btn.disabled = false; });
    });
  }

  function initQuickBar() {
    var bar = document.querySelector(".quickbar");
    var top = document.querySelector("#main .hero, #main .page-head");
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

  // The home work row: swipe it, drag it with the mouse, or use the arrows. Its heading and
  // line crossfade between the two groups as it moves.
  function initReel() {
    var band = document.getElementById("work");
    var track = band && band.querySelector(".reel__track");
    if (!track) return;
    var items = [].slice.call(track.children);
    var btns = band.querySelectorAll(".reel__btn");
    if (!items.length) return;
    function max() { return track.scrollWidth - track.clientWidth; }
    function step() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth; }
    // A stop this close to the end counts as the end, so no click ever nudges a few pixels.
    var NEAR = 48;
    function at(i) { var x = Math.min(max(), items[i].offsetLeft - items[0].offsetLeft); return max() - x < NEAR ? max() : x; }
    function atEnd() { return track.scrollLeft >= max() - NEAR; }
    function go(i) {
      i = Math.max(0, Math.min(items.length - 1, i));
      track.scrollTo({ left: at(i), behavior: reduceMotion ? "auto" : "smooth" });
    }
    // The group shown is the one most of the visible cards belong to.
    var shown = "clients";
    function showGroup() {
      var left = track.scrollLeft, right = left + track.clientWidth, count = { clients: 0, own: 0 };
      items.forEach(function (it) {
        var a = it.offsetLeft - items[0].offsetLeft, b = a + it.offsetWidth;
        var seen = Math.max(0, Math.min(b, right) - Math.max(a, left));
        count[it.getAttribute("data-group")] += seen;
      });
      var key = atEnd() ? "own" : count.own > count.clients ? "own" : "clients";
      if (key === shown) return;
      shown = key;
      band.querySelectorAll(".swap > span").forEach(function (v) {
        var on = v.getAttribute("data-group") === key;
        v.classList.toggle("is-on", on);
        if (v.parentNode.tagName !== "H2") v.setAttribute("aria-hidden", String(!on));
      });
    }
    function update() {
      showGroup();
      if (btns[0]) btns[0].disabled = track.scrollLeft <= 2;
      if (btns[1]) btns[1].disabled = max() <= 2 || atEnd();
    }
    [].forEach.call(btns, function (b) {
      // Next: the first card that starts right of where we are. Previous: the last one left of it.
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

    // Mouse drag. Snapping waits while dragging, then the row settles on the nearest card.
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
      setTimeout(function () { moved = false; }, 0);
      var pos = track.scrollLeft / step();
      go(dx < -40 ? Math.ceil(pos) : dx > 40 ? Math.floor(pos) : Math.round(pos));
      settle = setTimeout(function () { track.classList.remove("is-drag"); }, 600);
    });
    // A drag shouldn't also open the card it ended on.
    track.addEventListener("click", function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
    track.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  // Structured data, so search engines understand the studio and the questions.
  function jsonLd() {
    function add(obj) {
      var s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(obj).replace(/</g, "\\u003c");
      document.head.appendChild(s);
    }
    function faqPage(list) {
      return { "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: list.map(function (f) { return { "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }; }) };
    }
    if (page === "home") {
      var site = ((SITE.seo && SITE.seo.siteUrl) || "").replace(/\/$/, "");
      add({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: NAME,
        description: SITE.seo && SITE.seo.description,
        founder: { "@type": "Person", name: SITE.owner },
        telephone: C.phoneLink || undefined,
        email: C.email || undefined,
        areaServed: "Worldwide",
        url: site || undefined,
        image: site ? site + "/og-image.png" : undefined,
        sameAs: listed(SITE.marketplaces).concat(listed(SITE.socials)).map(function (s) { return s.url; }),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: SERVICES.map(function (s) {
            return { "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.description } };
          }),
        },
      });
    }
    if (page === "scaling" && (GROWTH.faq || []).length) add(faqPage(GROWTH.faq));
    if (page === "services" && FAQ.length) add(faqPage(FAQ));
  }

  // Where an element will sit once its reveal finishes. offsetTop ignores the reveal's
  // move, so anchors don't land a few pixels under the sticky header.
  function restingTop(el) {
    var y = 0;
    for (var n = el; n; n = n.offsetParent) y += n.offsetTop;
    var gap = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    return Math.max(0, y - gap);
  }
  // Pages are drawn by this script, so jump to #resume (or any #id) once it exists.
  function scrollToHash() {
    var id = location.hash.slice(1);
    try { id = decodeURIComponent(id); } catch (err) { return; }
    var el = id && document.getElementById(id);
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
      var id = a.hash.slice(1);
      try { id = decodeURIComponent(id); } catch (err) { return; }
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
      if (history.replaceState) history.replaceState(null, "", location.pathname + location.search);   // the address stays clean
    });
  }

  // Splitting a word into one span per letter drops the font's kerning, so measure each pair and add it back.
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

  // Smooth, weighty scrolling on desktops (Lenis). Phones and touch screens keep their
  // native scrolling, and sideways swipes pass through to the work row and the style chips.
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
  var pages = { home: home, styles: styles, work: work, project: project, services: services, scaling: scaling, about: about, contact: contact, "404": notFound };
  document.getElementById("site-header").innerHTML = header();
  document.getElementById("main").innerHTML = (pages[page] || notFound)();
  document.getElementById("site-footer").innerHTML = footer();
  document.body.insertAdjacentHTML("beforeend", quickBar());
  jsonLd();

  initMenu();
  initReveal();
  initFaq();
  initLab();
  initPlanner();
  initReel();
  initQuickBar();
  kernLetters();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(kernLetters);
  scrollToHash();
  initAnchors();
  initSmooth();
})();
