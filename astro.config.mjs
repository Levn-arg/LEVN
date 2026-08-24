// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // El sitio sigue siendo estático por defecto; el adapter de Vercel sólo
  // habilita las rutas puntuales que declaran `export const prerender = false`
  // (hoy, únicamente src/pages/api/send-email.ts, para mandar los mails
  // con estilo propio vía Resend).
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
