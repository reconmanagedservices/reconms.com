import { Icon } from '../components/Icon';
import { ClosingCta, DarkCtaPanel, PageHero, ProductGrid } from '../components/Sections';
import { Seo } from '../components/Seo';
import { pageMeta } from '../seo';

const steps: [title: string, text: string][] = [
  ['Plan', 'We match equipment to your actual requirements, environment, and budget.'],
  ['Source', 'We coordinate procurement so specifications, warranties, and timelines stay clear.'],
  ['Install', 'Our team configures and deploys products with your network and operations in mind.'],
  ['Support', 'You have one partner to call when equipment, software, or connectivity needs attention.'],
];

export default function ProductsPage() {
  return (
    <>
      <Seo meta={pageMeta.products} />
      <PageHero
        eyebrow="Products"
        title="The right equipment. Ready to work."
        text="Recon helps Southeast Texas organizations select, install, configure, and support the technology their teams and facilities depend on."
      />

      <section className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">What we provide</p>
          <h2>Business technology without the guesswork.</h2>
          <p>
            We recommend products based on your environment, goals, and long-term support needs—not a
            one-size-fits-all catalog.
          </p>
        </div>
        <div className="mt-14">
          <ProductGrid />
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow">From selection to support</p>
            <h2 className="mt-5 font-display text-4xl leading-[.98] tracking-[-.04em] sm:text-6xl">
              More than a box on a loading dock.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map(([title, text]) => (
              <div key={title} className="rounded-[1.75rem] bg-[#f4f4f1] p-7">
                <span className="grid size-9 place-items-center rounded-full bg-[#111312] text-white">
                  <Icon name="check" className="size-4" />
                </span>
                <h3 className="mt-7 font-display text-2xl tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-black/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DarkCtaPanel
        eyebrow="Planning a refresh or new location?"
        title="Build it right from the start."
        text="Tell us what you are replacing, adding, or building. We will help you create a practical product and deployment plan."
        linkLabel="Discuss your project"
      />

      <ClosingCta />
    </>
  );
}
