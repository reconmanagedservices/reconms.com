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

- `html_handling: drop-trailing-slash`: pages are served at `/about` (the canonical
  URL); `/about/` redirects there.
- `not_found_handling: 404-page`: unknown URLs get `404.html` with a 404 status.

Redirects from old WordPress URLs live in `public/_redirects`.

## Contact form

The Contact page form posts to `/api/contact` (`worker/contact.ts`), which:

1. rejects bots via a hidden honeypot field and a Cloudflare Turnstile check;
2. validates the fields;
3. emails the message to `CONTACT_TO` (hello@reconms.com) through Resend, with the
   visitor's address as Reply-To.

One-time setup in Cloudflare and Resend:

| Setting | Where | Value |
| --- | --- | --- |
| Turnstile widget | Cloudflare dashboard → Turnstile → Add widget | Hostnames: `reconms.com`, `www.reconms.com`, and the `*.workers.dev` preview host. Mode: Managed |
| `VITE_TURNSTILE_SITE_KEY` | Worker → Settings → Build → **Build variables** | the widget's **site key** (public) |
| `TURNSTILE_SECRET_KEY` | Worker → Settings → **Variables and Secrets** (type: Secret) | the widget's **secret key** |
| `RESEND_API_KEY` | Worker → Settings → **Variables and Secrets** (type: Secret) | a Resend API key with sending access for `reconms.com` |

Then redeploy. Until the site key is set, the Contact page shows the plain
"Email hello@reconms.com" button instead of the form. Sender and recipient
addresses are `CONTACT_FROM` / `CONTACT_TO` in `wrangler.jsonc`.

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
| Contact form (front end / server) | `src/components/ContactForm.tsx` / `worker/` |
| Business schema (JSON-LD) and default meta | `index.html` |
| Terms of Use / Privacy Policy text | `src/legal/*.html` (plain HTML; edit the dates paragraph at the top when updating) |
| Routes | `src/App.tsx` (add new pages to `src/seo.ts` too so they get prerendered) |
