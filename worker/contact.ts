import type { Env } from './index';

/** Fields the contact form submits. `website` is a hidden honeypot that people never fill in. */
type Submission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string;
  turnstileToken: string;
};

const LIMITS = { name: 100, email: 254, phone: 40, company: 150, message: 5000 } as const;
const MAX_BODY_BYTES = 32 * 1024;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: Record<string, unknown>, status = 200) =>
  Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

const fail = (status: number, error: string, message: string) => json({ ok: false, error, message }, status);

/** The public Turnstile site key, from whichever variable name it was configured under. */
export const turnstileSiteKey = (env: Env) => env.TURNSTILE_SITE_KEY || env.VITE_TURNSTILE_SITE_KEY || null;

/** Names of settings the contact form still needs (names only, never values). */
function missingSettings(env: Env): string[] {
  const missing: string[] = [];
  if (!turnstileSiteKey(env)) missing.push('TURNSTILE_SITE_KEY');
  if (!env.TURNSTILE_SECRET_KEY) missing.push('TURNSTILE_SECRET_KEY');
  if (!env.RESEND_API_KEY && env.EMAIL_DRY_RUN !== 'true') missing.push('RESEND_API_KEY');
  return missing;
}

/**
 * GET /api/contact/config: tells the form its public Turnstile site key and whether it can
 * accept submissions. Read at runtime so the key doesn't have to be present at build time.
 */
export function handleContactConfig(request: Request, env: Env): Response {
  if (request.method !== 'GET') {
    return new Response(null, { status: 405, headers: { Allow: 'GET' } });
  }
  const missing = missingSettings(env);
  return json({ siteKey: turnstileSiteKey(env), ready: missing.length === 0, missing });
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(null, { status: 405, headers: { Allow: 'POST' } });
  }

  // Only accept submissions from our own pages.
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return fail(403, 'forbidden', 'Submissions are only accepted from reconms.com.');
  }

  const missing = missingSettings(env).filter((name) => name !== 'TURNSTILE_SITE_KEY');
  if (missing.length || !env.TURNSTILE_SECRET_KEY) {
    console.error(`Contact form is not configured: missing ${missing.join(', ')}.`);
    return fail(503, 'not_configured', 'The contact form is temporarily unavailable.');
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, 'too_large', 'Your message is too long.');
  }

  let data: Partial<Record<keyof Submission, unknown>>;
  try {
    data = JSON.parse(raw);
  } catch {
    return fail(400, 'bad_request', 'Invalid submission.');
  }

  const field = (key: keyof Submission) => (typeof data[key] === 'string' ? (data[key] as string).trim() : '');
  const submission: Submission = {
    name: field('name'),
    email: field('email'),
    phone: field('phone'),
    company: field('company'),
    message: field('message'),
    website: field('website'),
    turnstileToken: field('turnstileToken'),
  };

  // Bots that fill the hidden field get a normal-looking success response and nothing is sent.
  if (submission.website) {
    return json({ ok: true });
  }

  const invalid: string[] = [];
  for (const key of ['name', 'email', 'phone', 'company', 'message'] as const) {
    const value = submission[key];
    if (!value || value.length > LIMITS[key]) invalid.push(key);
  }
  if (submission.email && !EMAIL_PATTERN.test(submission.email)) invalid.push('email');
  if (invalid.length) {
    return json({ ok: false, error: 'invalid', fields: [...new Set(invalid)], message: 'Please check the highlighted fields.' }, 400);
  }

  const verified = await verifyTurnstile(
    submission.turnstileToken,
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP'),
  );
  if (!verified) {
    return fail(400, 'captcha_failed', 'We couldn’t verify that you’re human. Please try again.');
  }

  try {
    await sendEmail(submission, env);
  } catch (error) {
    console.error('Failed to send contact email', error);
    return fail(502, 'send_failed', 'Your message couldn’t be sent right now.');
  }

  return json({ ok: true });
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const body = new FormData();
  body.append('secret', secret);
  body.append('response', token);
  if (ip) body.append('remoteip', ip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) {
    console.error('Turnstile siteverify returned', res.status);
    return false;
  }
  const outcome = (await res.json()) as { success: boolean; 'error-codes'?: string[] };
  if (!outcome.success) console.warn('Turnstile rejected token', outcome['error-codes']);
  return outcome.success;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Collapse whitespace so user input can't add lines to a header-like field such as the subject. */
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim();

async function sendEmail(s: Submission, env: Env) {
  const subject = `Website inquiry: ${oneLine(s.name)} (${oneLine(s.company)})`;
  const rows: [string, string][] = [
    ['Name', s.name],
    ['Email', s.email],
    ['Phone', s.phone],
    ['Company', s.company],
  ];

  const text = [
    'New message from the reconms.com contact form.',
    '',
    ...rows.map(([label, value]) => `${label}: ${oneLine(value)}`),
    '',
    'Message:',
    s.message,
    '',
    '— Reply to this email to respond directly to the sender.',
  ].join('\n');

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111312">
<p style="margin:0 0 16px">New message from the <strong>reconms.com</strong> contact form.</p>
<table cellpadding="6" style="border-collapse:collapse;margin-bottom:16px">
${rows
  .map(
    ([label, value]) =>
      `<tr><td style="color:#666;padding-right:16px">${label}</td><td><strong>${escapeHtml(oneLine(value))}</strong></td></tr>`,
  )
  .join('\n')}
</table>
<p style="margin:0 0 6px;color:#666">Message</p>
<div style="white-space:pre-wrap;border-left:3px solid #ddd;padding-left:12px">${escapeHtml(s.message)}</div>
<p style="margin-top:24px;color:#888;font-size:13px">Reply to this email to respond directly to the sender.</p>
</body></html>`;

  const payload = {
    from: env.CONTACT_FROM,
    to: [env.CONTACT_TO],
    reply_to: s.email,
    subject,
    text,
    html,
  };

  if (env.EMAIL_DRY_RUN === 'true') {
    console.log('[EMAIL_DRY_RUN] would send:', JSON.stringify({ ...payload, html: '(omitted)' }, null, 2));
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}
