import { useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { faqs, products, services, site } from '../content';
import { Icon } from './Icon';

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) {
  return (
    <section className="hero-grid relative overflow-hidden bg-[#101211] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <p className="eyebrow text-white/55">{eyebrow}</p>
        <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.4rem,8vw,7.5rem)] leading-[.88] tracking-[-.06em]">
          {title}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">{text}</p>
      </div>
    </section>
  );
}

export function ServiceGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${compact ? 'xl:grid-cols-3' : ''}`}>
      {services.map((service) => (
        <article key={service.title} className={`service-card group ${compact ? '' : 'service-card-wide'}`}>
          <span className="grid size-12 place-items-center rounded-2xl bg-[#111312] text-white transition-transform duration-300 group-hover:-translate-y-1">
            <Icon name={service.icon} />
          </span>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <ul>
            {service.points.slice(0, compact ? 3 : 4).map((point) => (
              <li key={point}>
                <Icon name="check" className="size-3.5 shrink-0" /> {point}
              </li>
            ))}
          </ul>
          <Link to={service.path}>
            Explore {service.shortName}
            <Icon name="arrow" className="size-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function ProductGrid({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid gap-5 md:grid-cols-2 ${compact ? 'xl:grid-cols-4' : ''}`}>
      {products.map((product) => (
        <article key={product.title} className="product-card group">
          <div className="product-icon">
            <Icon name={product.icon} className="size-7" />
          </div>
          <h3>{product.title}</h3>
          <p>{product.text}</p>
          {!compact && (
            <ul>
              {product.items.map((item) => (
                <li key={item}>
                  <Icon name="check" className="size-3.5 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          )}
          <Link to={product.path}>
            Explore {product.shortName}
            <Icon name="arrow" className="size-4" />
          </Link>
        </article>
      ))}
    </div>
  );
}

export function FaqList({
  items = faqs,
  idPrefix = 'faq',
}: {
  items?: { question: string; answer: string }[];
  idPrefix?: string;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="border-t border-black/15">
      {items.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `${idPrefix}-answer-${index}`;
        return (
          <div key={faq.question} className="border-b border-black/15">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-5 py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span className="font-display text-xl tracking-tight sm:text-2xl">{faq.question}</span>
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-full border border-black/15 transition-transform ${isOpen ? 'rotate-180 bg-black text-white' : ''}`}
                >
                  <Icon name="chevron" className="size-4" />
                </span>
              </button>
            </h3>
            <p id={answerId} hidden={!isOpen} className="max-w-2xl pb-7 pr-10 leading-7 text-black/58">
              {faq.answer}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-[#d8dad5]">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:px-12 lg:py-24">
        <div>
          <p className="eyebrow">Ready when you are</p>
          <h2 className="mt-6 max-w-3xl font-display text-[clamp(3rem,6vw,6rem)] leading-[.9] tracking-[-.055em]">
            Let’s make IT feel simple again.
          </h2>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Link to="/contact/" className="button button-dark">
            Start a conversation <Icon name="arrow" className="size-4" />
          </Link>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-outline"
          >
            <Icon name="calendar" className="size-4" /> Book a discovery call
          </a>
        </div>
      </div>
    </section>
  );
}

/** Dark rounded call-to-action panel used near the bottom of the Services and Products pages. */
export function DarkCtaPanel({
  eyebrow,
  title,
  text,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  linkLabel: string;
}) {
  return (
    <section className="section-shell">
      <div className="rounded-[2.5rem] bg-[#111312] px-7 py-16 text-white sm:px-12 lg:flex lg:items-end lg:justify-between lg:gap-16">
        <div>
          <p className="eyebrow text-white/45">{eyebrow}</p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl leading-none tracking-[-.04em] sm:text-6xl">
            {title}
          </h2>
          {text && <p className="mt-6 max-w-2xl leading-7 text-white/55">{text}</p>}
        </div>
        <Link to="/contact/" className="button button-light mt-10 shrink-0">
          {linkLabel} <Icon name="arrow" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
