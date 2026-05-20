import { serviceModules } from "@/lib/content";
import { TrackedLink } from "@/components/TrackedLink";

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <Header />
      <section className="py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Services</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-ink md:text-7xl">
          A website, plus the operating loop behind it.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">
          We build the front door, the capture path, the owner notification, and the dashboard that makes follow-up visible.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {serviceModules.map((module) => (
          <article key={module.name} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
            <h2 className="font-display text-3xl text-ink">{module.name}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{module.description}</p>
          </article>
        ))}
      </section>

      <section className="my-12 rounded-[2.5rem] bg-ink p-8 text-cream">
        <h2 className="font-display text-4xl">The boundary is deliberate.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-cream/75">
          We do not rebuild dispatching, payroll, EMR, legal case management, or full CRM suites. We own the lightweight
          growth loop and integrate when a mature SaaS already does the deep workflow better.
        </p>
      </section>
    </main>
  );
}

function Header() {
  return (
    <nav className="flex items-center justify-between py-4">
      <a href="/" className="font-display text-2xl font-bold text-ink">
        Dandelion
      </a>
      <TrackedLink href="/#audit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream">
        Free audit
      </TrackedLink>
    </nav>
  );
}
