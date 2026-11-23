/*
  SERVICES
  ────────
  One block per service, shown on the Services page in these groups and this order.
    group     which heading it sits under on the Services page
    name      its full name (also what the planner sends us)
    label     the short name on the planner's chips
    key       its short address: /contact?for=<key> opens the planner with this service ticked
    page      optional page with more about it, e.g. "/brand-scaling", linked as `pageLabel`
    demo      "chat" shows the example AI chat (SITE_CHAT below) beside it
  Every project is quoted for you: there are no prices anywhere on the site.
*/
window.SERVICE_GROUPS = ["Brand & marketing", "Websites & stores", "Apps & systems", "After launch"];

window.SERVICES = [
  {
    group: "Brand & marketing",
    name: "Brand identity",
    label: "Brand identity",
    key: "brand",
    description: "A logo and visual system that makes your business instantly recognizable, on a sign, a cup or a phone screen.",
    includes: ["Logo & variations", "Colours & typography", "Brand guidelines", "Social media kit"],
  },
  {
    group: "Brand & marketing",
    name: "Social media & content",
    label: "Social media",
    key: "social",
    description: "A consistent, on-brand feed that keeps your business top of mind.",
    includes: ["Content calendar", "Post & story design", "Short-form video editing", "Captions"],
  },
  {
    group: "Brand & marketing",
    name: "SEO & Google Business",
    label: "SEO & Google",
    key: "seo",
    description: "Get found on Google and Maps by the people already searching for what you sell.",
    includes: ["Google Business Profile", "Local SEO", "Site speed & structure", "Review strategy"],
  },
  {
    group: "Brand & marketing",
    name: "Brand scaling & ads",
    label: "Ads",
    key: "ads",
    description: "Ads that bring in customers, tested every week, with your brand and pages built to back them up.",
    includes: ["Ad strategy", "Ad images, video & copy", "Landing pages & tracking", "Monthly reports"],
    page: "/brand-scaling",
    pageLabel: "About brand scaling",
  },
  {
    group: "Websites & stores",
    name: "Websites & landing pages",
    label: "Website",
    key: "website",
    description: "Fast, mobile-first websites that explain what you do and turn visitors into customers.",
    includes: ["Custom design in any style", "Contact & booking forms", "Basic SEO & analytics", "Hosting setup & launch"],
  },
  {
    group: "Websites & stores",
    name: "E-commerce & online ordering",
    label: "Online store",
    key: "store",
    description: "Online stores and ordering pages that take payments and send orders straight to your team.",
    includes: ["Product catalog", "Cart & checkout", "Online payments", "Pickup & delivery options"],
  },
  {
    group: "Websites & stores",
    name: "UI / UX design",
    label: "UI / UX design",
    key: "design",
    description: "Clear, simple interfaces for apps and dashboards, designed and tested before a line of code.",
    includes: ["User flows", "Wireframes", "Clickable prototype", "Design system"],
  },
  {
    group: "Apps & systems",
    name: "Web & mobile apps",
    label: "App",
    key: "app",
    description: "Custom apps for bookings, supplier payments, operations and customers, like Inest, Middleware, OnCon and The One App.",
    includes: ["User flows & UI design", "Web app or installable app", "Log-ins & user roles", "Offline support when needed"],
  },
  {
    group: "Apps & systems",
    name: "POS & inventory systems",
    label: "POS & inventory",
    key: "pos",
    description: "Point-of-sale and stock tracking built around how your shop or restaurant actually works, like OnTrack.",
    includes: ["Tables, orders & receipts", "Cash & QR payments", "Recipes & stock levels", "Daily profit reports"],
  },
  {
    group: "Apps & systems",
    name: "AI assistants & automation",
    label: "AI assistant",
    key: "ai",
    description: "AI assistants that answer customers, take bookings and orders, and handle the busywork, day and night.",
    includes: ["Website & Messenger chat", "Trained on your products & FAQs", "Bookings & lead capture", "Automated reports & follow-ups"],
    demo: "chat",
  },
  {
    group: "After launch",
    name: "Hosting, care & support",
    label: "Hosting & care",
    key: "hosting",
    description: "We keep everything we build online, secure and up to date, so you never have to think about it.",
    includes: ["Domains & business email", "Hosting & backups", "Updates & fixes", "New pages & features"],
  },
];

/*
  The example AI chat on the Services page, for Mesa, a made-up café (the page says so).
  `from` is "them" (the customer) or "ai". It shows the whole conversation; nothing plays by itself.
*/
window.SITE_CHAT = [
  { from: "them", text: "Hi! Are you open on Sunday?" },
  { from: "ai", text: "Hi! Yes, we’re open Sunday from 8am to 6pm. Want me to save you a table?" },
  { from: "them", text: "Yes please, 4 people at 10am" },
  { from: "ai", text: "Done! Table for 4 on Sunday at 10:00am. I’ve sent the details to your phone." },
];

/*
  HOW WE WORK (the Services page): four numbered steps.
*/
window.PROCESS = [
  { name: "Talk", body: "A quick call or chat about your business, your customers and the style you like." },
  { name: "Design", body: "We design in your chosen style and refine it with your feedback until it feels right." },
  { name: "Build", body: "We build it mobile-first, fast and easy for your team to use and update." },
  { name: "Launch & scale", body: "We launch, hand everything over, and stay on to run your ads and keep the brand growing." },
];

/*
  PLANNER (the Contact page): the timing choices in step 2.
*/
window.PLANNER = {
  timelines: ["As soon as possible", "Within a month", "In 1–3 months", "I’m flexible"],
};

/*
  FAQ (the Services page)
*/
window.FAQ = [
  {
    q: "How much does a project cost?",
    a: "Every project is quoted for you. Tell us what you need on a free first call or in a message, and we send a clear quote with no hidden fees.",
  },
  {
    q: "I only have a rough idea. Is that enough?",
    a: "Yes. Tell us what you want in your own words, even one line. We’ll ask questions, suggest what you need and send a clear quote before any work starts.",
  },
  {
    q: "How long does it take?",
    a: "It depends on the project. A brand or website is much quicker than a custom app or system. You get a clear timeline with your quote.",
  },
  {
    q: "Can you redesign or fix something I already have?",
    a: "Yes. We can refresh an existing brand, redesign a website, take over an app or connect the tools you already use.",
  },
  {
    q: "Do you work with clients outside the Philippines?",
    a: "Yes, over calls, chat and email, wherever you are.",
  },
  {
    q: "What happens after launch?",
    a: "We can host, update and maintain everything we build, add new features as you grow, and run your ads and content month to month.",
  },
];

/*
  BRAND SCALING & ADS (/brand-scaling)
  ────────────────────────────────────
  channels      where the ads run (the page names all six)
  steps         how it works, in order
  deliverables  "What you get"
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
    "Weekly tuning of ads & spend",
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
      q: "Do I need a website first?",
      a: "Not always. Ads can send people to a chat, a lead form or your Google profile. If a landing page will help, we can build one and quote it with the ads.",
    },
  ],
};
