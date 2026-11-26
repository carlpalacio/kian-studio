# Onsite: the studio page

The website for Onsite, Carl Palacio's design and build studio, live at <https://onsiteph.com>
(www.onsiteph.com forwards there). getonsiteapp.com (the old domain) forwards to onsiteph.com since 2026-11-26.
It's plain HTML, CSS and JavaScript with nothing to install. Every page draws its words, projects and
services from the small files in `content/`, so most changes never touch design code.

```
content/
  site.js       ← studio name, tagline, intro, bio, contact details, "What we do", "Why Onsite", skills
  projects.js   ← every project: its card, its page at /work/<slug>, its pictures
  services.js   ← services, the example AI chat, "How we work", the planner's timing choices,
                  the Services FAQ and the Brand scaling page (GROWTH)
  resume.js     ← the "Experience" part of the About page
assets/
  css/style.css ← all styling
  js/main.js    ← draws every page from /content (header, footer, sections, the planner, the Style lab)
  img/projects/ ← project pictures, one folder per project
  brand/        ← logo, Instagram and profile pictures (not linked from the pages)
index.html, work.html, services.html, brand-scaling.html, styles.html, about.html, contact.html, 404.html
work/<slug>.html ← one per project, written by tools/build-pages.js
tools/build-pages.js ← writes every page's <head>, the project pages and sitemap.xml
server/         ← the small server that takes the planner's messages (see "The contact server")
listing-kit/    ← marketplace images and gig text (not part of the site, left out by .gitignore)
```

## The pages

The header shows Work, Services, Brand scaling, Styles and About, plus "Get a quote", which opens
Contact. On phones they sit in the menu with a call button. The list is `NAV` near the top of
`assets/js/main.js`; the footer's "Pages" list uses the same list.

- **Home:** the name, tagline and `intro`, then the work reel (clients first, then our own products),
  "What we do" (`whatWeDo`), "Why Onsite" (`reasons`) and the "Start a project" box.
- **Work:** two groups, "Built for clients" and "Our own products", from `content/projects.js`.
- **Work / <project>:** what it does, its screens, results (once there are some) and the next project.
- **Services:** the services in their four groups, "How we work" (`PROCESS`) and the FAQ (`FAQ`).
- **Brand scaling:** `GROWTH` in `content/services.js`. The monthly report on the page is a sample for
  the made-up café Mesa and says so, and it shows no money.
- **Styles:** the Style lab, one made-up café ("Mesa") in 20 styles. `LAB` and `STYLES` near the top of
  `assets/js/main.js` hold its text and styles; each style's look is a `.lab[data-lab="…"]` block in
  `assets/css/style.css`.
- **About:** the bio, then "Experience" (`content/resume.js`, at `/about#resume`), "Education" once it's
  filled in, and "Skills & tools".
- **Contact:** the project planner (see below).

There are no prices anywhere on the site: every project is quoted after a free call.

## Run it on your computer

The live site gets its clean addresses (`/work`, `/work/middleware`) from Caddy, so a plain
`python3 -m http.server` only works if you add `.html` to addresses. Open the `.html` files that way,
or use any small server that tries `<path>.html` when `<path>` doesn't exist.

## Change the words

- **Name, tagline, intro, bio:** `content/site.js`. Leave any value `""` to hide it.
- **Contact details:** `contact` in `content/site.js`. The phone shows in the menu, the footer and the
  planner; the email shows as plain text in the footer only.
- **"Find us" in the footer:** shows only once something in it is set: `contact.whatsapp`,
  `contact.viber`, a `url` in `marketplaces` or in `socials` (Instagram onsiteph goes there once the
  account is ready).
- **Reply time:** `contact.replyTime` ("within 24 hours") is used in the "Start a project" box and the
  planner.
- **Testimonials:** `about.testimonials` in `content/site.js`. Real client quotes only.
- **Photo:** add `assets/img/carl.webp` (about 1000×1250) and set `photo` in `content/site.js`.

## Add a project

1. Put its pictures in `assets/img/projects/<slug>/`, about 1600px wide plus an 800px copy for phones.
   Pictures must come from made-up demo data only, never a client's real data.
2. Copy a block in `content/projects.js` and fill it in. The comment at the top of that file explains
   every field (`line`, `forClient`, `forWho`, `status`, `hero`, `service`, `sections`, `results`,
   `images`, …). The order in the file is the order on the site: client work first, then our own.
3. Run `node tools/build-pages.js <next version>` (below). It writes `work/<slug>.html` and adds the
   page to `sitemap.xml`.

`/contact?for=<slug>` opens the planner with that project's `service` ticked and "I'd like something
like <name>." in the brief.

## Add or change a service

Edit `content/services.js`. Each service has a `group`, `name`, `label` (its short name on the planner),
`key` and the `includes` list. `/contact?for=<key>` opens the planner with it ticked. `page` and
`pageLabel` add a link to a page about it, like "About brand scaling".

## The project planner (Contact page)

Visitors tick what they need, pick a style (or "Not sure yet") and a timing, then fill in their details.
The brief beside it updates as they go and is sent to the contact server. Links can pre-fill it:

- `/contact?for=middleware`, `/contact?for=ontrack` (or `pos`), `/contact?for=ads`: a project or a
  service `key`
- `/contact?style=neon&name=Mesa%20Cafe`: a style from the Style lab and the business name

The older `?need=` and `?like=` links still work.

## Publish a change

1. Run `node tools/build-pages.js <number>` with the next version number (it's in every page's
   `?v=`). This rewrites every page's `<head>` so visitors get the new files, writes the project pages
   and the sitemap.
2. Commit and push to `main` (<https://github.com/carlpalacio/kian-studio>).
3. From this folder:

```bash
rsync -az --delete -e "ssh -i ~/.ssh/sitetracker" --exclude .git --exclude .claude --exclude listing-kit --exclude README.md --exclude PROMPT.md --exclude server --exclude tools --exclude .DS_Store ./ root@143.198.207.20:/opt/kian-studio/
```

Caddy serves the site from `/opt/kian-studio` on the same server as Onsite (143.198.207.20, SSH key
`~/.ssh/sitetracker`). Its settings in `/etc/caddy/Caddyfile` give the clean addresses
(`try_files {path} {path}.html`), serve `404.html` with status 404 for a `/work/` address with no
project, and forward old addresses: `/resume` to `/about#resume`, `/work/pos-system` to `/work/ontrack`,
`/project.html?p=x` to `/work/x`. Any other address that isn't a file is an old Onsite link and
forwards to oncon.onsiteph.com. Other sessions edit that file too, so always download the live copy, edit it, check it
with `caddy validate`, upload it and reload Caddy. Never upload an old copy.

getonsiteapp.com (the old domain) forwards to onsiteph.com since 2026-11-26: every old address goes to
the same path on the new one, except `/sw.js` (below).

Keep `sw.js`: it retires OnCon's old service worker on phones that installed OnCon at getonsiteapp.com.
Browsers don't follow a forward for a service worker, so Caddy must keep answering
`getonsiteapp.com/sw.js` with this file itself, not forward it.

## The contact server

`server/studio.py` takes the planner's messages (`POST /api/contact`) and hands them to Carl's IT
console at <https://it.onsiteph.com> (Messages). The console calls it on the server itself, at
`/api/it-console/overview` and `/api/it-console/message-read`; those answer only a call from 127.0.0.1
that carries the console's code and no forwarding header. Every `/admin` address forwards to the
console's Messages page.

It runs as the `studio` service from `/opt/studio`, with its data in `/var/lib/studio`. The page's
`rsync` above leaves `server/` out. To put a server change live:

```bash
rsync -az -e "ssh -i ~/.ssh/sitetracker" server/ root@143.198.207.20:/opt/studio/ && ssh -i ~/.ssh/sitetracker root@143.198.207.20 "python3 -m py_compile /opt/studio/studio.py && systemctl restart studio && sleep 1 && systemctl is-active studio"
```

Its settings come from the environment, never from a file here: `IT_CONSOLE_TOKEN_SHA256` (set by the
console's own deploy in `/etc/systemd/system/studio.service.d/it-console.conf`), `IT_CONSOLE_URL`
(default `https://it.onsiteph.com`) and `STUDIO_URL` (default `https://onsiteph.com`; the contact form
is taken only from this address). Tests: `cd server && python3 -m unittest discover -s tests`.

## Still waiting on Carl

- **Resume:** `startYear`, `past` roles and `education` in `content/resume.js`. The "Download resume
  (PDF)" button shows once `pdfReady` is `true`; put the rebuilt PDF at the `pdf` path first.
- **Inest pictures** from a demo copy (the current ones are kept until then).
- **Photo, testimonials, Instagram onsiteph,** and real `results` for each project.

## Notes

- **Fonts:** Inter Tight, Instrument Serif and JetBrains Mono from Google Fonts. The Style lab's fonts
  load only when a visitor comes near the lab.
- **Motion:** one gentle fade-and-rise as things come into view, the hero letters rising in, the work
  reel's heading swapping between "Built for clients" and "Our own products", the FAQ and menu
  opening smoothly, and the Style lab's slideshow (it stops once a visitor picks a style). Nothing
  loops forever. All of it turns off for visitors who set "reduce motion".
- **Smooth scrolling** on desktops with a mouse or trackpad uses Lenis (from jsDelivr). Phones keep
  their normal scrolling, and if Lenis can't load the site scrolls normally.
- **Share image and icons** (`og-image.png`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`)
  are image files, so they don't change when the words do.
