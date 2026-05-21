import { Bell, MousePointerClick, PanelTop, Rows3 } from "lucide-react";
import { OutcomeCard, PageShell, PremiumButton, ProductPreview, SectionHeader } from "@/components/site/PremiumSite";

const truths = [
  ["Real today", "Forms, lead capture, event tracking, protected admin routes."],
  ["Configurable", "Industry fields, CTA copy, service pages, source tracking."],
  ["Optional later", "SMS, calendar webhooks, review automation, deeper CRM export."],
];

export default function DemoPage() {
  return (
    <PageShell ctaHref="/#audit" ctaLabel="Request similar loop">
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pt-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Demo loop</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.86] tracking-[-0.085em] text-porcelain md:text-8xl">
            One screen to understand visitor action and owner follow-up.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-porcelain/62">
            The demo is intentionally simple: a visitor requests help, the owner gets context, and follow-up becomes
            visible before the lead goes cold.
          </p>
          <div className="mt-9">
            <PremiumButton href="/#audit" metadata={{ location: "demo_hero" }}>
              Request this for my business
            </PremiumButton>
          </div>
        </div>
        <ProductPreview compact />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="The customer journey"
          title="Visitor view on the left. Owner action on the right."
          text="This is the product narrative without a long explanation. The site creates trust, captures context, and gives the business a next step."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            [MousePointerClick, "Visitor lands", "A focused industry page explains the offer and makes the next action obvious."],
            [PanelTop, "Request submitted", "The form asks only for details needed for a useful callback."],
            [Bell, "Owner notified", "The lead summary surfaces need, source, urgency, and contact details."],
            [Rows3, "Follow-up visible", "Status, notes, and timeline stay in a small Lead Inbox view."],
          ].map(([Icon, title, text], index) => {
            const TypedIcon = Icon as typeof MousePointerClick;
            return (
              <article key={String(title)} className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-premium">
                <TypedIcon className="h-8 w-8 text-copper" />
                <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-copper">0{index + 1}</p>
                <h2 className="mt-3 font-display text-3xl leading-none tracking-[-0.055em] text-porcelain">{String(title)}</h2>
                <p className="mt-4 text-sm leading-7 text-porcelain/62">{String(text)}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {truths.map(([title, text], index) => (
            <OutcomeCard key={title} title={title} text={text} dark={index === 0} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
