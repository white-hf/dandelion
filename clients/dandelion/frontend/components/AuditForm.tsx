"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createLead, trackEvent, type LeadPayload } from "@/lib/api";

const channels = ["Google Search", "Google Ads", "Referrals", "Social", "Local directories"];

export function AuditForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const data = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      business_name: String(data.get("business_name") ?? ""),
      contact_name: String(data.get("contact_name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      website_url: String(data.get("website_url") ?? ""),
      industry: String(data.get("industry") ?? ""),
      city: String(data.get("city") ?? ""),
      current_problem: String(data.get("current_problem") ?? ""),
      monthly_lead_goal: String(data.get("monthly_lead_goal") ?? ""),
      marketing_channels: data.getAll("marketing_channels").map(String),
      source: new URLSearchParams(window.location.search).get("utm_source") ?? undefined,
      medium: new URLSearchParams(window.location.search).get("utm_medium") ?? undefined,
      campaign: new URLSearchParams(window.location.search).get("utm_campaign") ?? undefined,
      consent: data.get("consent") === "on",
    };

    try {
      await trackEvent("audit_form_start", { industry: payload.industry });
      const response = await createLead(payload);
      setStatus("success");
      setMessage(response.message);
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Submission failed.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] bg-white/80 p-5 shadow-soft backdrop-blur md:p-7">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-ember">Free growth audit</p>
        <h2 className="mt-2 font-display text-3xl text-ink">Show us the leak in your lead flow.</h2>
        <p className="mt-2 text-sm text-ink/70">
          We will review your current website, lead path, and follow-up loop before recommending any build.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field name="business_name" label="Business name" required />
        <Field name="contact_name" label="Contact name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="phone" label="Phone" />
        <Field name="website_url" label="Current website" placeholder="https://" />
        <Field name="city" label="City / service area" />
      </div>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        Industry
        <select name="industry" required className="rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal">
          <option value="">Select one</option>
          <option>Home services / contractor</option>
          <option>Clinic / dental / wellness</option>
          <option>Law / immigration / accounting</option>
          <option>Real estate / insurance</option>
          <option>Other local service</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        What is currently broken?
        <textarea
          name="current_problem"
          required
          minLength={8}
          rows={4}
          className="rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal"
          placeholder="Example: We get calls from Google, but nothing is tracked and follow-up is inconsistent."
        />
      </label>

      <Field name="monthly_lead_goal" label="Monthly lead goal" placeholder="Example: 20 quote requests" />

      <fieldset className="grid gap-2">
        <legend className="text-sm font-semibold text-ink">Current marketing channels</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {channels.map((channel) => (
            <label key={channel} className="flex items-center gap-2 rounded-2xl bg-cream px-3 py-2 text-sm">
              <input name="marketing_channels" type="checkbox" value={channel} className="h-4 w-4 accent-ember" />
              {channel}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex gap-3 rounded-2xl bg-cream p-3 text-sm text-ink/80">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-ember" />
        I agree to be contacted about this audit. We will only use this information to review and respond to the request.
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-4 font-semibold text-cream transition hover:bg-moss disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        Request the audit
      </button>

      {message ? (
        <div
          role="status"
          className={`flex items-start gap-2 rounded-2xl p-3 text-sm ${
            status === "success" ? "bg-moss/10 text-moss" : "bg-ember/10 text-ember"
          }`}
        >
          {status === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : null}
          {message}
        </div>
      ) : null}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal"
      />
    </label>
  );
}
