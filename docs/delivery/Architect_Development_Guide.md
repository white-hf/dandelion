# Architect Development Guide

**Version:** 1.0  
**Date:** 2026-05-19  
**Active Branch:** `develop/r0.6-dynamic-capability`  
**Audience:** Architect / implementation agent  
**Purpose:** Provide execution guidance for the next large development cycle while preserving reviewability, product alignment, and code quality.

---

## 1. Development Goal

The next large development cycle should move the Dandelion website from a working backend-driven MVP toward a complete lightweight operations product.

There are two completion standards:

- **Website Launch MVP:** complete R0.6. This means the public website can be used for sales demos and real lead capture.
- **Standardized Client Product Baseline:** complete R0.7 and later R0.8. This means the same system can become the reusable foundation for customer websites.

## 2. Recommended Scope For This Large Iteration

Develop these iterations together:

- `I0.6.2 Frontend FormRenderer`
- `I0.6.3 Schema Seed and Website Migration`
- `I0.7.1 Lead Detail and Event Timeline`
- `I0.7.2 Notes, Filters, Pagination`
- `I0.7.3 CSV Export and Operator Workflow Polish`

Do **not** include R0.8 in the same implementation batch unless explicitly requested. R0.8 includes security, notification provider, deployment, rate limit, backup, and staging concerns. Those should be reviewed separately because they affect production risk.

## 3. Execution Order

### Step 1: Stabilize API Client Contracts

Update the frontend API layer first.

Required functions:

- `getFormConfig(formKey)`
- `submitForm(payload)`
- `getLeadDetail(leadId)`
- `getLeadTimeline(leadId)`
- `createLeadNote(leadId, body)`
- `getLeadNotes(leadId)`
- `exportLeadsCsv(filters)`

Rules:

- Keep `API_BASE` behavior compatible with the current frontend.
- All admin APIs must send `X-Admin-Key` from the same existing localStorage key.
- Do not hardcode backend URLs inside components.
- Normalize backend errors into a shape components can display.

### Step 2: Build `FormRenderer`

Create a reusable component that renders fields from backend schema.

Minimum supported field types:

- `text`
- `email`
- `phone`
- `textarea`
- `select`
- `checkbox`
- `date`

Required behavior:

- Fetch schema from `GET /api/forms/{form_key}`.
- Render `title`, `description`, fields, `submit_label`, and `success_message`.
- Submit to `POST /api/forms/submit`.
- Show backend `422 detail.errors` clearly.
- Preserve current visual language from `AuditForm` and `HvacQuoteForm`.
- Track form start and submit events without storing unnecessary PII in event metadata.

Do not implement a generic design that looks detached from the site. The renderer should be reusable, but the styling must still feel like Dandelion's current website.

### Step 3: Seed Website Forms

Add or update seed scripts for:

- `audit_request`
- `hvac_quote`

Schema requirements:

- Required fields must match current hardcoded forms.
- Select options must match existing UX labels.
- Checkbox fields must submit boolean values.
- `module_source` should identify the website or industry pack clearly.

The seed flow must be idempotent. Running it multiple times must update or preserve the same form keys without duplicate failures.

### Step 4: Migrate Existing Forms

Replace hardcoded field logic in:

- `clients/dandelion/frontend/components/AuditForm.tsx`
- `clients/dandelion/frontend/components/HvacQuoteForm.tsx`

Acceptable approaches:

- Replace them with thin wrappers around `FormRenderer`.
- Or keep the filenames but delegate all schema rendering and submission logic to `FormRenderer`.

Rules:

- Do not regress copy, spacing, CTA prominence, or success/error UX.
- Do not remove existing tracking behavior without replacing it.
- Do not submit through the old `createLead` path for migrated forms.

### Step 5: Expand Admin CRM

Backend capabilities:

- Lead detail endpoint.
- Lead timeline endpoint.
- Lead note create/list endpoints.
- Lead list filters: status, industry, source.
- Lead list pagination.
- CSV export endpoint.

Frontend capabilities:

- Lead list supports filter and pagination.
- Lead detail panel or page shows lead data, custom fields, notes, and timeline.
- Admin can update status and add note.
- CSV export button is available only in admin context.
- Loading, empty, and error states are explicit.

Rules:

- All admin endpoints must require `X-Admin-Key`.
- Status updates and note creation should create auditable events.
- CSV export must avoid unnecessary raw event metadata.

## 4. Code-Level Architecture Rules

### Backend Rules

- Keep shared backend code under `packages/backend/dandelion_core`.
- Keep Dandelion client bootstrap code under `clients/dandelion/backend`.
- Use repository/service/router boundaries consistently.
- Routers should be thin: parse request, call service, return schema.
- Services own business logic and transactions.
- Repositories own SQLAlchemy query details.
- Every new query path must be backed by a suitable index if it will be used in list/filter/timeline/export flows.
- Migrations must be idempotent and non-destructive.
- Do not introduce `DROP TABLE` or destructive migration behavior.
- All timestamps should use timezone-safe UTC helpers, not deprecated `utcnow()`.
- Avoid mutable defaults in SQLAlchemy/Pydantic models.
- Keep Pydantic V2 compatibility.

### Backend Data and Index Guidance

For admin CRM work, ensure indexes support these query patterns:

- Lead list by `status`, ordered by `last_activity_at DESC`.
- Lead list by `industry`, ordered by `last_activity_at DESC`.
- Lead list by `source`, ordered by `last_activity_at DESC`.
- Lead detail by `lead_id`.
- Events by `lead_id`, ordered by `occurred_at DESC`.
- Notes by `lead_id`, ordered by `created_at DESC`.

If an index already exists, do not recreate it in a way that fails on repeated setup. Use the existing idempotent index loop style or safe migration strategy.

### Frontend Rules

- Keep shared API code in `clients/dandelion/frontend/lib/api.ts` or a small nearby module.
- Keep reusable UI in `clients/dandelion/frontend/components`.
- Prefer typed payloads and responses.
- Avoid duplicating form submission logic across forms.
- Preserve current typography, colors, spacing, and CTA style.
- Do not add a new UI framework unless necessary.
- Do not introduce global state management for this scope.
- FormRenderer must support progressive failure states: loading schema, schema error, submitting, submit success, submit error.
- Admin UI must not crash when optional `custom_fields`, `events`, or `notes` are empty.

### Security Rules

- Public form endpoints are public, but must validate server-side.
- Admin endpoints are never public.
- Do not expose admin key in server-rendered HTML.
- Do not log raw PII unnecessarily.
- Event metadata should avoid raw email, phone, long notes, or sensitive details.
- CSV export must be admin-protected.

## 5. Required Tests

Backend tests must cover:

- Form schema discovery.
- Valid generic form submission.
- Invalid required field.
- Invalid select option.
- Invalid email field.
- Invalid checkbox field.
- Lead detail unauthorized and authorized.
- Lead timeline unauthorized and authorized.
- Note create/list unauthorized and authorized.
- Lead list filters and pagination.
- CSV export unauthorized and authorized.

Frontend validation must include:

- `npm run build`.
- At least one migrated page renders with `FormRenderer`.
- FormRenderer displays backend `422` errors.
- Admin page builds with new detail/timeline/note/export UI.

Real client app smoke must include:

- MySQL config loads by default.
- `GET /api/forms/audit_request` returns `200`.
- `GET /api/forms/hvac_quote` returns `200`.
- Audit form valid submit creates lead/event.
- HVAC form valid submit creates lead/event.
- Invalid checkbox/select/email returns visible frontend error.
- Admin dashboard loads with `X-Admin-Key`.
- Lead detail and timeline load with `X-Admin-Key`.

## 6. Review Packaging Requirements

Even if implementation is done in one large batch, package evidence by iteration:

- `I0.6.2` evidence: FormRenderer component, API client, frontend build.
- `I0.6.3` evidence: schema seed, Audit/HVAC migration, real submit smoke.
- `I0.7.1` evidence: lead detail and timeline API/UI.
- `I0.7.2` evidence: notes, filters, pagination.
- `I0.7.3` evidence: CSV export and admin UX polish.

Create a short implementation summary before asking for review:

```text
docs/delivery/summaries/R0.6-R0.7-implementation-summary.md
```

The summary must include:

- Changed files grouped by iteration.
- API endpoints added or changed.
- Database migrations added.
- Indexes added.
- Test commands and results.
- Known limitations.
- Any intentionally deferred R0.8 work.

## 7. Branch and Commit Rules

- Work on `develop/r0.6-dynamic-capability` unless a task branch is explicitly created.
- Do not commit directly to `main`.
- Keep commits grouped by capability when possible.
- Do not reuse review IDs.
- Do not mark an iteration `Completed` yourself unless review has passed.
- It is acceptable to mark implementation as `Ready for Review`.

## 8. Definition of Done For Architect Handoff

The handoff is ready for review only when:

- All implementation scope files are committed.
- Backend tests pass.
- Frontend build passes.
- Migrations are idempotent.
- Seed scripts are idempotent.
- Real client app smoke has been run and recorded.
- `Iteration_Plan.md` is updated to `Ready for Review` for implemented iterations.
- Implementation summary exists.

If any item is not complete, state it explicitly as a known limitation instead of claiming the iteration is finished.
