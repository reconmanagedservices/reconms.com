import { Link } from 'react-router';
import { Icon, type IconName } from '../components/Icon';
import { ClosingCta, PageHero } from '../components/Sections';
import { Seo } from '../components/Seo';
import { pageMeta } from '../seo';

const principles: [title: string, text: string, icon: IconName][] = [
  [
    'Listen closely',
    'We ask questions, learn your environment, and avoid one-size-fits-all recommendations.',
    'headset',
  ],
  ['Act proactively', 'We improve and protect your technology before small issues become business problems.', 'shield'],
  ['Plan with purpose', 'We connect technology priorities to your goals, timeline, and budget.', 'strategy'],
];

export default function AboutPage() {
  return (
    <>
      <Seo meta={pageMeta.about} />
      <PageHero
        eyebrow="Why Recon"
        title="Local perspective. Practical technology."
        text="Recon Managed Services helps organizations across Southeast Texas replace technology frustration with clear support, stronger security, and a plan they can trust."
      />

      <section className="section-shell grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <div>
          <p className="eyebrow">Our approach</p>
          <h2 className="mt-5 font-display text-4xl leading-[.98] tracking-[-.04em] sm:text-6xl">
            We understand your mission first.
          </h2>
        </div>
        <div className="space-y-7 text-lg leading-8 text-black/60">
          <p>
            No two organizations work exactly alike. The right technology plan starts with understanding your goals,
            processes, team, and the pressures unique to your work.
          </p>
          <p>
            That is why Recon does more than recommend products. We bring your support, security, infrastructure, and
            planning into one practical strategy designed around the way your organization actually operates.
          </p>
          <p>
            The result is technology that feels less complicated, decisions that feel more informed, and a team that
            can spend more time moving the mission forward.
          </p>
        </div>
      </section>

      <section className="bg-[#dfe0dc] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-[1344px]">
          <div className="section-heading">
            <p className="eyebrow">What guides us</p>
            <h2>Better technology starts with a better partnership.</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {principles.map(([title, text, icon]) => (
              <article key={title} className="rounded-[1.75rem] bg-white p-8 lg:p-10">
                <span className="grid size-12 place-items-center rounded-2xl bg-[#111312] text-white">
                  <Icon name={icon} />
                </span>
                <h3 className="mt-9 font-display text-3xl tracking-tight">{title}</h3>
                <p className="mt-4 leading-7 text-black/55">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="rounded-[2.5rem] bg-[#111312] p-8 text-white sm:p-12">
            <p className="eyebrow text-white/45">Based in Beaumont</p>
            <h2 className="mt-7 font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
              Close enough to know the landscape.
            </h2>
            <p className="mt-7 max-w-lg leading-8 text-white/55">
              Our Southeast Texas roots shape how we work: responsive, direct, and invested in the organizations that
              make this region stronger.
            </p>
            <p className="mt-5 max-w-lg leading-8 text-white/55">
              From Beaumont, we serve organizations across Jefferson, Hardin, and Orange Counties, including Port Arthur,
              Nederland, Orange, Lumberton, Vidor, and Silsbee.{' '}
              <Link to="/contact/#service-area" className="font-semibold text-white underline-offset-4 hover:underline">
                See our full service area
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">A clearer next step</p>
            <h2 className="mt-5 font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
              Let’s talk about where technology is getting in the way.
            </h2>
            <Link to="/contact/" className="button button-dark mt-9 self-start">
              Meet with Recon <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
