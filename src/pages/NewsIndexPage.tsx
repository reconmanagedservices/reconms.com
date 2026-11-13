import { PostCard } from '../components/PostCard';
import { ClosingCta, PageHero } from '../components/Sections';
import { Seo } from '../components/Seo';
import { posts } from '../news';
import { pageMeta } from '../seo';

export default function NewsIndexPage() {
  return (
    <>
      <Seo meta={pageMeta.newsIndex} />
      <PageHero
        eyebrow="News"
        title="Insights for smarter, safer IT."
        text="Practical guidance on cybersecurity, technology planning, and getting more from your IT, from the Recon team in Beaumont."
      />
      <section className="section-shell">
        <h2 className="sr-only">Latest articles</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
      <ClosingCta />
    </>
  );
}
