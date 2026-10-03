// Diccionario español → inglés que usa el traductor (src/i18n/translator.ts).
// Sólo se descarga cuando alguien elige inglés.
//
// Se arma emparejando los textos en español con sus versiones en inglés:
//  - ui.ts: textos de la interfaz (misma estructura en `es` y `en`).
//  - en/projects.ts, en/catalog.ts: datos de proyectos, integraciones y tecnologías.
//  - en/pages.ts: textos sueltos de las páginas.
// TEXT: texto plano → texto. HTML: texto de un bloque [data-i18n-html] → HTML.

import { ES_UI, EN_UI } from "./ui";
import { projects } from "../data/projects.json";
import { INTEGRATION_CATEGORIES } from "../data/integrations";
import { TECHNOLOGY_CATEGORIES } from "../data/technologies";
import { PROJECTS_EN } from "./en/projects";
import { INTEGRATIONS_EN, TECHNOLOGIES_EN } from "./en/catalog";
import { PAGES_EN } from "./en/pages";
import { getLegalDocument, legalUpdated, type LegalDocumentId } from "../lib/legal";
import legal from "../data/legal.json";

export const TEXT = new Map<string, string>();
export const HTML = new Map<string, string>();
export const missing: string[] = [];

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
const plain = (html: string) => normalize(html.replace(/<[^>]+>/g, ""));

function add(es: string | undefined, en: string | undefined, where: string) {
  if (!es) return;
  if (!en) {
    missing.push(`${where}: ${es.slice(0, 60)}`);
    return;
  }
  TEXT.set(normalize(es), en);
}

// Recorre dos objetos con la misma forma y empareja sus textos.
function pair(es: unknown, en: unknown, where: string) {
  if (typeof es === "string") return add(es, typeof en === "string" ? en : undefined, where);
  if (Array.isArray(es)) return es.forEach((item, i) => pair(item, (en as unknown[] | undefined)?.[i], `${where}[${i}]`));
  if (es && typeof es === "object") {
    for (const [key, value] of Object.entries(es)) pair(value, (en as Record<string, unknown> | undefined)?.[key], `${where}.${key}`);
  }
}

// Interfaz.
pair(ES_UI, EN_UI, "ui");

// Títulos de servicio con una parte resaltada en el medio: se traducen enteros.
for (const [id, service] of Object.entries(ES_UI.services)) {
  const english = EN_UI.services[id as keyof typeof ES_UI.services];
  const [start, end = ""] = english.title.split(english.highlight);
  HTML.set(normalize(service.title), `${start}<span class="text-accent">${english.highlight}</span>${end}`);
}

// Proyectos.
for (const project of projects) {
  const en = PROJECTS_EN[project.slug];
  const where = `proyecto ${project.slug}`;
  if (!en) {
    missing.push(`${where}: sin traducción`);
    continue;
  }
  project.tags.forEach((tag, i) => add(tag, en.tags[i], where));
  add(project.summary, en.summary, where);
  add(project.duration, en.duration, where);
  add(project.results, en.results, where);
  HTML.set(plain(project.heroDescription), en.heroDescription);
  project.sections.forEach((section, i) => {
    add(section.title, en.sections[i]?.title, where);
    section.paragraphs.forEach((paragraph, j) => {
      const english = en.sections[i]?.paragraphs[j];
      if (english) HTML.set(plain(paragraph), english);
      else missing.push(`${where}: párrafo ${i + 1}.${j + 1}`);
    });
  });
}

// Integraciones y tecnologías.
function catalog(categories: typeof INTEGRATION_CATEGORIES | typeof TECHNOLOGY_CATEGORIES, en: typeof INTEGRATIONS_EN, field: "how" | "use") {
  for (const category of categories) {
    const translated = en[category.id];
    const where = `categoría ${category.id}`;
    add(category.title, translated?.title, where);
    add(category.intro, translated?.intro, where);
    for (const item of category.items as { name: string; how?: string; use?: string }[]) {
      add(item[field], translated?.items[item.name], `${where} / ${item.name}`);
    }
  }
}
catalog(INTEGRATION_CATEGORIES, INTEGRATIONS_EN, "how");
catalog(TECHNOLOGY_CATEGORIES, TECHNOLOGIES_EN, "use");

// Legales (src/data/legal.json): el JSON ya trae español e inglés con la misma
// forma. Párrafos e ítems van como bloques HTML; títulos y resumen, como texto.
for (const id of Object.keys(legal.documents) as LegalDocumentId[]) {
  const es = getLegalDocument(id, "es");
  const en = getLegalDocument(id, "en");
  const where = `legal ${id}`;
  for (const key of ["title", "highlight", "pageTitle", "description", "intro", "summaryTitle"] as const) add(es[key], en[key], where);
  add(`${es.pageTitle} — Levn`, `${en.pageTitle} — Levn`, where);
  es.summary.forEach((item, i) => add(item, en.summary[i], where));
  es.sections.forEach((section, i) => {
    const target = en.sections[i];
    add(section.title, target?.title, where);
    section.blocks.forEach((block, j) => {
      const other = target?.blocks[j];
      if (block.type === "list" && other?.type === "list") {
        block.items.forEach((item, k) => (other.items[k] ? HTML.set(plain(item), other.items[k]) : missing.push(`${where}: ${section.id}`)));
      } else if (block.type !== "list" && other && other.type !== "list") {
        HTML.set(plain(block.html), other.html);
      } else missing.push(`${where}: ${section.id} bloque ${j + 1}`);
    });
  });
}
add(legalUpdated("es"), legalUpdated("en"), "legal fecha");

// Textos sueltos.
for (const [es, en] of Object.entries(PAGES_EN)) add(es, en, "páginas");

if (import.meta.env?.DEV && missing.length) {
  console.warn(`[i18n] Textos sin traducción al inglés (${missing.length}):\n${missing.join("\n")}`);
}
