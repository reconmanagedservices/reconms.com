/**
 * Blog posts, read from content/blog/*.md at build time (see vite-plugin-blog.ts).
 * Post metadata is bundled for listings; each post's HTML body loads only on its own page.
 */
export type PostMeta = {
  /** File name without .md; the post lives at /<slug>/. */
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  updated: string | null;
  category: string | null;
  /** Path to the featured image, e.g. /assets/blog/photo.jpg. */
  image: string | null;
  imageAlt: string | null;
  author: string;
  draft: boolean;
  readingMinutes: number;
};

// Drafts compile to `null` in production builds (see vite-plugin-blog.ts).
const metaModules = import.meta.glob<PostMeta | null>(['/content/blog/*.md', '!/content/blog/README.md'], {
  query: '?meta',
  import: 'default',
  eager: true,
});
const bodyLoaders = import.meta.glob<string>(['/content/blog/*.md', '!/content/blog/README.md'], {
  query: '?body',
  import: 'default',
});

/** Published posts, newest first. Drafts are only included in `npm run dev`. */
export const posts: PostMeta[] = Object.values(metaModules)
  .filter((post): post is PostMeta => post !== null && (import.meta.env.DEV || !post.draft))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

export const postPath = (post: Pick<PostMeta, 'slug'>) => `/${post.slug}/`;

export function loadPostBody(slug: string): Promise<string> {
  const load = bodyLoaders[`/content/blog/${slug}.md`];
  if (!load) return Promise.reject(new Error(`No post named ${slug}`));
  return load();
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
