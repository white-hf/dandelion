import Link from "next/link";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";

export function SiteHeader({ ctaHref = "/#audit", ctaLabel = "Free audit" }: { ctaHref?: string; ctaLabel?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07100d]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="group">
          <p className="font-display text-2xl font-semibold tracking-[-0.06em] text-porcelain md:text-3xl">Dandelion</p>
          <p className="text-[0.62rem] font-black uppercase tracking-[0.32em] text-copper/80">Growth Systems</p>
        </Link>
        <div className="hidden items-center gap-7 text-sm font-semibold text-porcelain/62 md:flex">
          <Link className="transition hover:text-porcelain" href="/services">
            Services
          </Link>
          <Link className="transition hover:text-porcelain" href="/industries">
            Industries
          </Link>
          <Link className="transition hover:text-porcelain" href="/demo">
            Demo
          </Link>
          <Link className="transition hover:text-porcelain" href="/pricing">
            Pricing
          </Link>
        </div>
        <TrackedLink
          href={ctaHref}
          className="rounded-full bg-porcelain px-4 py-2.5 text-sm font-bold text-night shadow-premium transition hover:bg-copper hover:text-white md:px-5"
          metadata={{ location: "nav", label: ctaLabel }}
        >
          {ctaLabel}
        </TrackedLink>
      </nav>
    </header>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-copper/20 bg-white/[0.06] px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-copper">
      <span className="h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_24px_rgba(218,130,78,0.9)]" />
      {children}
    </div>
  );
}

export function PremiumButton({
  href,
  children,
  variant = "primary",
  metadata,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  metadata?: Record<string, unknown>;
}) {
  const classes = {
    primary:
      "bg-copper text-white shadow-[0_24px_70px_rgba(218,130,78,0.28)] hover:bg-[#b86335]",
    secondary: "border border-white/14 bg-white/[0.06] text-porcelain hover:bg-white/[0.12]",
    light: "border border-night/10 bg-white/70 text-night hover:bg-white",
  };

  return (
    <TrackedLink
      href={href}
      metadata={metadata}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black transition ${classes[variant]}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </TrackedLink>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  dark = true,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[0.92fr_1fr] md:items-end">
      <div>
        <p className={`text-xs font-black uppercase tracking-[0.24em] ${dark ? "text-copper" : "text-copper"}`}>{eyebrow}</p>
        <h2 className={`mt-4 font-display text-4xl leading-[0.95] tracking-[-0.065em] md:text-6xl ${dark ? "text-porcelain" : "text-night"}`}>
          {title}
        </h2>
      </div>
      {text ? <p className={`text-base leading-8 md:text-lg ${dark ? "text-porcelain/62" : "text-night/62"}`}>{text}</p> : null}
    </div>
  );
}

export function ProductPreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[3rem] bg-copper/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.07] p-3 shadow-premium backdrop-blur-2xl">
        <div className="rounded-[2rem] border border-white/10 bg-night p-4 text-porcelain">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-copper">Website system</p>
              <p className="mt-1 font-display text-2xl tracking-[-0.05em]">Lead-ready front door</p>
            </div>
            <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-bold text-mint">Live</span>
          </div>
          <div className={`grid gap-3 pt-4 ${compact ? "" : "md:grid-cols-[1.1fr_0.9fr]"}`}>
            <div className="rounded-[1.5rem] bg-porcelain p-4 text-night">
              <div className="rounded-[1.2rem] bg-gradient-to-br from-night via-[#173127] to-[#2c533f] p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-copper">HVAC sample</p>
                <h3 className="mt-12 font-display text-4xl leading-[0.92] tracking-[-0.06em]">Need service today?</h3>
                <div className="mt-5 rounded-full bg-copper px-4 py-3 text-center text-sm font-black">Request quote</div>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                ["New lead", "Emergency repair", "2 min"],
                ["Source", "Google search", "tracked"],
                ["Next action", "Call before 3 PM", "today"],
              ].map(([title, detail, badge]) => (
                <div key={title} className="rounded-[1.25rem] border border-white/10 bg-white/[0.08] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <strong>{title}</strong>
                    <span className="rounded-full bg-copper px-2.5 py-1 text-[0.68rem] font-black text-white">{badge}</span>
                  </div>
                  <p className="mt-1 text-sm text-porcelain/58">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProofStrip({ items }: { items: string[] }) {
  return (
    <div className="grid overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.06] md:grid-cols-4">
      {items.map((item) => (
        <div key={item} className="border-white/10 px-4 py-4 text-sm font-bold text-porcelain/68 md:border-r md:last:border-r-0">
          {item}
        </div>
      ))}
    </div>
  );
}

export function OutcomeCard({ title, text, dark = false }: { title: string; text: string; dark?: boolean }) {
  return (
    <article
      className={`rounded-[2rem] border p-6 ${
        dark
          ? "border-white/10 bg-white/[0.07] text-porcelain shadow-premium"
          : "border-night/10 bg-white/70 text-night shadow-premium"
      }`}
    >
      <div className={`mb-10 h-1.5 w-12 rounded-full ${dark ? "bg-copper" : "bg-copper"}`} />
      <h3 className="font-display text-3xl leading-none tracking-[-0.055em]">{title}</h3>
      <p className={`mt-4 text-sm leading-7 ${dark ? "text-porcelain/62" : "text-night/62"}`}>{text}</p>
    </article>
  );
}

export function CheckList({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 rounded-2xl p-4 text-sm font-semibold ${
            dark ? "bg-white/[0.08] text-porcelain/72" : "bg-white/70 text-night/72"
          }`}
        >
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PageShell({ children, ctaHref, ctaLabel }: { children: React.ReactNode; ctaHref?: string; ctaLabel?: string }) {
  return (
    <main className="min-h-screen bg-night text-porcelain">
      <SiteHeader ctaHref={ctaHref} ctaLabel={ctaLabel} />
      {children}
      <TrackedLink
        href={ctaHref ?? "/#audit"}
        className="fixed bottom-4 left-4 right-4 z-50 inline-flex items-center justify-center gap-2 rounded-full bg-copper px-5 py-4 text-sm font-black text-white shadow-[0_24px_70px_rgba(218,130,78,0.35)] md:hidden"
        metadata={{ location: "mobile_sticky", label: ctaLabel ?? "Free audit" }}
      >
        {ctaLabel ?? "Get a Free Growth Audit"}
        <ChevronRight className="h-4 w-4" />
      </TrackedLink>
    </main>
  );
}
