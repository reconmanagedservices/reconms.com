import { Link } from 'react-router';
import { Icon } from '../components/Icon';
import { ClosingCta, DarkCtaPanel, PageHero } from '../components/Sections';
import { Seo } from '../components/Seo';
import { industries } from '../content';
import { pageMeta } from '../seo';

export default function IndustriesPage() {
  return (
    <>
      <Seo meta={pageMeta.industries} />
      <PageHero
        eyebrow="Industries"
        title="IT built around the work you do."
        text="Every industry has its own systems, risks, and requirements. Recon brings managed IT, cybersecurity, and practical planning to the organizations that keep Southeast Texas running."
      />

      <section className="section-shell">
        <div className="section-heading">
          <p className="eyebrow">Who we serve</p>
          <h2>Experience where it counts.</h2>
          <p>
            Whether you run a production line, a professional practice, a clinic, a nonprofit, or a public office, your
            technology plan should reflect how your organization actually works.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.path}
              to={industry.path}
              className="group flex flex-col rounded-[1.75rem] bg-white p-8 shadow-[0_10px_35px_rgba(17,19,18,.043)] transition-transform duration-300 hover:-translate-y-1 lg:p-10"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#111312] text-white">
                <Icon name={industry.icon} />
              </span>
              <h3 className="mt-9 font-display text-2xl tracking-tight">{industry.title}</h3>
              <p className="mt-4 leading-7 text-black/58">{industry.text}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold">
                Explore {industry.shortName}
                <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <DarkCtaPanel
        eyebrow="Don’t see your industry?"
        title="Tell us how your organization works."
        text="Recon supports organizations of many kinds across Southeast Texas. If your field isn’t listed, we’d still be glad to talk through your needs."
        linkLabel="Start a conversation"
      />

      <ClosingCta />
    </>
  );
}
