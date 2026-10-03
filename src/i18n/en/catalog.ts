// Integraciones y tecnologías en inglés, por id de categoría y nombre de
// herramienta (mismos que en src/data/integrations.ts y technologies.ts).
// Al sumar una herramienta, agregá acá su texto: en desarrollo, la consola
// del navegador avisa qué falta.

type CategoryEn = { title: string; intro: string; items: Record<string, string> };

export const INTEGRATIONS_EN: Record<string, CategoryEn> = {
  atencion: {
    title: "Messaging and customer service",
    intro: "Where your customers message you. So no inquiry goes unanswered.",
    items: {
      WhatsApp: "We answer inquiries instantly, confirm orders and appointments, and send reminders. When a person is needed, it hands you the conversation already organized.",
      Instagram: "We bring direct messages together with the rest of your inquiries and answer common questions without you having to watch your phone.",
      Messenger: "We add your Facebook page's messages to the same customer service flow as WhatsApp and Instagram.",
      Telegram: "Internal alerts for your team: new orders, low stock or payments received, in a private group.",
      Gmail: "We send confirmations, quotes and invoices by email automatically, and sort incoming emails by type of inquiry.",
    },
  },
  cobros: {
    title: "Payments",
    intro: "Get paid without chasing anyone and know instantly who paid.",
    items: {
      "Mercado Pago": "We generate payment links and QR codes, and when the payment clears the order is updated, the customer is notified and the invoice is issued.",
      MODO: "We add MODO as a payment method so your customers can pay from their bank's app.",
      "Ualá Bis": "We record Ualá Bis payments in your spreadsheet or system so your cash closes without entering anything by hand.",
      Stripe: "To charge in dollars or bill clients abroad, with subscriptions and recurring payments.",
      PayPal: "International payments connected to your orders and your sales records.",
    },
  },
  gestion: {
    title: "Invoicing and management",
    intro: "Keep your numbers up to date without moving data from one place to another.",
    items: {
      "ARCA (ex AFIP)": "We issue electronic invoices automatically when a sale or payment is confirmed, and send them to the customer.",
      "Tango Gestión": "We connect your online sales and orders with Tango so you never enter the same transaction twice.",
      Colppy: "We sync sales, payments and customers with your accounting in Colppy.",
      Xubio: "We send the day's sales to Xubio so your accounting is always up to date.",
      Contabilium: "We bring invoicing, stock and sales from your different channels together in Contabilium.",
      "Google Sheets": "If your business lives in a spreadsheet, we organize it and connect it: it fills itself in with every order, payment or inquiry.",
      Excel: "We move your Excel files into an organized system, or connect them so they update without manual entry.",
      Airtable: "We set up simple databases for customers, orders or stock, with views for each person on the team.",
      Notion: "We document processes and connect your Notion boards with the business's real data.",
    },
  },
  ventas: {
    title: "Stores and sales channels",
    intro: "Sell in several places without your stock or orders getting out of sync.",
    items: {
      "Tienda Nube": "Every sale in your store updates stock, notifies the customer on WhatsApp and creates the invoice.",
      "Mercado Libre": "We bring Mercado Libre questions and sales together with your other channels, and sync your stock.",
      Shopify: "We connect your store with payments, shipping, invoicing and customer follow-up.",
      WooCommerce: "We integrate your WordPress store's orders with the rest of your tools.",
      PedidosYa: "We bring delivery orders together with in-store ones so you see all your sales in one place.",
      Rappi: "We record Rappi sales alongside the rest, so you know which channel earns you the most.",
    },
  },
  envios: {
    title: "Shipping",
    intro: "Customers know where their order is without having to ask.",
    items: {
      Andreani: "We generate shipping labels from your orders and send the customer the tracking number.",
      OCA: "We quote and create shipments automatically, and notify every status change.",
      "Correo Argentino": "We automate shipment creation and tracking notifications to the customer.",
      "Google Maps": "We calculate delivery zones and costs, and plan delivery routes.",
    },
  },
  marketing: {
    title: "Advertising and marketing",
    intro: "Know where every customer comes from and what it cost to win them.",
    items: {
      "Meta Ads": "We set up and manage Instagram and Facebook campaigns, and every inquiry that comes in is recorded with its source.",
      "Google Ads": "Campaigns to show up when people search for you, measured by real inquiries, not clicks.",
      "Google Analytics": "We measure which pages and campaigns bring inquiries, with reports that make sense.",
      "Google Business": "We optimize your profile so you show up on Maps and connect reviews and inquiries to your customer service.",
      TikTok: "Campaigns and content to reach new customers, with inquiries connected to your WhatsApp.",
      Mailchimp: "Email campaigns to your customers, segmented by what they bought.",
      Brevo: "Automated emails and messages to win back customers who haven't bought in a while.",
      HubSpot: "We connect your inquiries and sales with HubSpot to follow every opportunity.",
    },
  },
  agenda: {
    title: "Scheduling and team",
    intro: "Fewer no-shows and a team that knows what to do every day.",
    items: {
      "Google Calendar": "Appointments book themselves and the customer gets reminders before the visit.",
      Calendly: "Online bookings connected to your notifications, payments and customer records.",
      "Google Meet": "Meetings created automatically when a booking is confirmed.",
      Zoom: "Meeting links generated and sent automatically with every appointment.",
      "Google Drive": "We organize documents and generate quotes or contracts from templates.",
      Trello: "Every new order or inquiry creates its own card, so the team knows what's next.",
    },
  },
  automatizacion: {
    title: "Automation",
    intro: "The engine that connects everything above.",
    items: {
      n8n: "Our main tool for building flows between systems. It can run on your own server, so your data stays under your control.",
      Zapier: "If you already use Zapier, we clean up and improve your existing automations.",
      Make: "Visual flows for simple processes your team can understand and adjust.",
    },
  },
};

export const TECHNOLOGIES_EN: Record<string, CategoryEn> = {
  web: {
    title: "Websites and web apps",
    intro: "Fast sites that load well on any phone and show up on Google.",
    items: {
      Astro: "Our foundation for landing pages and websites: they load almost instantly and rank well in search engines.",
      React: "For dashboards, management systems and the interactive parts of a website.",
      "Next.js": "Complete web apps, with public pages and a private area for your customers.",
      "Vue.js": "Lightweight web apps that are easy to maintain.",
      TypeScript: "We write typed code to catch errors before they reach your customers.",
      "Tailwind CSS": "Consistent design that adapts to any screen size.",
    },
  },
  mobile: {
    title: "Mobile apps",
    intro: "Your idea on your customers' phones, on Android and iPhone.",
    items: {
      "React Native": "A single app for Android and iPhone, from the same codebase.",
      Expo: "We publish and update your app in the stores faster.",
      Kotlin: "Native Android apps when maximum performance is needed.",
      Swift: "Native apps for iPhone and Mac.",
    },
  },
  datos: {
    title: "Data and servers",
    intro: "Where your business information is stored and processed, secure and backed up.",
    items: {
      Supabase: "Database, users and files for your system, with automatic backups.",
      PostgreSQL: "The database behind systems that need to grow without being rewritten.",
      Firebase: "Real-time data for apps: orders, chats or delivery tracking.",
      "Node.js": "Servers and APIs that connect your systems to each other.",
      Python: "Data processing, reading files and extracting information from other websites.",
    },
  },
  infraestructura: {
    title: "Hosting and infrastructure",
    intro: "Everything online, fast and always up.",
    items: {
      Vercel: "We publish websites and apps with HTTPS, your own domain and updates without downtime.",
      Cloudflare: "Domain, security and speed for your site.",
      Docker: "We package services (like n8n) so they run the same on any server.",
      GitHub: "All code versioned and backed up, with the history of every change.",
    },
  },
  ia: {
    title: "Automation and artificial intelligence",
    intro: "The how behind automatic replies and processes that run on their own.",
    items: {
      n8n: "Flows that connect your tools: forms, spreadsheets, WhatsApp, invoicing.",
      Claude: "Answers to common questions and reading messages or documents, always with a person on hand.",
      Resend: "Automated emails with your brand: confirmations, notices and reminders.",
    },
  },
  diseno: {
    title: "Design",
    intro: "Before we write code, you see it and try it.",
    items: {
      Figma: "We design every screen and validate it with you before writing a single line of code.",
    },
  },
};
