# reconms.com

Marketing site for Recon Managed Services, built from the Figma Make design
(`growl-spree-81499865.figma.site`).

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # serve dist/ locally
```

`npm run build` type-checks, bundles the client, then prerenders every route to
static HTML (`dist/index.html`, `dist/services/index.html`, … plus `dist/404.html`
and `dist/sitemap.xml`). Each page ships with its own `<title>`, description,
canonical URL and Open Graph tags, and React hydrates it in the browser.

## Deploy

`dist/` is a plain static site. It works as-is on Netlify, Cloudflare Pages,
Vercel, GitHub Pages, S3/CloudFront, or any web server:

- Build command: `npm run build`
- Output directory: `dist`
- Unknown URLs should serve `404.html` (Netlify, Cloudflare Pages and GitHub
  Pages do this automatically).

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, portal/careers links, nav, services, products, FAQs | `src/content.ts` |
| Page titles and meta descriptions | `src/seo.ts` |
| Pages | `src/pages/*.tsx` |
| Header / footer | `src/components/SiteLayout.tsx` |
| Shared sections (cards, hero, CTA, FAQ) | `src/components/Sections.tsx` |
| Styles and design tokens | `src/index.css` |
| Logo, favicon, social image | `public/` |
| Business schema (JSON-LD) and default meta | `index.html` |
| Terms of Use / Privacy Policy text | `src/legal/*.html` (plain HTML; edit the dates paragraph at the top when updating) |
| Routes | `src/App.tsx` (add new pages to `src/seo.ts` too so they get prerendered) |
