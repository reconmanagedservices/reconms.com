/**
 * Turns the Markdown posts in content/blog/*.md into build-time modules, so no Markdown parser
 * ships to the browser (h2/h3 headings get ids, and the h2s form the table of contents):
 *   virtual:blog-posts          → export const posts = [{ slug, title, date, … }]  (for listings)
 *                                  export const bodyLoaders = { [slug]: () => import(…?body) }
 *   content/blog/<slug>.md?body → export default { html, toc }  (loaded per post)
 * The file name (without .md) is the post's URL: /<slug>/.
 *
 * In production builds, drafts and posts dated after today (Central time) are left out of
 * virtual:blog-posts entirely, so not even their file names (which come from their titles) ship.
 * Their publish dates go to dist/scheduled-posts.json for the Worker's daily check.
 */
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import type { Plugin } from 'vite';

const BLOG_DIR = `${path.sep}content${path.sep}blog${path.sep}`;
const VIRTUAL_ID = 'virtual:blog-posts';
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;

/** Posts are scheduled by calendar day in the office's time zone. */
export const PUBLISH_TIME_ZONE = 'America/Chicago';

/** Today's date (YYYY-MM-DD) in PUBLISH_TIME_ZONE. */
export const publishToday = () => new Intl.DateTimeFormat('en-CA', { timeZone: PUBLISH_TIME_ZONE }).format(new Date());

/** Name of the file (in dist/) listing upcoming publish dates; read by the Worker's daily check. */
export const SCHEDULE_FILE = 'scheduled-posts.json';

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

/** Lowercase, hyphenated id for a heading, e.g. "Why It Matters?" → "why-it-matters". */
const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';

/** Gives every h2/h3 a unique id and returns the h2s as a table of contents. */
function addHeadingIds(html: string) {
  const used = new Set<string>();
  const toc: { id: string; text: string }[] = [];
  const withIds = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    const text = stripHtml(inner);
    let id = headingId(text);
    for (let n = 2; used.has(id); n++) id = `${headingId(text)}-${n}`;
    used.add(id);
    if (level === '2') toc.push({ id, text });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: withIds, toc };
}

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
  const { html: body, toc } = addHeadingIds(html);
  return { meta, body: { html: body, toc } };
}

export default function blogPlugin(): Plugin {
  // In production builds, drafts and posts dated after today are compiled to nothing so their
  // text never ships. `npm run dev` shows everything.
  let isBuild = false;
  let isSsrBuild = false;
  let today = '';
  let blogDir = '';
  // Publish dates of posts held back from this build, so the Worker knows when to rebuild.
  const scheduledDates = new Set<string>();

  /** Whether a post is left out of this build. */
  const isHidden = (meta: ReturnType<typeof parsePost>['meta']) => isBuild && (meta.draft || meta.date > today);

  const postFiles = () =>
    readdirSync(blogDir)
      .filter((name) => name.endsWith('.md') && name !== 'README.md')
      .sort()
      .map((name) => path.join(blogDir, name));

  return {
    name: 'recon-blog',
    enforce: 'pre',
    configResolved(config) {
      isBuild = config.command === 'build';
      isSsrBuild = Boolean(config.build.ssr);
      today = publishToday();
      blogDir = path.join(config.root, 'content', 'blog');
    },
    resolveId(id) {
      return id === VIRTUAL_ID ? RESOLVED_VIRTUAL_ID : null;
    },
    configureServer(server) {
      // Adding, removing or editing a post refreshes the post list in `npm run dev`.
      const refresh = (file: string) => {
        if (!file.includes(BLOG_DIR) || !file.endsWith('.md')) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.add(blogDir);
      server.watcher.on('add', refresh).on('unlink', refresh).on('change', refresh);
    },
    generateBundle() {
      if (!isBuild || isSsrBuild) return;
      this.emitFile({
        type: 'asset',
        fileName: SCHEDULE_FILE,
        source: `${JSON.stringify({ timeZone: PUBLISH_TIME_ZONE, dates: [...scheduledDates].sort() })}\n`,
      });
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) {
        const posts = [];
        for (const file of postFiles()) {
          this.addWatchFile(file);
          const { meta } = parsePost(file);
          if (isHidden(meta)) {
            if (!meta.draft) scheduledDates.add(meta.date);
            continue;
          }
          posts.push(meta);
        }
        const loaders = posts
          .map((meta) => `  ${JSON.stringify(meta.slug)}: () => import(${JSON.stringify(`/content/blog/${meta.slug}.md?body`)}).then((m) => m.default),`)
          .join('\n');
        return `export const posts = ${JSON.stringify(posts)};\nexport const bodyLoaders = {\n${loaders}\n};\n`;
      }

      const [file, query] = id.split('?');
      if (!file.endsWith('.md') || !file.includes(BLOG_DIR)) return null;
      this.addWatchFile(file);
      if (query !== 'body') throw new Error(`Import blog posts from "${VIRTUAL_ID}" (got ${id})`);
      const { meta, body } = parsePost(file);
      if (isHidden(meta)) throw new Error(`${file} is a draft or scheduled post and must not be bundled`);
      return `export default ${JSON.stringify(body)};`;
    },
  };
}
