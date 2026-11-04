/*
  SERVICES
  ────────
  One block per service, shown in this order.
    price   optional starting price, e.g. "From $80". Leave "" to show "Quoted per project".
    page    optional page with more about the service, e.g. "brand-scaling.html".
*/
window.SERVICES = [
  {
    name: "Brand Identity",
    description: "A logo and visual system that makes your business instantly recognizable, on a sign, a cup or a phone screen.",
    includes: ["Logo & variations", "Color palette & typography", "Brand guidelines", "Social media kit", "Business cards & stationery"],
    price: "",
  },
  {
    name: "Brand Scaling & Ads",
    description: "We plan, make and run the ads that bring in customers on Facebook, Instagram, Google and TikTok, then test every week and put more behind what works.",
    includes: ["Facebook & Instagram ads", "Google Search & Maps ads", "TikTok ads", "Ad images, video & copy", "AI-made variations to test", "Landing pages & tracking", "Weekly tuning & monthly reports"],
    price: "",
    page: "brand-scaling.html",
  },
  {
    name: "Websites & Landing Pages",
    description: "Fast, mobile-first websites that explain what you do and turn visitors into customers.",
    includes: ["Custom design in any style", "Responsive build", "Contact & booking forms", "Basic SEO & analytics", "Hosting setup & launch"],
    price: "From $80",
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
  Each plan's `price` is shown as written, like "$80", or "" to show "Custom quote".
  `need` (optional) ticks that service in the Contact page planner when someone picks the plan.
  `budgets` and `timelines` are the choices in the project planner on the Contact page.
*/
window.PRICING = {
  startingAt: "$80",
  note: "Websites have fixed prices. Apps, systems, stores, branding, AI and ads get a custom quote after a free call.",
  plans: [
    {
      name: "Basic",
      price: "$80",
      for: "A one-page website or landing page.",
      includes: ["1 page, designed or redesigned", "Designed in any style", "Contact form", "Mobile & tablet ready"],
      need: "Websites & Landing Pages",
    },
    {
      name: "Standard",
      price: "$160",
      for: "A three-page website for a small business.",
      includes: ["3 pages, designed or redesigned", "Designed in any style", "Contact form", "Mobile & tablet ready"],
      need: "Websites & Landing Pages",
      featured: true,
    },
    {
      name: "Premium",
      price: "$275",
      for: "A five-page website with room to grow.",
      includes: ["5 pages, designed or redesigned", "Designed in any style", "Contact form", "Mobile & tablet ready"],
      need: "Websites & Landing Pages",
    },
    {
      name: "Custom",
      price: "",
      for: "Apps, systems, stores and anything bigger.",
      includes: ["More pages or an online store", "Web & mobile apps", "POS & inventory systems", "AI assistants & automation", "Brand scaling, ads & content"],
    },
  ],
  budgets: ["Under $300", "$300 – $1,000", "$1,000 – $5,000", "$5,000+", "Not sure yet"],
  timelines: ["As soon as possible", "Within a month", "In 1–3 months", "I’m flexible"],
};

/*
  FAQ (Services page)
*/
window.FAQ = [
  {
    q: "How much does a project cost?",
    a: "Websites have fixed prices: $80 for one page, $160 for three pages and $275 for five. Brand identities, brand scaling and ads, online stores, apps, POS and inventory systems and AI assistants depend on what you need, so we quote them after a quick call.",
  },
  {
    q: "How fast do you reply?",
    a: "Within 24 hours, any day of the week. You talk to the people doing the work, so you get real answers, not a ticket number.",
  },
  {
    q: "Is the first call free?",
    a: "Yes. Tell us about your business on a call or in a message, and we’ll suggest what you need and send a clear quote. No pressure, no commitment.",
  },
  {
    q: "What can you help with?",
    a: "Pretty much anything your business needs designed, built, automated or scaled: brands, websites, online stores, apps, POS and inventory, AI assistants, ads and brand scaling, social content, SEO and hosting. If it isn’t on the list, ask.",
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
    a: "We can host, update and maintain everything we build, add new features as you grow, and run your ads and content month to month to keep scaling the brand.",
  },
];

/*
  BRAND SCALING & ADS (brand-scaling.html, and the dark band on the home page)
  ────────────────────────────────────────────────────────────────────────────
  channels      where the ads run
  steps         the scaling loop, in order
  deliverables  what's included every month
  faq           questions about ads
*/
window.GROWTH = {
  channels: [
    { name: "Facebook & Instagram", body: "Reach the right people nearby, bring back visitors who didn’t buy, and collect leads and messages." },
    { name: "Google Search", body: "Show up at the top when people search for exactly what you sell." },
    { name: "Google Maps", body: "Get found by people close by, with more calls, directions and visits." },
    { name: "TikTok", body: "Short, scroll-stopping videos that put your brand in front of new customers." },
    { name: "YouTube", body: "Video ads that tell your story and keep your brand top of mind." },
    { name: "Messenger & WhatsApp", body: "Ads that start a chat, answered right away by your own AI assistant." },
  ],
  steps: [
    { name: "Audit", body: "We look at your brand, offer, pages and past ads to find what’s holding you back." },
    { name: "Plan", body: "Who to reach, what to say, where to spend, and the numbers we’ll judge it by." },
    { name: "Create", body: "Ad images, short videos and copy, plus AI-made variations so there’s lots to test." },
    { name: "Launch & test", body: "We set up tracking, launch, and test offers, audiences and creatives side by side." },
    { name: "Scale", body: "Every week, we cut what doesn’t work and put more behind what does." },
  ],
  deliverables: [
    "Ad strategy & audience plan",
    "Ad images, short videos & copy",
    "AI-made variations to test",
    "Landing pages that match the ads",
    "Tracking set up (Meta Pixel, Google tag)",
    "Weekly tuning of budgets & ads",
    "A clear monthly report & next steps",
    "Brand kit & content to back it all up",
  ],
  faq: [
    {
      q: "Is the ad budget included in your fee?",
      a: "No. You pay Meta, Google or TikTok directly for the ads, so you always see exactly where your money goes. Our fee covers the planning, creative, setup and management.",
    },
    {
      q: "How much should I spend on ads?",
      a: "It depends on your market and goals. We’ll suggest a starting budget on the free call, test small first, then put more behind the ads that work.",
    },
    {
      q: "When will I see results?",
      a: "Ads start collecting data within days, and we usually judge them after a few weeks of testing. Nobody can honestly promise results in advance, but every report shows exactly what’s working.",
    },
    {
      q: "Do I keep my ad accounts and pages?",
      a: "Yes. Everything runs in your own accounts, so you keep the ads, the data and the audiences.",
    },
    {
      q: "Can you make the ads and videos too?",
      a: "Yes. We design the images, edit short videos and write the copy, and use AI to make extra variations to test.",
    },
    {
      q: "Do I need a website first?",
      a: "Not always. Ads can send people to a chat, a lead form or your Google profile. If a landing page will help, we can build one, from $80.",
    },
  ],
};
