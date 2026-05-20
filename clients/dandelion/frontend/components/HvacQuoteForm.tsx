"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { createLead, trackEvent, type LeadPayload } from "@/lib/api";

export function HvacQuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const data = new FormData(event.currentTarget);
    const currentProblem = [
      `Job type: ${data.get("job_type")}`,
      `Urgency: ${data.get("urgency")}`,
      `Issue: ${data.get("issue")}`,
      `Property: ${data.get("property_type")}`,
      `Postal/service area: ${data.get("city")}`,
    ].join("\n");

    const payload: LeadPayload = {
      business_name: "HVAC Quote Demo",
      contact_name: String(data.get("contact_name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      website_url: "",
      industry: "HVAC / Home services",
      city: String(data.get("city") ?? ""),
      current_problem: currentProblem,
      monthly_lead_goal: "Quote request from HVAC demo",
      marketing_channels: ["HVAC landing page"],
      source: "website",
      medium: "industry-demo",
      campaign: "hvac-lead-engine",
      consent: data.get("consent") === "on",
    };

    try {
      await trackEvent("hvac_quote_form_start", { job_type: data.get("job_type") });
      const response = await createLead(payload);
      await trackEvent("hvac_quote_form_submit", { lead_id: response.lead_id });
      setStatus("success");
      setMessage("Quote request captured. In a client build, the owner would now receive a priority notification.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Quote request failed.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] bg-white/75 p-5 shadow-soft">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">HVAC quote request demo</p>
        <h2 className="mt-2 font-display text-3xl text-ink">Capture the job before it becomes a missed call.</h2>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Field name="contact_name" label="Customer name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="phone" label="Phone" required />
        <Field name="city" label="Postal code / service area" required />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Select name="job_type" label="Job type" options={["Repair", "Replacement estimate", "Maintenance", "Emergency service"]} />
        <Select name="urgency" label="Urgency" options={["Today", "This week", "Planning ahead"]} />
        <Select name="property_type" label="Property" options={["Detached home", "Townhouse", "Condo", "Commercial"]} />
      </div>

      <label className="grid gap-2 text-sm font-semibold text-ink">
        What is happening?
        <textarea
          name="issue"
          required
          rows={4}
          className="rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal"
          placeholder="Example: Furnace stopped overnight, system is 12 years old."
        />
      </label>

      <label className="flex gap-3 rounded-2xl bg-cream p-3 text-sm text-ink/80">
        <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-ember" />
        I agree to be contacted about this quote request.
      </label>

      <button
        disabled={status === "loading"}
        className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-4 font-semibold text-white disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        Submit quote request
      </button>

      {message ? (
        <p role="status" className={`rounded-2xl p-3 text-sm ${status === "success" ? "bg-moss/10 text-moss" : "bg-ember/10 text-ember"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <input name={name} type={type} required={required} className="rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal" />
    </label>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-ink">
      {label}
      <select name={name} required className="rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal">
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
