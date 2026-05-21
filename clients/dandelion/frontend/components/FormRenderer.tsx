"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { getFormConfig, submitForm, trackEvent, type FieldConfig, type FormSchema, type LeadPayload } from "@/lib/api";

type FormStatus = "idle" | "loading_schema" | "schema_error" | "submitting" | "success" | "error";
type StandardField = "contact_name" | "email" | "phone" | "business_name" | "industry" | "website_url" | "city";

const standardFields = new Set<StandardField>(["contact_name", "email", "phone", "business_name", "industry", "website_url", "city"]);

export function FormRenderer({ formKey }: { formKey: string }) {
  const [schema, setSchema] = useState<FormSchema | null>(null);
  const [status, setStatus] = useState<FormStatus>("loading_schema");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const config = await getFormConfig(formKey);
        setSchema(config.schema_json);
        setStatus("idle");
      } catch (err) {
        setStatus("schema_error");
        setMessage(err instanceof Error ? err.message : "Failed to load form.");
      }
    }

    void load();
  }, [formKey]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!schema) return;

    setStatus("submitting");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload: LeadPayload = {
      form_key: formKey,
      contact_name: "",
      email: "",
      consent: false,
      data: {},
    };

    schema.fields.forEach((field) => {
      const rawValue = formData.get(field.name);
      const value = field.type === "checkbox" ? rawValue === "on" : normalizeFormValue(rawValue);

      if (isStandardField(field.name)) {
        assignStandardField(payload, field.name, value);
      } else {
        payload.data[field.name] = value;
      }
    });

    payload.consent = formData.get("consent") === "on" || formData.get("agree") === "on";

    try {
      await trackEvent(`${formKey}_start`, { industry: payload.industry, form_key: formKey });
      await submitForm(payload);
      setStatus("success");
      setMessage(schema.success_message || "Request received. We will review it and follow up with the next step.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Submission failed.");
    }
  }

  if (status === "loading_schema") {
    return (
      <div className="flex min-h-64 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.06] p-12">
        <Loader2 className="h-8 w-8 animate-spin text-copper" />
      </div>
    );
  }

  if (status === "schema_error") {
    return (
      <div className="flex items-center gap-3 rounded-[2rem] border border-copper/20 bg-copper/10 p-6 text-copper">
        <AlertCircle className="h-6 w-6 shrink-0" />
        <p>{message}</p>
      </div>
    );
  }

  if (!schema) return null;

  const hasConsentField = schema.fields.some((field) => field.name === "agree" || field.name === "consent");

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2.4rem] border border-white/10 bg-white/[0.07] p-5 shadow-premium backdrop-blur-2xl md:p-7">
      <div>
        {schema.title && <h2 className="font-display text-4xl leading-none tracking-[-0.06em] text-porcelain">{schema.title}</h2>}
        {schema.description && <p className="mt-3 text-sm leading-6 text-porcelain/62">{schema.description}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {schema.fields.map((field) => (
          <div key={field.name} className={field.type === "textarea" || field.type === "checkbox" ? "md:col-span-2" : ""}>
            <RenderField field={field} />
          </div>
        ))}
      </div>

      {!hasConsentField && (
        <label className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-porcelain/70">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-copper" />
          I agree to be contacted about this request.
        </label>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-copper px-6 py-4 text-sm font-black text-white shadow-[0_24px_70px_rgba(218,130,78,0.28)] transition hover:bg-[#b86335] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        {status === "submitting" ? "Sending..." : schema.submit_label || "Submit"}
      </button>

      {message && (
        <div
          role="status"
          className={`flex items-start gap-2 rounded-2xl border p-4 text-sm leading-6 ${
            status === "success"
              ? "border-mint/20 bg-mint/10 text-mint"
              : "border-copper/20 bg-copper/10 text-copper"
          }`}
        >
          {status === "success" ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> : <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />}
          {message}
        </div>
      )}
    </form>
  );
}

function RenderField({ field }: { field: FieldConfig }) {
  const commonClass =
    "rounded-2xl border border-white/10 bg-night/70 px-4 py-3 font-normal text-porcelain placeholder:text-porcelain/34 outline-none transition focus:border-copper/50 focus:ring-4 focus:ring-copper/10";
  const labelClass = "grid gap-2 text-sm font-bold text-porcelain/78";

  if (field.type === "select") {
    return (
      <label className={labelClass}>
        {field.label}
        <select name={field.name} required={field.required} className={commonClass}>
          <option value="">Select one</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea") {
    return (
      <label className={labelClass}>
        {field.label}
        <textarea name={field.name} required={field.required} rows={4} placeholder={field.placeholder} className={commonClass} />
      </label>
    );
  }

  if (field.type === "checkbox") {
    return (
      <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-sm leading-6 text-porcelain/74">
        <input name={field.name} type="checkbox" required={field.required} className="h-4 w-4 shrink-0 accent-copper" />
        {field.label}
      </label>
    );
  }

  return (
    <label className={labelClass}>
      {field.label}
      <input name={field.name} type={field.type === "phone" ? "tel" : field.type} required={field.required} placeholder={field.placeholder} className={commonClass} />
    </label>
  );
}

function normalizeFormValue(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value;
}

function isStandardField(name: string): name is StandardField {
  return standardFields.has(name as StandardField);
}

function assignStandardField(payload: LeadPayload, name: StandardField, value: unknown) {
  if (typeof value === "boolean") return;
  payload[name] = typeof value === "string" ? value : "";
}
