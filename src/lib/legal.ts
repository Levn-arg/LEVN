// Textos legales (términos y privacidad) desde src/data/legal.json.
//
// En el JSON, los textos pueden usar marcadores con los datos del titular
// (`company`) y los ajustes (`settings`), p. ej. "{brand}", "{email}" o
// "{warrantyDays}". Acá se reemplazan, así cada dato se cambia en un solo lugar.
import legal from "../data/legal.json";
import type { Lang } from "../i18n/ui";

export type LegalDocumentId = keyof typeof legal.documents;
export type LegalBlock =
  | { type: "p" | "note" | "legal"; html: string }
  | { type: "list"; items: string[] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };
export type LegalDocument = {
  title: string;
  highlight: string;
  pageTitle: string;
  description: string;
  intro: string;
  summaryTitle: string;
  summary: string[];
  sections: LegalSection[];
};

const values: Record<string, string> = {
  ...legal.company,
  ...Object.fromEntries(Object.entries(legal.settings).map(([key, value]) => [key, String(value)])),
};

/** Reemplaza los marcadores {clave} por los datos de `company` y `settings`. */
export function fill(text: string) {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** Documento ya completado, en el idioma pedido. */
export function getLegalDocument(id: LegalDocumentId, lang: Lang): LegalDocument {
  const raw = legal.documents[id][lang] as LegalDocument;
  return {
    ...raw,
    title: fill(raw.title),
    highlight: fill(raw.highlight),
    pageTitle: fill(raw.pageTitle),
    description: fill(raw.description),
    intro: fill(raw.intro),
    summary: raw.summary.map(fill),
    sections: raw.sections.map((section) => ({
      ...section,
      title: fill(section.title),
      blocks: section.blocks.map((block) =>
        block.type === "list" ? { ...block, items: block.items.map(fill) } : { ...block, html: fill(block.html) }
      ),
    })),
  };
}

/** Fecha de la última actualización, escrita según el idioma. */
export function legalUpdated(lang: Lang) {
  const date = new Date(`${legal.settings.updated}T12:00:00`);
  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-AR", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

export const LEGAL_EMAIL = legal.company.email;
