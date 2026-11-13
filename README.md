# reconms.com

Marketing site for Recon Managed Services, built from the Figma Make design
(`growl-spree-81499865.figma.site`).

**Stack:** Vite · React 19 · TypeScript · Tailwind CSS v4 · React Router 7

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
```

To work on the contact form locally, also run the Worker (it serves `/api/contact`,
and the Vite dev server proxies to it):

```bash
cp .dev.vars.example .dev.vars   # Turnstile test secret + EMAIL_DRY_RUN=true
npm run build && npx wrangler dev   # http://127.0.0.1:8787
```

With `EMAIL_DRY_RUN=true`, submissions are logged in the `wrangler dev` output
instead of being emailed.

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

- `html_handling: force-trailing-slash`: pages are served at `/about/` (the canonical URL,
  same as the old WordPress site); `/about` redirects there.
- `not_found_handling: 404-page`: unknown URLs get `404.html` with a 404 status.

Redirects from old WordPress URLs live in `public/_redirects`.

## Contact form

The Contact page form posts to `/api/contact` (`worker/contact.ts`), which:

1. rejects bots via a hidden honeypot field and a Cloudflare Turnstile check;
2. validates the fields;
3. emails the message to `CONTACT_TO` (hello@reconms.com) through Resend, with the
   visitor's address as Reply-To.

One-time setup in Cloudflare and Resend:

1. **Cloudflare → Turnstile → Add widget.** Hostnames: `reconms.com`, `www.reconms.com`, and the
   `*.workers.dev` preview host. Mode: Managed.
2. **Resend → API Keys:** create a key with sending access for `reconms.com`.
3. **Worker → Settings → Variables and Secrets** (all three go here; no build variables needed):

| Name | Type | Value |
| --- | --- | --- |
| `TURNSTILE_SITE_KEY` | Text | the widget's **site key** (public) |
| `TURNSTILE_SECRET_KEY` | Secret | the widget's **secret key** |
| `RESEND_API_KEY` | Secret | the Resend API key |

The form reads the site key at runtime from `/api/contact/config` (`VITE_TURNSTILE_SITE_KEY` is
accepted under either name, and as a build variable, too). Until everything is set, the form
still shows but says online messages are unavailable, with email/phone instead, and the browser
console lists which settings are missing. Sender and recipient addresses are `CONTACT_FROM` /
`CONTACT_TO` in `wrangler.jsonc`.

## SEO

- **Metadata:** titles, descriptions and canonical paths for every page are in `src/seo.ts`.
  `scripts/prerender.mjs` writes them into each page's `<head>`, together with Open Graph and
  Twitter tags, the social image (`public/assets/og-image.png`, 1200×630) and schema.org
  structured data (`ProfessionalService` + `WebSite`, built from `src/content.ts`).
- **URLs end in `/`** (`/about/`, `/contact/`, …) to match the URLs Google indexed on the old
  WordPress site. The build adds 301s from the slash-less form; internal links must use the
  trailing slash.
- **Service pages** reuse the old WordPress URLs (/managed/, /comanaged/, /ai/) so their
  rankings carry over, and each emits `Service` + `BreadcrumbList` structured data.
- **New page checklist:** add it to `src/App.tsx` and `src/seo.ts` (it is then prerendered and
  listed in `sitemap.xml` automatically).
- **Redirects** for retired URLs go in `public/_redirects`.
- **Fonts** are self-hosted (`src/index.css`) and preloaded; no third-party requests on page load.

## Where things live

| What | File |
| --- | --- |
| Phone, email, address, portal/careers links, nav, service/product cards, FAQs | `src/content.ts` |
| Dedicated service pages (/managed/, /comanaged/, /cybersecurity/, /ai/) | content in `src/servicePages.ts`, layout in `src/pages/ServiceDetailPage.tsx` |
| Page titles and meta descriptions | `src/seo.ts` |
| Pages | `src/pages/*.tsx` |
| Header / footer | `src/components/SiteLayout.tsx` |
| Shared sections (cards, hero, CTA, FAQ) | `src/components/Sections.tsx` |
| Styles and design tokens | `src/index.css` |
| Logo and social share image | `public/assets/` |
| Favicons (`favicon.svg/.ico`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest`) | `public/`, generated from the `{r}` mark in `public/assets/recon-social-icon.png` |
| Redirects from old URLs | `public/_redirects` |
| Cloudflare hosting settings | `wrangler.jsonc` |
| Contact form (front end / server) | `src/components/ContactForm.tsx` / `worker/` |
| Business structured data (JSON-LD) | `structuredData()` in `src/seo.ts` |
| Terms of Use / Privacy Policy text | `src/legal/*.html` (plain HTML; edit the dates paragraph at the top when updating) |
| Routes | `src/App.tsx` (add new pages to `src/seo.ts` too so they get prerendered) |
