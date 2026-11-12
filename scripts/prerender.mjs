// Renders every route to static HTML after `vite build`, so each page ships with
// real content and its own <title>/meta tags (better SEO, faster first paint).
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, pageMeta, fullTitle, canonicalUrl } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8');

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function setMeta(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`Template is missing ${pattern}`);
  return html.replace(pattern, (_m, before, _old, after) => `${before}${escapeAttr(value)}${after}`);
}

function buildPage(meta, url) {
  const title = fullTitle(meta);
  const canonical = canonicalUrl(meta);
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeText(title)}</title>`);
  html = setMeta(html, /(<meta\s+name="description"\s+content=")([^"]*)(")/, meta.description);
  html = setMeta(html, /(<link\s+rel="canonical"\s+href=")([^"]*)(")/, canonical);
  html = setMeta(html, /(<meta\s+property="og:url"\s+content=")([^"]*)(")/, canonical);
  html = setMeta(html, /(<meta\s+property="og:title"\s+content=")([^"]*)(")/, title);
  html = setMeta(html, /(<meta\s+property="og:description"\s+content=")([^"]*)(")/, meta.description);
  if (meta.path === '/404') {
    html = setMeta(html, /(<meta\s+name="robots"\s+content=")([^"]*)(")/, 'noindex, follow');
  }
  return html.replace('<!--app-html-->', render(url));
}

const routes = Object.values(pageMeta);
for (const meta of routes) {
  const isNotFound = meta.path === '/404';
  const file = isNotFound
    ? path.join(dist, '404.html')
    : path.join(dist, meta.path === '/' ? '' : meta.path.slice(1), 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, buildPage(meta, isNotFound ? '/404' : meta.path));
  console.log(`prerendered ${path.relative(root, file)}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((m) => m.path !== '/404')
  .map((m) => `  <url><loc>${canonicalUrl(m)}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote dist/sitemap.xml');

await fs.rm(ssrDir, { recursive: true, force: true });
