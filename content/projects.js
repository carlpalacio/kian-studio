/*
  PROJECTS
  ────────
  One block per project, in the order they show on the site: work built for clients first, then our own products.
  Each project gets its own page at /work/<slug> (run `node tools/build-pages.js` after adding one, so the page
  exists with its own title and description).

  Fields
    slug       the page address, /work/<slug> (letters, numbers, dashes)
    forClient  true for work built for a client (shown under "Built for clients"); leave it out for our own products
    title      the product's name
    line       one short line for its card ("Supplier payments for a retail group")
    forWho     clients only: who it was built for, shown on the project page only
    status     "In daily use", "Live" or "Launching soon"
    builtWith  what it's built with (leave out if unknown)
    worksOn    where it runs (leave out if unknown)
    accent     the colour behind its pictures
    hero       true puts its cover in the stack of screens at the top of the home page
    service    the planner service it ticks from /contact?for=<slug>: "app" unless set (see content/services.js keys)
    summary    one or two sentences; the first is the big line at the top of its page
    sections   "What it does": each has a heading, two lines of text and a few points
    results    real outcomes only, once there are some; leave [] to hide "Results"
    link       its live address, or "" for none
    note       small print over its screens (for example that they use made-up demo data)
    images     the first is the cover, the rest show under "Screens", each with a short caption.
               Each image: { src, small (optional ~800px copy), alt, caption, w, h }. w and h are the real pixel
               size. A picture taller than wide shows in a phone frame. Add art: true for stills that aren't
               plain screenshots. On phones only the phone picture and the first two others show.
  Unfinished entries stay out of the file: nothing here is ever shown as a placeholder.
*/
window.PROJECTS = [
  {
    slug: "middleware",
    forClient: true,
    title: "Middleware",
    line: "Supplier payments for a retail group",
    forWho: "A retail group",
    status: "In daily use",
    builtWith: "Python, SQLite, JavaScript",
    worksOn: "Phones, tablets & laptops",
    accent: "#9aeb83",
    hero: true,
    summary:
      "Supplier payments, kept in order. Middleware tracks what a retail group owes every supplier, from the purchase to the bank payment and its receipt.",
    sections: [
      {
        heading: "Every peso owed, in one place",
        body: "Every supplier shows its priority, what is owed, what has been paid, and when and how. The bank sees high-priority suppliers first.",
        points: [
          "Suppliers with priority, contact and payment details",
          "Purchases and orders with 30, 60 or 90-day terms, or a custom term",
          "Sort by priority, due date or amount",
          "Amounts kept exact to the centavo",
        ],
      },
      {
        heading: "Pay, upload, confirm",
        body: "The bank sees what is overdue, due within 7 days and due later, pays, and uploads the receipts. A checker confirms each payment or sends it back with a reason.",
        points: [
          "Upload several receipts at once, PDFs or photos",
          "Receipts open right on the page, with a download button",
          "No confirmation without a receipt, and no receipt is ever deleted",
          "Undo a confirmation, with a reason",
        ],
      },
      {
        heading: "Live for everyone",
        body: "Every open tab updates the moment someone changes something, with no refresh. The CEO’s charts show where the money goes.",
        points: [
          "Notifications and pop-ups inside the app",
          "Nobody can pay or confirm from old details",
          "CEO charts: owed by priority, top suppliers, spending over time",
          "A log-in for each person, paused for a minute after five wrong tries",
        ],
      },
    ],
    results: [],
    link: "https://middleware.getonsiteapp.com",
    note: "All screens use made-up demo data. The suppliers, amounts and receipts are not the client’s.",
    images: [
      { src: "assets/img/projects/middleware/insights-1600.jpg", small: "assets/img/projects/middleware/insights-800.jpg", alt: "Middleware’s Insights for the owner: what is still owed by priority and which suppliers are owed the most", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/mobile-780.jpg", alt: "The bank’s to-pay list on a phone", caption: "To pay, on the bank’s phone", w: 780, h: 1688 },
      { src: "assets/img/projects/middleware/overview-1600.jpg", small: "assets/img/projects/middleware/overview-800.jpg", alt: "The overview: every supplier’s payables, what has been paid and what is due", caption: "Every supplier’s payables", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/payables-1600.jpg", small: "assets/img/projects/middleware/payables-800.jpg", alt: "The payables list with priorities, due dates and status", caption: "Payables by priority and due date", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/suppliers-1600.jpg", small: "assets/img/projects/middleware/suppliers-800.jpg", alt: "Suppliers with what is owed and paid, all time", caption: "Suppliers, owed and paid", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "inest",
    forClient: true,
    title: "Inest",
    line: "Bookings and billing for a condominium in Cebu City",
    forWho: "One Pavilion Place Condominium",
    status: "In daily use",
    builtWith: "Next.js, React",
    accent: "#ff385c",
    summary: "A booking, billing and property management platform for a condominium in Cebu City.",
    sections: [
      {
        heading: "Bookings without the back-and-forth",
        body: "The public site shows every free unit for the chosen dates with its price. Guests book with just a name and a mobile number.",
        points: [
          "Daily and monthly stays with their own rates and rules",
          "Hourly booking for the multi-use area",
          "Parking slots for lease and for sale",
        ],
      },
      {
        heading: "Billing that checks itself",
        body: "Meter readings flag mistakes before they’re saved, and shared repairs are split fairly across units. Every owner gets a clean statement.",
        points: [
          "Owner portal: log in with the unit number",
          "Statements for every unit, printed one per A4 page",
          "Repairs with before and after photos and receipts",
        ],
      },
      {
        heading: "Everyone gets their own view",
        body: "The CEO sees every number on one screen, admins handle the money, and site keepers run the day’s checklist from a phone. Every change is logged, and nothing is ever deleted.",
        points: [
          "Daily checklist for the pool, hall and repairs",
          "Car park at a glance",
          "Rental profit and costs per unit, by day, week or month",
        ],
      },
    ],
    results: [],
    link: "https://inest.property",
    images: [
      { src: "assets/img/projects/inest/stays-1600.webp", small: "assets/img/projects/inest/stays-800.webp", alt: "Inest’s booking page listing free condo units with sizes, floors and daily rates", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/mobile-780.webp", alt: "Inest’s booking form on a phone", caption: "Booking a stay on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/inest/multi-use-1600.webp", small: "assets/img/projects/inest/multi-use-800.webp", alt: "Inest’s multi-use area page with an hourly availability timeline", caption: "The multi-use area, booked by the hour", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "oncon",
    title: "OnCon",
    line: "Construction project tracking",
    status: "Live",
    builtWith: "Progressive web app, offline-first",
    worksOn: "Any phone, no app store needed",
    accent: "#f0b429",
    hero: true,
    summary:
      "Construction project tracking for contractors in the Philippines. Owners see real progress and spending every day, without the phone calls.",
    sections: [
      {
        heading: "Daily reports with photos",
        body: "Engineers post from their phones, with a photo required on every report. Owners see every site’s work, issues and progress the same day.",
        points: [
          "Progress by stage, with same-day edits",
          "Roles for CEO, secretary, HR, engineers and procurement",
          "Office TV board for the whole team",
        ],
      },
      {
        heading: "Request. Approve. Order.",
        body: "Material requests are priced, approved, ordered and delivered inside the app, with receipts at every step. Every order adds itself to the project’s budget.",
        points: [
          "Price quotes and approvals in the app",
          "Budget overruns flagged the same day",
        ],
      },
      {
        heading: "Built for the field",
        body: "OnCon keeps working with no signal. Anything posted offline sends when the phone is back online.",
        points: [
          "Installs on any phone, no app store needed",
          "Each person sees only their part",
          "Money stays with the CEO",
        ],
      },
    ],
    results: [],
    link: "https://oncon.getonsiteapp.com",
    note: "All screens use OnCon’s made-up demo company.",
    images: [
      { src: "assets/img/projects/oncon/app-1600.jpg", small: "assets/img/projects/oncon/app-800.jpg", alt: "The CEO’s overview in OnCon: every project, its progress and spending", w: 1600, h: 1000 },
      { src: "assets/img/projects/oncon/mobile-780.jpg", alt: "OnCon on an engineer’s phone: today’s sites and reports", caption: "An engineer’s day, on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/oncon/reports-1600.jpg", small: "assets/img/projects/oncon/reports-800.jpg", alt: "Daily reports with photos from every site", caption: "Daily reports with photos", w: 1600, h: 1000 },
      { src: "assets/img/projects/oncon/requests-1600.jpg", small: "assets/img/projects/oncon/requests-800.jpg", alt: "Material requests from request to delivery", caption: "Material requests, request to delivery", w: 1600, h: 1000 },
      { src: "assets/img/projects/oncon/board-1600.jpg", small: "assets/img/projects/oncon/board-800.jpg", alt: "The office TV board with every site’s progress and today’s reports", caption: "The office TV board", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "ontrack",
    title: "OnTrack",
    service: "pos",
    line: "Restaurant POS and inventory",
    status: "Live",
    builtWith: "Python, SQLite, JavaScript",
    worksOn: "Tablets, phones & laptops",
    accent: "#a6d61f",
    hero: true,
    summary: "A point-of-sale and inventory system for restaurants and cafés.",
    sections: [
      {
        heading: "The floor at a glance",
        body: "Every table shows its bill and how long it has been open, turning amber at 45 minutes and red at 90. Takeout orders sit alongside, by customer name.",
        points: [
          "Dine-in and takeout orders",
          "Print bills and move orders between tables",
        ],
      },
      {
        heading: "Order, send, settle",
        body: "Tap dishes from the menu, send them to the kitchen and settle in cash or QR with the change worked out. Voids and discounts need the manager key.",
        points: [
          "Menu by category, with search",
          "Senior citizen and PWD discounts",
          "A shared cashier log-in that asks who’s on shift",
        ],
      },
      {
        heading: "Stock that keeps itself",
        body: "Recipes link every dish to its ingredients, so stock goes down as orders go out. Any difference in the counts shows up in the daily report.",
        points: [
          "Deliveries with prices and receipt photos",
          "Opening, closing and spot-check counts",
          "Low and out-of-stock alerts",
        ],
      },
      {
        heading: "Live numbers for the owner",
        body: "The Today screen shows sales, cost of goods and net profit as they happen. Profit & costs adds rent, wages and supplier spend for the real net profit.",
        points: [
          "Daily reports with CSV export",
          "Log-ins for CEO, manager, cashier and purchasing",
          "One system for many restaurants",
        ],
      },
    ],
    results: [],
    link: "https://pos.getonsiteapp.com",
    note: "All screens use OnTrack’s made-up demo restaurant.",
    images: [
      { src: "assets/img/projects/ontrack/tables-1600.jpg", small: "assets/img/projects/ontrack/tables-800.jpg", alt: "OnTrack’s tables screen: the floor colour-coded by time open, open bills and takeout", w: 1600, h: 1000 },
      { src: "assets/img/projects/ontrack/mobile-780.jpg", alt: "The owner’s Today screen on a phone: sales, net profit and who is on the register", caption: "Today, on the owner’s phone", w: 780, h: 1688 },
      { src: "assets/img/projects/ontrack/reports-1600.jpg", small: "assets/img/projects/ontrack/reports-800.jpg", alt: "Daily report with sales, profit, voids and what the kitchen used", caption: "The daily report", w: 1600, h: 1000 },
      { src: "assets/img/projects/ontrack/inventory-1600.jpg", small: "assets/img/projects/ontrack/inventory-800.jpg", alt: "Stock by category with on-hand amounts, par levels and status", caption: "Stock by category", w: 1600, h: 1000 },
      { src: "assets/img/projects/ontrack/costs-1600.jpg", small: "assets/img/projects/ontrack/costs-800.jpg", alt: "Profit and costs: cost of goods, rent and wages against sales, by day and month", caption: "Profit and costs", w: 1600, h: 1000 },
      { src: "assets/img/projects/ontrack/menu-1600.jpg", small: "assets/img/projects/ontrack/menu-800.jpg", alt: "Menu and recipes: each dish’s ingredients, price and cost", caption: "Menu and recipes", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "kape",
    title: "Kape",
    service: "website",
    line: "Coffee recipe book",
    status: "Live",
    builtWith: "HTML, CSS, JavaScript",
    worksOn: "Any phone, nothing to install",
    accent: "#8a5a3c",
    summary: "A working coffee recipe book: the house menu, the new drinks to try and the classics, every amount in grams.",
    sections: [
      {
        heading: "Every drink, one tap away",
        body: "A grid of every drink, filtered by menu, must-try or classic, hot or iced, and style. Search works across names and ingredients.",
        points: [
          "A link for every recipe, to share straight to a phone",
        ],
      },
      {
        heading: "Recipes that scale and time themselves",
        body: "Ingredients scale from 1 to 12 drinks, and the method ticks off step by step. Timed steps have their own timer.",
        points: [
          "Every espresso drink starts from the same 18 g to 36 g double shot",
          "The original video one tap away, where a drink came from one",
        ],
      },
      {
        heading: "Testing plan and basics",
        body: "A must-try plan in rounds with a progress bar, and everything a new barista needs on one page.",
        points: [
          "Progress saved on the phone",
          "Shot timer with dose and ratio sliders",
          "Dialing-in steps, cold foam rules, batch syrups",
        ],
      },
    ],
    results: [],
    link: "https://coffee.getonsiteapp.com",
    images: [
      { src: "assets/img/projects/kape/recipe-1600.jpg", small: "assets/img/projects/kape/recipe-800.jpg", alt: "A Kape recipe with ingredients in grams and a step-by-step method", w: 1600, h: 1000 },
      { src: "assets/img/projects/kape/mobile-780.jpg", alt: "Kape’s index of drinks on a phone", caption: "Every drink, on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/kape/basics-1600.jpg", small: "assets/img/projects/kape/basics-800.jpg", alt: "The basics: shot timer, dialing in, cold foam and syrups", caption: "The basics for a new barista", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "the-one-app",
    title: "The One App",
    line: "Fitness app · Launching soon",
    status: "Launching soon",
    accent: "#2547e8",
    summary: "An all-in-one fitness app that brings training, food and recovery together.",
    sections: [
      {
        heading: "One score to start the day",
        body: "Recovery, Load and Sleep scores are worked out from what you log, on a home screen that’s yours to arrange.",
        points: [
          "Day and week planner with reminders",
        ],
      },
      {
        heading: "Train, eat, recover",
        body: "Log unlimited workouts and the app spots every new personal record. A daily calorie target adjusts to your body, goal and training.",
        points: [
          "52 activities, from running to yoga",
          "Food log with local favourites",
          "Barcode scanning",
        ],
      },
      {
        heading: "Keep going together",
        body: "Compare training load with your crew, take on challenges and keep your streak going.",
        points: [
          "Challenges like 75-Day Discipline, First 5K and 10K Steps",
          "Streaks with streak freezes",
          "Trends and muscle balance over 30 days",
        ],
      },
    ],
    results: [],
    link: "",
    images: [
      { src: "assets/img/projects/the-one-app/mobile-450.webp", alt: "The One App’s Today screen with the day’s workout and its recovery, load and sleep scores", w: 450, h: 1000 },
      { src: "assets/img/projects/the-one-app/plan-1600.webp", small: "assets/img/projects/the-one-app/plan-800.webp", alt: "Weekly planner screens for editing and adding routines", caption: "The week planner", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/crew-1600.webp", small: "assets/img/projects/the-one-app/crew-800.webp", alt: "Crew leaderboard comparing today’s training load with friends", caption: "Your crew’s training load", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/trends-1600.webp", small: "assets/img/projects/the-one-app/trends-800.webp", alt: "Recovery trend chart and muscle balance ratios over the last 30 days", caption: "Trends and muscle balance", w: 1600, h: 900, art: true },
    ],
  },
];
