# Kian Studio: website

The website for Kian Studio, Carl Palacio's design and build studio. It's plain HTML, CSS and JavaScript:
there's **no build step and nothing to install**. Every page reads its text, projects and
services from the small files in `content/`, so you can update the site without touching
any design code.

```
content/
  site.js       ← studio name, bio, contact details, chat apps, marketplaces, skills, the AI section
  projects.js   ← every project (Work page, case studies, home page), with features and videos
  services.js   ← every service, the pricing plans (websites from $80, plus Custom), the FAQ and
                  the brand scaling & ads page (GROWTH)
  resume.js     ← resume summary + which PDF to download
assets/
  img/projects/ ← project screenshots (one folder per project)
  video/        ← project videos; video/loops/ has the short muted clips on the cards
  files/        ← Carl-Palacio-Resume.pdf
  css/style.css ← all styling
  js/main.js    ← renders the pages from /content (no need to edit)
index.html, work.html, project.html, services.html, brand-scaling.html, about.html, resume.html,
contact.html, 404.html, sitemap.xml
listing-kit/    ← Fiverr, Upwork and profile images plus ready-to-paste gig text (not part of the site)
```

The header shows Work, Services, Brand scaling and About (the list is `NAV` near the top of
`assets/js/main.js`). Resume and Contact are in the menu and the footer.

## Run it on your computer

Open a terminal in this folder and start the built-in Python web server (macOS already has Python):

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>. Refresh the page after you edit a file.
(Double-clicking `index.html` also works, but a local server is closer to the live site.)

## Placeholders: what still needs your content

Any text written in `[square brackets]` in the `content/` files is a placeholder. On the site it
shows with a dotted outline so it's easy to spot. Replace the whole thing, brackets included.

Still to fill in:

- **Contact form:** `content/site.js` → `contact.formEndpoint` (hidden until set, see below)
- **Profile photo:** add `assets/img/carl.webp` (portrait, about 1000×1250) and set `photo` in `content/site.js`
- **Marketplace profiles:** `content/site.js` → `marketplaces`. Paste your Fiverr, Upwork or
  OnlineJobs.ph profile link into `url` and it appears under the home page buttons ("Also on Fiverr"),
  in the "Let's build it together" box, in the footer and on the Contact page. Empty ones stay hidden.
- **Chat apps:** `content/site.js` → `contact.whatsapp` and `contact.viber`, for example
  `"https://wa.me/639916988880"`. Each shows as a button once it's set.
- **Other socials:** `content/site.js` → `socials` (LinkedIn, Facebook page, …). Leave it empty to
  show none. (The personal Instagram was removed from the whole site.)
- **Reviews:** `content/site.js` → `about.testimonials`. Add real client quotes only; they show on
  the About page and as "Kind words" on the home page. Ask Fiverr or Upwork clients if you can quote
  their reviews here.
- **Results (optional):** each project in `content/projects.js` has an empty `results: []`. Add real
  numbers when you have them (e.g. "120 bookings in the first month") and a Results section appears
- **Resume:** your real PDF plus the experience and education entries in `content/resume.js`
- **Design tools:** `content/site.js` → `about.tools`

## Change the studio name

Edit `studioName` in `content/site.js`. The header, footer, page titles, hero and the giant footer
wordmark all update. The monogram (KS) comes from the name's first letters.
The only things that don't update automatically are the share image `og-image.png` and the
icons (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`), because they're image files.
Replace them when you have a final name or logo.

## Edit the home page

Everything on the home page comes from `content/site.js`:

- **Hero:** `eyebrow` is the small line above the name, `heroLead` is the fixed start of the headline
  and `rotating` is the list of words that cycle after it ("We design, build and scale *brands.*").
  They cycle three times, then rest on the first word. `taglineSub` is the line under it.
  `contact.availability` is the green "Taking new projects" pill.
- **The crossing ribbons:** the black one lists `capabilities`, the red one lists `promises`.
- **The blue brand scaling band** under the about strip uses `GROWTH.steps` in
  `content/services.js` and links to the Brand scaling page. Its chart is a drawing, not real data.
- **AI, used well:** `ai.points` in `content/site.js` are the four AI points, and `ai.chat` is the
  example conversation that plays in the chat window (for the made-up café Mesa; the page says so).
  Each message has `from: "them"` (the customer) or `from: "ai"`. The black "Responsive, both ways"
  box uses `contact.replyTime`.
- **Reply time:** `contact.replyTime` ("within 24 hours") is also used in the call-to-action box on
  every page, the Services FAQ intro and the Contact page. If you change it, also change "24 hours" in
  `contact.availability`, `promises`, `ticker`, `fullBio`, `reasons` and the "How fast do you reply?"
  answer in `FAQ`.
- **Why Kian Studio:** `reasons` are the tiles. The big price tile comes from `PRICING.startingAt` in
  `content/services.js`. Add `live: true` to a reason to give it links to the live projects.
- **The ticker strip** across the top of every page is `ticker`. A ▲ shows in green and a ▼ in red,
  so `"Hidden fees ▼ none"` reads like a falling stock. Write whatever you like.
- **The stage** under the hero shows a project's screens on a laptop and a phone. The phone uses the
  first phone screenshot (taller than wide) of the project marked `heroPhone: true` in
  `content/projects.js` (now The One App).
- **Selected work** is a sideways reel of every project with `featured: true`, in file order. Visitors
  swipe it, drag it with the mouse, or use the arrows. Each card's color is the project's `accent`.
- **Everything, under one roof** shows every service in `content/services.js` as a colored pill. A
  service with a `price` gets a small price tag, and each pill links to that service on the Services page.
- **Any design. Any style.:** the Style Lab shows one made-up café ("Mesa") in 20 styles. Visitors can
  type their own business name, and "Start in this style" opens the planner with that style and name
  already picked. To change the demo text or the styles, edit `LAB` and `STYLES` near the top of
  `assets/js/main.js`. Each style's look is a `.lab[data-lab="…"]` block in `assets/css/style.css`.

## The project planner (Contact page)

Visitors tick what they need, then pick a style, a budget and a timeline. They can send the brief by
email, by text, or with **Copy brief**, which copies it so they can paste it into any chat (Fiverr,
Upwork, WhatsApp, Viber, Messenger). The checkboxes come from the services in
`content/services.js`, and the budget and timeline choices come from `PRICING.budgets` and
`PRICING.timelines`.

Links can pre-fill the planner, for example
`contact.html?style=neon&name=Mesa%20Cafe&plan=Standard&need=Brand%20Identity#planner`.
The site already does this from the Style Lab, the plan cards, each service's "Get a quote" link and
each case study's "Want something like this?" box. A plan link ticks that plan's `need` service and
adds a line like "I’m interested in the Standard plan ($160)." to the brief.

On phones, the plan cards, the "Why work with us" tiles and the scaling steps become sideways swipe
rows so the page stays short. A "Get a quote" / "Call" bar appears at the bottom of every page except Contact once a
visitor scrolls past the top.

## Add a project

1. Make a folder `assets/img/projects/<slug>/` (e.g. `assets/img/projects/kape-lokal/`) and put the
   screenshots in it. WebP at about **1600px wide** is ideal; add an ~800px copy for phones if you can.
   Phone screenshots (taller than wide) show automatically in a phone frame.
2. Open `content/projects.js`, copy one block, and paste it where you want it in the list (order
   on the site = order in the file). Fill in the fields:

```js
{
  slug: "kape-lokal",                 // used in the address: project.html?p=kape-lokal
  title: "Kape Lokal",
  category: "Branding",               // new categories get their own filter button automatically
  year: "2026",
  client: "Kape Lokal Coffee",
  role: "Brand identity",
  accent: "#e2442a",                  // tint behind the screenshots on the case study
  featured: true,                     // show in the home page's work reel
  heroPhone: false,                   // true puts this project's phone screenshot on the home stage
  summary: "Two to four sentences about the project.",
  sections: [{ heading: "The brief", body: "..." }],
  tools: ["Figma", "Illustrator"],
  features: ["Online ordering", "Loyalty stamps"],  // the "What it does" list
  results: ["Opened with a full brand kit in 3 weeks"],
  link: "https://example.com",       // or "" for none
  loop: "assets/video/loops/kape-lokal.mp4",        // optional muted clip on the card
  videos: [                                        // optional; the first one is the case study's cover
    { src: "assets/video/kape-lokal.mp4", poster: "assets/img/projects/kape-lokal/cover-1600.webp",
      title: "Brand film", duration: "0:45", w: 1280, h: 720 },
  ],
  images: [
    { src: "assets/img/projects/kape-lokal/cover-1600.webp", small: "assets/img/projects/kape-lokal/cover-800.webp",
      alt: "Describe what the image shows", w: 1600, h: 1000 },
  ],
},
```

`w` and `h` are the image's real size in pixels. In Finder, select the image and press
Cmd+I to see it. The first image is the cover.

**Videos:** MP4 (H.264) at about 1280px wide keeps files small; export with "optimize for web" /
"fast start" if your editor offers it. Videos only download when someone presses play, and card
clips (5–10 seconds, no sound, under ~1 MB) only play while they're on screen. Neither plays for
visitors who've turned on "reduce motion".

Add `frame: "browser"` to a video that's a screen recording of a website or web app to show it in a
browser window. Add `art: true` to an image that's a still from a promo video (not a screenshot) so
it isn't used in the home page's device mockups.

The POS and Inventory case studies are OnTrack, captured from its made-up Demo Bistro restaurant.

## Add or edit a service

Edit `content/services.js`. Each service has a `name`, `description`, `includes` list and an
optional `price` such as `"From $80"`. Leave `price: ""` to show "Quoted per project" (Brand
Identity and everything except websites are quoted this way now). Add `page: "brand-scaling.html"`
(or any page) to give a service a "How it works" link on the Services page and make its home page
pill link there.

## The brand scaling & ads page

`brand-scaling.html` is built from `GROWTH` in `content/services.js`:

- `channels`: where the ads run (Facebook & Instagram, Google Search, Google Maps, TikTok, …)
- `steps`: the scaling loop (Audit, Plan, Create, Launch & test, Scale), also on the home page
- `deliverables`: the "What you get" list
- `faq`: the ads questions. They're also given to Google as FAQ data for search results.

The monthly report on the page is a sample with made-up numbers for the made-up café Mesa, and it's
labeled that way. Keep it labeled until you can show a real client's report (with their permission).

## Change prices, plans or the FAQ

Also in `content/services.js`:

- `PRICING.startingAt` is the headline price ("Starts as low as $80"). It also shows in the hero
  sticker, the price tile, the call-to-action at the bottom of every page and the phone quote bar.
  `PRICING.note` is the line under the pricing heading.
- `PRICING.plans` are the four plan cards: Basic $80 (1 page), Standard $160 (3 pages), Premium $275
  (5 pages) and Custom. Set a plan's `price` to `""` to show "Custom quote", `featured: true` to make
  one dark, and `need` to the service the planner should tick when someone picks that plan.
- If you change the prices, also update the words "$80" in `promises` and `ticker` in
  `content/site.js`, `seo.description`, the meta descriptions in `index.html`, `services.html` and
  `contact.html`, the `<title>` of `services.html`, the cost answer in `FAQ`, the "Do I need a
  website first?" answer in `GROWTH.faq`, and the share image `og-image.png`.
- `FAQ` is the list of questions on the Services page.

## Replace the resume

Save your resume as `assets/files/Carl-Palacio-Resume.pdf`, replacing the placeholder file.
To use a different file name, change `pdf` in `content/resume.js`. Update the on-page summary
in the same file.

## Turn on the contact form

1. Create a free form at <https://formspree.io> and copy its endpoint, for example
   `https://formspree.io/f/abcdwxyz`.
2. Paste it into `contact.formEndpoint` in `content/site.js`.

The form appears on the Contact page and sends messages to the email you set in Formspree
(use the studio address, kianhuatstudio@gmail.com, which is `contact.email` in `content/site.js`).
Until then, the page shows phone and email links (plus WhatsApp, Viber and your marketplace
profiles once they're set).

## Deploy

The site is static files, so it deploys anywhere with **no build command**.
Upload this whole folder. You can leave out `.claude/`, `listing-kit/`, `README.md` and `PROMPT.md`,
which aren't part of the site (anything you upload can be opened by visitors). The videos make the folder
about 75 MB, which is fine on all three hosts below.

**Netlify:** go to <https://app.netlify.com/drop> and drag this folder onto the page. Done.
For updates, drag it again (or connect a GitHub repo: leave the build command empty and set the
publish directory to `/`).

**Vercel:** put the folder in a GitHub repo, then on <https://vercel.com/new> import the repo,
choose **Framework preset: Other**, leave the build command empty and the output directory as `.`.

**GitHub Pages (how the site is live now):** the site is the repo
<https://github.com/carlpalacio/kian-studio>, published from the `main` branch at
<https://carlpalacio.github.io/kian-studio/>. Every push to `main` updates the live site within a
minute or two. `PROMPT.md`, `listing-kit/` and `.claude/` are left out by `.gitignore`. The `.nojekyll` file is
already included.

**After each update, bump the version.** Browsers keep the site's files for up to 10 minutes, so
returning visitors could otherwise see old prices or text. Every `.html` file loads its CSS, scripts
and share image with a version on the end (now `?v=3`). Change all of them to the next number
(`?v=4`, `?v=5`, …) whenever you publish changes; a find-and-replace of `?v=3` across the `.html`
files does it.

If you move to a custom domain or another host:

- Change `seo.siteUrl` in `content/site.js` to the new address.
- Change the share image address in the `<head>` of each `.html` file
  (`content="https://carlpalacio.github.io/kian-studio/og-image.png?v=3"`). Some apps, like Facebook and
  LinkedIn, only read full addresses.
- Change the addresses in `sitemap.xml`.
- The custom 404 page works on Netlify, Vercel, a custom domain, and GitHub Pages project sites like
  this one (`username.github.io/repo/`). The one exception is a `username.github.io` user site with
  no repo folder in the address, where it would need `<base href="/">` in `404.html` instead of the
  small script.

**Help Google find the site:** add the site to <https://search.google.com/search-console> (choose
"URL prefix" and paste the site address), then submit `sitemap.xml` under Sitemaps. Add a page to
`sitemap.xml` whenever you add one to the site, including each new project's `project.html?p=…`.

## Notes

- **Fonts:** Inter Tight, Instrument Serif and JetBrains Mono, loaded from Google Fonts.
- **Style Lab fonts** (about 25 faces) only load when a visitor scrolls near the lab, and only the
  characters the lab uses are downloaded.
- **Motion:** a short intro curtain on the first home page visit of each session, letters that drop
  in and squash (hero title, footer wordmark), prices that roll up digit by digit, the hero price
  sticker slapping on, cards that swing in like tickets, service pills that pop in, headings that
  wipe in, the ticker, a rubber stamp when the planner brief is sent or copied, springy buttons,
  the rotating hero words, the scrolling ribbons (they pause on hover), the Style Lab slideshow (it
  pauses on hover, while someone types a name, and once a visitor picks a style), the scroll
  progress bar, the "View" cursor on project cards, the card video clips, the brand scaling chart
  drawing itself, the report bars growing and the AI chat playing (only while it's on screen).
- **Smooth scrolling** on desktops with a mouse or trackpad uses Lenis (loaded from jsDelivr). Phones
  and touch screens keep their normal scrolling. If Lenis can't load, the site scrolls normally.
- **Reduce motion:** all of the above turns off for visitors who set "reduce motion" on their
  device. There's no intro, everything shows in place, the ribbons and ticker are still lists, the
  lab waits for a click, the charts are already drawn and the AI chat shows the whole conversation.
- **Screenshots** of Inest and Onsite were captured from the live sites, and the OnTrack ones from
  its demo restaurant. Re-capture them whenever those products change.
- **"First call free"** appears in the red ribbon (`promises` in `content/site.js`), the FAQ
  (`content/services.js`), and, in `assets/js/main.js`, the call tile under "Why Kian Studio" and the
  planner's "what happens next" list. Change all four if that ever changes.
