import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '../components/Icon';
import { PostCard } from '../components/PostCard';
import { ClosingCta, PageHero } from '../components/Sections';
import { Seo } from '../components/Seo';
import { categories, categorySlug, posts } from '../blog';
import { pageMeta } from '../seo';

const ALL = 'all';

const chipClass = (active: boolean) =>
  `inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
    active ? 'border-[#111312] bg-[#111312] text-white' : 'border-black/15 bg-white text-[#111312] hover:border-[#111312]'
  }`;

export default function BlogIndexPage() {
  const navigate = useNavigate();
  // Start unfiltered (matching the prerendered HTML), then apply ?category= / ?q= from the URL.
  const [category, setCategory] = useState(ALL);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('category');
    if (fromUrl && categories.some((c) => c.slug === fromUrl)) setCategory(fromUrl);
    setQuery(params.get('q') ?? '');
  }, []);

  /** Keeps the URL in sync so a filtered view can be shared or bookmarked. */
  function updateUrl(nextCategory: string, nextQuery: string) {
    const params = new URLSearchParams();
    if (nextCategory !== ALL) params.set('category', nextCategory);
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    const search = params.toString();
    navigate({ pathname: '/blog/', search: search ? `?${search}` : '' }, { replace: true, preventScrollReset: true });
  }

  const visible = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return posts.filter((post) => {
      if (category !== ALL && (!post.category || categorySlug(post.category) !== category)) return false;
      const haystack = `${post.title} ${post.description} ${post.category ?? ''}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
  }, [category, query]);

  const selectCategory = (slug: string) => {
    setCategory(slug);
    updateUrl(slug, query);
  };
  const reset = () => {
    setCategory(ALL);
    setQuery('');
    updateUrl(ALL, '');
  };
  const activeName = categories.find((c) => c.slug === category)?.name;

  return (
    <>
      <Seo meta={pageMeta.blogIndex} />
      <PageHero
        eyebrow="Blog"
        title="Insights for smarter, safer IT."
        text="Practical guidance on cybersecurity, technology planning, and getting more from your IT, from the Recon team in Beaumont."
      />
      <section className="section-shell !pt-12 lg:!pt-20">
        <h2 className="sr-only">Articles</h2>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2.5">
            <button type="button" className={chipClass(category === ALL)} aria-pressed={category === ALL} onClick={() => selectCategory(ALL)}>
              All <span className="opacity-60">{posts.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                className={chipClass(category === c.slug)}
                aria-pressed={category === c.slug}
                onClick={() => selectCategory(c.slug)}
              >
                {c.name} <span className="opacity-60">{c.count}</span>
              </button>
            ))}
          </div>

          <label className="relative block w-full lg:w-[320px]">
            <span className="sr-only">Search articles</span>
            <svg
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-black/45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                updateUrl(category, event.target.value);
              }}
              placeholder="Search articles"
              className="block min-h-12 w-full rounded-full border border-black/15 bg-white pr-4 pl-11 text-[15px] focus:border-[#111312] focus:outline-none"
            />
          </label>
        </div>

        <p className="mt-6 text-sm text-black/60" aria-live="polite">
          {visible.length === posts.length
            ? `${posts.length} articles`
            : `Showing ${visible.length} of ${posts.length} articles${activeName ? ` in ${activeName}` : ''}${query.trim() ? ` matching “${query.trim()}”` : ''}`}
        </p>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.75rem] bg-white p-10 text-center">
            <p className="font-display text-2xl tracking-tight">No articles match that search.</p>
            <button type="button" onClick={reset} className="text-link mt-6">
              Show all articles <Icon name="arrow" className="size-4" />
            </button>
          </div>
        )}
      </section>
      <ClosingCta />
    </>
  );
}
