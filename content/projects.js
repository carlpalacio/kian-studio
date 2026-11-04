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
    loop: "assets/video/loops/inest.mp4",
    videos: [
      { src: "assets/video/inest-demo.mp4", poster: "assets/img/projects/inest/poster-demo-1600.webp", title: "Product demo", duration: "1:30", w: 1280, h: 720 },
      { src: "assets/video/inest-features.mp4", poster: "assets/img/projects/inest/poster-features-1600.webp", title: "Feature walkthrough", duration: "2:31", w: 1280, h: 720 },
    ],
    images: [
      { src: "assets/img/projects/inest/stays-1600.webp", small: "assets/img/projects/inest/stays-800.webp", alt: "Inest booking page listing vacant condo units with sizes, floors and daily rates", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/multi-use-1600.webp", small: "assets/img/projects/inest/multi-use-800.webp", alt: "Inest multi-use area page with an hourly availability timeline", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/mobile-780.webp", alt: "Inest booking form on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/inest/monthly-1600.webp", small: "assets/img/projects/inest/monthly-800.webp", alt: "Inest monthly stay search", w: 1600, h: 1000 },
      { src: "assets/img/projects/inest/parking-1600.webp", small: "assets/img/projects/inest/parking-800.webp", alt: "Inest parking page with slots for lease and for sale", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "onsite",
    title: "Onsite",
    category: "Mobile App",
    year: "2026",
    client: "Own product",
    role: "Product design & development",
    accent: "#f0b429",
    featured: true,
    summary:
      "Construction project tracking for contractors in the Philippines. Engineers post daily reports and photos from their phones, materials move from request to delivery with receipts at every step, and owners see real progress and spending every day, even when the site has no signal.",
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
        body: "Onsite installs on any phone and keeps working with no signal. Anything posted offline waits and sends when the phone is back online. Each person, from the CEO to procurement to the office TV board, sees only their part, and money stays with the CEO.",
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
    link: "https://getonsiteapp.com",
    loop: "assets/video/loops/onsite.mp4",
    videos: [
      { src: "assets/video/onsite-reel.mp4", poster: "assets/img/projects/onsite/reel-sites-1600.webp", title: "Product reel", duration: "0:24", w: 1280, h: 720 },
    ],
    images: [
      { src: "assets/img/projects/onsite/home-1600.webp", small: "assets/img/projects/onsite/home-800.webp", alt: "Onsite landing and sign-in screen with feature highlights for contractors", w: 1600, h: 1000 },
      { src: "assets/img/projects/onsite/mobile-780.webp", alt: "Onsite sign-in screen on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/onsite/reel-sites-1600.webp", small: "assets/img/projects/onsite/reel-sites-800.webp", alt: "Every site, every day, one place: Onsite's promise", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/onsite/reel-reports-1600.webp", small: "assets/img/projects/onsite/reel-reports-800.webp", alt: "Onsite daily report on a phone, with site photos and progress by stage", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/onsite/reel-requests-1600.webp", small: "assets/img/projects/onsite/reel-requests-800.webp", alt: "A material request moving from requested to approved, with the supplier's price quote", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/onsite/reel-costs-1600.webp", small: "assets/img/projects/onsite/reel-costs-800.webp", alt: "Project budget with spending to date and an over-budget warning", w: 1600, h: 900, art: true },
      { src: "assets/img/projects/onsite/reel-roles-1600.webp", small: "assets/img/projects/onsite/reel-roles-800.webp", alt: "Onsite roles: CEO, secretary, HR, engineer, procurement and office viewer", w: 1600, h: 900, art: true },
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
    loop: "assets/video/loops/the-one-app.mp4",
    videos: [
      { src: "assets/video/the-one-app-demo.mp4", poster: "assets/img/projects/the-one-app/cover-1600.webp", title: "Launch film", duration: "2:00", w: 1280, h: 720 },
    ],
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
    title: "OnTrack POS",
    category: "Business System",
    year: "2026",
    client: "Restaurants & cafés",
    role: "Product design & development",
    accent: "#a6d61f",
    featured: true,
    summary:
      "The register side of OnTrack, a point-of-sale system for restaurants and cafés. Staff open a table or takeout, tap dishes and send the order to the kitchen. Bills settle in cash or QR with Senior citizen and PWD discounts, and the owner sees sales, open tables and profit live.",
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
        heading: "Live numbers for the owner",
        body: "The Today screen shows sales, cost of goods and net profit as they happen, who is on the register and which tables are open. Daily reports export to CSV, and every login sees only what its role needs.",
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
      "Daily reports with CSV export",
      "Logins for CEO, manager, cashier and purchasing",
      "One system for many restaurants",
    ],
    tools: ["Python", "SQLite", "JavaScript", "Tablets, phones & laptops"],
    results: [],
    link: "",
    loop: "assets/video/loops/pos-system.mp4",
    videos: [
      { src: "assets/video/pos-system-tour.mp4", poster: "assets/img/projects/pos-system/tables-1600.webp", title: "Taking an order, start to bill", duration: "0:22", w: 1440, h: 900, frame: "browser" },
    ],
    images: [
      { src: "assets/img/projects/pos-system/tables-1600.webp", small: "assets/img/projects/pos-system/tables-800.webp", alt: "OnTrack's tables screen with the day's takings, open bills and a colour-coded table map", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/order-1600.webp", small: "assets/img/projects/pos-system/order-800.webp", alt: "An open order for Table 3 next to the menu, with each dish marked as served", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/settle-1600.webp", small: "assets/img/projects/pos-system/settle-800.webp", alt: "Taking payment for Table 3, with Senior citizen or PWD discount and cash or QR options", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/mobile-780.webp", alt: "OnTrack's tables screen on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/pos-system/today-1600.webp", small: "assets/img/projects/pos-system/today-800.webp", alt: "The owner's Today screen with live sales, net profit, the floor and who is on the register", w: 1600, h: 1000 },
      { src: "assets/img/projects/pos-system/reports-1600.webp", small: "assets/img/projects/pos-system/reports-800.webp", alt: "Daily report with net profit, sales, gross profit, voids and ingredient usage", w: 1600, h: 1000 },
    ],
  },
  {
    slug: "inventory-tracker",
    title: "OnTrack Inventory",
    category: "Business System",
    year: "2026",
    client: "Restaurants & cafés",
    role: "Product design & development",
    accent: "#2f8f5b",
    featured: true,
    summary:
      "The stock side of OnTrack. Every dish has a recipe, so each order takes its ingredients out of stock automatically. Deliveries come in with prices and a photo of the receipt, the kitchen and bar count at opening and close, and any difference shows up in the daily report.",
    sections: [
      {
        heading: "Stock that keeps itself",
        body: "Recipes link every dish to its ingredients, so stock goes down as orders go out. Par levels and low and out-of-stock alerts tell the team what to buy before it runs out, for the kitchen and the bar.",
      },
      {
        heading: "Counts, deliveries and waste",
        body: "The kitchen and bar do opening, closing and spot counts, and any variance against what the orders used shows up in the daily report. Deliveries are received with prices and a receipt photo, waste needs the CEO key, and prep batches track what's made in-house.",
      },
      {
        heading: "What the restaurant really made",
        body: "Profit & costs turns delivery prices into the cost of every dish sold, adds rent, wages and other costs, and shows the real net profit by day and month. Every supplier shows what was bought this month and all time, so the owner knows where the money goes.",
      },
    ],
    features: [
      "Recipes that deduct ingredients with every order",
      "Stock levels with par levels",
      "Low and out-of-stock alerts",
      "Separate kitchen and bar stock",
      "Opening, closing and spot-check counts",
      "Variance between used and counted",
      "Deliveries with prices and receipt photos",
      "Supplier spend, this month and all time",
      "Waste logging approved with the CEO key",
      "Prep batches for items made in-house",
      "Net profit by day: cost of goods, rent and wages",
      "Unit conversions for kg, g, ml and pieces",
    ],
    tools: ["Python", "SQLite", "JavaScript", "Tablets, phones & laptops"],
    results: [],
    link: "",
    loop: "assets/video/loops/inventory-tracker.mp4",
    videos: [
      { src: "assets/video/inventory-tracker-tour.mp4", poster: "assets/img/projects/inventory-tracker/inventory-1600.webp", title: "Stock, counts, suppliers and profit", duration: "0:19", w: 1440, h: 900, frame: "browser" },
    ],
    images: [
      { src: "assets/img/projects/inventory-tracker/inventory-1600.webp", small: "assets/img/projects/inventory-tracker/inventory-800.webp", alt: "OnTrack's stock list by category, with on-hand amounts, par levels, status and value", w: 1600, h: 1000 },
      { src: "assets/img/projects/inventory-tracker/count-1600.webp", small: "assets/img/projects/inventory-tracker/count-800.webp", alt: "Closing count in progress, with expected amounts for each ingredient", w: 1600, h: 1000 },
      { src: "assets/img/projects/inventory-tracker/mobile-780.webp", alt: "OnTrack's stock screen on a phone", w: 780, h: 1688 },
      { src: "assets/img/projects/inventory-tracker/suppliers-1600.webp", small: "assets/img/projects/inventory-tracker/suppliers-800.webp", alt: "Suppliers page with spend this month and all time for each supplier", w: 1600, h: 1000 },
      { src: "assets/img/projects/inventory-tracker/costs-1600.webp", small: "assets/img/projects/inventory-tracker/costs-800.webp", alt: "Profit and costs for the month: sales, cost of goods, gross profit and net profit by day", w: 1600, h: 1000 },
      { src: "assets/img/projects/inventory-tracker/menu-1600.webp", small: "assets/img/projects/inventory-tracker/menu-800.webp", alt: "Menu and recipes, with each dish's ingredients, price and cost", w: 1600, h: 1000 },
    ],
  },
];
