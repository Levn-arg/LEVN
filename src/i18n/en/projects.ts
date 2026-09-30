// Proyectos en inglés, con la misma forma que src/data/projects.json (por slug).
// Al agregar o editar un proyecto en el JSON, actualizá acá su versión en inglés:
// en desarrollo, la consola del navegador avisa qué textos faltan.

export type ProjectEn = {
  tags: string[];
  summary: string;
  heroDescription: string;
  sections: { title: string; paragraphs: string[] }[];
  duration: string;
  results: string;
};

export const PROJECTS_EN: Record<string, ProjectEn> = {
  reemo: {
    tags: ["Brand identity", "Product development", "Mobile app"],
    summary: "Brand identity and full development of a peer-to-peer car rental app.",
    heroDescription:
      "We built Reemo's <strong>complete identity</strong> and, on top of it, <strong>the entire app</strong>: user verification, vehicle listings, bookings, per-trip insurance, payments and ratings. A brand and product ecosystem built as a single design decision.",
    sections: [
      {
        title: "The Trust Problem",
        paragraphs: [
          "Lending your own car to a stranger requires conveying <strong>trust</strong>, but without the institutional coldness of an insurance company. The brand had to feel simple, modern and safe at the same time.",
          "Most visual references in the industry are either corporate and cold, or so informal they raise suspicion: Reemo needed a middle ground of its own.",
        ],
      },
      {
        title: "Visual Identity System",
        paragraphs: [
          "The symbol is a <strong>continuous stroke</strong> that works three ways at once: the letter R, the silhouette of a vehicle and a location pin — the continuity reads as movement, which is exactly what the product sells.",
          "The palette uses <strong>deep blue</strong> as the base and <strong>light blue</strong> as the accent, deliberately just two colors because the brand is used on a phone and in a hurry. The typeface, Onest, prioritizes legibility on small screens over billboards.",
        ],
      },
      {
        title: "App Development",
        paragraphs: [
          "On top of that identity we built the complete app: <strong>identity verification</strong> for drivers and owners, vehicle listings, search and booking with a real-time calendar, and <strong>dynamically calculated insurance</strong> per trip.",
          "We added in-app chat between the parties, geolocation for pickup and return, a host dashboard, a two-way rating system and <strong>payments with a security deposit hold</strong> — a product that works end to end, not an identity applied on top of an existing app.",
        ],
      },
    ],
    duration: "5 weeks of brand identity + 25 weeks of product development (30 weeks in total).",
    results: "A brand manual the team can use on its own and a working app that removes the friction of trusting your car to a stranger.",
  },
  dropdead: {
    tags: ["E-commerce", "Inventory management", "Dashboard", "Streetwear"],
    summary: "Transactional e-commerce with inventory and sales management for a streetwear brand.",
    heroDescription:
      "We designed and built DropDead's <strong>digital ecosystem</strong>: a complete online shopping experience integrated with a <strong>custom management system</strong> to handle products, inventory, sales and performance in one place.",
    sections: [
      {
        title: "The Real-Time Stock Problem",
        paragraphs: [
          "DropDead works with limited-stock clothing drops, where any friction at checkout or stock error turns into <strong>a lost sale within minutes</strong>. The brand had no way of knowing in real time how much was left of each size or color.",
          "Sales and stock information was spread across spreadsheets and the team's memory, which led to overselling and blind restocking decisions.",
        ],
      },
      {
        title: "E-commerce and Inventory System",
        paragraphs: [
          "We built a <strong>complete e-commerce store</strong> — catalog by category, cart and checkout — integrated with a custom management system with <strong>inventory per variant</strong> (size/color), so real stock and the online storefront are always the same data.",
          "The system lets the team add products, organize them by category and keep inventory up to date without relying on a parallel spreadsheet.",
        ],
      },
      {
        title: "Sales and Performance Dashboard",
        paragraphs: [
          "We added a <strong>management dashboard</strong> with sales and per-product performance metrics, so the team knows how each launch is doing without waiting for a manual close.",
          "The system was designed to <strong>repeat collection after collection</strong>: adding products, managing variants and tracking metrics don't need to be rebuilt for each new drop.",
        ],
      },
    ],
    duration: "Development and implementation in 8 weeks.",
    results: "Online store and internal management running on the same system, with centralized stock control and a structure ready to scale to new launches.",
  },
  "sevre-collection": {
    tags: ["Branding", "Visual identity", "UX/UI design", "Digital presence"],
    summary: "Brand identity and a digital showcase ecosystem for an urban luxury fashion brand.",
    heroDescription:
      "We built Sevrè Collection's <strong>brand identity</strong> and, from it, a <strong>custom digital platform</strong> conceived as a brand space: a curated catalog, collection storytelling and a <strong>custom management system</strong> so the team can manage products and content without depending on third parties.",
    sections: [
      {
        title: "The Positioning Challenge",
        paragraphs: [
          "Selling urban luxury carries a specific risk: if the aesthetic looks generic, the product's <strong>perceived value</strong> drops immediately, regardless of its real quality. Sevrè came to us with no palette, no typography and no defined criteria for showing its products.",
          "That lack of a visual system diluted every sales or communication effort, and meant every new piece (a post, a product photo, a showroom piece) was solved from scratch every time.",
        ],
      },
      {
        title: "Visual Identity System",
        paragraphs: [
          "We developed a <strong>complete visual system</strong> that blends luxury fashion codes with an urban aesthetic: editorial typography, a dark and sober palette, and specific art direction for product photography.",
          "The result is an identity the brand can apply consistently across social media, the showroom and communications, without a different interpretation every time.",
        ],
      },
      {
        title: "Custom Showcase Platform",
        paragraphs: [
          "On top of that identity we built a <strong>custom digital platform</strong>, with a curated catalog and its own management system so the team can upload products and content without calling a developer every time a new piece comes out.",
          "We chose not to implement an open checkout: in urban luxury fashion, sales usually close through <strong>direct inquiry</strong> (DM, WhatsApp, showroom), so the platform was designed to showcase and create desire, not to run an automatic transaction.",
        ],
      },
    ],
    duration: "Full branding and platform development in 3 weeks.",
    results: "A recognizable brand identity and a platform the team manages on its own, without depending on third parties to update the catalog or content.",
  },
  "casa-aurora": {
    tags: ["E-commerce", "Online payments", "Automation", "Home decor"],
    summary: "Online store with integrated checkout and automated order confirmations for a home decor brand.",
    heroDescription:
      "We turned a sales operation run through <strong>Instagram DMs</strong> into an <strong>online store</strong> with a catalog, checkout and integrated payments, plus an automated flow that <strong>confirms orders</strong> and alerts when stock runs low.",
    sections: [
      {
        title: "Manual Sales over WhatsApp",
        paragraphs: [
          "Every sale was closed by hand: sending photos, confirming stock, sharing payment details and waiting for the receipt. The process depended entirely on someone being <strong>available to reply</strong>.",
          "Outside business hours, at night or on weekends, orders were simply lost.",
        ],
      },
      {
        title: "Online Store with Integrated Checkout",
        paragraphs: [
          "We built a store with a <strong>product catalog</strong> and checkout with integrated online payments, so a sale can close without manual intervention at any step.",
          "The product panel was kept simple, so the team can add or edit products without depending on a developer.",
        ],
      },
      {
        title: "Order and Stock Automation",
        paragraphs: [
          "We implemented a flow that <strong>automatically confirms</strong> every order as soon as the purchase goes through, with no one having to step in.",
          "The same system <strong>alerts when stock runs low</strong>, so restocking is planned ahead instead of discovered once the product has already sold out.",
        ],
      },
    ],
    duration: "Development and implementation in 5 weeks.",
    results: "Sales and payments available 24 hours a day, without depending on manual chat support.",
  },
  rutaflex: {
    tags: ["Custom app", "Logistics", "Geolocation", "Route management"],
    summary: "Mobile app to coordinate deliveries and confirm drop-offs in real time for a logistics SME.",
    heroDescription:
      "We built a <strong>mobile-first web app</strong> so RutaFlex can assign orders by zone and each driver can <strong>update the delivery status</strong> from their phone, with a photo as proof, replacing manual coordination through a WhatsApp group.",
    sections: [
      {
        title: "Manual Coordination over WhatsApp",
        paragraphs: [
          "The owner planned routes by hand every morning in a spreadsheet, and drivers could only report the status of a delivery by chat.",
          "That led to frequent disputes over <strong>delivered versus not received</strong>, with no way of verifying what had actually happened.",
        ],
      },
      {
        title: "Route Assignment App",
        paragraphs: [
          "We built a <strong>web app</strong> where the owner loads the day's orders and they are automatically assigned by zone, integrated with maps to optimize the route.",
          "Route planning, previously done by hand, is now solved with the information already in the system.",
        ],
      },
      {
        title: "Delivery Confirmation with Proof",
        paragraphs: [
          "Each driver updates the delivery status from their phone, with a <strong>photo as proof</strong> of the moment of delivery.",
          "This ended the disputes over unconfirmed deliveries, because every status is documented in the system.",
        ],
      },
    ],
    duration: "MVP development in 8 weeks.",
    results: "No more disputes over unconfirmed deliveries and less time spent planning routes.",
  },
  "metalurgica-bianchi": {
    tags: ["Automation", "Stock control", "Industry", "n8n"],
    summary: "Automated stock control and supplier orders for a metalworking shop.",
    heroDescription:
      "We automated <strong>stock control</strong> of critical supplies: when a material drops below its minimum, the system automatically creates a <strong>draft order</strong> for the right supplier and notifies the buyer on WhatsApp.",
    sections: [
      {
        title: "Stockouts in the Middle of Production",
        paragraphs: [
          "The shop handled supplier orders by phone and spreadsheet, with no minimum stock alerts at all.",
          "That meant they ran <strong>out of critical supplies</strong> in the middle of production, because nobody checked stock until something was missing.",
        ],
      },
      {
        title: "Automated Stock Alerts",
        paragraphs: [
          "We centralized stock in a database with minimum thresholds per supply, and automated the <strong>ongoing monitoring</strong> of those levels.",
          "Manual stock checks, which used to depend on someone remembering, are no longer needed.",
        ],
      },
      {
        title: "Automatic Order Generation",
        paragraphs: [
          "When a supply drops below its minimum, the system automatically creates a <strong>draft order</strong> for the right supplier.",
          "The buyer gets the alert directly on WhatsApp, with the order already prepared and ready to confirm.",
        ],
      },
    ],
    duration: "Implementation in 3 weeks.",
    results: "No more production stoppages due to missing supplies and an end to manual stock checks.",
  },
  "estudio-contable-ferreyra": {
    tags: ["CRM", "Automation", "Reminders", "Professional services"],
    summary: "Client management system with automatic deadline reminders for an accounting firm.",
    heroDescription:
      "We replaced a shared spreadsheet with a <strong>lightweight CRM</strong> with a profile for each client and the status of every filing, plus <strong>automatic reminders</strong> of deadlines for both the internal team and the end client.",
    sections: [
      {
        title: "Deadlines Lost in Spreadsheets",
        paragraphs: [
          "With around 80 active clients, the firm tracked tax deadlines in a shared spreadsheet with no alerts of any kind.",
          "As a result, <strong>smaller clients' deadlines</strong> slipped through, because the only way not to forget was for someone to remember on their own.",
        ],
      },
      {
        title: "CRM with a Profile per Client",
        paragraphs: [
          "We set up a <strong>lightweight CRM</strong> with an individual profile for each client and the status of each filing, replacing the single shared spreadsheet.",
          "The internal team now has a clear view of which filing is at which stage, without having to ask.",
        ],
      },
      {
        title: "Automatic Reminders",
        paragraphs: [
          "We configured <strong>automatic reminders</strong> before each deadline, both internal for the team and via WhatsApp for the end client.",
          "This noticeably reduced the number of calls from clients asking about the status of their filings.",
        ],
      },
    ],
    duration: "Implementation in 6 weeks.",
    results: "Zero missed deadlines and fewer client inquiries about the status of their filings.",
  },
  "peluqueria-lunas": {
    tags: ["Appointments", "Automation", "WhatsApp", "Micro business"],
    summary: "WhatsApp agent for automatic appointment booking and reminders at a neighborhood hair salon.",
    heroDescription:
      "We set up a <strong>WhatsApp agent</strong> that takes the appointment, adds it to a shared calendar and sends an <strong>automatic reminder</strong> 24 hours before, replacing manual coordination by chat.",
    sections: [
      {
        title: "Appointments Coordinated by Hand",
        paragraphs: [
          "The owner coordinated appointments on WhatsApp by hand, which took her 15 to 20 minutes a day.",
          "She also dealt with <strong>empty slots</strong> because clients forgot and didn't cancel in advance.",
        ],
      },
      {
        title: "WhatsApp Booking Agent",
        paragraphs: [
          "We implemented an <strong>automated agent</strong> that replies on WhatsApp, takes the requested appointment and adds it directly to a shared calendar.",
          "The owner no longer has to coordinate each appointment manually, freeing up that time every day.",
        ],
      },
      {
        title: "Automatic Reminders",
        paragraphs: [
          "The system sends an <strong>automatic reminder</strong> 24 hours before each appointment, with no human intervention.",
          "This cut no-shows to less than half compared to the previous manual coordination.",
        ],
      },
    ],
    duration: "Implementation in 2 weeks.",
    results: "Fewer no-shows and daily scheduling time back in the owner's hands.",
  },
  "distribuidora-norte": {
    tags: ["Analytics", "Dashboard", "Automation", "Distribution"],
    summary: "Automated sales dashboard by zone and sales rep for a wholesale distributor.",
    heroDescription:
      "We centralized the distributor's sales data sources and built an <strong>automated dashboard</strong> that updates itself, with sales by zone, by sales rep and by product.",
    sections: [
      {
        title: "Data Scattered across Spreadsheets",
        paragraphs: [
          "Sales by zone and by sales rep were entered into <strong>multiple separate spreadsheets</strong>, with no single point of consolidation.",
          "The owner only found out how the month was going at the close, putting together an Excel file by hand with each rep's data.",
        ],
      },
      {
        title: "Automatic Data Consolidation",
        paragraphs: [
          "We centralized the data sources in an intermediate database, automating the <strong>ingestion and consolidation</strong> of sales information.",
          "Putting together the monthly report by hand, which used to take days, is no longer necessary.",
        ],
      },
      {
        title: "Real-Time Sales Dashboard",
        paragraphs: [
          "We built a <strong>dashboard</strong> that updates automatically, with sales by zone, by sales rep and by product.",
          "The owner went from knowing the month's numbers days after the close to seeing them <strong>updated every day</strong>.",
        ],
      },
    ],
    duration: "Implementation in 4 weeks.",
    results: "Daily visibility of sales by zone and sales rep, with no more monthly reports built by hand.",
  },
  "gimnasio-powerfit": {
    tags: ["Digital presence", "Lead generation", "Ads", "Automation"],
    summary: "Landing page and lead generation campaign for a neighborhood gym with no online presence.",
    heroDescription:
      "We built a <strong>landing page with plans and schedules</strong>, an initial Meta Ads campaign targeted to the area, and an automation that sends every <strong>lead straight to a spreadsheet</strong> with follow-up and an alert to the manager.",
    sections: [
      {
        title: "Inquiries Lost for Lack of Online Presence",
        paragraphs: [
          "The gym depended entirely on <strong>word of mouth</strong>, with no website of its own and no way of showing up in Google searches.",
          "They lost inquiries from people who searched for the gym and found, at best, an outdated Instagram profile.",
        ],
      },
      {
        title: "Landing Page with Plans and Inquiry Form",
        paragraphs: [
          "We built a <strong>landing page</strong> with plans, schedules and an inquiry form, designed to convert visitors looking for specific information.",
          "We added an initial <strong>Meta Ads</strong> campaign targeted to the gym's catchment area.",
        ],
      },
      {
        title: "Lead Automation",
        paragraphs: [
          "Every lead who fills in the form is automatically added to a <strong>spreadsheet with follow-up</strong>, with no manual work.",
          "The manager gets an <strong>instant WhatsApp alert</strong> as soon as a new inquiry comes in.",
        ],
      },
    ],
    duration: "Implementation in 4 weeks.",
    results: "A first steady, measurable flow of new inquiries every week, with centralized follow-up.",
  },
  "veterinaria-san-roque": {
    tags: ["Automation", "Customer service", "WhatsApp", "AI"],
    summary: "WhatsApp agent that answers common questions and frees up front-desk time at a veterinary clinic.",
    heroDescription:
      "We set up a <strong>WhatsApp agent</strong> that answers common questions automatically and hands over to a person only when the case requires it, freeing up time at the front desk.",
    sections: [
      {
        title: "Service Interrupted by Routine Questions",
        paragraphs: [
          "A single person handled the front desk and WhatsApp at the same time, at a clinic with a high volume of daily inquiries.",
          "Simple questions like vaccine availability or opening hours <strong>constantly interrupted</strong> in-person service.",
        ],
      },
      {
        title: "WhatsApp Agent with Automatic Replies",
        paragraphs: [
          "We built a <strong>WhatsApp agent</strong> that automatically answers common questions, based on the clinic's own set of questions and answers.",
          "Most routine inquiries no longer need human intervention.",
        ],
      },
      {
        title: "Handover to a Person",
        paragraphs: [
          "The agent identifies when a case <strong>needs a person</strong> — emergencies, specific quotes — and hands the conversation over.",
          "This freed up front-desk time right during peak hours.",
        ],
      },
    ],
    duration: "Implementation in 3 weeks.",
    results: "Fewer routine inquiries needing a person during peak hours.",
  },
  turnoya: {
    tags: ["SaaS", "Own product", "Appointments", "Subscription"],
    summary: "Our own subscription-based booking and appointment management product, designed for barbershops and hair salons.",
    heroDescription:
      "After solving the appointment problem for one client, we packaged the solution as <strong>our own product</strong>: a public booking calendar, automatic reminders and a stats dashboard, sold as a <strong>monthly subscription</strong>.",
    sections: [
      {
        title: "A Problem that Repeated across Businesses",
        paragraphs: [
          "The problem of coordinating appointments by hand wasn't unique to one business: it repeated in <strong>dozens of barbershops and hair salons</strong> with the same logic.",
          "Rebuilding a custom solution every time wasn't sustainable as a business model for the studio.",
        ],
      },
      {
        title: "Multi-Tenant Booking System",
        paragraphs: [
          "We built a <strong>multi-tenant</strong> system: each business signs up with its own public booking calendar, with no individual development needed.",
          "The dashboard includes automatic reminders and basic usage stats for each business.",
        ],
      },
      {
        title: "Subscription Model",
        paragraphs: [
          "TurnoYa is sold as a <strong>monthly subscription</strong>, with an integrated payment gateway for recurring billing.",
          "The model generates low-ticket <strong>recurring revenue</strong>, without depending on selling a new project for every business.",
        ],
      },
    ],
    duration: "Version 1.0 developed in 10 weeks.",
    results: "A validated recurring revenue model, without depending on selling a new project for every business.",
  },
};
