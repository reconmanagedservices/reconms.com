/**
 * Cloudflare Worker for reconms.com.
 *
 * Static pages are served straight from ./dist by Cloudflare's asset handling and never
 * reach this code. Only requests matching `run_worker_first` in wrangler.jsonc (/api/*,
 * /robots.txt and the scheduled-posts file) run here.
 *
 * It also runs once a day (`triggers.crons` in wrangler.jsonc) to publish scheduled blog posts.
 */
import { handleContact, handleContactConfig } from './contact';
import { publishScheduledPosts, SCHEDULE_PATH } from './schedule';

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
  /**
   * Secret: Workers Builds deploy hook URL (Settings → Builds → Deploy Hooks). The daily check
   * calls it to rebuild the site when a scheduled blog post's date arrives.
   */
  DEPLOY_HOOK_URL?: string;
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
    // Internal file for the daily check; not part of the public site.
    if (pathname === SCHEDULE_PATH) {
      return env.ASSETS.fetch(new URL('/404.html', request.url)).then(
        (page) => new Response(page.body, { status: 404, headers: page.headers }),
      );
    }
    if (pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'not_found' }, { status: 404 });
    }
    const asset = await env.ASSETS.fetch(request);
    // public/robots.txt (reached here via run_worker_first, so _headers don't apply): declare UTF-8.
    if (pathname === '/robots.txt' && asset.ok) {
      const response = new Response(asset.body, asset);
      response.headers.set('Content-Type', 'text/plain; charset=utf-8');
      return response;
    }
    return asset;
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(publishScheduledPosts(env));
  },
} satisfies ExportedHandler<Env>;
