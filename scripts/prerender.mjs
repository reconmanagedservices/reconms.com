// Renders every route to static HTML after `vite build`, so each page ships with real
// content and its own <title>, description, canonical URL, social tags and structured data.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, allPages, fullTitle, canonicalUrl, isNotFound, socialImage, structuredData, posts } = await import(
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
      `<meta property="og:type" content="${meta.ogType ?? 'website'}" />`,
      `<meta property="og:site_name" content="Recon Managed Services" />`,
      `<meta property="og:locale" content="en_US" />`,
      `<meta property="og:url" content="${escapeAttr(url)}" />`,
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
      `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
      ...imageTags(meta),
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
      ...(meta.ogType === 'article'
        ? [
            `<meta property="article:published_time" content="${meta.published}" />`,
            `<meta property="article:modified_time" content="${meta.modified}" />`,
          ]
        : []),
      jsonLd(meta),
    );
  }
  if (posts.length) {
    tags.push('<link rel="alternate" type="application/rss+xml" title="Recon Managed Services Blog" href="/blog/feed.xml" />');
  }
  tags.push(...fontPreloads);
  return tags.join('\n    ');
}

/** Open Graph/Twitter image tags: the page's own image (blog posts) or the site-wide one. */
function imageTags(meta) {
  if (meta.image) {
    return [
      `<meta property="og:image" content="${escapeAttr(meta.image.url)}" />`,
      `<meta property="og:image:alt" content="${escapeAttr(meta.image.alt)}" />`,
      `<meta name="twitter:image" content="${escapeAttr(meta.image.url)}" />`,
    ];
  }
  return [
    `<meta property="og:image" content="${escapeAttr(socialImage.url)}" />`,
    `<meta property="og:image:width" content="${socialImage.width}" />`,
    `<meta property="og:image:height" content="${socialImage.height}" />`,
    `<meta property="og:image:alt" content="${escapeAttr(socialImage.alt)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(socialImage.url)}" />`,
  ];
}

async function buildPage(meta, url) {
  const html = await render(url);
  return template
    .replace(/<!--seo:start-->[\s\S]*<!--seo:end-->/, headTags(meta))
    .replace('<!--app-html-->', html);
}

const routes = allPages();
for (const meta of routes) {
  const notFound = isNotFound(meta);
  const file = notFound ? path.join(dist, '404.html') : path.join(dist, meta.path.slice(1), 'index.html');
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, await buildPage(meta, meta.path));
  console.log(`prerendered ${path.relative(root, file)}`);
}

// <lastmod> only where we know the real date (blog posts). A build date on every page each
// deploy would be inaccurate, and Google ignores lastmod values it can't trust.
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((m) => !isNotFound(m))
  .map((m) => `  <url><loc>${canonicalUrl(m)}</loc>${m.modified ? `<lastmod>${m.modified}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`;
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap);
console.log('wrote dist/sitemap.xml');

// RSS feed of blog posts (the old WordPress /feed/ URL redirects here).
if (posts.length) {
  const escapeXml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const rfc822 = (iso) => new Date(`${iso}T12:00:00Z`).toUTCString();
  const items = posts
    .slice(0, 50)
    .map((post) => {
      const url = `https://reconms.com/${post.slug}/`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>${post.category ? `\n      <category>${escapeXml(post.category)}</category>` : ''}
      <description>${escapeXml(post.description)}</description>
    </item>`;
    })
    .join('\n');
  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Recon Managed Services Blog</title>
    <link>https://reconms.com/blog/</link>
    <atom:link href="https://reconms.com/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Practical IT, cybersecurity, and technology advice for Southeast Texas organizations.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(posts[0].updated ?? posts[0].date)}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  await fs.mkdir(path.join(dist, 'blog'), { recursive: true });
  await fs.writeFile(path.join(dist, 'blog', 'feed.xml'), feed);
  console.log(`wrote dist/blog/feed.xml (${posts.length} posts)`);
}

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
