import Link from "next/link";
import { industryPacks } from "@/lib/content";
import { OutcomeCard, PageShell, PremiumButton, SectionHeader } from "@/components/site/PremiumSite";

export default function IndustriesPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 lg:pt-24">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Industry systems</p>
        <h1 className="mt-6 max-w-5xl font-display text-6xl leading-[0.86] tracking-[-0.085em] text-porcelain md:text-8xl">
          Each industry needs a website that sells the way that business actually works.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-porcelain/62">
          We start with the workflow that gets paid: quote request, booking, consultation, intake, or review follow-up.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {industryPacks.map((pack, index) => (
            <article
              key={pack.slug}
              className={`rounded-[2.4rem] border p-6 shadow-premium ${
                index === 0 ? "border-white/10 bg-white/[0.08] text-porcelain" : "border-white/10 bg-white/[0.04] text-porcelain"
              }`}
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-copper">{pack.status}</p>
              <h2 className="mt-6 font-display text-4xl leading-[0.95] tracking-[-0.06em]">{pack.name}</h2>
              <p className="mt-5 text-sm leading-7 text-porcelain/62">{pack.audience}</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {pack.workflow.slice(0, 4).map((step) => (
                  <span key={step} className="rounded-full bg-white/[0.08] px-3 py-2 text-xs font-bold text-porcelain/68">
                    {step}
                  </span>
                ))}
              </div>
              {pack.slug === "hvac" ? (
                <Link
                  href="/industries/hvac"
                  className="mt-8 inline-flex rounded-full bg-copper px-5 py-3 text-sm font-black text-white"
                >
                  View HVAC sample
                </Link>
              ) : (
                <span className="mt-8 inline-flex rounded-full border border-white/10 px-5 py-3 text-sm font-black text-porcelain/50">
                  Planned sample
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="Reusable logic"
          title="The design changes. The operating loop stays simple."
          text="Every industry still needs trust, a clear next action, a short intake path, and a fast owner follow-up."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["Trust", "Proof that the business is real, local, responsive, and competent."],
            ["Action", "One primary CTA based on the way customers buy."],
            ["Intake", "A short form that matches the sales conversation."],
            ["Follow-up", "A lead summary owners can act on quickly."],
          ].map(([title, text], index) => (
            <OutcomeCard key={title} title={title} text={text} dark={index === 0} />
          ))}
        </div>
        <div className="mt-10">
          <PremiumButton href="/#audit" metadata={{ location: "industries_bottom" }}>
            Audit my industry page
          </PremiumButton>
        </div>
      </section>
    </PageShell>
  );
}
