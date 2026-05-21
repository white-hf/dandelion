import { HvacQuoteForm } from "@/components/HvacQuoteForm";
import { OutcomeCard, PageShell, PremiumButton, ProductPreview, SectionHeader } from "@/components/site/PremiumSite";

const serviceTypes = [
  ["Repair", "Make urgent heating and cooling problems easy to describe and submit."],
  ["Installation", "Collect project type, timeline, property context, and contact details."],
  ["Maintenance", "Support seasonal tune-up and recurring service inquiries."],
  ["Emergency", "Prioritize fast callback, source tracking, and owner notification."],
];

export default function HvacPage() {
  return (
    <PageShell ctaHref="#quote" ctaLabel="Request quote demo">
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pt-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">HVAC website sample</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.86] tracking-[-0.085em] text-porcelain md:text-8xl">
            HVAC websites that turn service searches into quote-ready leads.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-porcelain/62">
            Built for repair, installation, maintenance, and emergency teams that need premium trust, clear quote paths,
            and faster follow-up without heavy field-service software.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PremiumButton href="#quote" metadata={{ location: "hvac_hero", label: "quote" }}>
              Request a Quote Demo
            </PremiumButton>
            <PremiumButton href="/demo" variant="secondary" metadata={{ location: "hvac_hero", label: "demo" }}>
              See owner view
            </PremiumButton>
          </div>
        </div>
        <ProductPreview compact />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="Service buying moments"
          title="The page is designed around how HVAC customers actually ask for help."
          text="A premium industry page should immediately communicate trust, service clarity, urgency, and the next step."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {serviceTypes.map(([title, text], index) => (
            <OutcomeCard key={title} title={title} text={text} dark={index === 3} />
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Quote request</p>
          <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.07em] text-porcelain md:text-7xl">
            Short enough to complete. Useful enough to call back.
          </h2>
          <p className="mt-6 text-lg leading-8 text-porcelain/62">
            The fields should collect only the service context needed for a fast, confident callback: type, urgency,
            property, contact, and a short description.
          </p>
        </div>
        <HvacQuoteForm />
      </section>
    </PageShell>
  );
}
