import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType, type LazyExoticComponent } from 'react';
import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { PostCard } from '../components/PostCard';
import { ClosingCta } from '../components/Sections';
import { Seo } from '../components/Seo';
import { categorySlug, formatPostDate, loadPostBody, posts, type PostBody, type PostMeta } from '../blog';
import { postPageMeta } from '../seo';

type TocEntry = PostBody['toc'][number];

/** Tracks which section heading the reader is currently in (the last one scrolled past). */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!ids.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

function TocList({ toc, activeId }: { toc: TocEntry[]; activeId: string | null }) {
  return (
    <ol className="grid border-l border-black/12 text-sm leading-snug">
      {toc.map((entry) => {
        const active = entry.id === activeId;
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={active ? 'location' : undefined}
              className={`-ml-px block border-l-2 py-2 pl-4 transition-colors ${
                active ? 'border-[#111312] font-semibold text-[#111312]' : 'border-transparent text-black/60 hover:text-black'
              }`}
            >
              {entry.text}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Table of contents (when the post has 3+ sections), the article, and the follow-up CTA. */
function PostContent({ post, body }: { post: PostMeta; body: PostBody }) {
  const showToc = body.toc.length >= 3;
  const activeId = useActiveHeading(showToc ? body.toc.map((entry) => entry.id) : []);

  return (
    <div className={showToc ? 'mx-auto grid max-w-[1200px] gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12' : ''}>
      {showToc && (
        <aside>
          <details className="rounded-[1.75rem] bg-white p-6 lg:hidden">
            <summary className="cursor-pointer text-sm font-bold">In this article</summary>
            <nav className="mt-5" aria-label="In this article">
              <TocList toc={body.toc} activeId={activeId} />
            </nav>
          </details>
          <nav
            className="sticky top-[110px] hidden max-h-[calc(100vh-140px)] overflow-y-auto pr-2 pb-4 lg:block"
            aria-label="In this article"
          >
            <p className="eyebrow mb-5">In this article</p>
            <TocList toc={body.toc} activeId={activeId} />
          </nav>
        </aside>
      )}

      <div className="min-w-0">
        <article className={`overflow-hidden rounded-[2.5rem] bg-white ${showToc ? '' : 'mx-auto max-w-[860px]'}`}>
          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt ?? ''}
              fetchPriority="high"
              className="aspect-[16/9] w-full object-cover"
            />
          )}
          <div className="p-7 sm:p-12 lg:p-16">
            <div className="legal-prose post-prose" dangerouslySetInnerHTML={{ __html: body.html }} />
          </div>
        </article>

        <aside
          className={`mt-8 flex flex-col gap-6 rounded-[2.5rem] bg-[#111312] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10 ${showToc ? '' : 'mx-auto max-w-[860px]'}`}
        >
          <div>
            <p className="font-display text-2xl tracking-tight">Have questions about your own setup?</p>
            <p className="mt-2 leading-7 text-white/60">Talk with Recon’s team in Beaumont about what this means for you.</p>
          </div>
          <Link to="/contact/" className="button button-light shrink-0">
            Talk to an expert <Icon name="arrow" className="size-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}

// Each post's HTML is its own chunk, loaded only on that post's page (prerendering waits for it).
const contents = new Map<string, LazyExoticComponent<ComponentType<{ post: PostMeta }>>>();
function postContent(slug: string) {
  let Content = contents.get(slug);
  if (!Content) {
    Content = lazy(() =>
      loadPostBody(slug).then((body) => ({
        default: ({ post }: { post: PostMeta }) => <PostContent post={post} body={body} />,
      })),
    );
    contents.set(slug, Content);
  }
  return Content;
}

export default function PostPage({ post }: { post: PostMeta }) {
  const Content = postContent(post.slug);
  const meta = useMemo(() => postPageMeta(post), [post]);
  const more = posts.filter((other) => other.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo meta={meta} />

      <section className="hero-grid relative overflow-hidden bg-[#101211] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <nav aria-label="Breadcrumb">
            <ol className="eyebrow text-white/55">
              <li>
                <Link to="/blog/" className="hover:text-white">
                  Blog
                </Link>
              </li>
              {post.category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link to={`/blog/?category=${categorySlug(post.category)}`} className="text-white/80 hover:text-white">
                      {post.category}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.6rem,5.6vw,5.4rem)] leading-[.95] tracking-[-.05em]">
            {post.title}
          </h1>
          <p className="mt-8 text-base text-white/62 sm:text-lg">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.updated && post.updated !== post.date && (
              <>
                {' · Updated '}
                <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
              </>
            )}
            {` · ${post.readingMinutes} min read`}
          </p>
        </div>
      </section>

      <section className="section-shell !pt-10 sm:!pt-14 lg:!pt-20">
        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <Content post={post} />
        </Suspense>
      </section>

      {more.length > 0 && (
        <section className="bg-[#dfe0dc] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1344px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="section-heading">
                <p className="eyebrow">Keep reading</p>
                <h2>More from Recon.</h2>
              </div>
              <Link to="/blog/" className="text-link">
                All posts <Icon name="arrow" className="size-4" />
              </Link>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {more.map((other) => (
                <PostCard key={other.slug} post={other} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta />
    </>
  );
}
