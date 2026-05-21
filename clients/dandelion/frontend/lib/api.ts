export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

// --- Public Types ---
export type FieldConfig = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  placeholder?: string;
};

export type FormSchema = {
  title?: string;
  description?: string;
  submit_label?: string;
  success_message?: string;
  fields: FieldConfig[];
};

export type LeadPayload = {
  form_key: string;
  contact_name: string;
  email: string;
  phone?: string;
  business_name?: string;
  industry?: string;
  website_url?: string;
  city?: string;
  data: Record<string, unknown>;
  source?: string;
  medium?: string;
  campaign?: string;
  consent: boolean;
};

// --- Public APIs ---

export type FormConfigResponse = {
  form_key: string;
  module_source: string;
  industry?: string;
  version: number;
  schema_json: FormSchema;
};

export async function getFormConfig(formKey: string): Promise<FormConfigResponse> {
  const response = await fetch(`${API_BASE}/api/forms/${formKey}`, { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to load form configuration.");
  return response.json();
}

export async function submitForm(payload: LeadPayload) {
  const response = await fetch(`${API_BASE}/api/forms/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = body.detail;
    if (typeof detail === "object" && detail.errors) throw new Error(detail.errors.join(", "));
    throw new Error(typeof detail === "string" ? detail : "Submission failed.");
  }
  return response.json();
}

export async function trackEvent(event_type: string, metadata: Record<string, unknown> = {}) {
  const backendEvent = {
    event_type,
    path: typeof window !== "undefined" ? window.location.pathname : undefined,
    source: getParam("utm_source"),
    medium: getParam("utm_medium"),
    campaign: getParam("utm_campaign"),
    metadata, // P1-3: Send as metadata
    module_source: "dandelion_website"
  };
  await fetch(`${API_BASE}/api/events/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(backendEvent),
    keepalive: true,
  }).catch(() => undefined);
}

// --- Admin APIs ---

export async function getDashboard() {
  const response = await fetch(`${API_BASE}/api/admin/dashboard/`, { cache: "no-store", headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to load dashboard.");
  return response.json();
}

export async function getLeads(filters: Record<string, string> = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE}/api/admin/leads/?${params.toString()}`, { cache: "no-store", headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to load leads.");
  return response.json();
}

export async function getLeadDetail(leadId: string) {
  const response = await fetch(`${API_BASE}/api/admin/leads/${leadId}`, { cache: "no-store", headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to load lead detail.");
  return response.json();
}

export async function updateLeadStatus(leadId: string, status: string) {
  const response = await fetch(`${API_BASE}/api/admin/leads/${leadId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Unable to update lead.");
  return response.json();
}

export async function getLeadTimeline(leadId: string) {
  const response = await fetch(`${API_BASE}/api/admin/leads/${leadId}/timeline`, { cache: "no-store", headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to load timeline.");
  return response.json();
}

export async function createLeadNote(leadId: string, body: string) {
  const response = await fetch(`${API_BASE}/api/admin/leads/${leadId}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...adminHeaders() },
    body: JSON.stringify({ body }),
  });
  if (!response.ok) throw new Error("Unable to create note.");
  return response.json();
}

export async function getLeadNotes(leadId: string) {
  const response = await fetch(`${API_BASE}/api/admin/leads/${leadId}/notes`, { cache: "no-store", headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to load notes.");
  return response.json();
}

export async function exportLeadsCsv(filters: Record<string, string> = {}) {
  const params = new URLSearchParams(filters);
  // P1-1: Use GET
  const response = await fetch(`${API_BASE}/api/admin/leads/export/csv?${params.toString()}`, { cache: "no-store", headers: adminHeaders() });
  if (!response.ok) throw new Error("Unable to export leads.");
  return response.blob();
}

// Helpers
function adminHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const key = window.localStorage.getItem("dandelion_admin_key");
  return key ? { "X-Admin-Key": key } : {};
}

function getParam(name: string) {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get(name) ?? undefined;
}
