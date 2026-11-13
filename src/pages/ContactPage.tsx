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
          <address className="mt-10 border-t border-white/12 pt-7 leading-7 text-white/52 not-italic">
            {site.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
          <a href={site.customerPortal} className="mt-10 inline-flex items-center gap-2 text-sm font-semibold">
            Existing customer portal <Icon name="arrow" className="size-4" />
          </a>
        </aside>
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
