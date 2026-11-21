/*
  PROJECTS
  ────────
  One block per project. To add a project:
    1. Put its images in assets/img/projects/<slug>/  (WebP is best, about 1600px wide)
    2. Copy a block below, paste it at the top of the list, and fill it in.
  It then appears on the Work page, gets its own case-study page, and shows on the
  home page if featured: true.

  Fields
    slug       short id used in the page address (letters, numbers, dashes)
    category   used for the filter buttons on the Work page
    features   short list shown as "Features" on the case study
    images     the first image is the cover. Each image:
                 { src, small (optional, ~800px version), alt, w, h }
               w and h are the image's real pixel size (prevents layout jumps).
               Add art: true for stills from a promo video (they're kept out of the
               home page's screen mockups).
    videos     optional. The first one replaces the cover on the case study; the rest
               show under "More to watch". Each video:
                 { src, poster, title, duration, w, h, frame: "browser" (optional) }
    loop       optional short muted clip that plays on the project's card
    heroPhone  optional. true puts this project's phone screenshot on the home page stage
    link       live site address, or "" for none
    Text in [square brackets] shows as a placeholder on the site.
*/
window.PROJECTS = [
  {
    slug: "middleware",
    title: "Middleware",
    category: "Business System",
    year: "2026",
    client: "Retail group",
    role: "Product design & development",
    accent: "#9aeb83",
    featured: true,
    summary:
      "Supplier payments, kept in order. Middleware tracks what a retail group owes every supplier, from the purchase to the bank payment and its receipt. Each person sees their part: the office records suppliers and bills, the bank pays and uploads receipts, a checker confirms every payment, and the CEO sees where the money goes.",
    sections: [
      {
        heading: "Every peso owed, in one place",
        body: "Every supplier shows its priority, what is owed, what has been paid, and when and how it was paid. Purchases and orders get 30, 60 or 90 days to pay, or a custom term, and the bank sees high-priority suppliers first.",
      },
      {
        heading: "Pay, upload, confirm",
        body: "The bank sees what is overdue, due in the next 7 days and due later, pays, and uploads all the receipts at once. The checker opens each receipt right on the page, then confirms the payment or sends it back with a reason. Nothing is confirmed without a receipt, and no receipt is ever deleted.",
      },
      {
        heading: "Live for everyone",
        body: "Every open tab updates the moment someone changes something, with no refresh, and the right people get a notification. The CEO's charts show what is owed by priority, who is owed the most, spending against payments over time, and how suppliers get paid.",
      },
    ],
    features: [
      "Suppliers with priority, contact and payment details",
      "Purchases and orders with 30, 60 or 90-day terms, or a custom term",
      "The bank sees high priority first",
      "Overdue, due within 7 days and due later at a glance",
      "Sort by priority, due date or amount",
      "Upload several receipts at once, PDFs or photos",
      "Receipts open right on the page, with a download button",
      "No confirmation without a receipt",
      "Receipts can never be deleted",
      "Undo a confirmation, with a reason",
      "Notifications and pop-ups inside the app",
      "Live updates in every open tab, no refresh",
      "Nobody can pay or confirm from old details",
      "CEO charts: owed by priority, top suppliers, spending over time",
      "Amounts kept exact to the centavo",
      "A sign-in for each person, paused for a minute after five wrong tries",
    ],
    tools: ["Python", "SQLite", "JavaScript", "Phones, tablets & laptops"],
    results: [],
    link: "https://middleware.getonsiteapp.com",
    note: "All screens use made-up demo data. The suppliers, amounts and receipts are not the client’s.",
    images: [
      { src: "assets/img/projects/middleware/insights-1600.jpg", small: "assets/img/projects/middleware/insights-800.jpg", alt: "Middleware's Insights for the owner: what is still owed by priority and which suppliers are owed the most", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/mobile-780.jpg", alt: "Middleware's Insights on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/middleware/overview-1600.jpg", small: "assets/img/projects/middleware/overview-800.jpg", alt: "The overview: every supplier's payables, what has been paid and what is due", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/payables-1600.jpg", small: "assets/img/projects/middleware/payables-800.jpg", alt: "The payables list with priorities, due dates and status", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/to-pay-1600.jpg", small: "assets/img/projects/middleware/to-pay-800.jpg", alt: "The bank's to-pay list: only what was approved for this period", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/suppliers-1600.jpg", small: "assets/img/projects/middleware/suppliers-800.jpg", alt: "Suppliers with what is owed and paid, all time", w: 1600, h: 1000 },
      { src: "assets/img/projects/middleware/home-1600.jpg", small: "assets/img/projects/middleware/home-800.jpg", alt: "Middleware's front page", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "inest",
    title: "Inest",
    category: "Web Platform",
    year: "2026",
    client: "One Pavilion Place Condominium Corporation",
    role: "Product design & development",
    accent: "#ff385c",
    featured: true,
    summary:
      "A booking, billing and property management platform for One Pavilion Place Condominium in Cebu City. Guests book free units online, owners check their bills from their phones, and the office, site staff and CEO each run their part of the building from one place.",
    sections: [
      {
        heading: "Bookings without the back-and-forth",
        body: "The public site shows every free unit for the chosen dates with its price. Guests book with just a name and a mobile number, daily and monthly stays have their own rates and rules, and the multi-use area and parking slots are booked the same way.",
      },
      {
        heading: "Billing that checks itself",
        body: "Meter readings flag mistakes before they're saved, shared repairs are split fairly across units, and every owner gets a clean statement that prints one per page. Owners sign in with their unit number and see everything they owe at a glance.",
      },
      {
        heading: "Everyone gets their own view",
        body: "The CEO sees every number on one screen, admins handle the money, site keepers run the day's checklist from a phone, and owners check bills and news. Every change is logged with who made it and when, and nothing is ever deleted.",
      },
    ],
    features: [
      "Public booking site with every free unit and its price",
      "Book with a name and mobile number, no account needed",
      "Daily and monthly stays with their own rates and rules",
      "Hourly booking for the multi-use area",
      "Parking slots for lease and for sale",
      "Owner portal: sign in with the unit number",
      "Statements for every unit, printed one per A4 page",
      "Meter readings that flag mistakes",
      "Repairs with before and after photos and receipts",
      "Shared repairs split fairly across units",
      "Daily checklist for the pool, hall and repairs",
      "Car park at a glance",
      "Rental profit and costs per unit, by day, week or month",
      "Activity log of every change",
    ],
    tools: ["Next.js", "React"],
    results: [],
    link: "https://inest.property",
    images: [
      { src: "assets/img/projects/inest/stays-1600.webp", small: "assets/img/projects/inest/stays-800.webp", alt: "Inest booking page listing vacant condo units with sizes, floors and daily rates", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/multi-use-1600.webp", small: "assets/img/projects/inest/multi-use-800.webp", alt: "Inest multi-use area page with an hourly availability timeline", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/mobile-780.webp", alt: "Inest booking form on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/inest/monthly-1600.webp", small: "assets/img/projects/inest/monthly-800.webp", alt: "Inest monthly stay search", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/parking-1600.webp", small: "assets/img/projects/inest/parking-800.webp", alt: "Inest parking page with slots for lease and for sale", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "oncon",
    title: "OnCon",
    category: "Mobile App",
    year: "2026",
    client: "Own product",
    role: "Product design & development",
    accent: "#f0b429",
    featured: true,
    summary:
      "OnCon is construction project tracking for contractors in the Philippines. Engineers post daily reports and photos from their phones, materials move from request to delivery with receipts at every step, and owners see real progress and spending every day, even when the site has no signal.",
    sections: [
      {
        heading: "Daily reports with photos",
        body: "Engineers post from their phones, with a photo required on every report, so owners see every site's work, issues and progress by stage the same day, without the phone calls.",
      },
      {
        heading: "Request. Approve. Order.",
        body: "Material requests are priced, approved, ordered and delivered inside the app with receipts kept at every step. Every order adds itself to the project's budget, so overruns show up the same day.",
      },
      {
        heading: "Built for the field",
        body: "OnCon installs on any phone and keeps working with no signal. Anything posted offline waits and sends when the phone is back online. Each person, from the CEO to procurement to the office TV board, sees only their part, and money stays with the CEO.",
      },
    ],
    features: [
      "Daily reports with a required photo",
      "Progress by stage, with same-day edits",
      "Material requests from request to delivery",
      "Price quotes and approvals in the app",
      "Every order added to the project budget",
      "Budget overruns flagged the same day",
      "Roles for CEO, secretary, HR, engineers and procurement",
      "Office TV board for the whole team",
      "Installs on any phone, no app store needed",
      "Works offline and syncs when back online",
    ],
    tools: ["Progressive Web App", "Offline-first"],
    results: [],
    link: "https://oncon.getonsiteapp.com",
    images: [
      { src: "assets/img/projects/oncon/home-1600.jpg", small: "assets/img/projects/oncon/home-800.jpg", alt: "OnCon's website: construction project tracking for contractors in the Philippines", w: 1600, h: 1000 },
      { src: "assets/img/projects/oncon/mobile-780.jpg", alt: "OnCon on an engineer's phone: today's sites and reports", w: 780, h: 1688 },
      { src: "assets/img/projects/oncon/app-1600.jpg", small: "assets/img/projects/oncon/app-800.jpg", alt: "The CEO's overview in OnCon: every project, its progress and spending", w: 1600, h: 1000 },
      { src: "assets/img/projects/oncon/login-1600.jpg", small: "assets/img/projects/oncon/login-800.jpg", alt: "OnCon's log-in page, where each company has its own page", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "the-one-app",
    title: "The One App",
    category: "Mobile App",
    year: "2026",
    client: "Own product · launching soon",
    role: "Product design & development",
    accent: "#2547e8",
    featured: true,
    heroPhone: true,
    summary:
      "An all-in-one fitness app that brings training, food and recovery together. Every morning it scores your recovery, training load and sleep, then plans your day, logs your workouts and meals, and keeps you going with friends, challenges and streaks.",
    sections: [
      {
        heading: "One score to start the day",
        body: "Recovery, Load and Sleep scores are worked out from what you log, right on a home screen that's yours to arrange. Plan your day and week with reminders, and see what to focus on at a glance.",
      },
      {
        heading: "Train, eat, recover",
        body: "Log unlimited workouts and the app spots every new personal record. Track 52 activities from running to yoga, log food with local favourites and barcode scanning, and follow a daily calorie target that adjusts to your body, goal and training.",
      },
      {
        heading: "Keep going together",
        body: "Compare training load with your crew, take on challenges like 75-Day Discipline and First 5K, keep your streak hot, and watch your trends and muscle balance over time.",
      },
    ],
    features: [
      "Daily Recovery, Load and Sleep scores",
      "A home screen that's yours to arrange",
      "Day and week planner with reminders",
      "Unlimited workout logging",
      "Automatic personal records, with points",
      "52 activities, from running to yoga",
      "Food log with local favourites",
      "Barcode scanning",
      "A calorie target that adjusts to your training",
      "Crew: compare load with friends",
      "Challenges like 75-Day Discipline and 10K Steps",
      "Streaks with streak freezes",
      "Trends and muscle balance over 30 days",
    ],
    tools: [],
    results: [],
    link: "",
    images: [
      { src: "assets/img/projects/the-one-app/cover-1600.webp", small: "assets/img/projects/the-one-app/cover-800.webp", alt: "Dozens of The One App's screens laid out on a dark background", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/mobile-450.webp", alt: "The One App's Today screen with the day's workout and its recovery, load and sleep scores", w: 450, h: 1000 },
      { src: "assets/img/projects/the-one-app/today-1600.webp", small: "assets/img/projects/the-one-app/today-800.webp", alt: "The One App's Today screen with Recovery 74, Load 46 and Sleep 86", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/plan-1600.webp", small: "assets/img/projects/the-one-app/plan-800.webp", alt: "Weekly planner screens for editing and adding routines", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/new-pr-1600.webp", small: "assets/img/projects/the-one-app/new-pr-800.webp", alt: "A finished leg-day workout celebrating a new personal record of 82 kg for 6 reps", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/food-1600.webp", small: "assets/img/projects/the-one-app/food-800.webp", alt: "Body and food goal screen with a daily target of 1,913 kcal", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/crew-1600.webp", small: "assets/img/projects/the-one-app/crew-800.webp", alt: "Crew leaderboard comparing today's training load with friends", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/challenges-1600.webp", small: "assets/img/projects/the-one-app/challenges-800.webp", alt: "Challenges including 75-Day Discipline, 10K Steps, First 5K and 30-Day Plank", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/the-one-app/trends-1600.webp", small: "assets/img/projects/the-one-app/trends-800.webp", alt: "Recovery trend chart and muscle balance ratios over the last 30 days", w: 1600, h: 900, art: true },
    ],
  },
  {
    slug: "pos-system",
    title: "OnTrack",
    category: "Business System",
    year: "2026",
    client: "Restaurants & cafés",
    role: "Product design & development",
    accent: "#a6d61f",
    featured: true,
    summary:
      "A point-of-sale and inventory system for restaurants and cafés. Staff open a table or takeout, tap dishes and send the order to the kitchen; every dish has a recipe, so its ingredients leave stock as the order goes out. Bills settle in cash or QR with Senior citizen and PWD discounts, and the owner sees sales, stock and real profit live.",
    sections: [
      {
        heading: "The floor at a glance",
        body: "Every table shows its bill and how long it has been open, turning amber at 45 minutes and red at 90. Takeout orders sit alongside, by customer name, and open bills are one tap from payment.",
      },
      {
        heading: "Order, send, settle",
        body: "Tap dishes from the menu, send them to the kitchen and track what's been served. Settle in cash or QR with the change worked out. Voids and Senior or PWD discounts need the manager key, so every peso is accounted for.",
      },
      {
        heading: "Stock that keeps itself",
        body: "Recipes link every dish to its ingredients, so stock goes down as orders go out. Deliveries come in with prices and a photo of the receipt, the kitchen and bar count at opening and close, and any difference shows up in the daily report.",
      },
      {
        heading: "Live numbers for the owner",
        body: "The Today screen shows sales, cost of goods and net profit as they happen, who is on the register and which tables are open. Profit & costs adds rent, wages and supplier spend for the real net profit by day and month.",
      },
    ],
    features: [
      "Live table map, colour-coded by time open",
      "Dine-in and takeout orders",
      "Menu by category, with search",
      "Send to kitchen and track what's served",
      "Cash and QR payments with change worked out",
      "Senior citizen and PWD discounts",
      "Voids approved with a manager key",
      "Print bills and move orders between tables",
      "Shared cashier login that asks who's on shift",
      "Live sales, cost of goods and net profit",
      "Recipes that deduct ingredients with every order",
      "Deliveries with prices and receipt photos",
      "Opening, closing and spot-check counts",
      "Low and out-of-stock alerts",
      "Net profit by day: cost of goods, rent and wages",
      "Daily reports with CSV export",
      "Logins for CEO, manager, cashier and purchasing",
      "One system for many restaurants",
    ],
    tools: ["Python", "SQLite", "JavaScript", "Tablets, phones & laptops"],
    results: [],
    link: "https://pos.getonsiteapp.com",
    images: [
      { src: "assets/img/projects/pos-system/tables-1600.jpg", small: "assets/img/projects/pos-system/tables-800.jpg", alt: "OnTrack's tables screen: the floor colour-coded by time open, open bills and takeout", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/mobile-780.jpg", alt: "OnTrack's tables screen on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/pos-system/today-1600.jpg", small: "assets/img/projects/pos-system/today-800.jpg", alt: "The owner's Today screen: sales, net profit, the floor and who is on the register, live", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/reports-1600.jpg", small: "assets/img/projects/pos-system/reports-800.jpg", alt: "Daily report with sales, profit, voids and what the kitchen used", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/inventory-1600.jpg", small: "assets/img/projects/pos-system/inventory-800.jpg", alt: "Stock by category with on-hand amounts, par levels and status", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/costs-1600.jpg", small: "assets/img/projects/pos-system/costs-800.jpg", alt: "Profit and costs: cost of goods, rent and wages against sales, by day and month", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/menu-1600.jpg", small: "assets/img/projects/pos-system/menu-800.jpg", alt: "Menu and recipes: each dish's ingredients, price and cost", w: 1600, h: 1000 },
    ],
  },
];
