import { useEffect } from 'react';
import { canonicalUrl, fullTitle, isNotFound, type PageMeta } from '../seo';

/** Sets (creating if needed) or removes a <meta>/<link> tag in <head>. */
function upsert(tag: 'meta' | 'link', key: [attr: string, value: string], valueAttr: string, value: string | null) {
  let el = document.head.querySelector<HTMLElement>(`${tag}[${key[0]}="${key[1]}"]`);
  if (value === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(key[0], key[1]);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

/**
 * Keeps <head> metadata in sync during client-side navigation. Prerendered pages already
 * ship the full set (see scripts/prerender.mjs); this mirrors the parts that vary by page.
 */
export function Seo({ meta }: { meta: PageMeta }) {
  useEffect(() => {
    const title = fullTitle(meta);
    const notFound = isNotFound(meta);
    const url = notFound ? null : canonicalUrl(meta);

    document.title = title;
    upsert('meta', ['name', 'description'], 'content', meta.description);
    upsert('meta', ['name', 'robots'], 'content', notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    upsert('link', ['rel', 'canonical'], 'href', url);
    upsert('meta', ['property', 'og:url'], 'content', url);
    upsert('meta', ['property', 'og:title'], 'content', title);
    upsert('meta', ['property', 'og:description'], 'content', meta.description);
    upsert('meta', ['name', 'twitter:title'], 'content', title);
    upsert('meta', ['name', 'twitter:description'], 'content', meta.description);
  }, [meta]);
  return null;
}
