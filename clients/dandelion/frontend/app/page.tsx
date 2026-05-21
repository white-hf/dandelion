import { ArrowRight, CalendarCheck } from "lucide-react";
import { AuditForm } from "@/components/AuditForm";
import {
  CheckList,
  Eyebrow,
  OutcomeCard,
  PageShell,
  PremiumButton,
  ProductPreview,
  ProofStrip,
  SectionHeader,
} from "@/components/site/PremiumSite";
import { TrackedLink } from "@/components/TrackedLink";

const proof = ["Premium first impression", "Quote-ready inquiry paths", "No heavy CRM to learn", "Built for mobile buyers"];

const outcomes = [
  ["Look premium", "A website that makes a local service business feel established, trustworthy, and worth contacting."],
  ["Get better inquiries", "Focused quote and booking paths reduce friction and collect the context owners need."],
  ["Follow up faster", "New leads surface with source, need, status, and next action before they go cold."],
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="absolute left-1/2 top-8 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-copper/20 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-24">
          <div className="relative z-10">
            <Eyebrow>Design is the proof</Eyebrow>
            <h1 className="mt-8 max-w-5xl font-display text-6xl leading-[0.86] tracking-[-0.085em] text-porcelain md:text-8xl">
              Premium websites for service businesses that cannot afford missed leads.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-porcelain/64 md:text-xl">
              Your customers judge your business before they call. We build the high-end website and the simple lead path
              behind it, so every serious inquiry has a next action.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PremiumButton href="#audit" metadata={{ location: "hero", label: "audit" }}>
                Get a Free Growth Audit
              </PremiumButton>
              <PremiumButton href="/demo" variant="secondary" metadata={{ location: "hero", label: "demo" }}>
                See the system
              </PremiumButton>
            </div>
            <div className="mt-9">
              <ProofStrip items={proof} />
            </div>
          </div>
          <ProductPreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <SectionHeader
          eyebrow="What you get"
          title="A better online front door. A cleaner path to revenue."
          text="We do not lead with software features. The offer is simple: make the business look premium, make contact easier, and make follow-up visible."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {outcomes.map(([title, text], index) => (
            <OutcomeCard key={title} title={title} text={text} dark={index === 0} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-6 rounded-[3rem] border border-white/10 bg-white/[0.06] p-5 shadow-premium backdrop-blur md:grid-cols-[0.95fr_1.05fr] md:p-8 lg:p-10">
          <div className="rounded-[2.4rem] bg-porcelain p-7 text-night md:p-9">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Customer outcome</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.07em] md:text-7xl">
              They should want your website before they read the pitch.
            </h2>
          </div>
          <div className="grid content-center gap-5">
            <CheckList
              dark
              items={[
                "A premium first impression that makes the business feel established.",
                "A short quote or booking path that matches how the owner sells.",
                "A Lead Inbox view that answers: who should I contact next?",
                "A monthly conversion snapshot without complex dashboards.",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Industry sample</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.9] tracking-[-0.07em] text-porcelain md:text-7xl">
              HVAC is the first proof that this can sell in a real category.
            </h2>
            <p className="mt-6 text-lg leading-8 text-porcelain/62">
              The HVAC page is not a feature demo. It is a premium industry website sample for repair, installation,
              maintenance, and emergency service requests.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PremiumButton href="/industries/hvac" metadata={{ location: "home_hvac" }}>
                View HVAC sample
              </PremiumButton>
              <PremiumButton href="/industries" variant="secondary" metadata={{ location: "home_industries" }}>
                See industries
              </PremiumButton>
            </div>
          </div>
          <div className="rounded-[3rem] border border-white/10 bg-white/[0.06] p-5 shadow-premium">
            <div className="rounded-[2.4rem] bg-gradient-to-br from-porcelain to-[#e9d7bd] p-6 text-night md:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">HVAC quote flow</p>
                  <h3 className="mt-14 max-w-md font-display text-5xl leading-[0.9] tracking-[-0.07em]">
                    Emergency repair request, ready for callback.
                  </h3>
                </div>
                <span className="rounded-full bg-night px-4 py-2 text-xs font-black text-porcelain">Today</span>
              </div>
              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {["Repair", "Home", "Call now"].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/70 p-4 text-sm font-black text-night/70">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="audit" className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <CalendarCheck className="h-10 w-10 text-copper" />
          <h2 className="mt-6 font-display text-5xl leading-[0.9] tracking-[-0.07em] text-porcelain md:text-7xl">
            Start with the website and follow-up audit.
          </h2>
          <p className="mt-6 text-lg leading-8 text-porcelain/62">
            We review the current site, lead path, first impression, form friction, and follow-up gap. If the fit is
            real, we recommend the smallest system that improves the business.
          </p>
          <TrackedLink
            href="/pricing"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-copper"
            metadata={{ location: "audit_side", label: "pricing" }}
          >
            See package direction <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
        <AuditForm />
      </section>
    </PageShell>
  );
}
