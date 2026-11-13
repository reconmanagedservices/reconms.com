/**
 * Cloudflare Worker for reconms.com.
 *
 * Static pages are served straight from ./dist by Cloudflare's asset handling and never
 * reach this code. Only requests matching `run_worker_first` in wrangler.jsonc (/api/*)
 * run here.
 */
import { handleContact } from './contact';

export interface Env {
  ASSETS: Fetcher;
  /** Where contact-form messages are delivered, e.g. hello@reconms.com (wrangler.jsonc `vars`). */
  CONTACT_TO: string;
  /** Sender shown on the notification email; its domain must be verified in Resend. */
  CONTACT_FROM: string;
  /** Secret: Cloudflare Turnstile secret key. */
  TURNSTILE_SECRET_KEY?: string;
  /** Secret: Resend API key used to send the email. */
  RESEND_API_KEY?: string;
  /** Local development only: "true" logs the email instead of sending it. */
  EMAIL_DRY_RUN?: string;
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);

    if (pathname === '/api/contact') {
      return handleContact(request, env);
    }
    if (pathname.startsWith('/api/')) {
      return Response.json({ ok: false, error: 'not_found' }, { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
