export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <a href="/" className="font-display text-2xl font-bold text-ink">
        Dandelion
      </a>
      <h1 className="mt-10 font-display text-5xl text-ink">Privacy notice</h1>
      <p className="mt-5 leading-8 text-ink/75">
        This MVP collects only the information needed to review a growth audit request and respond to the business
        contact. Analytics events are designed to avoid unnecessary personal information.
      </p>
      <section className="mt-8 grid gap-5">
        {[
          ["What we collect", "Business contact details, website URL, industry, city, current problem, marketing channels, consent, and conversion events."],
          ["Why we collect it", "To evaluate whether a lightweight website and operations loop can improve lead capture, booking, quote requests, and follow-up."],
          ["How we use it", "To respond to the audit request, record source and conversion context, and improve our own website flow."],
          ["Current MVP limitation", "This is not a legal compliance statement. Production client deployments require a client-specific privacy review."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
            <h2 className="font-display text-3xl text-ink">{title}</h2>
            <p className="mt-3 text-sm leading-6 text-ink/70">{text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
