/*
  SITE SETTINGS
  ─────────────
  Everything about you and the studio lives here. Change a value, save, refresh.

  • Text in [square brackets] is a placeholder. The site shows it with a dotted
    outline so you can spot what still needs real content. Replace the whole
    thing, brackets included.
  • Leave a value as "" (empty) to hide it from the site.
*/
window.SITE = {
  // Change the studio name here and it updates everywhere on the site.
  studioName: "Kian Studio",
  owner: "Carl Palacio",
  role: "Founder · designer & developer",
  location: "Anywhere — working remotely with clients worldwide",

  // Hero. `rotating` words cycle after `heroLead` ("We design, build and scale websites.").
  eyebrow: "Design, build & brand scaling studio",
  tagline: "We design, build and scale brands.",
  heroLead: "We design, build and scale",
  rotating: ["brands.", "online stores.", "ad campaigns.", "websites.", "apps.", "businesses."],
  taglineSub: "Websites, apps, POS systems and AI assistants, plus the ads that grow them. Any style, made easy for everybody.",

  shortBio:
    "Kian Studio designs, builds and scales brands: websites, apps, POS and inventory systems, AI assistants, and the Facebook, Google and TikTok ads that bring in customers.",

  fullBio: [
    "I'm Carl Palacio, the founder of Kian Studio. We design, build and scale what businesses need to look professional, run smoothly and grow: brand identities, websites, custom apps, point-of-sale and inventory systems, AI assistants, and the ad campaigns that bring in customers.",
    "Our work ranges from a booking and billing platform for a condominium in Cebu City to a construction tracker that works without signal, a restaurant POS with live inventory and an all-in-one fitness app. Every project is designed from scratch in whatever style fits the brand: minimal, bold, playful or premium.",
    "We work remotely with clients anywhere and reply within 24 hours. You deal with the people designing and building your project from the first call to launch day, and we stay on afterwards to run your ads, grow your brand and keep everything up to date.",
  ],

  // Profile photo. Put your photo in assets/img/ and set the path, e.g. "assets/img/carl.webp".
  // Leave "" to show a labeled placeholder.
  photo: "",

  contact: {
    phoneDisplay: "0991 698 8880",
    phoneLink: "+639916988880", // international format used for tap-to-call
    email: "kianhuatstudio@gmail.com", // Leave "" to hide.
    // Optional chat apps. Paste your link to show a button, e.g. "https://wa.me/639916988880".
    whatsapp: "",
    viber: "",
    // Contact form: create a free form at https://formspree.io and paste its endpoint,
    // e.g. "https://formspree.io/f/abcdwxyz". Leave "" to hide the form.
    formEndpoint: "",
    availability: "Taking new projects. We reply within 24 hours.",
    replyTime: "within 24 hours", // used in "We reply within 24 hours" around the site
  },

  // Where clients can hire you. Paste your profile link into `url` and it shows under the home page
  // buttons ("Also on Fiverr"), in the "Let's build it together" box on every page, in the footer and
  // on the Contact page. Empty ones stay hidden.
  marketplaces: [
    { label: "Fiverr", url: "" },
    { label: "Upwork", url: "" },
    { label: "OnlineJobs.ph", url: "" },
  ],

  // Social pages shown in the footer and on the Contact page. Add as many as you like:
  // { label: "LinkedIn", url: "https://linkedin.com/in/..." }
  socials: [],

  // The scrolling list of everything the studio can take on (home page).
  capabilities: [
    "Brand scaling",
    "Logos & brand kits",
    "Websites",
    "Online stores",
    "Booking systems",
    "Mobile apps",
    "POS systems",
    "Inventory tracking",
    "AI chat assistants",
    "Automations",
    "Facebook & Instagram ads",
    "Google & TikTok ads",
    "Social media content",
    "SEO & Google Maps",
    "Dashboards & reports",
    "Menus & packaging",
    "Pitch decks",
    "Hosting & support",
    "Anything else you need",
  ],

  // The stock-ticker strip across the top of every page. ▲ shows in green, ▼ in red.
  ticker: ["Templates ▼ 0 used", "Websites ▲ from $80", "Your brand ▲ scaling", "Reply time ▼ under 24h", "Ad tests ▲ every week", "Design styles ▲ 20", "Hidden fees ▼ none", "Revisions ▲ until it’s right", "Your competitors ▼ nervous"],

  // The red ribbon on the home page: short reasons to pick the studio.
  promises: ["Websites from $80", "Brand scaling & ads", "Replies within 24 hours", "Any style, never a template", "First call free", "AI built in", "One team for everything", "Remote, worldwide"],

  // "AI, used well" on the home page. `chat` plays as an example conversation for a made-up café
  // (it says so on the page). `from` is "them" (the customer) or "ai".
  ai: {
    points: [
      { title: "AI assistants for your customers", body: "Answer questions, take bookings and orders, and catch leads day and night, on your website or Messenger." },
      { title: "AI in your daily work", body: "Automatic replies, order summaries, stock alerts and reports, so your team spends less time on busywork." },
      { title: "AI behind your ads", body: "More ad and caption variations, tested faster, so your budget goes to what works." },
      { title: "AI in how we work", body: "Faster drafts and builds, so you get your project sooner, at a fair price." },
    ],
    chat: [
      { from: "them", text: "Hi! Are you open on Sunday?" },
      { from: "ai", text: "Hi! Yes, we’re open Sunday from 8am to 6pm. Want me to save you a table?" },
      { from: "them", text: "Yes please, 4 people at 10am" },
      { from: "ai", text: "Done! Table for 4 on Sunday at 10:00am. I’ve sent the details to your phone." },
      { from: "them", text: "Do you have oat milk?" },
      { from: "ai", text: "We do, at no extra charge. See you Sunday!" },
    ],
  },

  // "Why Kian Studio" on the home page. The first tile is the price (from content/services.js).
  reasons: [
    { title: "Any style. Never a template.", body: "Every design starts from a blank page and the feeling you want, so your brand looks like nobody else’s." },
    { title: "Live work you can try today.", body: "Don’t take our word for it. Open the products we’ve shipped and use them yourself.", live: true },
    { title: "One team for everything.", body: "Brand, website, apps, AI and ads from the same people, so nothing gets lost between agencies." },
    { title: "Quick to reply.", body: "Message us any day and you’ll hear back within 24 hours, with real answers from the people doing the work." },
    { title: "You talk to the builders.", body: "No account managers in between. You deal with the people designing and building your project." },
    { title: "Built to scale.", body: "We don’t stop at launch. We run the ads, content and updates that keep your brand growing, month to month." },
  ],

  about: {
    skills: [
      "Brand identity",
      "Logo design",
      "Web design",
      "UI / UX design",
      "Web development",
      "App development",
      "Offline-first apps (PWA)",
      "POS & inventory systems",
      "AI assistants & automation",
      "Brand scaling & ads",
      "SEO & local search",
      "Social media content",
    ],
    tools: ["Next.js", "React", "HTML · CSS · JavaScript", "Python", "SQLite", "[Add your design tools, e.g. Figma]"],
    // Optional. Leave empty [] to hide the section.
    // { name: "Client name" }
    clients: [],
    // Optional. Leave empty [] to hide the section.
    // { quote: "...", name: "Jane Cruz", title: "Owner, Cafe Name" }
    testimonials: [],
  },

  seo: {
    // Your live address once deployed, e.g. "https://kianstudio.com" (used for share links).
    siteUrl: "https://carlpalacio.github.io/kian-studio",
    description:
      "Kian Studio designs, builds and scales brands: websites, apps, POS and inventory systems, AI assistants, and Facebook, Instagram, Google and TikTok ads. Websites start at $80.",
  },
};
