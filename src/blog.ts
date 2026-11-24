import { bodyLoaders, posts as postList } from 'virtual:blog-posts';

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

/** A post's rendered HTML plus its table of contents (the post's h2 headings). */
export type PostBody = { html: string; toc: { id: string; text: string }[] };

/**
 * Published posts, newest first. Production builds leave out drafts and future-dated posts
 * (see vite-plugin-blog.ts); `npm run dev` includes them.
 */
export const posts: PostMeta[] = postList
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

export const postPath = (post: Pick<PostMeta, 'slug'>) => `/${post.slug}/`;

export function loadPostBody(slug: string): Promise<PostBody> {
  const load = bodyLoaders[slug];
  if (!load) return Promise.reject(new Error(`No post named ${slug}`));
  return load();
}

/** URL-friendly category name, e.g. "IT Management" → "it-management" (used in /blog/?category=). */
export const categorySlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/** Categories in use, most posts first. */
export const categories = Object.values(
  posts.reduce<Record<string, { slug: string; name: string; count: number }>>((all, post) => {
    if (post.category) {
      const slug = categorySlug(post.category);
      all[slug] ??= { slug, name: post.category, count: 0 };
      all[slug].count += 1;
    }
    return all;
  }, {}),
).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

export function formatPostDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
