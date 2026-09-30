// Textos sueltos de las páginas (fuera de ui.ts y de los datos), del
// español al inglés, tal cual aparecen en pantalla.

export const PAGES_EN: Record<string, string> = {
  // Navegación común
  Inicio: "Home",
  Proyectos: "Projects",
  "Ver más proyectos": "See more projects",
  Categorías: "Categories",
  "El diagnóstico es gratis. Te respondemos en menos de 24 h hábiles.": "The diagnosis is free. We reply within 24 business hours.",

  // /proyectos
  "Proyectos — Levn": "Projects — Levn",
  "Negocios que ya resolvieron su operación y su presencia digital.": "Businesses that already solved their operations and their digital presence.",
  "Negocios que dejaron de hacer todo a mano, empezaron a recibir más consultas o llevaron su idea a la realidad.":
    "Businesses that stopped doing everything by hand, started getting more inquiries or brought their idea to life.",
  "¿Tu negocio": "Is your business",
  "es el próximo?": "next?",

  // /proyectos/[slug]
  Tecnologías: "Technologies",
  Duración: "Duration",
  Resultados: "Results",
  "necesita algo así?": "need something like this?",
  "pasarela de pagos": "payment gateway",
  "base de datos multi-tenant": "multi-tenant database",
  "API de WhatsApp Business": "WhatsApp Business API",
  "integración con Claude": "Claude integration",

  // /integraciones
  "Integraciones — Levn": "Integrations — Levn",
  "Las herramientas que ya usa tu negocio, conectadas entre sí: WhatsApp, Mercado Pago, ARCA, Tienda Nube y más.":
    "The tools your business already uses, connected to each other: WhatsApp, Mercado Pago, ARCA, Tienda Nube and more.",
  "No hace falta reemplazar tus herramientas. Las conectamos para que los datos pasen solos de una a otra y dejes de cargar lo mismo dos veces.":
    "You don't need to replace your tools. We connect them so data flows from one to another on its own and you stop entering the same thing twice.",
  "¿Usás otra herramienta?": "Using a different tool?",
  "Contanos cuál.": "Tell us which one.",

  // /tecnologias
  "Tecnologías — Levn": "Technologies — Levn",
  "Con qué construimos webs, apps y sistemas a medida, y para qué usamos cada tecnología.":
    "What we build websites, apps and custom systems with, and what we use each technology for.",
  "Con qué lo construimos,": "What we build it with,",
  "y para qué.": "and why.",
  "Elegimos cada tecnología por el problema que resuelve, no por moda. Todo lo que construimos queda documentado.":
    "We choose each technology for the problem it solves, not because it's trendy. Everything we build is documented.",
  "¿Tenés una idea?": "Got an idea?",
  "Hagámosla realidad.": "Let's make it real.",

  // Legales
  "Política de privacidad — Levn": "Privacy policy — Levn",
  "Términos y condiciones — Levn": "Terms and conditions — Levn",
  "Cómo Levn recopila, usa y protege tus datos personales.": "How Levn collects, uses and protects your personal data.",
  "Condiciones de uso del sitio y de los servicios de Levn.": "Terms of use of Levn's website and services.",
  "Última actualización: [fecha]": "Last updated: [date]",
  "Contenido pendiente.": "Content coming soon.",
  "Quiénes somos": "Who we are",
  "Qué datos recopilamos": "What data we collect",
  "Para qué usamos tus datos": "What we use your data for",
  "Con quién los compartimos": "Who we share it with",
  "Cuánto tiempo los guardamos": "How long we keep it",
  "Tus derechos": "Your rights",
  Cookies: "Cookies",
  "Cambios en esta política": "Changes to this policy",
  Contacto: "Contact",
  "Aceptación de los términos": "Acceptance of the terms",
  Servicios: "Services",
  "Diagnóstico gratuito": "Free diagnosis",
  "Propuestas, precios y pagos": "Proposals, pricing and payments",
  "Propiedad intelectual": "Intellectual property",
  Responsabilidades: "Responsibilities",
  Cancelación: "Cancellation",
  Modificaciones: "Changes",
  "Ley aplicable y jurisdicción": "Governing law and jurisdiction",
};

// Mensajes que devuelven el servidor y Supabase y muestran los formularios.
export const MESSAGES_EN: Record<string, string> = {
  "El calendario todavía no está configurado. Escribinos por WhatsApp mientras tanto.":
    "The calendar isn't set up yet. Message us on WhatsApp in the meantime.",
  "El envío de mails todavía no está configurado (falta RESEND_API_KEY).": "Email sending isn't set up yet.",
  "Error de conexión al enviar el mail. Probá de nuevo en unos minutos.": "Connection error while sending the email. Please try again in a few minutes.",
  "Error de conexión. Probá de nuevo en unos minutos.": "Connection error. Please try again in a few minutes.",
  "Ese horario ya fue reservado. Elegí otro, por favor.": "That time was just booked. Please pick another one.",
  "Faltan datos de la reunión.": "Some booking details are missing.",
  "Faltan datos del formulario.": "Some form fields are missing.",
  "No pudimos agendar la reunión. Probá de nuevo.": "We couldn't book the call. Please try again.",
  "No pudimos enviar el mail. Probá de nuevo.": "We couldn't send the email. Please try again.",
  "Solicitud inválida.": "Invalid request.",
};
