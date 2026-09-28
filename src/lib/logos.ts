import * as icons from "simple-icons";

// Logos de marcas y tecnologías. Los que están en simple-icons se dibujan con
// su trazo y color oficial; el resto (sobre todo herramientas argentinas) usa
// su archivo en /public/images/logos/ (`file`). Si no hay ninguno, queda un
// monograma neutro.
export type IconKey = keyof typeof icons;

export type LogoSource = {
  name: string;
  icon?: IconKey;
  file?: string;
  // El archivo es un wordmark horizontal y no un isotipo cuadrado.
  wide?: boolean;
};

export type Logo =
  | { kind: "icon"; name: string; path: string; color: string }
  | { kind: "file"; name: string; file: string; wide: boolean }
  | { kind: "monogram"; name: string; initials: string };

// Los logos muy claros (Mailchimp, JavaScript…) no se leen sobre blanco:
// esos se muestran en tinta.
function readableColor(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.6 ? "#171225" : `#${hex}`;
}

function initialsOf(name: string) {
  const words = name.replace(/\(.*?\)/g, "").trim().split(/\s+/);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
}

export function resolveLogo({ name, icon, file, wide = false }: LogoSource): Logo {
  if (file) return { kind: "file", name, file, wide };
  if (icon) {
    const data = icons[icon] as { hex: string; path: string };
    return { kind: "icon", name, path: data.path, color: readableColor(data.hex) };
  }
  return { kind: "monogram", name, initials: initialsOf(name) };
}
