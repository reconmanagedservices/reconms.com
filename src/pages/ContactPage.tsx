import { ContactForm } from '../components/ContactForm';
import { Icon } from '../components/Icon';
import { FaqList, PageHero } from '../components/Sections';
import { Seo } from '../components/Seo';
import { site } from '../content';
import { pageMeta } from '../seo';

export default function ContactPage() {
  return (
    <>
      <Seo meta={pageMeta.contact} />
      <PageHero
        eyebrow="Contact"
        title="Let’s make IT feel simple again."
        text="Tell us what is working, what is not, and where you want to go. We will help you find a practical next step without the pressure."
      />

      <section className="section-shell grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
        <div className="rounded-[2.5rem] bg-white p-7 sm:p-10 lg:p-12">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
            What can we help you solve?
          </h2>
          <p className="mt-6 max-w-xl leading-8 text-black/58">
            Share a little about your organization, recurring technology issues, or an upcoming project. Our team will
            follow up to learn more.
          </p>
          <p className="mt-4 max-w-xl leading-7 text-black/62">
            Prefer to pick a time?{' '}
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#111312] underline underline-offset-4"
            >
              Book a discovery call
            </a>
            .
          </p>
          <ContactForm />
        </div>

        <aside className="rounded-[2.5rem] bg-[#111312] p-7 text-white sm:p-10 lg:p-12">
          <p className="eyebrow text-white/45">Contact Recon</p>
          <a href={site.phoneHref} className="mt-10 block font-display text-3xl tracking-tight sm:text-4xl">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="mt-3 block text-lg text-white/65">
            {site.email}
          </a>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-light mt-8"
          >
            <Icon name="calendar" className="size-4" /> Book a discovery call
          </a>
          <address className="mt-10 border-t border-white/12 pt-7 leading-7 text-white/52 not-italic">
            {site.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <a
            href={site.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white"
          >
            Get directions <Icon name="arrow" className="size-3.5" />
          </a>
          <div className="mt-8 leading-7">
            <p className="text-xs font-bold tracking-[.18em] text-white/45 uppercase">Office hours</p>
            <p className="mt-2 text-white/75">{site.hours.label}</p>
          </div>
          <a href={site.customerPortal} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
            Existing customer portal <Icon name="arrow" className="size-4" />
          </a>
        </aside>
      </section>

      <section id="service-area" className="section-shell scroll-mt-24 !pt-0">
        <div className="rounded-[2.5rem] bg-[#dfe0dc] p-7 sm:p-10 lg:grid lg:grid-cols-[.8fr_1.2fr] lg:gap-16 lg:p-12">
          <div>
            <p className="eyebrow">Areas we serve</p>
            <h2 className="mt-5 font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
              Serving Southeast Texas.
            </h2>
            <p className="mt-6 max-w-md leading-7 text-black/62">
              Recon supports organizations throughout {site.serviceArea.counties.slice(0, -1).join(', ')}, and{' '}
              {site.serviceArea.counties.at(-1)}, including these communities.
            </p>
          </div>
          <ul className="mt-8 flex flex-wrap content-start gap-2.5 lg:mt-0" aria-label="Communities we serve">
            {site.serviceArea.cities.map((city) => (
              <li key={city} className="rounded-full bg-white px-4 py-2 text-sm font-semibold">
                {city}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white">
        <div className="section-shell grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Before we talk</p>
            <h2 className="mt-5 font-display text-4xl leading-none tracking-[-.04em] sm:text-5xl">
              Common questions, answered.
            </h2>
          </div>
          <FaqList />
        </div>
      </section>
    </>
  );
}
