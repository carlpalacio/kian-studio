/*
  SERVICES
  ────────
  One block per service, shown in this order.
    price   optional starting price, e.g. "From $500". Leave "" to show "Quoted per project".
*/
window.SERVICES = [
  {
    name: "Brand Identity",
    description: "A logo and visual system that makes your business instantly recognizable, on a sign, a cup or a phone screen.",
    includes: ["Logo & variations", "Color palette & typography", "Brand guidelines", "Social media kit", "Business cards & stationery"],
    price: "From $500",
  },
  {
    name: "Websites & Landing Pages",
    description: "Fast, mobile-first websites that explain what you do and turn visitors into customers.",
    includes: ["Custom design in any style", "Responsive build", "Contact & booking forms", "Basic SEO & analytics", "Hosting setup & launch"],
    price: "From $500",
  },
  {
    name: "E-commerce & Online Ordering",
    description: "Online stores and ordering pages that take payments and send orders straight to your team.",
    includes: ["Product catalog", "Cart & checkout", "Online payments", "Pickup & delivery options", "Order notifications"],
    price: "",
  },
  {
    name: "Web & Mobile Apps",
    description: "Custom apps for bookings, operations and customers, like Inest, Onsite and The One App.",
    includes: ["User flows & UI design", "Web app or installable app (PWA)", "Logins & user roles", "Offline support when needed", "Launch & support"],
    price: "",
  },
  {
    name: "POS & Inventory Systems",
    description: "Point-of-sale and stock tracking built around how your shop or restaurant actually works, like OnTrack.",
    includes: ["Tables, orders & receipts", "Cash & QR payments", "Recipes & stock levels", "Deliveries & suppliers", "Daily profit reports"],
    price: "",
  },
  {
    name: "AI Assistants & Automation",
    description: "AI assistants that answer customers, take bookings and orders, and handle the busywork, day and night.",
    includes: ["Website & Messenger chat assistants", "Trained on your products & FAQs", "Bookings & lead capture", "Internal assistants for your team", "Automated reports & follow-ups"],
    price: "",
  },
  {
    name: "Ads & Brand Scaling",
    description: "Campaigns that bring in customers, and the brand, content and landing pages to back them up.",
    includes: ["Facebook & Instagram ads", "Google & TikTok ads", "Ad creative & video", "Landing pages & tracking", "Monthly results reports"],
    price: "",
  },
  {
    name: "Social Media & Content",
    description: "A consistent, on-brand feed that keeps your business top of mind.",
    includes: ["Content calendar", "Post & story design", "Short-form video editing", "Captions", "Brand templates"],
    price: "",
  },
  {
    name: "SEO & Google Business",
    description: "Get found on Google and Maps by the people already searching for what you sell.",
    includes: ["Google Business Profile", "Local SEO", "Site speed & structure", "Search Console & analytics", "Review strategy"],
    price: "",
  },
  {
    name: "UI / UX Design",
    description: "Clear, simple interfaces for apps and dashboards, designed and tested before a line of code.",
    includes: ["User flows", "Wireframes", "High-fidelity screens", "Clickable prototype", "Design system"],
    price: "",
  },
  {
    name: "Hosting, Care & Support",
    description: "We keep everything we build online, secure and up to date, so you never have to think about it.",
    includes: ["Domains & business email", "Hosting & backups", "Updates & fixes", "New pages & features", "Priority support"],
    price: "",
  },
  {
    name: "Anything Else",
    description: "Menus, packaging, signage, pitch decks, spreadsheets, a system nobody has built yet. If your business needs it, we’ll handle it.",
    includes: ["Print & packaging", "Signage & menus", "Presentations", "Custom tools & integrations", "Just ask"],
    price: "",
  },
];

/*
  PRICING
  ───────
  Shown on the home page and the Services page. `startingAt` is the headline price.
  Each plan's `price` can be a number like "From $500" or "" to show "Custom quote".
  `budgets` and `timelines` are the choices in the project planner on the Contact page.
*/
window.PRICING = {
  startingAt: "$500",
  note: "Every project gets a clear quote before any work starts. Bigger builds are quoted on scope.",
  plans: [
    {
      name: "Launch",
      price: "From $500",
      for: "New businesses that need to look professional, fast.",
      includes: ["A logo & brand kit, or a one-page website", "Designed in any style", "Mobile-first and fast", "Social media kit", "Launch support"],
    },
    {
      name: "Grow",
      price: "",
      for: "Brands ready to get more customers.",
      includes: ["Brand, website and online store", "Ad campaigns & creative", "AI chat assistant", "SEO & Google Business", "Monthly content"],
      featured: true,
    },
    {
      name: "Build",
      price: "",
      for: "Businesses that need their own system.",
      includes: ["Custom web & mobile apps", "POS & inventory systems", "Booking & billing platforms", "Dashboards & automations", "Hosting, care & support"],
    },
  ],
  budgets: ["$500 – $1,000", "$1,000 – $3,000", "$3,000 – $10,000", "$10,000+", "Not sure yet"],
  timelines: ["As soon as possible", "Within a month", "In 1–3 months", "I’m flexible"],
};

/*
  FAQ (Services page)
*/
window.FAQ = [
  {
    q: "How much does a project cost?",
    a: "Projects start as low as $500 for a logo and brand kit or a one-page website. Bigger websites, apps, POS and inventory systems, AI assistants and ad management depend on what you need, so we quote them after a quick call.",
  },
  {
    q: "Is the first call free?",
    a: "Yes. Tell us about your business on a call or in a message, and we’ll suggest what you need and send a clear quote. No pressure, no commitment.",
  },
  {
    q: "What can you help with?",
    a: "Pretty much anything your business needs designed, built, automated or advertised: brands, websites, online stores, apps, POS and inventory, AI assistants, ads, social content, SEO and hosting. If it isn’t on the list, ask.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the project. A brand or website is much quicker than a custom app or system. You get a clear timeline with your quote, before any work starts.",
  },
  {
    q: "Do you work with clients outside the Philippines?",
    a: "Yes. We work remotely with clients anywhere, over calls, chat and email.",
  },
  {
    q: "Can you redesign or fix something I already have?",
    a: "Yes. We can refresh an existing brand, redesign a website, take over an app or connect the tools you already use.",
  },
  {
    q: "What happens after launch?",
    a: "We can host, update and maintain everything we build, add new features as you grow, and run your ads and content month to month.",
  },
];
