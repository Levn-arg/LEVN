import { useEffect, useState } from "react";
import type { Lang } from "./ui";

// Idioma actual para las islas de React. Arranca en español (igual que el
// HTML del servidor, para no romper la hidratación) y se actualiza con el
// idioma elegido y con cada cambio (evento "levn:lang" del traductor).
export function useLang(): Lang {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const read = () => setLang(document.documentElement.lang === "en" ? "en" : "es");
    read();
    window.addEventListener("levn:lang", read);
    return () => window.removeEventListener("levn:lang", read);
  }, []);

  return lang;
}
