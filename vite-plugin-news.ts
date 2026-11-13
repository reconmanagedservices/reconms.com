/**
 * Turns the Markdown posts in content/news/*.md into build-time modules, so no Markdown parser
 * ships to the browser:
 *   content/news/<slug>.md?meta → export default { slug, title, date, … }  (small; for listings)
 *   content/news/<slug>.md?body → export default "<p>…</p>"                (HTML; loaded per post)
 * The file name (without .md) is the post's URL: /<slug>/.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Plugin } from 'vite';

const NEWS_DIR = `${path.sep}content${path.sep}news${path.sep}`;

const toIsoDate = (value: unknown, field: string, file: string) => {
  if (value === undefined || value === null || value === '') return undefined;
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) throw new Error(`${file}: "${field}" is not a valid date (${String(value)})`);
  return date.toISOString().slice(0, 10);
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&rsquo;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

function parsePost(file: string) {
  const slug = path.basename(file, '.md');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${file}: file names must be lowercase words separated by hyphens (they become the URL)`);
  }
  const { data, content } = matter(readFileSync(file, 'utf8'));
  if (!data.title) throw new Error(`${file}: missing "title"`);
  const date = toIsoDate(data.date, 'date', file);
  if (!date) throw new Error(`${file}: missing "date"`);

  const html = (marked.parse(content, { gfm: true, async: false }) as string)
    // Lazy-load images inside posts.
    .replace(/<img /g, '<img loading="lazy" decoding="async" ')
    // Open links to other sites in the same tab, but don't pass referrer details.
    .replace(/<a href="(https?:\/\/(?!reconms\.com)[^"]+)"/g, '<a href="$1" rel="noopener"');

  const text = stripHtml(html);
  const firstParagraph = stripHtml(/<p>([\s\S]*?)<\/p>/.exec(html)?.[1] ?? text);
  const description =
    String(data.description ?? '').trim() ||
    (firstParagraph.length > 160 ? `${firstParagraph.slice(0, 157).replace(/\s+\S*$/, '')}…` : firstParagraph);

  const meta = {
    slug,
    title: String(data.title).trim(),
    description,
    date,
    updated: toIsoDate(data.updated, 'updated', file) ?? null,
    category: data.category ? String(data.category).trim() : null,
    image: data.image ? String(data.image).trim() : null,
    imageAlt: data.imageAlt ? String(data.imageAlt).trim() : null,
    author: data.author ? String(data.author).trim() : 'Recon Managed Services',
    draft: data.draft === true,
    readingMinutes: Math.max(1, Math.round(text.split(' ').length / 220)),
  };
  return { meta, html };
}

export default function newsPlugin(): Plugin {
  // In production builds, drafts are compiled to nothing so their text never ships.
  let excludeDrafts = false;
  return {
    name: 'recon-news',
    enforce: 'pre',
    configResolved(config) {
      excludeDrafts = config.command === 'build';
    },
    load(id) {
      const [file, query] = id.split('?');
      if (!file.endsWith('.md') || !file.includes(NEWS_DIR)) return null;
      this.addWatchFile(file);
      const { meta, html } = parsePost(file);
      if (excludeDrafts && meta.draft) return 'export default null;';
      if (query === 'meta') return `export default ${JSON.stringify(meta)};`;
      if (query === 'body') return `export default ${JSON.stringify(html)};`;
      throw new Error(`Import news posts with ?meta or ?body (got ${id})`);
    },
  };
}
