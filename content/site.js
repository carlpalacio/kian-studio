/*
  SITE SETTINGS
  ─────────────
  The studio's name, words and contact details. Change a value, save, refresh.
  Leave a value as "" (empty) to hide it. Nothing here is ever shown as a placeholder.
*/
window.SITE = {
  studioName: "Onsite",
  owner: "Carl Palacio",
  // About page, under "Hi, I'm Carl."
  role: "Founder of Onsite. Designer and developer.",
  tagline: "Making life easier.",
  // The one sentence under the name at the top of the home page.
  intro: "We make our own products, like OnCon and OnTrack, and build websites, apps and business systems for other companies.",

  // About page: two short paragraphs. A link to the work follows the last one.
  bio: [
    "I’m Carl Palacio, the founder of Onsite. We design and build what businesses need to look professional, run smoothly and grow, from scratch and in whatever style fits them.",
    "You talk to the people designing and building your project, from the first call to launch day, and we stay on after launch to keep everything running and up to date.",
  ],

  // Portrait for the About page, e.g. "assets/img/carl.webp" (about 1000×1250). Leave "" for a one-column page.
  photo: "",

  contact: {
    phoneDisplay: "0991 698 8880",
    phoneLink: "+639916988880", // international format used for tap-to-call
    email: "carlpalacio05@gmail.com", // shown as plain text in the footer only
    // Optional chat apps, e.g. "https://wa.me/639916988880". They show in the footer's "Find us" once set.
    whatsapp: "",
    viber: "",
    availability: "Taking new projects.",
    replyTime: "within 24 hours",
    remote: "Working remotely with clients worldwide",
  },

  // Profiles shown in the footer's "Find us" line once their `url` is set. Empty ones stay hidden.
  marketplaces: [
    { label: "Fiverr", url: "" },
    { label: "Upwork", url: "" },
    { label: "OnlineJobs.ph", url: "" },
  ],
  socials: [
    { label: "Instagram", url: "" }, // onsiteph, once the account is set up
  ],

  // Home page, "What we do": four rows that point to the Services page.
  whatWeDo: [
    { title: "Websites & online stores", body: "Fast, mobile-first sites and stores that explain what you do and take orders." },
    { title: "Apps & business systems", body: "POS, bookings, payments and custom apps, built around how your business works." },
    { title: "AI assistants", body: "Assistants that answer your customers and take bookings, day and night." },
    { title: "Brand & ads", body: "A brand people remember, and the ads that bring in customers.", link: { label: "How we scale brands", href: "/brand-scaling" } },
  ],

  // Home page, "Why Onsite".
  reasons: [
    { title: "One team for everything", body: "Brand, website, apps, AI and ads from the same people, so nothing gets lost between agencies." },
    { title: "You talk to the builders", body: "No account managers in between. You deal with the people designing and building your project." },
    { title: "Any style, never a template", body: "Every design starts from a blank page and the feeling you want.", link: { label: "See the styles", href: "/styles" } },
  ],

  about: {
    // "Skills & tools" on the About page.
    skills: [
      "Brand identity",
      "Logo design",
      "Web design",
      "UI / UX",
      "Web & app development",
      "Offline-first apps (PWA)",
      "POS & inventory systems",
      "AI assistants & automation",
      "Ads & brand scaling",
      "SEO & local search",
      "Social media content",
      "Next.js / React",
      "Python",
      "SQLite",
      "HTML · CSS · JavaScript",
    ],
    // Real client quotes only, once there are some: { quote: "...", name: "...", title: "..." }
    testimonials: [],
  },

  seo: {
    siteUrl: "https://getonsiteapp.com",
    description:
      "Onsite makes its own products, like OnCon and OnTrack, and builds websites, apps and business systems for other companies. Every project is quoted for you.",
  },
};
