import { serviceModules } from "@/lib/content";
import { CheckList, OutcomeCard, PageShell, PremiumButton, ProductPreview, SectionHeader } from "@/components/site/PremiumSite";

const boundary = ["Own: premium website, quote forms, Lead Inbox Lite", "Integrate: email, calendar, analytics, CRM export", "Avoid: dispatching, payroll, inventory, complex SaaS replacement"];

export default function ServicesPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:pt-24">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Services</p>
          <h1 className="mt-6 font-display text-6xl leading-[0.86] tracking-[-0.085em] text-porcelain md:text-8xl">
            We sell the business outcome, not a pile of website features.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-porcelain/62">
            The customer gets a premium online presence and a simple way to capture, understand, and follow up with leads.
            The reusable technology stays behind the scenes.
          </p>
          <div className="mt-9">
            <PremiumButton href="/#audit" metadata={{ location: "services_hero" }}>
              Request an audit
            </PremiumButton>
          </div>
        </div>
        <ProductPreview compact />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="What is included"
          title="Six practical pieces. One premium customer experience."
          text="Each service is framed around what a local business owner can see and use, not what a software buyer would configure."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceModules.map((module, index) => (
            <OutcomeCard key={module.name} title={module.name} text={module.description} dark={index === 0} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 rounded-[3rem] border border-white/10 bg-white/[0.06] p-6 shadow-premium md:grid-cols-[0.95fr_1.05fr] md:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Boundary</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.07em] text-porcelain md:text-7xl">
              Lighter than SaaS because the customer should not have to learn a system.
            </h2>
          </div>
          <CheckList dark items={boundary} />
        </div>
      </section>
    </PageShell>
  );
}
