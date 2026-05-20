import { ArrowRight, Bell, ClipboardCheck, LayoutDashboard, MousePointerClick } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";

const stages = [
  {
    icon: MousePointerClick,
    label: "Visitor view",
    title: "A homeowner lands on an HVAC quote page.",
    detail: "The page focuses on emergency repair, replacement estimate, service area, and proof signals.",
    state: "Real pattern",
  },
  {
    icon: ClipboardCheck,
    label: "Submission",
    title: "The visitor requests a quote.",
    detail: "The form captures job type, urgency, location, contact info, and source without overwhelming the visitor.",
    state: "Real in MVP",
  },
  {
    icon: Bell,
    label: "Owner action",
    title: "The owner receives a concise next action.",
    detail: "Notification includes lead summary, source, current problem, and admin link. MVP uses a durable mock log.",
    state: "Mock sent",
  },
  {
    icon: LayoutDashboard,
    label: "Follow-up",
    title: "The lead appears in the admin dashboard.",
    detail: "Status, source, notes, and events make follow-up visible. Review request automation is shown as V1.",
    state: "Real in MVP",
  },
];

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <nav className="flex items-center justify-between py-4">
        <TrackedLink href="/" className="font-display text-2xl font-bold text-ink">
          Dandelion
        </TrackedLink>
        <TrackedLink href="/admin" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream">
          Admin preview
        </TrackedLink>
      </nav>

      <section className="py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Demo loop</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-ink md:text-7xl">
          A lightweight operating loop for a local service business.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
          This demo shows what we build before it becomes heavy SaaS: capture the lead, notify the owner, track the
          follow-up, and review performance.
        </p>
      </section>

      <section className="grid gap-5">
        {stages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <article key={stage.title} className="grid gap-5 rounded-[2rem] bg-white/65 p-6 shadow-soft md:grid-cols-[12rem_1fr_auto] md:items-center">
              <div>
                <span className="text-sm font-bold text-ember">Step {index + 1}</span>
                <div className="mt-4 flex items-center gap-3">
                  <Icon className="h-7 w-7 text-moss" />
                  <span className="font-semibold text-ink">{stage.label}</span>
                </div>
              </div>
              <div>
                <h2 className="font-display text-3xl text-ink">{stage.title}</h2>
                <p className="mt-2 text-sm leading-6 text-ink/70">{stage.detail}</p>
              </div>
              <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-moss">{stage.state}</span>
            </article>
          );
        })}
      </section>

      <section className="my-12 rounded-[2.5rem] bg-ink p-8 text-cream md:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-wheat">What is intentionally not here</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {["Dispatching", "Payroll and inventory", "Complex workflow builder"].map((item) => (
            <div key={item} className="rounded-[2rem] bg-cream/10 p-5">
              <h3 className="font-display text-2xl">{item}</h3>
              <p className="mt-2 text-sm text-cream/70">
                Mature SaaS handles this better. We focus on the front-end growth loop first.
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="pb-16">
        <TrackedLink
          href="/#audit"
          className="inline-flex items-center rounded-full bg-ember px-6 py-4 font-semibold text-white shadow-soft"
          metadata={{ location: "demo_bottom" }}
        >
          Request a similar loop <ArrowRight className="ml-2 h-5 w-5" />
        </TrackedLink>
      </div>
    </main>
  );
}
