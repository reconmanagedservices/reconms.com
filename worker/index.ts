/**
 * Cloudflare Worker for reconms.com.
 *
 * Static pages are served straight from ./dist by Cloudflare's asset handling and never
 * reach this code. Only requests matching `run_worker_first` in wrangler.jsonc (/api/* and
 * /robots.txt) run here.
 */
import { handleContact, handleContactConfig } from './contact';

export interface Env {
  ASSETS: Fetcher;
  /** Where contact-form messages are delivered, e.g. hello@reconms.com (wrangler.jsonc `vars`). */
  CONTACT_TO: string;
  /** Sender shown on the notification email; its domain must be verified in Resend. */
  CONTACT_FROM: string;
  /**
   * Cloudflare Turnstile site key (public, not a secret). Set as a plain-text variable in the
   * Worker's "Variables and Secrets". VITE_TURNSTILE_SITE_KEY is also accepted, so a key added
   * under that name at runtime works too.
   */
  TURNSTILE_SITE_KEY?: string;
  VITE_TURNSTILE_SITE_KEY?: string;
  /** Secret: Cloudflare Turnstile secret key. */
  TURNSTILE_SECRET_KEY?: string;
  /** Secret: Resend API key used to send the email. */
  RESEND_API_KEY?: string;
  /** Local development only: "true" logs the email instead of sending it. */
  EMAIL_DRY_RUN?: string;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname, hostname } = new URL(request.url);

    // Preview/test hostnames (…workers.dev, …pages.dev) serve a full copy of the site; keep
    // search engines off them so only reconms.com is indexed. reconms.com gets public/robots.txt.
    if (pathname === '/robots.txt' && /\.(workers|pages)\.dev$/.test(hostname)) {
      return new Response('User-agent: *\nDisallow: /\n', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
      });
    }

    if (pathname === '/api/contact/config') {
      return handleContactConfig(request, env);
    }
    if (pathname === '/api/contact') {
      return handleContact(request, env);
    }
    if (pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'not_found' }, { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
