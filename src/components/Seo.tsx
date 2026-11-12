import { useEffect } from 'react';
import { canonicalUrl, fullTitle, type PageMeta } from '../seo';

function setAttr(selector: string, attr: string, value: string) {
  document.querySelector(selector)?.setAttribute(attr, value);
}

/** Keeps <head> metadata in sync during client-side navigation. Prerendered pages already ship it. */
export function Seo({ meta }: { meta: PageMeta }) {
  useEffect(() => {
    const title = fullTitle(meta);
    const url = canonicalUrl(meta);
    document.title = title;
    setAttr('meta[name="description"]', 'content', meta.description);
    setAttr('link[rel="canonical"]', 'href', url);
    setAttr('meta[property="og:url"]', 'content', url);
    setAttr('meta[property="og:title"]', 'content', title);
    setAttr('meta[property="og:description"]', 'content', meta.description);
    setAttr('meta[name="robots"]', 'content', meta.path === '/404' ? 'noindex, follow' : 'index, follow');
  }, [meta]);
  return null;
}
