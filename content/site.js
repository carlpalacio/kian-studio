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

  // Hero. `rotating` words cycle after `heroLead` ("We design, build and grow websites.").
  eyebrow: "Design & build studio",
  tagline: "We design, build and grow brands.",
  heroLead: "We design, build and grow",
  rotating: ["brands.", "websites.", "online stores.", "mobile apps.", "POS systems.", "AI assistants.", "ad campaigns."],
  taglineSub: "Websites, apps, POS systems, AI assistants and ads, in any style and made easy for everybody.",

  shortBio:
    "Kian Studio designs and builds everything a growing business needs: brands, websites, apps, POS and inventory systems, AI assistants and ads, in any style.",

  fullBio: [
    "I'm Carl Palacio, the founder of Kian Studio. We design and build what businesses need to look professional, run smoothly and grow: brand identities, websites, custom apps, point-of-sale and inventory systems, AI assistants and ad campaigns.",
    "Our work ranges from a booking and billing platform for a condominium in Cebu City to a construction tracker that works without signal, a restaurant POS with live inventory and an all-in-one fitness app. Every project is designed from scratch in whatever style fits the brand: minimal, bold, playful or premium.",
    "We work remotely with clients anywhere. You deal with the people designing and building your project from the first call to launch day, and we stay on afterwards for hosting, updates and growth.",
  ],

  // Profile photo. Put your photo in assets/img/ and set the path, e.g. "assets/img/carl.webp".
  // Leave "" to show a labeled placeholder.
  photo: "",

  contact: {
    phoneDisplay: "0991 698 8880",
    phoneLink: "+639916988880", // international format used for tap-to-call
    instagram: { handle: "@carlpalacio", url: "https://instagram.com/carlpalacio" },
    email: "carlpalacio05@gmail.com", // Leave "" to hide.
    // Contact form: create a free form at https://formspree.io and paste its endpoint,
    // e.g. "https://formspree.io/f/abcdwxyz". Leave "" to hide the form.
    formEndpoint: "",
    availability: "Taking new projects. Replies within 1–2 business days.",
  },

  // Extra links shown in the footer and contact page. Add as many as you like:
  // { label: "LinkedIn", url: "https://linkedin.com/in/..." }
  socials: [{ label: "Instagram", url: "https://instagram.com/carlpalacio" }],

  // The scrolling list of everything the studio can take on (home page).
  capabilities: [
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

  // The red ribbon on the home page: short reasons to pick the studio.
  promises: ["Projects from $500", "Any style, never a template", "First call free", "One team for everything", "Remote, worldwide", "Support after launch"],

  // "Why Kian Studio" on the home page. The first tile is the price (from content/services.js).
  reasons: [
    { title: "Any style. Never a template.", body: "Every design starts from a blank page and the feeling you want, so your brand looks like nobody else’s." },
    { title: "Live work you can try today.", body: "Don’t take our word for it. Open the products we’ve shipped and use them yourself.", live: true },
    { title: "One team for everything.", body: "Brand, website, apps, AI and ads from the same people, so nothing gets lost between agencies." },
    { title: "Easy for everybody.", body: "Designed so owners, staff and customers get it on the first try." },
    { title: "You talk to the builders.", body: "No account managers in between. You deal with the people designing and building your project." },
    { title: "Here after launch.", body: "Hosting, updates, new features, ads and content, month to month, so you never have to chase anyone." },
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
      "Ads & brand scaling",
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
      "Kian Studio designs and builds brands, websites, apps, POS and inventory systems, AI assistants and ad campaigns for growing businesses, in any style. Projects start at $500.",
  },
};
