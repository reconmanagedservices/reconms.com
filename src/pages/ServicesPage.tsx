import { Icon, type IconName } from '../components/Icon';
import { ClosingCta, DarkCtaPanel, PageHero, ServiceGrid } from '../components/Sections';
import { Seo } from '../components/Seo';
import { pageMeta } from '../seo';

const pillars: [title: string, text: string, icon: IconName][] = [
  ['People', 'Clear support, thoughtful onboarding, and practical security guidance.', 'headset'],
  ['Systems', 'Consistent device, network, cloud, and vendor management.', 'network'],
  ['Protection', 'Layered safeguards for identities, endpoints, email, and data.', 'shield'],
  ['Direction', 'A prioritized roadmap connected to your goals and budget.', 'strategy'],
];

export default function ServicesPage() {
  return (
    <>
      <Seo meta={pageMeta.services} />
      <PageHero
        eyebrow="Services"
        title="Technology support built around your organization."
        text="Choose a complete managed partnership or add targeted expertise to your existing team. Either way, your technology plan starts with your real business needs."
      />

      <section className="section-shell">
        <h2 className="sr-only">Our services</h2>
        <ServiceGrid />
      </section>

      <section className="bg-white">
        <div className="section-shell grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">More than a help desk</p>
            <h2 className="mt-5 font-display text-4xl leading-[.98] tracking-[-.04em] sm:text-6xl">
              The full picture, handled.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-black/58">
              Reliable IT comes from managing the relationships between support, security, infrastructure, and
              planning—not treating each one as a separate problem.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map(([title, text, icon]) => (
              <div key={title} className="rounded-[1.75rem] bg-[#f4f4f1] p-7">
                <Icon name={icon} className="size-7" />
                <h3 className="mt-8 font-display text-2xl tracking-tight">{title}</h3>
                <p className="mt-3 leading-7 text-black/55">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DarkCtaPanel
        eyebrow="Not sure where to begin?"
        title="Start with what’s slowing your team down."
        linkLabel="Talk through your needs"
      />

      <ClosingCta />
    </>
  );
}
