import type { LogoSource } from "../lib/logos";

// Herramientas con las que trabajamos, agrupadas para /integraciones.
// `marquee` indica en qué cinta de la home aparece (1 o 2).
export type Integration = LogoSource & {
  how: string;
  marquee?: 1 | 2;
};

export type IntegrationCategory = {
  id: string;
  title: string;
  // Trazo (atributo `d`) del ícono de la categoría, en un lienzo de 24×24.
  icon: string;
  intro: string;
  items: Integration[];
};

export const INTEGRATION_CATEGORIES: IntegrationCategory[] = [
  {
    id: "atencion",
    icon: "M4 5h16v11H9l-5 4z",
    title: "Mensajes y atención",
    intro: "Donde te escriben tus clientes. Que ninguna consulta quede sin respuesta.",
    items: [
      { name: "WhatsApp", icon: "siWhatsapp", marquee: 1, how: "Respondemos consultas al instante, confirmamos pedidos y turnos, y mandamos recordatorios. Cuando hace falta una persona, te pasa la conversación ya ordenada." },
      { name: "Instagram", icon: "siInstagram", marquee: 1, how: "Centralizamos los mensajes directos con el resto de tus consultas y respondemos las preguntas frecuentes sin que estés pendiente del celular." },
      { name: "Messenger", icon: "siMessenger", how: "Sumamos los mensajes de tu página de Facebook al mismo circuito de atención que WhatsApp e Instagram." },
      { name: "Telegram", icon: "siTelegram", how: "Avisos internos para tu equipo: pedidos nuevos, stock bajo o pagos recibidos, en un grupo privado." },
      { name: "Gmail", icon: "siGmail", marquee: 1, how: "Enviamos confirmaciones, presupuestos y facturas por mail de forma automática, y ordenamos los mails entrantes por tipo de consulta." },
    ],
  },
  {
    id: "cobros",
    icon: "M3 6h18v12H3zM3 10h18M7 15h3",
    title: "Cobros y pagos",
    intro: "Cobrar sin perseguir a nadie y saber al instante quién pagó.",
    items: [
      { name: "Mercado Pago", icon: "siMercadopago", marquee: 1, how: "Generamos links y QR de pago, y cuando el pago se acredita se actualiza el pedido, se avisa al cliente y se emite la factura." },
      { name: "MODO", file: "/images/logos/modo.png",  marquee: 1, how: "Sumamos MODO como medio de cobro para que tus clientes paguen desde la app de su banco." },
      { name: "Ualá Bis", file: "/images/logos/uala.png",  marquee: 2, how: "Registramos los cobros de Ualá Bis en tu planilla o sistema para que la caja cierre sin cargar nada a mano." },
      { name: "Stripe", icon: "siStripe", how: "Para cobrar en dólares o a clientes del exterior, con suscripciones y pagos recurrentes." },
      { name: "PayPal", icon: "siPaypal", how: "Cobros internacionales conectados a tus pedidos y a tu registro de ventas." },
    ],
  },
  {
    id: "gestion",
    icon: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
    title: "Facturación y gestión",
    intro: "Que los números estén al día sin pasar datos de un lado a otro.",
    items: [
      { name: "ARCA (ex AFIP)", file: "/images/logos/arca.png", marquee: 1, how: "Emitimos facturas electrónicas automáticamente cuando se confirma una venta o un pago, y las enviamos al cliente." },
      { name: "Tango Gestión", file: "/images/logos/tango.png",  marquee: 2, how: "Conectamos tus ventas online y tus pedidos con Tango para no cargar dos veces la misma operación." },
      { name: "Colppy", marquee: 2, how: "Sincronizamos ventas, cobros y clientes con tu contabilidad en Colppy." },
      { name: "Xubio", file: "/images/logos/xubio.svg",  marquee: 2, how: "Llevamos las ventas del día a Xubio para que la contabilidad esté siempre actualizada." },
      { name: "Contabilium", how: "Integramos facturación, stock y ventas de tus distintos canales en Contabilium." },
      { name: "Google Sheets", icon: "siGooglesheets", marquee: 1, how: "Si tu negocio vive en una planilla, la ordenamos y la conectamos: se completa sola con cada pedido, pago o consulta." },
      { name: "Excel", file: "/images/logos/excel.svg",  how: "Pasamos tus Excel a un sistema ordenado, o los conectamos para que se actualicen sin carga manual." },
      { name: "Airtable", icon: "siAirtable", how: "Armamos bases de datos simples para clientes, pedidos o stock, con vistas para cada persona del equipo." },
      { name: "Notion", icon: "siNotion", marquee: 2, how: "Documentamos procesos y conectamos tus tableros de Notion con los datos reales del negocio." },
    ],
  },
  {
    id: "ventas",
    icon: "M4 9l1.5-5h13L20 9M4 9h16v11H4zM9 20v-6h6v6",
    title: "Tiendas y canales de venta",
    intro: "Vender en varios lugares sin que el stock ni los pedidos se desordenen.",
    items: [
      { name: "Tienda Nube", file: "/images/logos/tiendanube.png",  marquee: 1, how: "Cada venta de tu tienda actualiza el stock, avisa al cliente por WhatsApp y genera la factura." },
      { name: "Mercado Libre", file: "/images/logos/mercadolibre.svg",  marquee: 2, how: "Unificamos las preguntas y ventas de Mercado Libre con tus otros canales, y sincronizamos el stock." },
      { name: "Shopify", icon: "siShopify", marquee: 2, how: "Conectamos tu tienda con cobros, envíos, facturación y seguimiento de clientes." },
      { name: "WooCommerce", file: "/images/logos/woocommerce.svg", marquee: 2, how: "Integramos los pedidos de tu tienda en WordPress con el resto de tus herramientas." },
      { name: "PedidosYa", file: "/images/logos/pedidosya.svg", marquee: 2, how: "Juntamos los pedidos de delivery con los del local para ver todas las ventas en un solo lugar." },
      { name: "Rappi", file: "/images/logos/rappi.png",  marquee: 2, how: "Registramos las ventas de Rappi junto al resto, para saber qué canal te deja más." },
    ],
  },
  {
    id: "envios",
    icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z",
    title: "Envíos",
    intro: "Que el cliente sepa dónde está su pedido sin tener que preguntar.",
    items: [
      { name: "Andreani", file: "/images/logos/andreani.svg",  marquee: 2, how: "Generamos las etiquetas de envío desde tus pedidos y le mandamos al cliente el número de seguimiento." },
      { name: "OCA", file: "/images/logos/oca.svg", marquee: 2, how: "Cotizamos y creamos los envíos automáticamente, y avisamos cada cambio de estado." },
      { name: "Correo Argentino", file: "/images/logos/correoargentino.svg", marquee: 2,  how: "Automatizamos el alta de envíos y el aviso de seguimiento al cliente." },
      { name: "Google Maps", icon: "siGooglemaps", marquee: 1, how: "Calculamos zonas y costos de envío, y ordenamos recorridos de reparto." },
    ],
  },
  {
    id: "marketing",
    icon: "M4 10v4h3l6 4V6L7 10zM17 9a4 4 0 010 6",
    title: "Publicidad y marketing",
    intro: "Saber de dónde viene cada cliente y cuánto costó conseguirlo.",
    items: [
      { name: "Meta Ads", icon: "siMeta", marquee: 1, how: "Armamos y gestionamos campañas en Instagram y Facebook, y cada consulta que llega queda registrada con su origen." },
      { name: "Google Ads", icon: "siGoogleads", marquee: 1, how: "Campañas para aparecer cuando te buscan, medidas por consultas reales y no por clics." },
      { name: "Google Analytics", icon: "siGoogleanalytics", marquee: 2, how: "Medimos qué páginas y campañas traen consultas, con reportes que se entienden." },
      { name: "Google Business", icon: "siGoogle", marquee: 1, how: "Optimizamos tu perfil para que aparezcas en Maps y conectamos las reseñas y consultas con tu atención." },
      { name: "TikTok", icon: "siTiktok", marquee: 2, how: "Campañas y contenido para llegar a nuevos clientes, con las consultas conectadas a tu WhatsApp." },
      { name: "Mailchimp", icon: "siMailchimp", how: "Campañas de mail a tus clientes, segmentadas según lo que compraron." },
      { name: "Brevo", icon: "siBrevo", how: "Mails y mensajes automáticos para reactivar clientes que hace tiempo no compran." },
      { name: "HubSpot", icon: "siHubspot", marquee: 2, how: "Conectamos tus consultas y ventas con HubSpot para seguir cada oportunidad." },
    ],
  },
  {
    id: "agenda",
    icon: "M4 5h16v15H4zM4 10h16M9 3v4M15 3v4",
    title: "Agenda y equipo",
    intro: "Menos ausencias y un equipo que sabe qué hacer cada día.",
    items: [
      { name: "Google Calendar", icon: "siGooglecalendar", marquee: 1, how: "Los turnos se agendan solos y el cliente recibe recordatorios antes de la cita." },
      { name: "Calendly", icon: "siCalendly", marquee: 2, how: "Reservas online conectadas a tus avisos, cobros y registro de clientes." },
      { name: "Google Meet", icon: "siGooglemeet", how: "Reuniones que se crean automáticamente al confirmar una reserva." },
      { name: "Zoom", icon: "siZoom", how: "Links de reunión generados y enviados solos con cada turno." },
      { name: "Google Drive", icon: "siGoogledrive", marquee: 2, how: "Ordenamos documentos y generamos presupuestos o contratos a partir de plantillas." },
      { name: "Trello", icon: "siTrello", how: "Cada pedido o consulta nueva crea su tarjeta, para que el equipo sepa qué sigue." },
    ],
  },
  {
    id: "automatizacion",
    icon: "M13 3L5 13h6l-1 8 8-10h-6z",
    title: "Automatización",
    intro: "El motor que conecta todo lo anterior.",
    items: [
      { name: "n8n", icon: "siN8n", marquee: 2, how: "Nuestra herramienta principal para armar flujos entre sistemas. Puede correr en un servidor propio, para que tus datos queden bajo tu control." },
      { name: "Zapier", icon: "siZapier", how: "Si ya usás Zapier, ordenamos y mejoramos tus automatizaciones existentes." },
      { name: "Make", icon: "siMake", how: "Flujos visuales para procesos simples que tu equipo puede entender y ajustar." },
    ],
  },
];

export const ALL_INTEGRATIONS = INTEGRATION_CATEGORIES.flatMap((category) => category.items);
