"use client";

import { useEffect, useState } from "react";
import { getDashboard, getLeads, updateLeadStatus, getLeadDetail, getLeadTimeline, getLeadNotes, createLeadNote, exportLeadsCsv } from "@/lib/api";
import { Download, RefreshCw, X, MessageSquare, History, CheckCircle2, AlertCircle } from "lucide-react";

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
  custom_fields: any;
};

type Note = {
  note_id: string;
  created_at: string;
  author: string;
  body: string;
};

type Event = {
  event_id: string;
  event_type: string;
  occurred_at: string;
  metadata: any;
};

const statusOptions = ["new", "contacted", "audit_scheduled", "audit_sent", "proposal_sent", "won", "lost", "archived"];

export default function AdminPage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [filters, setFilters] = useState({ status: "", industry: "", source: "" });
  const [error, setError] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [timeline, setTimeline] = useState<Event[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  async function load(cursor: string | null = null, currentFilters = filters) {
    try {
      setError("");
      const [dashData, leadsData] = await Promise.all([
        getDashboard(),
        getLeads({ ...currentFilters, cursor: cursor || "" })
      ]);
      setDashboard(dashData);
      setLeads(leadsData.leads);
      setNextCursor(leadsData.next_cursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data.");
    }
  }

  useEffect(() => {
    setAdminKey(window.localStorage.getItem("dandelion_admin_key") ?? "");
    void load();
  }, []);

  async function handleLeadClick(lead: Lead) {
    setSelectedLead(lead);
    try {
      const [n, t] = await Promise.all([getLeadNotes(lead.lead_id), getLeadTimeline(lead.lead_id)]);
      setNotes(n);
      setTimeline(t);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddNote(e: any) {
    e.preventDefault();
    if (!selectedLead) return;
    const body = new FormData(e.target).get("note") as string;
    if (!body) return;
    try {
      await createLeadNote(selectedLead.lead_id, body);
      e.target.reset();
      setNotes(await getLeadNotes(selectedLead.lead_id));
    } catch (err) {
      alert("Failed to add note");
    }
  }

  async function handleExport() {
    setIsExporting(true);
    try {
      const blob = await exportLeadsCsv(filters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
    } catch (err) {
      alert("Export failed");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-moss/10 mb-8">
        <h1 className="font-display text-2xl font-bold text-ink">Dandelion Admin</h1>
        <div className="flex items-center gap-3">
           <input
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin API Key"
              className="rounded-full border border-moss/20 bg-white px-4 py-1.5 text-sm"
            />
            <button
              onClick={() => { window.localStorage.setItem("dandelion_admin_key", adminKey); void load(); }}
              className="rounded-full bg-moss px-4 py-1.5 text-sm font-semibold text-cream"
            >Save</button>
        </div>
      </div>

      {error && <div className="mb-6 rounded-2xl bg-ember/10 p-4 text-ember">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Leads" value={dashboard?.total_leads} />
        <StatCard label="Audit Submits" value={dashboard?.audit_submits} />
        <StatCard label="CTA Clicks" value={dashboard?.cta_clicks} />
        <button onClick={handleExport} disabled={isExporting} className="flex flex-col items-center justify-center rounded-[2rem] bg-ink p-6 text-cream hover:bg-moss transition-colors">
          <Download className="h-6 w-6 mb-2" />
          <span className="text-sm font-semibold">Export CSV</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-ink">Lead Queue</h2>
            <div className="flex gap-2">
              <select
                value={filters.status}
                onChange={(e) => { const f = {...filters, status: e.target.value}; setFilters(f); void load(null, f); }}
                className="rounded-full border border-moss/20 bg-white px-3 py-1.5 text-xs"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => void load()} className="p-2 rounded-full bg-cream text-ink"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="grid gap-3">
            {leads.map(lead => (
              <div
                key={lead.lead_id}
                onClick={() => void handleLeadClick(lead)}
                className={`cursor-pointer group relative grid gap-4 rounded-[1.5rem] p-5 transition-all ${selectedLead?.lead_id === lead.lead_id ? "bg-moss/5 ring-1 ring-moss/20" : "bg-cream hover:bg-white hover:shadow-soft"}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl text-ink">{lead.business_name || "Unknown Business"}</h3>
                    <p className="text-sm text-ink/60">{lead.contact_name} · {lead.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${lead.status === "new" ? "bg-ember text-white" : "bg-moss/20 text-moss"}`}>
                    {lead.status}
                  </span>
                </div>
                {lead.current_problem && <p className="text-xs text-ink/70 line-clamp-2 italic">"{lead.current_problem}"</p>}
              </div>
            ))}
            {leads.length === 0 && <p className="p-12 text-center text-ink/40 bg-cream rounded-3xl">No leads found.</p>}
          </div>
        </section>

        <aside>
          {selectedLead ? (
            <div className="sticky top-8 space-y-6">
              <div className="rounded-[2rem] bg-ink p-6 text-cream shadow-soft">
                <div className="flex justify-between mb-4">
                  <h3 className="font-display text-xl">Details</h3>
                  <button onClick={() => setSelectedLead(null)}><X className="h-5 w-5" /></button>
                </div>
                <div className="space-y-3 text-sm">
                   <DetailItem label="Industry" value={selectedLead.industry} />
                   <DetailItem label="City" value={selectedLead.city} />
                   <DetailItem label="Source" value={selectedLead.source} />
                   <DetailItem label="Created" value={new Date(selectedLead.created_at).toLocaleDateString()} />
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2">Update Status</p>
                  <select
                    value={selectedLead.status}
                    onChange={async (e) => {
                      await updateLeadStatus(selectedLead.lead_id, e.target.value);
                      setSelectedLead({...selectedLead, status: e.target.value});
                      void load();
                    }}
                    className="w-full rounded-xl bg-white/10 border-none text-white px-3 py-2 text-sm focus:ring-1 focus:ring-white/20"
                  >
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <h4 className="font-display text-lg mb-4 flex items-center gap-2"><MessageSquare className="h-4 w-4" /> Notes</h4>
                <form onSubmit={handleAddNote} className="mb-4">
                  <textarea name="note" required placeholder="Add internal note..." className="w-full rounded-xl bg-cream border-none p-3 text-xs focus:ring-1 focus:ring-moss/20" rows={2} />
                  <button type="submit" className="mt-2 w-full bg-ink text-cream text-[10px] font-bold py-2 rounded-lg uppercase tracking-widest">Add Note</button>
                </form>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {notes.map(note => (
                    <div key={note.note_id} className="text-xs border-b border-moss/5 pb-2">
                      <p className="font-bold text-ink/80">{note.author} <span className="font-normal text-[10px] text-ink/40 ml-2">{new Date(note.created_at).toLocaleDateString()}</span></p>
                      <p className="text-ink/70 mt-1">{note.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-soft">
                <h4 className="font-display text-lg mb-4 flex items-center gap-2"><History className="h-4 w-4" /> Timeline</h4>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                  {timeline.map(ev => (
                    <div key={ev.event_id} className="relative pl-4 border-l border-moss/20 pb-4 last:pb-0">
                      <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-moss" />
                      <p className="text-[10px] font-bold uppercase text-ink/80">{ev.event_type.replace(/_/g, " ")}</p>
                      <p className="text-[9px] text-ink/40">{new Date(ev.occurred_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-[2rem] border-2 border-dashed border-moss/10 flex items-center justify-center text-ink/20 text-center p-8">
              Select a lead to view history.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string, value: number }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-soft border border-moss/5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-moss mb-2">{label}</p>
      <p className="font-display text-4xl text-ink">{value ?? 0}</p>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-white/40">{label}</span>
      <span className="font-medium text-right">{value || "—"}</span>
    </div>
  );
}
