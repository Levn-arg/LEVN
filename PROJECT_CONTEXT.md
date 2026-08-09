# LEVN — Landing Page — Contexto del proyecto

Este documento sirve de guía para trabajar en este proyecto (humano o IA). Resume de dónde viene el diseño, cómo está construido el código y las convenciones a seguir para mantener consistencia.

## Origen

La landing se implementó a partir de un diseño exportado desde Claude Design (`claude.ai/design`), proyecto `547874c0-62ef-477a-a57e-fcb9998361b7`, archivo `LEVN Landing.dc.html`. Ese archivo es un mockup estático en HTML con estilos inline — se usó como referencia visual exacta (colores, tipografías, espaciados, textos) para reconstruir la página como un sitio Astro real, componetizado y responsive.

El proyecto de diseño también contiene un design system llamado "Modernist" (carpeta `_ds/`) que **no tiene relación con LEVN**: es un sistema aparte (rojo/blanco, tipografía Archivo, sin bordes redondeados) que no es importado ni usado por `LEVN Landing.dc.html`. Ignóralo si volvés a consultar el proyecto de diseño — la fuente de verdad visual de LEVN son los estilos inline de ese único archivo.

## Qué es LEVN

Agencia digital para PyMEs (mercado hispanohablante, Argentina). El mensaje central: "Menos caos. Más clientes." Ofrecen 4 líneas de servicio:

1. **Automatización e Integración** — agentes IA, integraciones, reactivación de clientes, turnos, reportes.
2. **Presencia Digital** — landing pages, sitios web, Google Business, diseño de conversión.
3. **Adquisición y Crecimiento** — Meta/Google Ads, email marketing, funnels.
4. **Desarrollo a Medida** — apps, MVPs, SaaS vertical, scraping, integraciones avanzadas.

El copy y las secciones apuntan a un embudo clásico: problema → qué hacemos → catálogo rápido de arranque → cómo trabajamos (proceso en 4 pasos) → proyectos/para quién/por qué nosotros → stats → contacto.

## Stack técnico

- **Astro 5** (SSG). Las secciones son `.astro` estáticos; una sola pieza es interactiva y vive como **isla de React** (ver más abajo).
- **Tailwind CSS v4** vía `@tailwindcss/vite` (no `@astrojs/tailwind`, que es el integration legacy pensado para Tailwind v3). No hay `tailwind.config.js`: en v4 los tokens se declaran en CSS con `@theme` dentro de `src/styles/global.css`.
- **React** (`@astrojs/react`) — sólo para la isla interactiva del Hero (`ImpactCarousel.tsx`). El resto del sitio no usa ningún framework de UI a propósito, para mantener el sitio mayormente estático.
- Fuente: **Plus Jakarta Sans** (Google Fonts, pesos 400–800), cargada en `Layout.astro`.
- Node requerido: `^18.20.8 || ^20.3.0 || >=22.0.0` (ver `package.json`). Se fijó así porque el entorno de desarrollo tiene Node 20.10 y varias herramientas recientes (`create-astro`, `@astrojs/react`, Vite 8) piden Node ≥22.12 — el warning `EBADENGINE` de npm al instalar es esperado y no bloquea nada; si se sube la versión de Node del entorno, se puede volver a los rangos por defecto de cada paquete.

### Islands / interactividad

Astro por defecto no renderiza nada de JS en el cliente ("zero JS by default"). El toolbar de desarrollo de Astro (el botón que muestra "Inspect"/islas) sólo detecta algo si hay al menos un componente de un framework de UI montado con una directiva `client:*`. Por eso, para tener **algo que inspeccionar**, la interactividad del Hero se implementó como un componente React real (`src/components/ImpactCarousel.tsx`) importado y montado con `client:load` en `Hero.astro`:

```astro
<ImpactCarousel client:load />
```

Si en el futuro se agrega más interactividad, dos caminos:
- **Necesita estado/reactividad real** → nuevo componente `.tsx` + `client:*` (usar `client:visible` para cosas fuera del viewport inicial, `client:load` sólo para lo crítico como el Hero).
- **Es un efecto simple (toggle de clase, scroll, IntersectionObserver puntual)** → un `<script>` plano dentro del `.astro` alcanza y no suma una isla/JS de framework innecesaria.

### Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview
```

## Estructura

```
src/
  layouts/
    Layout.astro       # <html> shell, fuente, contenedor de 1120px, blobs decorativos
  components/
    Header.astro        # logo + nav + CTA
    Hero.astro           # sección 01 — headline, CTAs + <ImpactCarousel client:load />
    ImpactCarousel.tsx    # isla de React — selector de funcionalidades del Hero (ver abajo)
    Problem.astro         # sección 03 — "¿Esto te pasa en tu negocio?" (panel oscuro, 4 puntos)
    WhatWeDo.astro         # sección 04 — "Qué hacemos" (grid de 4 tarjetas de servicio)
    Catalog.astro           # sección 05 — "Catálogo de arranque" (panel oscuro, 5 columnas)
    HowWeWork.astro          # sección 06 — proceso en 4 pasos con flechas
    Highlights.astro          # secciones 07/08/09 — Proyectos / Para quién / Por qué nosotros
    Stats.astro                # fila de 4 métricas
    Contact.astro                # sección 10 — 3 canales de contacto + tarjeta "qué pasa después"
    Footer.astro
  pages/
    index.astro          # arma la página importando Layout + todos los componentes en orden
  styles/
    global.css            # @import "tailwindcss" + @theme (tokens) + estilos base (body/a/focus) + @keyframes fade-in
```

Cada componente usa **clases utilitarias de Tailwind directamente en el markup** — no hay `<style>` por componente. Los tokens compartidos (colores, tipografía) viven en `src/styles/global.css`, dentro de un bloque `@theme`, que es la forma en que Tailwind v4 declara design tokens en CSS (reemplaza a `tailwind.config.js`).

## Design tokens (`src/styles/global.css`, bloque `@theme`)

Cada `--color-*`/`--font-*` declarado en `@theme` genera automáticamente utilidades de Tailwind con ese nombre (p. ej. `--color-accent` → `bg-accent`, `text-accent`, `border-accent`, `ring-accent`, etc.). Nunca hardcodear un hex nuevo si ya existe un token — usar la utilidad.

| Token (`@theme`) | Valor | Utilidades que genera | Uso |
|---|---|---|---|
| `--color-cream` | `#fbf2e8` | `bg-cream`, `text-cream`... | fondo general |
| `--color-ink` | `#171225` | `bg-ink`, `text-ink`... | texto principal / logo |
| `--color-panel` | `#15121f` | `bg-panel` | paneles oscuros (Problema, Catálogo) |
| `--color-accent` | `#6c3ce0` | `bg-accent`, `text-accent`, `ring-accent`... | violeta de marca — CTAs, links, acentos |
| `--color-accent-hover` | `#4e28b8` | `bg-accent-hover`, `text-accent-hover` | hover de acento |
| `--color-accent-soft` | `#efe6fc` | `bg-accent-soft` | fondos tenues (íconos de servicio) |
| `--color-muted` / `-2` / `-3` | `#4a4458` / `#6a6478` / `#8b8598` | `text-muted`, `text-muted-2`, `text-muted-3` | jerarquía de grises sobre fondo claro |
| `--color-ondark` | `#b3adc4` | `text-ondark` | texto secundario sobre paneles oscuros |
| `--color-whatsapp` | `#25d366` | `text-whatsapp` | ícono/CTA de WhatsApp |
| `--font-sans` | `'Plus Jakarta Sans', system-ui, sans-serif` | `font-sans` (y es el default del `body`) | única familia tipográfica del sitio |

Valores puntuales sin token (radios de borde con `%`, sombras bespoke, colores decorativos de un solo uso como los avatares del Hero) se resuelven con **valores arbitrarios de Tailwind** (`rounded-[26px]`, `shadow-[0_12px_30px_rgba(60,40,110,0.06)]`, `bg-[#d9d9d9]`) — es intencional, no un olvido de tokenizar.

### Escala numérica (importante)

Tailwind v4 calcula `width`/`height`/`padding`/`margin`/`gap`/`inset`/`translate` como `calc(var(--spacing) * N)`, con `--spacing: 0.25rem` (4px). Por eso números "raros" tienen clase canónica exacta: **N = px ÷ 4** (acepta decimales: `18px → gap-4.5`, `70px → pt-17.5`). Todo el sitio sigue esta regla en vez de usar `[Npx]` arbitrario para esas propiedades — el editor marca warning (`suggestCanonicalClasses`) si se usa `p-[48px]` en lugar de `p-12`, así que conviene calcular `px/4` antes de escribir la clase. Esto **no** aplica a `font-size`, `border-radius` ni `box-shadow`, que sí usan valores arbitrarios `[…]` libremente porque no tienen esa escala dinámica.

## Responsive

El mock original (`LEVN Landing.dc.html`) es un diseño fijo de escritorio (1120px, sin media queries) pensado para visualizarse en el editor de diseño. La implementación en Astro **agrega breakpoints reales** que no existían en el archivo fuente, porque es un sitio de producción:

- `900px`: los grids de 4/5 columnas pasan a 2 columnas (o se apilan), el nav del header se oculta (sin reemplazo por menú hamburguesa todavía — ver "Pendientes"), el hero pasa de fila a columna.
- `560–640px`: los grids restantes pasan a 1 columna.
- Los blobs decorativos de fondo (`Layout.astro`) se ocultan por debajo de 900px porque sus posiciones absolutas están calculadas para el layout de escritorio y se desalinean al apilarse el contenido.

Los breakpoints se escriben inline con variantes arbitrarias de Tailwind (`max-[900px]:flex-col`, `max-[560px]:grid-cols-1`) en vez de `md:`/`lg:` porque los cortes del diseño (560/640/900px) no coinciden con los breakpoints por defecto de Tailwind (`sm/md/lg` = 640/768/1024, y son `min-width`, no `max-width`). Si se edita el layout de una sección, revisar que esas variantes sigan teniendo sentido.

## Hero interactivo — `ImpactCarousel.tsx`

La burbuja "Resumen de impacto" del Hero y el gráfico circular de íconos (antes decorativo) ahora son una sola isla de React: **una ruleta de funcionalidades**. Cada ícono del anillo representa uno de los servicios del "Catálogo de arranque" (☎ WhatsApp/reactivación, ✉ landing + captación, ▦ reportes automáticos, ▤ turnos + recordatorios); al hacer click en un ícono:

- Un puntero (punto violeta) gira sobre el anillo punteado hasta la posición del ícono elegido, y el bloque central también rota levemente — el efecto "ruleta".
- La tarjeta de impacto cambia de contenido (label, métrica principal, mini-gráfico de sparkline y las 3 estadísticas chicas) para reflejar esa funcionalidad puntual, con una animación de fade-in (`@keyframes fade-in` en `global.css`).
- Es accesible por teclado (son `<button>` reales) y usa `role="radiogroup"`/`role="radio"` + `aria-checked` porque es un selector de una sola opción a la vez, no una lista de acciones.

Los datos de cada estado viven en el array `FEATURES` dentro del componente — agregar una funcionalidad nueva es agregar un objeto ahí (y, si hace falta un 5º ícono, sumarlo también a `ICON_POSITION_CLASSES`).

## Contenido / copy

Todo el copy está en español (Argentina) y vive **inline en cada componente** como arrays/objetos en el frontmatter (`const services = [...]`, etc.), no en un CMS ni en archivos de datos separados. Si el contenido crece o se vuelve editable por alguien no técnico, considerar migrarlo a colecciones de contenido de Astro (`src/content/`) — no se hizo ahora porque el volumen es chico y fijo.

Los links de "Contacto" (WhatsApp, formulario, agenda) en `Contact.astro` son placeholders (`https://wa.me/...`, `#formulario`, `#agenda`) — reemplazar por los reales del negocio antes de publicar.

## Pendientes / decisiones abiertas

- **Menú mobile:** el nav del header se oculta en `<900px` sin un menú hamburguesa alternativo. Falta decidir e implementar.
- **Formulario de contacto:** la tarjeta "Formulario corto" linkea a un ancla (`#formulario`) sin formulario real todavía.
- **Imagen de "caso piloto":** el placeholder gris con el texto "imagen" en `Highlights.astro` está esperando una foto/mock real de un proyecto.
- **SEO/Open Graph:** `Layout.astro` sólo tiene `title`/`description` básicos; falta OG tags, favicon de marca (hoy usa el favicon default de Astro) y sitemap si se agregan más páginas.
- **Analytics:** no hay ningún script de tracking (Meta Pixel, GA, etc.) todavía, aunque el copy de "Adquisición y Crecimiento" lo sugiere como servicio propio.

## Convenciones al extender el sitio

- Nueva sección → nuevo componente `.astro` en `src/components/` con clases Tailwind inline; importarlo y ubicarlo en `src/pages/index.astro`. Sin `<style>` por componente salvo un caso muy puntual que Tailwind no resuelva bien.
- Reusar los tokens de `@theme` (`global.css`) antes de introducir un color/fuente nuevo; para spacing recordar la regla `N = px / 4` (ver "Escala numérica" arriba) antes de caer en `[Npx]` arbitrario.
- Mantener el patrón de "eyebrow" (número de sección + etiqueta en violeta) que se repite en cada sección — es la firma visual de la página.
- Si una sección necesita anclas de navegación, agregar el `id` correspondiente y sumarlo a `navLinks` en `Header.astro`.
- Interactividad nueva → preferir `<script>` plano en el `.astro` si es un efecto simple; sólo crear una isla `.tsx` con `client:*` si hace falta estado real (como `ImpactCarousel.tsx`). No mezclar frameworks de UI (todo lo interactivo queda en React, no sumar Vue/Svelte/etc. sin una razón fuerte).
