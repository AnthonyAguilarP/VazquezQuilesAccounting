// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering for API functionality
  adapter: vercel(),
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()]
  }
});
