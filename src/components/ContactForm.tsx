import { useEffect, useRef, useState, type FormEvent } from 'react';
import { site } from '../content';
import { Icon } from './Icon';

/**
 * Optional build-time Turnstile site key. Normally the key is read at runtime from
 * /api/contact/config (the Worker's TURNSTILE_SITE_KEY variable), so it doesn't need to be set
 * when the site is built; this is a fallback (and what `npm run dev` uses via .env.development).
 */
const BUILD_SITE_KEY = (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined) || null;

type FormConfig = { siteKey: string | null; ready: boolean };

/** Asks the Worker for the public site key and whether the form can accept submissions. */
async function loadConfig(): Promise<FormConfig> {
  try {
    const res = await fetch('/api/contact/config', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const config = (await res.json()) as { siteKey: string | null; missing: string[] };
    const siteKey = config.siteKey || BUILD_SITE_KEY;
    const missing = config.missing.filter((name) => !(name === 'TURNSTILE_SITE_KEY' && siteKey));
    if (missing.length) {
      console.warn(`Contact form is not set up yet. Missing Worker settings: ${missing.join(', ')}. See README → Contact form.`);
    }
    return { siteKey, ready: missing.length === 0 };
  } catch (error) {
    // No Worker (e.g. plain `vite dev`): rely on the build-time key, if any.
    console.warn('Could not load contact form settings from /api/contact/config.', error);
    return { siteKey: BUILD_SITE_KEY, ready: Boolean(BUILD_SITE_KEY) };
  }
}
const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<TurnstileApi> | undefined;
function loadTurnstile(): Promise<TurnstileApi> {
  scriptPromise ??= new Promise((resolve, reject) => {
    if (window.turnstile) return resolve(window.turnstile);
    const script = document.createElement('script');
    script.src = TURNSTILE_SCRIPT;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile unavailable')));
    script.onerror = () => {
      scriptPromise = undefined;
      reject(new Error('Failed to load Turnstile'));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

type Status = { state: 'idle' | 'submitting' | 'success' } | { state: 'error'; message: string; fields?: string[] };

type CheckError = { code: string; message: string; fatal: boolean };

/**
 * Explains a Turnstile client error code (developers.cloudflare.com/turnstile/troubleshooting/
 * client-side-errors/error-codes/). `message` is shown to visitors; `hint` goes to the console
 * for whoever maintains the site. Fatal errors won't resolve by retrying.
 */
function describeCheckError(code: string): CheckError & { hint: string } {
  const host = typeof location === 'undefined' ? 'this site' : location.hostname;
  if (['110100', '110110', '400020', '400021', '400070'].includes(code)) {
    return {
      code,
      fatal: true,
      message: `Our spam check isn’t set up correctly (error ${code}).`,
      hint: 'The Turnstile site key is invalid, disabled, or mistyped. Check TURNSTILE_SITE_KEY in the Worker’s Variables and Secrets: it must be the widget’s *site key*, not its secret key.',
    };
  }
  if (code === '110200') {
    return {
      code,
      fatal: true,
      message: `Our spam check isn’t set up for this web address yet (error ${code}).`,
      hint: `Add "${host}" to the Turnstile widget’s hostnames: Cloudflare dashboard → Turnstile → your widget → Hostname Management.`,
    };
  }
  if (code === '200100') {
    return {
      code,
      fatal: true,
      message: 'Your device’s clock appears to be wrong, so the spam check can’t run (error 200100).',
      hint: 'The visitor’s system clock is incorrect, or something cached the challenge.',
    };
  }
  if (code.startsWith('2005')) {
    return {
      code,
      fatal: false,
      message: `The spam check couldn’t load (error ${code}). A browser extension or network filter may be blocking challenges.cloudflare.com.`,
      hint: 'The Turnstile iframe failed to load; challenges.cloudflare.com may be blocked.',
    };
  }
  if (code === '110600' || code === '110620') {
    return { code, fatal: false, message: 'The spam check timed out. Please try again.', hint: 'Turnstile challenge or interaction timed out.' };
  }
  if (code.startsWith('3') || code.startsWith('6')) {
    return {
      code,
      fatal: false,
      message: `We couldn’t verify your browser (error ${code}). Please refresh the page and try again.`,
      hint: 'Turnstile challenge failed (generic client failure).',
    };
  }
  return {
    code,
    fatal: false,
    message: `The spam check failed (error ${code}). Please refresh the page and try again.`,
    hint: 'Unrecognized Turnstile error code.',
  };
}

const fields = [
  { name: 'name', label: 'Your name', type: 'text', autoComplete: 'name', maxLength: 100 },
  { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email', maxLength: 254 },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', maxLength: 40 },
  { name: 'company', label: 'Company name', type: 'text', autoComplete: 'organization', maxLength: 150 },
] as const;

const inputClass =
  'mt-2 block w-full rounded-2xl border border-black/12 bg-[#f4f4f1] px-4 py-3.5 text-[15px] text-[#111312] transition-colors placeholder:text-black/35 focus:border-[#111312] focus:bg-white focus:outline-none aria-[invalid=true]:border-[#b42318]';

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [config, setConfig] = useState<FormConfig | null>(null);
  const [checkError, setCheckError] = useState<CheckError | null>(null);
  const checkErrorRef = useRef<CheckError | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const token = useRef<string | null>(null);
  const tokenWaiters = useRef<((token: string | null) => void)[]>([]);

  const settleToken = (value: string | null) => {
    token.current = value;
    tokenWaiters.current.splice(0).forEach((resolve) => resolve(value));
  };

  const reportCheckError = (error: CheckError | null) => {
    checkErrorRef.current = error;
    setCheckError(error);
  };

  useEffect(() => {
    let cancelled = false;
    loadConfig().then((loaded) => !cancelled && setConfig(loaded));
    return () => {
      cancelled = true;
    };
  }, []);

  const siteKey = config?.siteKey ?? null;

  useEffect(() => {
    // Site keys are 24 characters; secret keys are longer. Catch the most common mix-up.
    if (siteKey && !/^[0-3]x/.test(siteKey)) console.warn('The Turnstile site key looks malformed:', siteKey);
    else if (siteKey && siteKey.length > 30) {
      console.warn('The Turnstile site key looks like a *secret* key. Use the widget’s site key for TURNSTILE_SITE_KEY.');
    }
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey || status.state === 'success') return;
    let cancelled = false;
    loadTurnstile()
      .then((turnstile) => {
        if (cancelled || !widgetRef.current) return;
        widgetId.current = turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          action: 'contact',
          appearance: 'interaction-only',
          callback: (value: string) => {
            reportCheckError(null);
            settleToken(value);
          },
          'expired-callback': () => {
            token.current = null;
          },
          'error-callback': (code: string | number) => {
            const error = describeCheckError(String(code));
            console.error(`Turnstile error ${error.code}: ${error.hint}`);
            reportCheckError(error);
            // Stop waiting on errors that retrying won't fix; Turnstile retries the others itself.
            if (error.fatal) settleToken(null);
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setStatus({ state: 'error', message: 'The spam check couldn’t load. Please refresh the page, or email us directly.' });
        }
      });
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
      token.current = null;
    };
  }, [siteKey, status.state === 'success']); // eslint-disable-line react-hooks/exhaustive-deps

  /** Returns the current Turnstile token, waiting briefly if the check is still running. */
  function getToken(): Promise<string | null> {
    if (token.current) return Promise.resolve(token.current);
    if (checkErrorRef.current?.fatal) return Promise.resolve(null);
    return new Promise((resolve) => {
      tokenWaiters.current.push(resolve);
      setTimeout(() => resolve(token.current), 20000);
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: 'submitting' });

    const turnstileToken = await getToken();
    if (!turnstileToken) {
      const error = checkErrorRef.current;
      if (!error) console.error('Turnstile produced no token within 20 seconds and reported no error.');
      setStatus({
        state: 'error',
        message: error?.message ?? 'The spam check didn’t finish. If a “Verify you are human” box appears next to the button, complete it and try again.',
      });
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    let result: { ok: boolean; message?: string; fields?: string[] } = { ok: false };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      result = await res.json().catch(() => ({ ok: false }));
    } catch {
      result = { ok: false };
    } finally {
      // Tokens are single-use; get a fresh one for any retry.
      token.current = null;
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
    }

    if (result.ok) {
      form.reset();
      setStatus({ state: 'success' });
    } else {
      setStatus({
        state: 'error',
        message: result.message ?? 'Your message couldn’t be sent right now.',
        fields: result.fields,
      });
    }
  }

  if (status.state === 'success') {
    return (
      <div className="mt-9 rounded-[1.75rem] bg-[#f4f4f1] p-7" role="status">
        <span className="grid size-10 place-items-center rounded-full bg-[#111312] text-white">
          <Icon name="check" className="size-5" />
        </span>
        <p className="mt-6 font-display text-2xl tracking-tight">Thanks, we’ve got your message.</p>
        <p className="mt-3 max-w-lg leading-7 text-black/58">
          Someone from our team will follow up soon. If it’s urgent, call us at{' '}
          <a href={site.phoneHref} className="font-semibold text-[#111312] underline underline-offset-4">
            {site.phone}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus({ state: 'idle' })} className="text-link mt-7">
          Send another message <Icon name="arrow" className="size-4" />
        </button>
      </div>
    );
  }

  const submitting = status.state === 'submitting';
  // Settings missing on the Worker: keep the form visible but point people to email/phone.
  const unavailable = config !== null && !config.ready;
  const invalid = status.state === 'error' ? (status.fields ?? []) : [];

  return (
    <form onSubmit={onSubmit} className="mt-9 grid gap-5" aria-busy={submitting}>
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block text-sm font-semibold">
            {field.label}
            <input
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.maxLength}
              required
              aria-invalid={invalid.includes(field.name) || undefined}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      <label className="block text-sm font-semibold">
        How can we help?
        <textarea
          name="message"
          rows={5}
          maxLength={5000}
          required
          aria-invalid={invalid.includes('message') || undefined}
          className={`${inputClass} resize-y`}
        />
      </label>

      {/* Honeypot: hidden from people and assistive tech, often filled in by bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {unavailable && (
        <p role="status" className="rounded-2xl bg-[#f4f4f1] px-4 py-3.5 text-sm leading-6 text-black/70">
          Online messages aren’t available right now. Please email{' '}
          <a href={`mailto:${site.email}`} className="font-semibold text-[#111312] underline underline-offset-2">
            {site.email}
          </a>{' '}
          or call{' '}
          <a href={site.phoneHref} className="font-semibold whitespace-nowrap text-[#111312] underline underline-offset-2">
            {site.phone}
          </a>
          .
        </p>
      )}

      {checkError?.fatal && status.state !== 'error' && (
        <p role="alert" className="rounded-2xl bg-[#fdecea] px-4 py-3.5 text-sm leading-6 text-[#7a1b12]">
          {checkError.message} Please email{' '}
          <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
            {site.email}
          </a>{' '}
          or call <span className="whitespace-nowrap">{site.phone}</span>.
        </p>
      )}

      {status.state === 'error' && (
        <p role="alert" className="rounded-2xl bg-[#fdecea] px-4 py-3.5 text-sm leading-6 text-[#7a1b12]">
          {status.message} You can also email{' '}
          <a href={`mailto:${site.email}`} className="font-semibold underline underline-offset-2">
            {site.email}
          </a>{' '}
          or call <span className="whitespace-nowrap">{site.phone}</span>.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="button button-dark disabled:cursor-not-allowed disabled:opacity-60"
          disabled={submitting || unavailable || Boolean(checkError?.fatal)}
        >
          {submitting ? 'Sending…' : 'Send message'} {!submitting && <Icon name="arrow" className="size-4" />}
        </button>
        {/* Cloudflare Turnstile spam check; only becomes visible if it needs the visitor to interact. */}
        <div ref={widgetRef} />
      </div>
    </form>
  );
}
