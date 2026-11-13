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

## Deploy (Cloudflare Workers)

The site is deployed as a static-assets-only Cloudflare Worker, configured in
`wrangler.jsonc`. In the Cloudflare dashboard (Workers & Pages → the
`reconms-com` project → Settings → Build):

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Every push to the production branch rebuilds and deploys automatically. To deploy
from your own machine instead: `npx wrangler login`, then `npm run deploy`.

`wrangler.jsonc` sets two things:

- `html_handling: drop-trailing-slash`: pages are served at `/about` (the canonical
  URL); `/about/` redirects there.
- `not_found_handling: 404-page`: unknown URLs get `404.html` with a 404 status.

Redirects from old WordPress URLs live in `public/_redirects`.

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
| Redirects from old URLs | `public/_redirects` |
| Cloudflare hosting settings | `wrangler.jsonc` |
| Business schema (JSON-LD) and default meta | `index.html` |
| Terms of Use / Privacy Policy text | `src/legal/*.html` (plain HTML; edit the dates paragraph at the top when updating) |
| Routes | `src/App.tsx` (add new pages to `src/seo.ts` too so they get prerendered) |
