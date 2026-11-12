import { Seo } from './Seo';
import type { PageMeta } from '../seo';

type TocEntry = { id: string; label: string };

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .trim();

function slugify(text: string) {
  return text
    .replace(/^\d+\.\s*/, '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Takes the raw policy HTML (copied from the previous WordPress site), pulls out the
 * effective/last-updated dates for the page header, and gives each <h2> an anchor id
 * for the table of contents.
 */
function prepare(html: string) {
  let body = html;
  let dates: string | undefined;

  const datePara = body.match(/^\s*<p>(?:(?!<\/p>)[\s\S])*Effective Date:(?:(?!<\/p>)[\s\S])*<\/p>\s*/);
  if (datePara) {
    const text = stripTags(datePara[0].replace(/<br\s*\/?>/g, '\n'));
    const effective = text.match(/Effective Date:\s*(.+)/)?.[1]?.trim();
    const updated = text.match(/Last Updated:\s*(.+)/)?.[1]?.trim();
    dates = [effective && `Effective ${effective}`, updated && `Last updated ${updated}`].filter(Boolean).join(' · ');
    body = body.slice(datePara[0].length);
  }

  const toc: TocEntry[] = [];
  const used = new Set<string>();
  body = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    const label = stripTags(inner);
    let id = slugify(label) || `section-${toc.length + 1}`;
    while (used.has(id)) id += '-2';
    used.add(id);
    toc.push({ id, label });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { body, toc, dates };
}

function TocList({ toc }: { toc: TocEntry[] }) {
  return (
    <ol className="grid gap-2.5 text-sm leading-snug text-black/60">
      {toc.map((entry) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`} className="hover:text-black">
            {entry.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

export function LegalDocument({ meta, heading, html }: { meta: PageMeta; heading: string; html: string }) {
  const { body, toc, dates } = prepare(html);

  return (
    <>
      <Seo meta={meta} />

      <section className="hero-grid relative overflow-hidden bg-[#101211] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <p className="eyebrow text-white/55">Legal</p>
          <h1 className="mt-7 max-w-5xl font-display text-[clamp(3rem,7vw,6.5rem)] leading-[.9] tracking-[-.06em]">
            {heading}
          </h1>
          {dates && <p className="mt-8 text-base text-white/62 sm:text-lg">{dates}</p>}
        </div>
      </section>

      <section className="section-shell grid gap-8 lg:grid-cols-[300px_1fr] lg:gap-16 !pt-10 sm:!pt-14 lg:!pt-20">
        <aside>
          <details className="rounded-[1.75rem] bg-white p-6 lg:hidden">
            <summary className="cursor-pointer text-sm font-bold">Jump to a section</summary>
            <nav className="mt-5" aria-label={`${heading} sections`}>
              <TocList toc={toc} />
            </nav>
          </details>
          <nav className="sticky top-[110px] hidden max-h-[calc(100vh-140px)] overflow-y-auto pr-2 lg:block" aria-label={`${heading} sections`}>
            <p className="eyebrow mb-6">On this page</p>
            <TocList toc={toc} />
          </nav>
        </aside>

        <article
          className="legal-prose min-w-0 rounded-[2.5rem] bg-white p-7 sm:p-10 lg:p-14"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </section>
    </>
  );
}
