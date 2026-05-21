import { pricing } from "@/lib/content";
import { CheckList, PageShell, PremiumButton, SectionHeader } from "@/components/site/PremiumSite";

export default function PricingPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 lg:pt-24">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Pricing</p>
        <h1 className="mt-6 max-w-5xl font-display text-6xl leading-[0.86] tracking-[-0.085em] text-porcelain md:text-8xl">
          Start with the website. Add the loop that pays for itself.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-porcelain/62">
          Pricing is framed like a professional service package, not a SaaS feature comparison. The audit determines the
          smallest scope that can improve the business.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-5 lg:grid-cols-3">
          {pricing.map((plan, index) => (
            <article
              key={plan.name}
              className={`rounded-[2.5rem] border p-6 shadow-premium md:p-8 ${
                index === 1 ? "border-copper/30 bg-copper text-white" : "border-white/10 bg-white/[0.06] text-porcelain"
              }`}
            >
              <p className={`text-xs font-black uppercase tracking-[0.24em] ${index === 1 ? "text-white/70" : "text-copper"}`}>
                {index === 1 ? "Recommended" : "Package"}
              </p>
              <h2 className="mt-6 font-display text-5xl leading-none tracking-[-0.07em]">{plan.name}</h2>
              <p className={`mt-4 text-lg font-black ${index === 1 ? "text-white" : "text-copper"}`}>{plan.price}</p>
              <p className={`mt-5 text-sm leading-7 ${index === 1 ? "text-white/72" : "text-porcelain/62"}`}>{plan.fit}</p>
              <div className="mt-7">
                <CheckList items={plan.includes} dark={index !== 1} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="Recommended next step"
          title="Do not choose a package before diagnosing the leak."
          text="The audit decides whether the client needs a better first impression, a shorter quote path, a booking flow, or a simple follow-up inbox."
        />
        <div className="mt-10">
          <PremiumButton href="/#audit" metadata={{ location: "pricing_bottom" }}>
            Request a Free Growth Audit
          </PremiumButton>
        </div>
      </section>
    </PageShell>
  );
}
