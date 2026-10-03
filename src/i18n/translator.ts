// Traductor del sitio en el navegador.
//
// El servidor arma todo en español. Si la persona elige inglés, se descarga
// el diccionario (src/i18n/dictionary.ts, sólo en ese caso) y se reemplaza
// cada texto que tenga traducción. Lo que aparece después (menús, modales)
// también se traduce, con un MutationObserver. Volver a español restaura los
// textos originales sin recargar. La elección se guarda en localStorage.
//
// Qué se traduce:
//  - Nodos de texto cuyo contenido (sin espacios de más) está en el diccionario.
//  - Algunos atributos (aria-label, alt, title, placeholder y los data-label-*
//    que usan los botones para cambiar su texto).
//  - Elementos con [data-i18n-html]: todo su HTML, buscado por su texto
//    (párrafos con <strong>, títulos con una parte resaltada).
// Qué no: islas de React (se traducen solas, ver useLang), [data-i18n-skip]
// y las maquetas de pantallas ([data-fit]).

import { LANG_STORAGE_KEY, type Lang } from "./ui";

type Dictionaries = typeof import("./dictionary");

const SKIP = "script, style, noscript, astro-island, [data-i18n-skip], [data-fit]";
const ATTRIBUTES = [
  "aria-label",
  "alt",
  "title",
  "placeholder",
  "data-label-dark",
  "data-label-light",
  "data-text-dark",
  "data-text-light",
  "data-label-open",
  "data-label-close",
];

const root = document.documentElement;
let dict: Dictionaries | null = null;
let current: Lang = root.lang === "en" ? "en" : "es";

// Originales en español y último valor aplicado, para poder volver atrás y
// distinguir nuestros cambios de los que hace otro código (p. ej. React).
const originalText = new Map<Text, string>();
const appliedText = new WeakMap<Text, string>();
const originalAttrs = new Map<Element, Record<string, string>>();
const originalHtml = new Map<Element, string>();
const original = { title: document.title, description: metaDescription()?.content ?? "" };

function metaDescription() {
  return document.querySelector<HTMLMetaElement>('meta[name="description"]');
}

const normalize = (text: string) => text.replace(/\s+/g, " ").trim();

function lookup(text: string) {
  const key = normalize(text);
  const direct = dict?.TEXT.get(key);
  if (direct || !dict) return direct;
  // Citas entre comillas tipográficas (“…”): se traduce el texto de adentro.
  const quoted = key.match(/^“(.+)”$/);
  const inner = quoted && dict.TEXT.get(quoted[1]);
  return inner ? `“${inner}”` : undefined;
}

function skipped(node: Node) {
  const element = node instanceof Element ? node : node.parentElement;
  return !element || !!element.closest(SKIP);
}

function translateText(node: Text) {
  const value = node.nodeValue ?? "";
  // Si el valor es el que pusimos nosotros, ya está traducido.
  if (appliedText.get(node) === value) return;
  const english = lookup(value);
  if (!english) return;
  // Se conservan los espacios de los bordes para no pegar palabras.
  const lead = value.match(/^\s*/)![0];
  const trail = value.match(/\s*$/)![0];
  const next = lead + english + trail;
  originalText.set(node, value);
  appliedText.set(node, next);
  node.nodeValue = next;
}

function translateAttributes(element: Element) {
  for (const name of ATTRIBUTES) {
    const value = element.getAttribute(name);
    if (!value) continue;
    const english = lookup(value);
    if (!english || english === value) continue;
    const saved = originalAttrs.get(element) ?? {};
    saved[name] = value;
    originalAttrs.set(element, saved);
    element.setAttribute(name, english);
  }
}

function translateHtml(element: Element) {
  if (originalHtml.has(element)) return;
  const english = dict?.HTML.get(normalize(element.textContent ?? ""));
  if (!english) return;
  originalHtml.set(element, element.innerHTML);
  element.innerHTML = english;
}

function translateTree(start: Node) {
  if (!dict || current !== "en") return;
  if (start instanceof Text) {
    if (!skipped(start)) translateText(start);
    return;
  }
  if (!(start instanceof Element) || start.closest(SKIP)) return;

  // Primero los bloques con HTML propio; después, texto y atributos del resto.
  if (start.hasAttribute("data-i18n-html")) {
    translateHtml(start);
    return;
  }
  start.querySelectorAll("[data-i18n-html]").forEach((el) => !el.closest(SKIP) && translateHtml(el));

  const walker = document.createTreeWalker(start, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (node instanceof Element && node.matches(SKIP)) return NodeFilter.FILTER_REJECT;
      if (node instanceof Element && node.hasAttribute("data-i18n-html")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  for (let node: Node | null = start; node; node = walker.nextNode()) {
    if (node instanceof Text) translateText(node);
    else if (node instanceof Element) translateAttributes(node);
  }
}

function restoreSpanish() {
  for (const [node, value] of originalText) {
    if (node.isConnected && appliedText.get(node) === node.nodeValue) node.nodeValue = value;
    appliedText.delete(node);
  }
  originalText.clear();
  for (const [element, attrs] of originalAttrs) {
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
  }
  originalAttrs.clear();
  for (const [element, html] of originalHtml) element.innerHTML = html;
  originalHtml.clear();
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "characterData") translateTree(mutation.target);
    else if (mutation.type === "attributes") !skipped(mutation.target) && translateAttributes(mutation.target as Element);
    else mutation.addedNodes.forEach((node) => translateTree(node));
  }
});

async function setLang(lang: Lang, { save = true } = {}) {
  current = lang;
  root.lang = lang;
  if (save) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {}
  }

  if (lang === "en") {
    try {
      dict ??= await import("./dictionary");
    } catch {
      // Sin diccionario (p. ej. sin conexión): queda en español.
      current = "es";
      root.lang = "es";
    }
    if (current === "en" && dict) {
      translateTree(document.body);
      document.title = lookup(original.title) ?? original.title;
      const meta = metaDescription();
      if (meta) meta.content = lookup(original.description) ?? original.description;
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ATTRIBUTES,
      });
    }
  } else {
    observer.disconnect();
    restoreSpanish();
    document.title = original.title;
    const meta = metaDescription();
    if (meta) meta.content = original.description;
  }

  root.classList.remove("i18n-pending");
  // Las islas de React escuchan este evento para cambiar sus textos.
  window.dispatchEvent(new CustomEvent("levn:lang", { detail: current }));
}

document.addEventListener("click", (event) => {
  const button = (event.target as Element | null)?.closest("[data-lang-toggle]");
  if (button) setLang(current === "en" ? "es" : "en");
});

if (current === "en") setLang("en", { save: false });
