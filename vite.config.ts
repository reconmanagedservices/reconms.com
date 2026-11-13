import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import news from './vite-plugin-news';

export default defineConfig({
  plugins: [news(), react(), tailwindcss()],
  build: {
    // Hashed JS/CSS/fonts go in /_app/ (cached for a year via public/_headers), separate from
    // the un-hashed images in public/assets/.
    assetsDir: '_app',
  },
  server: {
    // The contact form posts to /api/contact, served by the Cloudflare Worker (`npx wrangler dev`).
    proxy: { '/api': 'http://127.0.0.1:8787' },
  },
});
