import { useState } from 'react';
import { Link } from 'react-router';
import { Icon, type IconName } from '../components/Icon';
import { ClosingCta, ProductGrid, ServiceGrid } from '../components/Sections';
import { Seo } from '../components/Seo';
import { pageMeta } from '../seo';

const values = [
  {
    title: 'Proactive',
    text: 'We improve and protect your technology before small issues become business problems.',
    position: 'value-orb-top',
  },
  {
    title: 'Human',
    text: 'Clear communication and responsive experts keep technology from feeling complicated.',
    position: 'value-orb-right',
  },
  {
    title: 'Purposeful',
    text: 'Every recommendation connects to your real goals, priorities, and budget.',
    position: 'value-orb-bottom',
  },
  {
    title: 'Local',
    text: 'Southeast Texas perspective shapes a partnership that is direct, practical, and invested.',
    position: 'value-orb-left',
  },
];

const statusTiles: [label: string, status: string, icon: IconName][] = [
  ['Devices', 'Protected', 'shield'],
  ['Backups', 'Verified', 'cloud'],
  ['Network', 'Monitored', 'network'],
  ['Support', 'Ready to help', 'headset'],
];

function MissionGraphic() {
  const [active, setActive] = useState(values[0]);

  return (
    <div className="mission-graphic">
      <div className="mission-orbit grid size-[250px] place-items-center rounded-full border border-white/15">
        <div className="grid size-[160px] place-items-center rounded-full border border-white/25 bg-white/[.04]">
          <div className="grid size-20 place-items-center rounded-full bg-white text-black shadow-[0_14px_45px_rgba(255,255,255,.15)]">
            <img src="/assets/recon-social-icon.png" alt="Recon" width={180} height={177} loading="lazy" decoding="async" className="size-14 object-contain" />
          </div>
        </div>
        <div className="value-orbit-track">
          {values.map((value) => (
            <button
              key={value.title}
              type="button"
              className={`value-orb ${value.position} ${active.title === value.title ? 'is-active' : ''}`}
              aria-label={`Show the ${value.title} value`}
              aria-pressed={active.title === value.title}
              onMouseEnter={() => setActive(value)}
              onFocus={() => setActive(value)}
              onClick={() => setActive(value)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
      <div className="value-detail" aria-live="polite">
        <p>{active.title}</p>
        <span>{active.text}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Seo meta={pageMeta.home} />

      <section className="hero-grid relative overflow-hidden bg-[#101211] text-white">
        <div className="mx-auto grid min-h-[720px] max-w-[1440px] lg:grid-cols-[1.08fr_.92fr]">
          <div className="relative z-10 flex flex-col justify-center px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <p className="eyebrow text-white/60">Beaumont, Texas · Serving Southeast Texas</p>
            <h1 className="mt-7 max-w-[780px] font-display text-[clamp(3.3rem,7vw,6.9rem)] leading-[.87] tracking-[-.065em]">
              IT that works.
              <br />
              <span className="text-white/38">So you can.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/67 sm:text-xl">
              Proactive managed IT, cybersecurity, and responsive support that keep your organization secure,
              productive, and ready for what’s next.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact/" className="button button-light">
                Get your IT assessment <Icon name="arrow" className="size-4" />
              </Link>
              <Link to="/services/" className="button button-ghost">
                Explore services
              </Link>
            </div>
            <div className="mt-14 grid max-w-2xl gap-5 border-t border-white/15 pt-6 sm:grid-cols-3">
              {['Responsive expert support', 'Local, experienced team', 'Built around your goals'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-white/75">
                  <span className="grid size-5 place-items-center rounded-full bg-white text-black">
                    <Icon name="check" className="size-3" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            className="relative min-h-[520px] border-t border-white/10 lg:border-l lg:border-t-0"
            role="img"
            aria-label="Illustration of a monitored IT environment: devices protected, backups verified, network monitored, support ready to help."
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgba(255,255,255,.13),transparent_32%)]" />
            <div className="absolute top-[11%] right-[8%] bottom-[9%] left-[8%]">
              <div className="absolute inset-0 rotate-[5deg] rounded-[2rem] bg-white/[.04]" />
              <div className="relative flex h-full flex-col rounded-[2rem] border border-white/15 bg-[#171918]/90 p-5 shadow-2xl backdrop-blur sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[10px] font-bold tracking-[.24em] text-white/40 uppercase">Recon Operations</p>
                    <p className="mt-1.5 font-display text-xl tracking-tight">Your environment</p>
                  </div>
                  <span className="flex items-center gap-2 text-xs text-white/60">
                    <span className="signal-dot" /> Systems monitored
                  </span>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3 py-5">
                  {statusTiles.map(([label, status, icon], index) => (
                    <div
                      key={label}
                      className={`flex flex-col justify-between rounded-2xl p-4 sm:p-5 ${index === 0 ? 'bg-white text-black' : 'bg-white/[.055]'}`}
                    >
                      <Icon name={icon} className={`size-6 ${index === 0 ? 'text-black' : 'text-white/50'}`} />
                      <div>
                        <p className={`text-xs ${index === 0 ? 'text-black/50' : 'text-white/40'}`}>{label}</p>
                        <p className="mt-1 font-display text-lg tracking-tight">{status}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="border-t border-white/10 pt-5 text-xs text-white/45">Technology should move you forward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="section-heading">
            <p className="eyebrow">What we do</p>
            <h2>One partner for your technology environment.</h2>
          </div>
          <Link to="/services/" className="text-link">
            View all services <Icon name="arrow" className="size-4" />
          </Link>
        </div>
        <div className="mt-14">
          <ServiceGrid compact />
        </div>
      </section>

      <section className="bg-[#dfe0dc] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1344px] overflow-hidden rounded-[2.5rem] bg-[#e9eae6] shadow-[0_24px_80px_rgba(0,0,0,.08)] lg:grid-cols-2">
          <div className="relative min-h-[480px] overflow-hidden bg-[#151716] p-8 text-white lg:rounded-r-[2.5rem] lg:p-12">
            <div className="grid-lines absolute inset-0 opacity-40" />
            <div className="relative flex h-full flex-col justify-between">
              <p className="eyebrow text-white/50">The Recon difference</p>
              <div className="my-10 grid place-items-center">
                <MissionGraphic />
              </div>
              <p className="font-display text-2xl text-white/80">Technology aligned to your mission.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center px-7 py-16 sm:px-10 lg:px-16">
            <p className="eyebrow">Why Recon</p>
            <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,4.8rem)] leading-[.94] tracking-[-.05em]">
              Expect better from your technology.
            </h2>
            <p className="mt-7 text-lg leading-8 text-black/65">
              We learn how your organization works, then build a practical technology plan around your mission,
              people, and goals.
            </p>
            <Link to="/about/" className="button button-dark mt-9 self-start">
              Why organizations choose Recon <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="section-heading">
            <p className="eyebrow">Business technology products</p>
            <h2>Equipment selected to work together.</h2>
            <p>
              From computers and servers to physical security and communications, Recon helps you choose, install,
              and support the right technology.
            </p>
          </div>
          <Link to="/products/" className="text-link">
            Explore products <Icon name="arrow" className="size-4" />
          </Link>
        </div>
        <div className="mt-14">
          <ProductGrid compact />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
