// Renders every route to static HTML after `vite build`, so each page ships with real
// content and its own <title>, description, canonical URL, social tags and structured data.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, pageMeta, fullTitle, canonicalUrl, isNotFound, socialImage, structuredData } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);
// Drop developer-only HTML comments (keeping the <!--seo:…--> and <!--app-html--> markers).
const template = (await fs.readFile(path.join(dist, 'index.html'), 'utf8')).replace(
  /\s*<!--(?!seo:|app-html)[\s\S]*?-->/g,
  '',
);
if (!/<!--seo:start-->[\s\S]*<!--seo:end-->/.test(template) || !template.includes('<!--app-html-->')) {
  throw new Error('index.html is missing the <!--seo:start-->…<!--seo:end--> or <!--app-html--> markers');
}

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
// JSON inside <script> must not contain "</script" or HTML comment openers.
const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');

// Preload the two Latin font files used above the fold so text renders in the right font immediately.
const assetFiles = await fs.readdir(path.join(dist, '_app'));
const fontPreloads = ['manrope-latin-wght-normal', 'space-grotesk-latin-wght-normal'].map((name) => {
  const file = assetFiles.find((f) => f.startsWith(name) && f.endsWith('.woff2'));
  if (!file) throw new Error(`Font ${name} not found in dist/_app`);
  return `<link rel="preload" href="/_app/${file}" as="font" type="font/woff2" crossorigin />`;
});

// Site-wide graph (business + website) plus any page-specific nodes (e.g. Service, BreadcrumbList).
const siteGraph = structuredData().map(({ ['@context']: _, ...node }) => node);
const jsonLd = (meta) =>
  `<script type="application/ld+json">${safeJson({ '@context': 'https://schema.org', '@graph': [...siteGraph, ...(meta.schema ?? [])] })}</script>`;

function headTags(meta) {
  const title = fullTitle(meta);
  const notFound = isNotFound(meta);
  const tags = [
    `<title>${escapeText(title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${notFound ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
  ];
  if (!notFound) {
    const url = canonicalUrl(meta);
    tags.push(
      `<link rel="canonical" href="${escapeAttr(url)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Recon Managed Services" />`,
      `<meta property="og:locale" content="en_US" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
      `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
      `<meta property="og:image" content="${escapeAttr(socialImage.url)}" />`,
      `<meta property="og:image:width" content="${socialImage.width}" />`,
      `<meta property="og:image:height" content="${socialImage.height}" />`,
      `<meta property="og:image:alt" content="${escapeAttr(socialImage.alt)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(socialImage.url)}" />`,
      jsonLd(meta),
    );
  }
  tags.push(...fontPreloads);
  return tags.join('\n    ');
}

async function buildPage(meta, url) {
  const html = await render(url);
  return template
    .replace(/<!--seo:start-->[\s\S]*<!--seo:end-->/, headTags(meta))
    .replace('<!--app-html-->', html);
}

const routes = Object.values(pageMeta);
for (const meta of routes) {
  const notFound = isNotFound(meta);
  const file = notFound ? path.join(dist, '404.html') : path.join(dist, meta.path.slice(1), 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, await buildPage(meta, meta.path));
  console.log(`prerendered ${path.relative(root, file)}`);
}

// No <lastmod>: a build date on every page each deploy is inaccurate, and Google ignores
// lastmod values it can't trust.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((m) => !isNotFound(m))
  .map((m) => `  <url><loc>${canonicalUrl(m)}</loc></url>`)
  .join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote dist/sitemap.xml');

// Permanent (301) redirects from each page's slash-less URL to its canonical "/…/" URL.
// Cloudflare would otherwise answer these with a temporary 307. Rules go first in _redirects.
const slashRules = routes
  .filter((m) => !isNotFound(m) && m.path !== '/')
  .map((m) => `${m.path.slice(0, -1)}  ${m.path}  301`)
  .join('\n');
const redirectsFile = path.join(dist, '_redirects');
const existing = await fs.readFile(redirectsFile, 'utf8').catch(() => '');
await fs.writeFile(redirectsFile, `# Generated by scripts/prerender.mjs: canonical trailing-slash redirects\n${slashRules}\n\n${existing}`);
console.log('wrote trailing-slash rules to dist/_redirects');

await fs.rm(ssrDir, { recursive: true, force: true });
