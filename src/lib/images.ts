import fs from "node:fs";
import path from "node:path";

// Los proyectos se van cargando de a poco: una ruta de imagen en projects.json
// no garantiza que el archivo exista todavía en /public. Se chequea en build
// para mostrar un placeholder en lugar de una imagen rota.
export function publicImage(src: string | undefined): string | undefined {
  if (!src) return undefined;
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;
}
