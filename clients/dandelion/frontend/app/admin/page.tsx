"use client";

import { useEffect, useState } from "react";
import { getDashboard, getLeads, updateLeadStatus } from "@/lib/api";

type Lead = {
  lead_id: string;
  created_at: string;
  business_name: string;
  contact_name: string;
  email: string;
  industry: string;
  city: string;
  source: string;
  status: string;
  current_problem: string;
};

type Dashboard = {
  total_leads: number;
  audit_submits: number;
  booking_clicks: number;
  cta_clicks: number;
  statuses: { status: string; count: number }[];
  sources: { source: string; count: number }[];
};

const statusOptions = ["new", "contacted", "audit_scheduled", "audit_sent", "proposal_sent", "won", "lost", "archived"];

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const [adminKey, setAdminKey] = useState("");

  async function load() {
    try {
      const [dashboardData, leadsData] = await Promise.all([getDashboard(), getLeads()]);
      setDashboard(dashboardData);
      setLeads(leadsData.leads);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load admin data.");
    }
  }

  useEffect(() => {
    setAdminKey(window.localStorage.getItem("dandelion_admin_key") ?? "");
    void load();
  }, []);

  function saveAdminKey() {
    window.localStorage.setItem("dandelion_admin_key", adminKey);
    void load();
  }

  async function changeStatus(leadId: string, status: string) {
    await updateLeadStatus(leadId, status);
    await load();
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <nav className="flex items-center justify-between py-4">
        <a href="/" className="font-display text-2xl font-bold text-ink">
          Dandelion Admin
        </a>
        <span className="rounded-full bg-ember/15 px-4 py-2 text-sm font-semibold text-ember">MVP internal view</span>
      </nav>

      <section className="py-10">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-ember">Conversion dashboard</p>
        <h1 className="mt-3 font-display text-5xl text-ink">Leads, source, status, and events.</h1>
      </section>

      {error ? <div className="rounded-2xl bg-ember/10 p-4 text-ember">{error}</div> : null}

      <section className="mb-6 rounded-[2rem] bg-white/65 p-5 shadow-soft">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Admin API key
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="Required when ADMIN_API_KEY is configured"
              className="min-w-0 flex-1 rounded-2xl border border-moss/20 bg-cream px-4 py-3 font-normal"
            />
            <button onClick={saveAdminKey} className="rounded-full bg-moss px-5 py-3 font-semibold text-cream">
              Save key
            </button>
          </div>
        </label>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Total leads", dashboard?.total_leads ?? 0],
          ["Audit submits", dashboard?.audit_submits ?? 0],
          ["Booking clicks", dashboard?.booking_clicks ?? 0],
          ["CTA clicks", dashboard?.cta_clicks ?? 0],
        ].map(([label, value]) => (
          <div key={String(label)} className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss">{String(label)}</p>
            <p className="mt-4 font-display text-5xl text-ink">{String(value)}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel title="Status counts" items={dashboard?.statuses.map((item) => [item.status, item.count]) ?? []} />
        <Panel title="Top sources" items={dashboard?.sources.map((item) => [item.source, item.count]) ?? []} />
      </section>

      <section className="mt-10 rounded-[2rem] bg-white/70 p-5 shadow-soft">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-3xl text-ink">Lead queue</h2>
          <button onClick={() => void load()} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream">
            Refresh
          </button>
        </div>
        <div className="grid gap-3">
          {leads.map((lead) => (
            <article key={lead.lead_id} className="grid gap-4 rounded-[1.5rem] bg-cream p-4 lg:grid-cols-[1fr_12rem]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-2xl text-ink">{lead.business_name}</h3>
                  <span className="rounded-full bg-moss px-3 py-1 text-xs font-semibold text-cream">{lead.industry}</span>
                </div>
                <p className="mt-1 text-sm text-ink/70">
                  {lead.contact_name} · {lead.email} · {lead.city || "Unknown city"}
                </p>
                <p className="mt-3 text-sm leading-6 text-ink/80">{lead.current_problem}</p>
              </div>
              <label className="grid content-start gap-2 text-sm font-semibold text-ink">
                Status
                <select
                  value={lead.status}
                  onChange={(event) => void changeStatus(lead.lead_id, event.target.value)}
                  className="rounded-2xl border border-moss/20 bg-white px-3 py-2"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
          {leads.length === 0 ? <p className="rounded-2xl bg-cream p-5 text-ink/70">No leads yet. Submit the audit form to test the loop.</p> : null}
        </div>
      </section>
    </main>
  );
}

function Panel({ title, items }: { title: string; items: (string | number)[][] }) {
  return (
    <div className="rounded-[2rem] bg-white/65 p-6 shadow-soft">
      <h2 className="font-display text-3xl text-ink">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.length ? (
          items.map(([label, value]) => (
            <div key={String(label)} className="flex justify-between rounded-2xl bg-cream px-4 py-3 text-sm">
              <span>{String(label)}</span>
              <strong>{String(value)}</strong>
            </div>
          ))
        ) : (
          <p className="text-sm text-ink/60">No data yet.</p>
        )}
      </div>
    </div>
  );
}
