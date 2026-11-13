import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // The contact form posts to /api/contact, served by the Cloudflare Worker (`npx wrangler dev`).
    proxy: { '/api': 'http://127.0.0.1:8787' },
  },
});
