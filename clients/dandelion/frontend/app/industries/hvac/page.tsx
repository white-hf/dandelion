import { industryPacks } from "@/lib/content";
import { TrackedLink } from "@/components/TrackedLink";
import { HvacQuoteForm } from "@/components/HvacQuoteForm";

const hvac = industryPacks.find((pack) => pack.slug === "hvac")!;

export default function HvacPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <nav className="flex items-center justify-between py-4">
        <a href="/" className="font-display text-2xl font-bold text-ink">
          Dandelion
        </a>
        <TrackedLink href="/#audit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream">
          Build my quote loop
        </TrackedLink>
      </nav>

      <section className="grid gap-10 py-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">{hvac.status}</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink md:text-7xl">{hvac.name}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
            Built for service teams that need quote requests, source tracking, owner notifications, and a visible
            follow-up queue before they invest in heavy field-service software.
          </p>
        </div>
        <div className="rounded-[2.5rem] bg-ink p-6 text-cream shadow-soft">
          <p className="text-sm uppercase tracking-[0.25em] text-wheat">Primary CTA</p>
          <h2 className="mt-3 font-display text-4xl">{hvac.primaryCta}</h2>
          <p className="mt-4 text-cream/70">Every visitor action should become a lead, a source, a status, and a next step.</p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {hvac.painPoints.map((point) => (
          <div key={point} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
            <h2 className="font-display text-2xl text-ink">Pain</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{point}</p>
          </div>
        ))}
      </section>

      <section className="my-12 rounded-[2.5rem] bg-white/65 p-8 shadow-soft">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Workflow</p>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {hvac.workflow.map((step, index) => (
            <div key={step} className="rounded-[1.5rem] bg-cream p-4">
              <span className="text-xs font-bold text-ember">0{index + 1}</span>
              <h3 className="mt-2 font-display text-xl text-ink">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 pb-16 lg:grid-cols-[0.8fr_1.2fr]" id="quote-demo">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Real MVP path</p>
          <h2 className="mt-3 font-display text-4xl text-ink">This form writes to the same lead loop as the company site.</h2>
          <p className="mt-4 leading-7 text-ink/70">
            The fields are industry-specific, but the underlying system is reusable: lead capture, event tracking,
            notification log, admin queue, and dashboard.
          </p>
          <TrackedLink
            href="/admin"
            className="mt-6 inline-flex rounded-full border border-ink/20 bg-white/60 px-5 py-3 font-semibold text-ink"
            metadata={{ industry: "hvac", location: "hvac_page_admin" }}
          >
            View admin queue after submit
          </TrackedLink>
        </div>
        <HvacQuoteForm />
      </section>
    </main>
  );
}
