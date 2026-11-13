import { lazy, Suspense, useMemo, type ComponentType, type LazyExoticComponent } from 'react';
import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { PostCard } from '../components/PostCard';
import { ClosingCta } from '../components/Sections';
import { Seo } from '../components/Seo';
import { formatPostDate, loadPostBody, posts, type PostMeta } from '../news';
import { postPageMeta } from '../seo';

// Each post's HTML is its own chunk, loaded only on that post's page (prerendering waits for it).
const bodies = new Map<string, LazyExoticComponent<ComponentType>>();
function postBody(slug: string) {
  let Body = bodies.get(slug);
  if (!Body) {
    Body = lazy(() =>
      loadPostBody(slug).then((html) => ({
        default: () => <div className="legal-prose post-prose" dangerouslySetInnerHTML={{ __html: html }} />,
      })),
    );
    bodies.set(slug, Body);
  }
  return Body;
}

export default function PostPage({ post }: { post: PostMeta }) {
  const Body = postBody(post.slug);
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
                <Link to="/news/" className="hover:text-white">
                  News
                </Link>
              </li>
              {post.category && (
                <>
                  <li aria-hidden="true">/</li>
                  <li className="text-white/80">{post.category}</li>
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
        <article className="mx-auto max-w-[860px] overflow-hidden rounded-[2.5rem] bg-white">
          {post.image && (
            <img
              src={post.image}
              alt={post.imageAlt ?? ''}
              fetchPriority="high"
              className="aspect-[16/9] w-full object-cover"
            />
          )}
          <div className="p-7 sm:p-12 lg:p-16">
            <Suspense fallback={<div className="min-h-[60vh]" />}>
              <Body />
            </Suspense>
          </div>
        </article>

        <aside className="mx-auto mt-8 flex max-w-[860px] flex-col gap-6 rounded-[2.5rem] bg-[#111312] p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-display text-2xl tracking-tight">Have questions about your own setup?</p>
            <p className="mt-2 leading-7 text-white/60">Talk with Recon’s team in Beaumont about what this means for you.</p>
          </div>
          <Link to="/contact/" className="button button-light shrink-0">
            Talk to an expert <Icon name="arrow" className="size-4" />
          </Link>
        </aside>
      </section>

      {more.length > 0 && (
        <section className="bg-[#dfe0dc] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1344px]">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div className="section-heading">
                <p className="eyebrow">Keep reading</p>
                <h2>More from Recon.</h2>
              </div>
              <Link to="/news/" className="text-link">
                All news <Icon name="arrow" className="size-4" />
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
