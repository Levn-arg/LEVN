import type { LogoSource } from "../lib/logos";
import { ALL_INTEGRATIONS } from "./integrations";

// Tecnologías de desarrollo, agrupadas para /tecnologias.
// `marquee` indica si aparece en la cinta de la sección de proyectos.
export type Technology = LogoSource & {
  use: string;
  marquee?: boolean;
};

export type TechnologyCategory = {
  id: string;
  title: string;
  // Trazo (atributo `d`) del ícono de la categoría, en un lienzo de 24×24.
  icon: string;
  intro: string;
  items: Technology[];
};

export const TECHNOLOGY_CATEGORIES: TechnologyCategory[] = [
  {
    id: "web",
    icon: "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01",
    title: "Webs y aplicaciones web",
    intro: "Sitios rápidos, que cargan bien en cualquier celular y aparecen en Google.",
    items: [
      { name: "Astro", icon: "siAstro", marquee: true, use: "Nuestra base para landings y sitios: cargan casi al instante y posicionan bien en buscadores." },
      { name: "React", icon: "siReact", marquee: true, use: "Para paneles, sistemas de gestión y partes interactivas de una web." },
      { name: "Next.js", icon: "siNextdotjs", marquee: true, use: "Aplicaciones web completas, con páginas públicas y área privada para tus clientes." },
      { name: "Vue.js", icon: "siVuedotjs", marquee: true, use: "Aplicaciones web livianas y fáciles de mantener." },
      { name: "TypeScript", icon: "siTypescript", marquee: true, use: "Escribimos el código con tipos para detectar errores antes de que lleguen a tus clientes." },
      { name: "Tailwind CSS", icon: "siTailwindcss", marquee: true, use: "Diseño consistente y adaptado a cualquier tamaño de pantalla." },
    ],
  },
  {
    id: "mobile",
    icon: "M8 3h8a1 1 0 011 1v16a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1zM11 18h2",
    title: "Apps para celular",
    intro: "Tu idea en el celular de tus clientes, en Android y en iPhone.",
    items: [
      { name: "React Native", icon: "siReact", use: "Una sola app para Android y iPhone, con la misma base de código." },
      { name: "Expo", icon: "siExpo", marquee: true, use: "Publicamos y actualizamos tu app en las tiendas más rápido." },
      { name: "Kotlin", icon: "siKotlin", marquee: true, use: "Apps nativas de Android cuando se necesita el máximo rendimiento." },
      { name: "Swift", icon: "siSwift", marquee: true, use: "Apps nativas para iPhone y Mac." },
    ],
  },
  {
    id: "datos",
    icon: "M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    title: "Datos y servidores",
    intro: "Donde se guarda y se procesa la información de tu negocio, segura y respaldada.",
    items: [
      { name: "Supabase", icon: "siSupabase", marquee: true, use: "Base de datos, usuarios y archivos para tu sistema, con respaldos automáticos." },
      { name: "PostgreSQL", icon: "siPostgresql", marquee: true, use: "La base de datos detrás de los sistemas que tienen que crecer sin reescribirse." },
      { name: "Firebase", icon: "siFirebase", marquee: true, use: "Datos en tiempo real para apps: pedidos, chats o seguimiento de entregas." },
      { name: "Node.js", icon: "siNodedotjs", marquee: true, use: "Servidores y APIs que conectan tus sistemas entre sí." },
      { name: "Python", icon: "siPython", marquee: true, use: "Procesamiento de datos, lectura de archivos y extracción de información de otras webs." },
    ],
  },
  {
    id: "infraestructura",
    icon: "M7 18a4 4 0 01-.6-8A6 6 0 0118 9a4.5 4.5 0 01-.5 9z",
    title: "Publicación e infraestructura",
    intro: "Que todo esté online, sea rápido y no se caiga.",
    items: [
      { name: "Vercel", icon: "siVercel", marquee: true, use: "Publicamos webs y aplicaciones con HTTPS, dominio propio y actualizaciones sin cortes." },
      { name: "Cloudflare", icon: "siCloudflare", use: "Dominio, seguridad y velocidad para tu sitio." },
      { name: "Docker", icon: "siDocker", marquee: true, use: "Empaquetamos servicios (como n8n) para que corran igual en cualquier servidor." },
      { name: "GitHub", icon: "siGithub", marquee: true, use: "Todo el código versionado y respaldado, con el historial de cada cambio." },
    ],
  },
  {
    id: "ia",
    icon: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
    title: "Automatización e inteligencia artificial",
    intro: "El cómo detrás de las respuestas automáticas y los procesos que funcionan solos.",
    items: [
      { name: "n8n", icon: "siN8n", marquee: true, use: "Flujos que conectan tus herramientas: formularios, planillas, WhatsApp, facturación." },
      { name: "Claude", icon: "siClaude", marquee: true, use: "Respuestas a consultas frecuentes y lectura de mensajes o documentos, siempre con una persona a mano." },
      { name: "Resend", icon: "siResend", use: "Mails automáticos con tu marca: confirmaciones, avisos y recordatorios." },
    ],
  },
  {
    id: "diseno",
    icon: "M12 19l7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6M11 13a2 2 0 100-4 2 2 0 000 4z",
    title: "Diseño",
    intro: "Antes de programar, lo ves y lo probás.",
    items: [{ name: "Figma", icon: "siFigma", marquee: true, use: "Diseñamos cada pantalla y la validamos con vos antes de escribir una línea de código." }],
  },
];

export const ALL_TECHNOLOGIES = TECHNOLOGY_CATEGORIES.flatMap((category) => category.items);

// Para mostrar con logo las tecnologías que figuran en cada proyecto
// (projects.json usa nombres libres, como "API de WhatsApp Business").
const ALIASES: Record<string, string> = {
  "API de WhatsApp Business": "WhatsApp",
  "Google Maps API": "Google Maps",
  "integración con Claude": "Claude",
  "Looker Studio": "Looker Studio",
};
const EXTRA: LogoSource[] = [{ name: "Looker Studio", icon: "siLooker" }];

export function logoSourceFor(name: string): LogoSource {
  const target = ALIASES[name] ?? name;
  const match = [...ALL_TECHNOLOGIES, ...ALL_INTEGRATIONS, ...EXTRA].find((item) => item.name === target);
  return { name, icon: match?.icon, file: match?.file };
}
