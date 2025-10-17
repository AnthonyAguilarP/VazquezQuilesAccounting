// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering for API functionality
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()]
  }
});
