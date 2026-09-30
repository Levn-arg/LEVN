// Textos de la interfaz en español e inglés, con la misma estructura.
//
// Cómo funciona el idioma (ver src/i18n/translator.ts): el servidor arma
// todas las páginas en español, sin rutas por idioma. Si la persona elige
// inglés, el navegador reemplaza cada texto por su traducción usando el
// diccionario de src/i18n/dictionary.ts, que se arma con estos textos y con
// los de src/i18n/en/*. La elección queda guardada y aplica en todo el sitio.
//
// Para sumar un texto: agregalo en `es` y TypeScript va a marcar que falta en `en`.

export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "es";
export const LANG_STORAGE_KEY = "levn-lang";

const es = {
  meta: {
    title: "Levn — Hacé crecer tu negocio sin sumar más horas de trabajo",
    description: "Menos tareas a mano. Más consultas. Más ventas. Pedí tu diagnóstico gratis.",
  },
  nav: {
    apps: "Apps",
    automation: "Automatización",
    clients: "Conseguir clientes",
    web: "Web",
    contact: "Contacto",
  },
  header: {
    home: "Levn, inicio",
    main: "Principal",
    whatsapp: "Escribir por WhatsApp",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    toDark: "Activar modo oscuro",
    toLight: "Activar modo claro",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    theme: "Tema",
    language: "Idioma",
    switchLang: "English",
    switchLangShort: "EN",
    switchLangLabel: "View in English",
  },
  cta: {
    diagnosis: "Quiero mi diagnóstico gratis",
    diagnosisShort: "Diagnóstico gratis",
  },
  hero: {
    title: "Hacé crecer tu negocio",
    highlight: "sin sumar más horas de trabajo.",
    subtitle: "Menos tareas a mano. Más consultas. Más ventas.",
    secondary: "Ver cómo se ve",
  },
  integrations: {
    title: "Todo conectado,",
    highlight: "sin cambiar lo que ya usás.",
    subtitle: "Trabajamos con las herramientas que más usás.",
    all: "Ver todas las integraciones",
  },
  pain: {
    title: "¿Cuál de estas",
    highlight: "te está pasando?",
    footer: "Si te reconociste en alguna, seguí bajando.",
    cards: {
      1: {
        text: "Contestás tarde y la consulta se va con otro.",
        context: "Te escribieron a las 18:02 y contestaste a las 21. Para entonces, ya le habían comprado a otro.",
      },
      2: {
        text: "Cargás los mismos datos en tres lugares distintos.",
        context: "La misma venta va al Excel, al sistema de facturación y al cuaderno. Un error y a fin de mes nada cierra.",
      },
      3: {
        text: "Te buscan y no aparecés.",
        context: "Buscan tu rubro en tu barrio y aparecen tres competidores. Tu negocio no está ni en Google Maps.",
      },
      4: {
        text: "Tu idea sigue en tu cabeza.",
        context: "Hace meses que sabés cómo debería funcionar. Te falta saber cuánto sale y por dónde empezar.",
      },
    },
  },
  services: {
    apps: {
      eyebrow: "Desarrollo a medida",
      quote: "Tengo la idea, pero no sé cómo hacerla.",
      title: "Llevá tu idea a la realidad.",
      highlight: "a la realidad.",
      subtitle: "De un boceto a una app que tus clientes pueden usar.",
      results: ["Tu idea probada con usuarios reales en semanas.", "Una herramienta hecha para tu negocio, no una adaptada."],
      cta: "Quiero hacer mi idea",
    },
    automation: {
      eyebrow: "Automatización e integración",
      quote: "Me paso el día pasando datos de un lado a otro.",
      title: "Automatizá el flujo de trabajo de tu negocio.",
      highlight: "el flujo de trabajo",
      subtitle: "Ahorrá tiempo, optimizá tu trabajo.",
      results: [
        "Horas por semana que vuelven a ser tuyas.",
        "Cero datos perdidos entre planillas.",
        "Clientes que reciben respuesta al instante, aunque no estés.",
      ],
      cta: "Quiero recuperar mis horas",
    },
    clients: {
      eyebrow: "Adquisición y crecimiento",
      quote: "Publico, pero no me escribe nadie.",
      title: "Llegá a más gente, conseguí más clientes.",
      highlight: "conseguí más clientes.",
      subtitle: undefined as string | undefined,
      results: ["Consultas reales, no likes.", "Sabés de dónde viene cada cliente.", "Cada peso invertido, medido."],
      cta: "Quiero más consultas",
    },
    web: {
      eyebrow: "Presencia digital",
      quote: "Me buscan y encuentran a la competencia.",
      title: "Que te encuentren. Que te elijan.",
      highlight: "Que te elijan.",
      subtitle: undefined as string | undefined,
      results: ["Aparecés cuando te buscan.", "Una web que genera confianza y consultas.", "Online en días, no en meses."],
      cta: "Quiero mi web",
    },
  },
  projects: {
    eyebrow: "Proyectos",
    title: "Así se ve",
    highlight: "resuelto.",
    more: "Ver más proyectos",
    view: "Ver proyecto",
    techTitle: "Con qué lo",
    techHighlight: "construimos.",
    techSubtitle: "Tecnologías elegidas por el problema que resuelven, no por moda.",
    techAll: "Ver todas las tecnologías",
  },
  contact: {
    title: "Contanos qué",
    highlight: "te está frenando.",
    subtitle: "El diagnóstico es gratis. Te respondemos en menos de 24 h hábiles.",
    whatsappText: "Escribí ahora, sin formularios",
  },
  footer: {
    location: "levn.com.ar · Buenos Aires",
    legal: "Legal",
    privacy: "Política de privacidad",
    terms: "Términos y condiciones",
  },
  modal: {
    close: "Cerrar",
    name: "Nombre",
    email: "Email",
    sending: "Enviando…",
    form: {
      option: "Formulario",
      optionText: "Contanos por escrito.",
      dialog: "Formulario de contacto",
      eyebrow: "Formulario",
      title: "Contanos qué",
      highlight: "te está frenando.",
      subtitle: "El diagnóstico es gratis y sin compromiso. Te respondemos en menos de 24 h hábiles.",
      phone: "Teléfono (opcional)",
      message: "¿Qué te gustaría resolver?",
      submit: "Enviar mensaje",
      successTitle: "¡Listo!",
      successText: "Te respondemos en menos de 24 h hábiles.",
      preferTalk: "¿Preferís hablar ahora?",
      whatsapp: "Escribinos por WhatsApp",
    },
    schedule: {
      option: "Agendar llamada",
      optionText: "Elegí día y hora.",
      dialog: "Agendar una llamada",
      step1: "Agendar llamada · Paso 1 de 2",
      step2: "Agendar llamada · Paso 2 de 2",
      title1: "Elegí",
      highlight1: "día y hora.",
      title2: "Último",
      highlight2: "paso.",
      subtitle: "Una charla de 45 min para contarnos qué te frena. Sin compromiso.",
      prevMonth: "Mes anterior",
      nextMonth: "Mes siguiente",
      unavailable: "No disponible",
      times: "Horarios",
      pickDay: "Elegí un día para ver los horarios.",
      loading: "Cargando disponibilidad…",
      summaryPrefix: "Tu llamada sería el",
      summaryAt: "a las",
      hours: "hs",
      pickToContinue: "Elegí día y horario para continuar.",
      continue: "Continuar",
      change: "Cambiar fecha y horario",
      service: "¿Qué servicio necesitás?",
      servicePlaceholder: "Elegí una opción",
      message: "Contanos brevemente qué necesitás (opcional)",
      submit: "Confirmar llamada",
      successTitle: "¡Llamada agendada!",
      successText: "Te confirmamos por email.",
      weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      locale: "es-AR",
    },
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  meta: {
    title: "Levn — Grow your business without adding more hours of work",
    description: "Less manual work. More inquiries. More sales. Get your free diagnosis.",
  },
  nav: {
    apps: "Apps",
    automation: "Automation",
    clients: "Get clients",
    web: "Web",
    contact: "Contact",
  },
  header: {
    home: "Levn, home",
    main: "Main",
    whatsapp: "Message us on WhatsApp",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    theme: "Theme",
    language: "Language",
    switchLang: "Español",
    switchLangShort: "ES",
    switchLangLabel: "Ver en español",
  },
  cta: {
    diagnosis: "Get my free diagnosis",
    diagnosisShort: "Free diagnosis",
  },
  hero: {
    title: "Grow your business",
    highlight: "without adding more hours of work.",
    subtitle: "Less manual work. More inquiries. More sales.",
    secondary: "See how it looks",
  },
  integrations: {
    title: "Everything connected,",
    highlight: "without changing what you already use.",
    subtitle: "We work with the tools you use the most.",
    all: "See all integrations",
  },
  pain: {
    title: "Which of these",
    highlight: "sounds familiar?",
    footer: "If you recognized yourself in any of them, keep scrolling.",
    cards: {
      1: {
        text: "You reply late and the lead goes to someone else.",
        context: "They messaged you at 6:02 pm and you replied at 9. By then, they had already bought from someone else.",
      },
      2: {
        text: "You enter the same data in three different places.",
        context: "The same sale goes into Excel, the invoicing system and a notebook. One mistake and nothing adds up at the end of the month.",
      },
      3: {
        text: "People search for you and you don't show up.",
        context: "People search for your trade in your neighborhood and three competitors show up. Your business isn't even on Google Maps.",
      },
      4: {
        text: "Your idea is still in your head.",
        context: "You've known for months how it should work. What's missing is knowing what it costs and where to start.",
      },
    },
  },
  services: {
    apps: {
      eyebrow: "Custom development",
      quote: "I have the idea, but I don't know how to build it.",
      title: "Bring your idea to life.",
      highlight: "to life.",
      subtitle: "From a sketch to an app your customers can use.",
      results: ["Your idea tested with real users in weeks.", "A tool built for your business, not adapted to it."],
      cta: "I want to build my idea",
    },
    automation: {
      eyebrow: "Automation & integration",
      quote: "I spend all day moving data from one place to another.",
      title: "Automate your business workflow.",
      highlight: "workflow.",
      subtitle: "Save time, work smarter.",
      results: [
        "Hours every week that are yours again.",
        "Zero data lost between spreadsheets.",
        "Customers get an instant reply, even when you're not around.",
      ],
      cta: "I want my hours back",
    },
    clients: {
      eyebrow: "Acquisition & growth",
      quote: "I post, but nobody messages me.",
      title: "Reach more people, win more clients.",
      highlight: "win more clients.",
      subtitle: undefined,
      results: ["Real inquiries, not likes.", "You know where every client comes from.", "Every dollar you invest, measured."],
      cta: "I want more inquiries",
    },
    web: {
      eyebrow: "Digital presence",
      quote: "People look for me and find my competitors.",
      title: "Get found. Get chosen.",
      highlight: "Get chosen.",
      subtitle: undefined,
      results: ["You show up when people search.", "A website that builds trust and brings inquiries.", "Online in days, not months."],
      cta: "I want my website",
    },
  },
  projects: {
    eyebrow: "Projects",
    title: "This is what",
    highlight: "solved looks like.",
    more: "See more projects",
    view: "View project",
    techTitle: "What we",
    techHighlight: "build it with.",
    techSubtitle: "Technologies chosen for the problem they solve, not because they're trendy.",
    techAll: "See all technologies",
  },
  contact: {
    title: "Tell us what's",
    highlight: "holding you back.",
    subtitle: "The diagnosis is free. We reply within 24 business hours.",
    whatsappText: "Message us now, no forms",
  },
  footer: {
    location: "levn.com.ar · Buenos Aires",
    legal: "Legal",
    privacy: "Privacy policy",
    terms: "Terms and conditions",
  },
  modal: {
    close: "Close",
    name: "Name",
    email: "Email",
    sending: "Sending…",
    form: {
      option: "Form",
      optionText: "Tell us in writing.",
      dialog: "Contact form",
      eyebrow: "Form",
      title: "Tell us what's",
      highlight: "holding you back.",
      subtitle: "The diagnosis is free, no strings attached. We reply within 24 business hours.",
      phone: "Phone (optional)",
      message: "What would you like to solve?",
      submit: "Send message",
      successTitle: "Done!",
      successText: "We'll reply within 24 business hours.",
      preferTalk: "Rather talk now?",
      whatsapp: "Message us on WhatsApp",
    },
    schedule: {
      option: "Book a call",
      optionText: "Pick a day and time.",
      dialog: "Book a call",
      step1: "Book a call · Step 1 of 2",
      step2: "Book a call · Step 2 of 2",
      title1: "Pick a",
      highlight1: "day and time.",
      title2: "Last",
      highlight2: "step.",
      subtitle: "A 45-minute call to tell us what's holding you back. No strings attached.",
      prevMonth: "Previous month",
      nextMonth: "Next month",
      unavailable: "Unavailable",
      times: "Times",
      pickDay: "Pick a day to see available times.",
      loading: "Loading availability…",
      summaryPrefix: "Your call would be on",
      summaryAt: "at",
      hours: "(Buenos Aires time)",
      pickToContinue: "Pick a day and time to continue.",
      continue: "Continue",
      change: "Change date and time",
      service: "What service do you need?",
      servicePlaceholder: "Choose an option",
      message: "Briefly tell us what you need (optional)",
      submit: "Confirm call",
      successTitle: "Call booked!",
      successText: "We'll confirm by email.",
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      locale: "en-US",
    },
  },
};

const DICTIONARIES: Record<Lang, Dictionary> = { es, en };

export function useTranslations(lang: Lang): Dictionary {
  return DICTIONARIES[lang];
}

export { es as ES_UI, en as EN_UI };

/** Links del menú principal (anclas de la home). */
export function navLinks() {
  const t = es.nav;
  return [
    { label: t.apps, href: "/#apps" },
    { label: t.automation, href: "/#automatizacion" },
    { label: t.clients, href: "/#clientes" },
    { label: t.web, href: "/#web" },
    { label: t.contact, href: "/#contacto" },
  ];
}

// Servicios del formulario de agenda. El valor que se guarda en Supabase y
// va en el mail es siempre el español, para no mezclar datos entre idiomas.
export const SERVICE_LABELS_EN: Record<string, string> = {
  "Automatización e Integración": "Automation & integration",
  "Presencia Digital": "Digital presence",
  "Adquisición y Crecimiento": "Acquisition & growth",
  "Desarrollo a Medida": "Custom development",
  "Todavía no sé, quiero asesorarme": "Not sure yet, I'd like advice",
};
