import { pricing } from "@/lib/content";
import { TrackedLink } from "@/components/TrackedLink";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <nav className="flex items-center justify-between py-4">
        <a href="/" className="font-display text-2xl font-bold text-ink">
          Dandelion
        </a>
        <TrackedLink href="/#audit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream">
          Free audit
        </TrackedLink>
      </nav>

      <section className="py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Pricing</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-ink md:text-7xl">
          Priced around operating value, not page count.
        </h1>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {pricing.map((plan) => (
          <article key={plan.name} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
            <h2 className="font-display text-4xl text-ink">{plan.name}</h2>
            <p className="mt-3 font-semibold text-ember">{plan.price}</p>
            <p className="mt-4 text-sm leading-6 text-ink/70">{plan.fit}</p>
            <ul className="mt-5 grid gap-2 text-sm text-ink/75">
              {plan.includes.map((item) => (
                <li key={item} className="rounded-2xl bg-cream px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
