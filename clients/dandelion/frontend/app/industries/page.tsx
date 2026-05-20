import Link from "next/link";
import { industryPacks } from "@/lib/content";
import { TrackedLink } from "@/components/TrackedLink";

export default function IndustriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <nav className="flex items-center justify-between py-4">
        <Link href="/" className="font-display text-2xl font-bold text-ink">
          Dandelion
        </Link>
        <TrackedLink href="/#audit" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-cream">
          Free audit
        </TrackedLink>
      </nav>

      <section className="py-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Industry systems</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-tight text-ink md:text-7xl">
          We package workflows around how each local business actually sells.
        </h1>
      </section>

      <section className="grid gap-5">
        {industryPacks.map((pack) => (
          <article key={pack.slug} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-ember">{pack.status}</p>
                <h2 className="mt-2 font-display text-4xl text-ink">{pack.name}</h2>
              </div>
              {pack.slug === "hvac" ? (
                <Link href="/industries/hvac" className="rounded-full bg-ember px-5 py-3 font-semibold text-white">
                  View HVAC pack
                </Link>
              ) : (
                <span className="rounded-full bg-cream px-5 py-3 font-semibold text-moss">Planned</span>
              )}
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-ink/70">{pack.audience}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {pack.workflow.map((step) => (
                <span key={step} className="rounded-full bg-cream px-3 py-2 text-sm font-semibold text-ink/70">
                  {step}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
