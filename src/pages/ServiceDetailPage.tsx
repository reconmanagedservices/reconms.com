import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { ClosingCta, FaqList } from '../components/Sections';
import { Seo } from '../components/Seo';
import { services, site } from '../content';
import { pageMeta } from '../seo';
import type { ServicePageContent } from '../servicePages';

/** Template for the dedicated service pages (/managed/, /comanaged/, /cybersecurity/, /ai/). */
export default function ServiceDetailPage({ page }: { page: ServicePageContent }) {
  const related = services.filter((service) => service.path !== page.path);

  return (
    <>
      <Seo meta={pageMeta[page.key]} />

      <section className="hero-grid relative overflow-hidden bg-[#101211] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
          <nav aria-label="Breadcrumb">
            <ol className="eyebrow text-white/55">
              <li>
                <Link to="/services/" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/80">
                {page.shortName}
              </li>
            </ol>
          </nav>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.2rem,7.5vw,7rem)] leading-[.9] tracking-[-.06em]">
            {page.hero.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">{page.hero.text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact/" className="button button-light">
              Talk to an expert <Icon name="arrow" className="size-4" />
            </Link>
            <a href={site.phoneHref} className="button button-ghost">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div>
          <p className="eyebrow">{page.intro.eyebrow}</p>
          <h2 className="mt-5 font-display text-4xl leading-[.98] tracking-[-.04em] sm:text-6xl">{page.intro.title}</h2>
        </div>
        <div className="space-y-7 text-lg leading-8 text-black/62">
          {page.intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="bg-[#dfe0dc] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1344px]">
          <div className="section-heading">
            <p className="eyebrow">{page.included.eyebrow}</p>
            <h2>{page.included.title}</h2>
            {page.included.text && <p>{page.included.text}</p>}
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {page.included.items.map((item) => (
              <article key={item.title} className="rounded-[1.75rem] bg-white p-8 lg:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#111312] text-white">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-9 font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-4 leading-7 text-black/58">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.reasons && (
        <section className="section-shell">
          <div className="section-heading">
            <p className="eyebrow">{page.reasons.eyebrow}</p>
            <h2>{page.reasons.title}</h2>
          </div>
          <div
            className={`mt-14 grid gap-x-10 gap-y-10 border-t border-black/15 pt-10 sm:grid-cols-2 ${page.reasons.items.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}
          >
            {page.reasons.items.map((item) => (
              <div key={item.title}>
                <span className="grid size-9 place-items-center rounded-full bg-[#111312] text-white">
                  <Icon name="check" className="size-4" />
                </span>
                <h3 className="mt-6 font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 leading-7 text-black/58">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className={page.reasons ? 'section-shell !pt-0' : 'section-shell'}>
        <div className="grid gap-12 rounded-[2.5rem] bg-[#111312] px-7 py-14 text-white sm:px-12 sm:py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-20 lg:p-16">
          <div>
            <p className="eyebrow text-white/50">{page.highlight.eyebrow}</p>
            <h2 className="mt-6 font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
              {page.highlight.title}
            </h2>
            <div className="mt-7 space-y-5 leading-8 text-white/62">
              {page.highlight.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <ul className="grid content-center gap-4">
            {page.highlight.points.map((point) => (
              <li key={point} className="flex items-center gap-4 rounded-2xl bg-white/[.06] px-5 py-4 font-semibold">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-black">
                  <Icon name="check" className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell">
          <div className="section-heading">
            <p className="eyebrow">{page.process.eyebrow}</p>
            <h2>{page.process.title}</h2>
          </div>
          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {page.process.steps.map((step, index) => (
              <li key={step.title} className="rounded-[1.75rem] bg-[#f4f4f1] p-8 lg:p-10">
                <span aria-hidden="true" className="font-display text-5xl tracking-[-.04em] text-black/50">
                  0{index + 1}
                </span>
                <h3 className="mt-8 font-display text-2xl tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-7 text-black/58">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-5 font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
            {page.shortName} FAQs
          </h2>
          <Link to="/contact/" className="text-link mt-9">
            Ask us something else <Icon name="arrow" className="size-4" />
          </Link>
        </div>
        <FaqList items={page.faqs} idPrefix={`${page.key}-faq`} />
      </section>

      <section className="bg-[#dfe0dc] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-[1344px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="section-heading">
              <p className="eyebrow">Related services</p>
              <h2>One partner for your whole environment.</h2>
            </div>
            <Link to="/services/" className="text-link">
              View all services <Icon name="arrow" className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {related.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className="group flex flex-col rounded-[1.75rem] bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-[#111312] text-white">
                  <Icon name={service.icon} />
                </span>
                <h3 className="mt-9 font-display text-2xl tracking-tight">{service.title}</h3>
                <p className="mt-4 leading-7 text-black/58">{service.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold">
                  Explore {service.shortName}
                  <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
