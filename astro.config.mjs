// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server', // Enable server-side rendering for API functionality
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()]
  }
});
