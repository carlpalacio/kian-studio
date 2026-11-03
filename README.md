# Kian Studio: website

The website for Kian Studio, Carl Palacio's design and build studio. It's plain HTML, CSS and JavaScript:
there's **no build step and nothing to install**. Every page reads its text, projects and
services from the small files in `content/`, so you can update the site without touching
any design code.

```
content/
  site.js       ← studio name, bio, contact details, socials, skills, the "we handle it all" list
  projects.js   ← every project (Work page, case studies, home page), with features and videos
  services.js   ← every service, the pricing plans ("Starts as low as $500") and the FAQ
  resume.js     ← resume summary + which PDF to download
assets/
  img/projects/ ← project screenshots (one folder per project)
  video/        ← project videos; video/loops/ has the short muted clips on the cards
  files/        ← Carl-Palacio-Resume.pdf
  css/style.css ← all styling
  js/main.js    ← renders the pages from /content (no need to edit)
index.html, work.html, project.html, services.html, about.html, resume.html, contact.html, 404.html
```

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
- **Other socials:** `content/site.js` → `socials`
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

- **Hero:** `heroLead` is the fixed start of the headline and `rotating` is the list of words that
  cycle after it ("We design, build and grow *websites.*"). They cycle three times, then rest on the
  first word. `taglineSub` is the line under it.
- **The crossing ribbons:** the black one lists `capabilities`, the red one lists `promises`.
- **Why Kian Studio:** `reasons` are the tiles. The big price tile comes from `PRICING.startingAt` in
  `content/services.js`. Add `live: true` to a reason to give it links to the live projects.
- **Any design. Any style.:** the Style Lab shows one made-up café ("Mesa") in 20 styles. Visitors can
  type their own business name, and "Start in this style" opens the planner with that style and name
  already picked. To change the demo text or the styles, edit `LAB` and `STYLES` near the top of
  `assets/js/main.js`. Each style's look is a `.lab[data-lab="…"]` block in `assets/css/style.css`.

## The project planner (Contact page)

Visitors tick what they need, then pick a style, a budget and a timeline. They can send the brief by
email, by text, or by copying it and opening an Instagram DM. The checkboxes come from the services in
`content/services.js`, and the budget and timeline choices come from `PRICING.budgets` and
`PRICING.timelines`.

Links can pre-fill the planner, for example
`contact.html?style=neon&name=Mesa%20Cafe&plan=Grow&need=Brand%20Identity#planner`.
The site already does this from the Style Lab, the plan cards, each service's "Get a quote" link and
each case study's "Want something like this?" box.

On phones, a "Get a quote" / "Call" bar appears at the bottom of every page except Contact once a
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
  featured: true,                     // show on the home page
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
optional `price` such as `"From $500"`. Leave `price: ""` to show "Quoted per project".

## Change prices, plans or the FAQ

Also in `content/services.js`:

- `PRICING.startingAt` is the headline price ("Starts as low as $500"). It also shows in the hero,
  the call-to-action at the bottom of every page and the contact page.
- `PRICING.plans` are the three plan cards. Set a plan's `price` to `""` to show "Custom quote", and
  `featured: true` to make one dark.
- `FAQ` is the list of questions on the Services page.

## Replace the resume

Save your resume as `assets/files/Carl-Palacio-Resume.pdf`, replacing the placeholder file.
To use a different file name, change `pdf` in `content/resume.js`. Update the on-page summary
in the same file.

## Turn on the contact form

1. Create a free form at <https://formspree.io> and copy its endpoint, for example
   `https://formspree.io/f/abcdwxyz`.
2. Paste it into `contact.formEndpoint` in `content/site.js`.

The form appears on the Contact page and sends messages to the email you set in Formspree.
Until then, the page shows phone, Instagram and email links.

## Deploy

The site is static files, so it deploys anywhere with **no build command**.
Upload this whole folder. You can leave out `.claude/`, `README.md` and `PROMPT.md`, which
aren't part of the site (anything you upload can be opened by visitors). The videos make the folder
about 75 MB, which is fine on all three hosts below.

**Netlify:** go to <https://app.netlify.com/drop> and drag this folder onto the page. Done.
For updates, drag it again (or connect a GitHub repo: leave the build command empty and set the
publish directory to `/`).

**Vercel:** put the folder in a GitHub repo, then on <https://vercel.com/new> import the repo,
choose **Framework preset: Other**, leave the build command empty and the output directory as `.`.

**GitHub Pages (how the site is live now):** the site is the repo
<https://github.com/carlpalacio/kian-studio>, published from the `main` branch at
<https://carlpalacio.github.io/kian-studio/>. Every push to `main` updates the live site within a
minute or two. `PROMPT.md` and `.claude/` are left out by `.gitignore`. The `.nojekyll` file is
already included.

If you move to a custom domain or another host:

- Change `seo.siteUrl` in `content/site.js` to the new address.
- Change the share image address in the `<head>` of each `.html` file
  (`content="https://carlpalacio.github.io/kian-studio/og-image.png"`). Some apps, like Facebook and
  LinkedIn, only read full addresses.
- The custom 404 page works on Netlify, Vercel, a custom domain, and GitHub Pages project sites like
  this one (`username.github.io/repo/`). The one exception is a `username.github.io` user site with
  no repo folder in the address, where it would need `<base href="/">` in `404.html` instead of the
  small script.

## Notes

- **Fonts:** Inter Tight, Instrument Serif and JetBrains Mono, loaded from Google Fonts.
- **Style Lab fonts** (about 25 faces) only load when a visitor scrolls near the lab, and only the
  characters the lab uses are downloaded.
- **Motion:** gentle fade-ups, a count-up, the rotating hero words, the scrolling ribbons (they pause
  on hover), the Style Lab slideshow (it pauses on hover, while someone types a name, and once a
  visitor picks a style), the scroll progress bar, the "View" cursor on project cards and the card
  video clips. All of it turns off for visitors who set "reduce motion" on their device: the
  ribbons show as still lists and the lab waits for a click.
- **Screenshots** of Inest and Onsite were captured from the live sites, and the OnTrack ones from
  its demo restaurant. Re-capture them whenever those products change.
- **"First call free"** appears in the red ribbon (`promises` in `content/site.js`), the FAQ
  (`content/services.js`), and, in `assets/js/main.js`, the call tile under "Why Kian Studio" and the
  planner's "what happens next" list. Change all four if that ever changes.
