import { ArrowRight, BarChart3, CalendarCheck, ClipboardList, MailCheck, ShieldCheck, Sparkles } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import { TrackedLink } from "@/components/TrackedLink";
import { industryPacks, pricing } from "@/lib/content";

const loop = [
  ["1", "Visitor lands", "A focused page explains the offer and removes objections."],
  ["2", "Lead is captured", "Audit, quote, booking, or intake forms collect only useful fields."],
  ["3", "Owner is notified", "The business gets a clear next action instead of another buried email."],
  ["4", "Follow-up is tracked", "Status, notes, source, and events stay visible in a small dashboard."],
];

export default function HomePage() {
  return (
    <main>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6">
        <div>
          <p className="font-display text-2xl font-bold text-ink">Dandelion</p>
          <p className="text-xs uppercase tracking-[0.28em] text-moss">Growth Systems</p>
        </div>
        <div className="hidden items-center gap-6 text-sm font-semibold text-ink/70 md:flex">
          <a href="/services">Services</a>
          <a href="/industries">Industries</a>
          <a href="/pricing">Pricing</a>
          <TrackedLink href="/demo" metadata={{ location: "nav" }}>
            Demo
          </TrackedLink>
        </div>
        <TrackedLink
          href="#audit"
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream shadow-soft"
          metadata={{ location: "nav" }}
        >
          Free audit
        </TrackedLink>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-moss/20 bg-white/50 px-4 py-2 text-sm font-semibold text-moss">
            <Sparkles className="h-4 w-4 text-ember" />
            More practical than a template. Lighter than enterprise software.
          </div>
          <h1 className="mt-7 max-w-4xl font-display text-5xl leading-[0.95] text-ink md:text-7xl">
            Websites, booking, quotes, reviews, and follow-up systems for local service businesses.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/75">
            We help North American SMBs turn website visitors and ad traffic into tracked leads, booked consultations,
            quote requests, reviews, and repeatable follow-up workflows.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="#audit"
              className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-4 font-semibold text-white shadow-soft"
              metadata={{ location: "hero", label: "audit" }}
            >
              Get a Free Growth Audit <ArrowRight className="ml-2 h-5 w-5" />
            </TrackedLink>
            <TrackedLink
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-ink/20 bg-white/50 px-6 py-4 font-semibold text-ink"
              metadata={{ location: "hero", label: "demo" }}
            >
              See the Demo
            </TrackedLink>
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/70 bg-white/55 p-4 shadow-soft backdrop-blur">
          <div className="rounded-[2rem] bg-ink p-5 text-cream">
            <p className="text-sm uppercase tracking-[0.25em] text-wheat">Live loop preview</p>
            <div className="mt-6 grid gap-3">
              {[
                ["Audit request", "New lead from Google Ads", "2 min ago"],
                ["Notification", "Owner receives next action", "mock sent"],
                ["Dashboard", "Source, status, CTA events visible", "ready"],
              ].map(([title, text, badge]) => (
                <div key={title} className="rounded-3xl bg-cream/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-2xl">{title}</h2>
                    <span className="rounded-full bg-ember px-3 py-1 text-xs font-semibold">{badge}</span>
                  </div>
                  <p className="mt-2 text-sm text-cream/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="loop" className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">The business loop</p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">A website is only useful if it creates a next action.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {loop.map(([number, title, text]) => (
              <div key={title} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-moss font-bold text-cream">
                  {number}
                </span>
                <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Industry packs</p>
            <h2 className="mt-3 font-display text-4xl text-ink">Start with the workflow that gets paid.</h2>
          </div>
          <TrackedLink href="/demo" className="hidden rounded-full bg-ink px-5 py-3 font-semibold text-cream md:inline-flex">
            View demo
          </TrackedLink>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {industryPacks.map((industry) => (
            <article key={industry.name} className="rounded-[2rem] border border-moss/10 bg-white/60 p-6 shadow-soft">
              <h3 className="font-display text-2xl text-ink">{industry.name}</h3>
              <p className="mt-3 text-sm leading-6 text-ink/70">{industry.workflow.join(" + ")}.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            [ClipboardList, "Lead capture", "Forms that match the sales conversation."],
            [MailCheck, "Notifications", "New leads surface with a clear next step."],
            [BarChart3, "Dashboard", "Source, CTA, status, and conversion visibility."],
            [ShieldCheck, "Privacy-aware", "Minimal data, explicit consent, practical controls."],
          ].map(([Icon, title, text]) => {
            const TypedIcon = Icon as typeof ClipboardList;
            return (
              <div key={String(title)} className="rounded-[2rem] bg-ink p-6 text-cream">
                <TypedIcon className="h-8 w-8 text-wheat" />
                <h3 className="mt-5 font-display text-2xl">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/70">{String(text)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-5 py-16">
        <div className="rounded-[2.5rem] bg-white/65 p-6 shadow-soft md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Pricing snapshot</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {pricing.map((plan) => (
              <div key={plan.name} className="rounded-[2rem] bg-cream p-6">
                <h3 className="font-display text-3xl text-ink">{plan.name}</h3>
                <p className="mt-2 font-semibold text-ember">{plan.price}</p>
                <p className="mt-3 text-sm leading-6 text-ink/70">{plan.fit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="mx-auto grid max-w-7xl gap-8 px-5 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <CalendarCheck className="h-10 w-10 text-ember" />
          <h2 className="mt-5 font-display text-5xl text-ink">Request the first audit.</h2>
          <p className="mt-4 text-lg leading-8 text-ink/70">
            We will inspect your current website, lead path, follow-up gap, and whether a lightweight system is a fit.
            No generic redesign pitch.
          </p>
        </div>
        <AuditForm />
      </section>
    </main>
  );
}
