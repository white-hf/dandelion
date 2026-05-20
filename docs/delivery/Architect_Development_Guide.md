# Architect Development Guide

**Version:** 1.1
**Date:** 2026-05-20
**Active Branch:** `develop/r0.6-dynamic-capability`
**Audience:** Architect / implementation agent
**Purpose:** Provide execution guidance for the next development cycles while preserving reviewability, product alignment, code quality, and website experience quality.

---

## 1. Product Direction Reset

Dandelion must not compete with large SaaS products by adding more features. The product should follow the Google Docs style tradeoff: simple, easy, fast to understand, and good enough for daily SMB work.

The customer website is the core product. Backend modules exist to support website conversion and owner follow-up, not to become a complex CRM.

Every implementation decision must pass three checks:

- Does this make the customer-facing website more professional, trustworthy, beautiful, or easier to use?
- Does this reduce the SMB owner's operational burden?
- Does this avoid feature bloat that would make the product feel like a heavy SaaS?

## 2. Development Goal

The next cycles should move the Dandelion website from a working backend-driven MVP toward a professional customer website sample with a lightweight lead follow-up loop.

There are two completion standards:

- **Website Launch MVP:** complete R0.7. This means the public website is not only functional, but also visually professional, mobile-friendly, conversion-oriented, and usable for real sales demos.
- **Standardized Client Product Baseline:** complete R0.9. This means the same system can become the reusable foundation for customer websites with simple owner follow-up, notifications, security, and deployment readiness.

## 3. Recommended Scope For The Next Development Batch

Do not start new R0.8/R0.9 backend expansion until current R0.6 review blockers are closed.

First close the active R0.6 quality issues:

- `I0.6.2 Frontend FormRenderer`
- `I0.6.3 Schema Seed and Website Migration`

Then develop R0.7 as the next major product batch:

- `I0.7.1 Visual System and Brand Direction`
- `I0.7.2 Core Page Experience Polish`
- `I0.7.3 Industry Website Template: HVAC`
- `I0.7.4 Mobile and Form Experience QA`

Do **not** include R0.8 Lead Inbox Lite or R0.9 Launch Trust in the same implementation batch unless explicitly requested. Those affect backend operations and production risk and should be reviewed separately.

## 4. Execution Order

### Step 1: Stabilize API Client Contracts

Update the frontend API layer first.

Required functions:

- `getFormConfig(formKey)`
- `submitForm(payload)`

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

### Step 5: Build The Website Experience System

This is the main R0.7 work. The implementation agent must act as an architect, product manager, UI designer, and UX reviewer, not just a coder.

Required work:

- Define a stronger visual system for the Dandelion website.
- Improve Home, Services, Industries, Demo, Pricing, and HVAC page narrative.
- Make the HVAC page feel like a sellable industry website sample.
- Review mobile first: hero, navigation, CTA, form, success/error states.
- Keep the design professional and specific. Avoid generic SaaS cards and default component styling.
- Use the checklist in `docs/product/Customer_Website_Experience_Standard.md`.

Acceptance rules:

- Every core page must have a clear user journey: problem, offer, proof, process, CTA.
- Every page must be understandable without a sales explanation.
- Every form success state must explain the next step.
- Desktop and mobile screenshots or browser verification notes are required in the handoff summary.

### Step 6: Defer Lead Inbox Lite To R0.8

Do not expand admin features during R0.7 except where needed to keep the current lead loop working. R0.8 will implement the lightweight owner workflow:

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
- UI language should say Lead Inbox or Leads, not complex CRM concepts.

## 5. Code-Level Architecture Rules

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
- Improve typography, colors, spacing, motion, imagery, and CTA style when they are generic or weak.
- Preserve business clarity and conversion flow while improving visual quality.
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

## 6. Required Tests

R0.6 backend tests must cover:

- Form schema discovery.
- Valid generic form submission.
- Invalid required field.
- Invalid select option.
- Invalid email field.
- Invalid checkbox field.

R0.8 backend tests must cover when Lead Inbox Lite is in scope:

- Lead detail unauthorized and authorized.
- Lead timeline unauthorized and authorized.
- Note create/list unauthorized and authorized.
- Lead list filters and pagination.
- CSV export unauthorized and authorized.

Frontend validation must include:

- `npm run build`.
- At least one migrated page renders with `FormRenderer`.
- FormRenderer displays backend `422` errors.
- Core pages render with improved website experience.
- Mobile viewport smoke covers homepage, HVAC page, audit form, and quote form.
- Admin page builds if touched.

Real client app smoke must include:

- MySQL config loads by default.
- `GET /api/forms/audit_request` returns `200`.
- `GET /api/forms/hvac_quote` returns `200`.
- Audit form valid submit creates lead/event.
- HVAC form valid submit creates lead/event.
- Invalid checkbox/select/email returns visible frontend error.
- Admin dashboard loads with `X-Admin-Key`.
- Lead detail and timeline load with `X-Admin-Key` only when R0.8 is in scope.

## 7. Review Packaging Requirements

Even if implementation is done in one large batch, package evidence by iteration:

- `I0.6.2` evidence: FormRenderer component, API client, frontend build.
- `I0.6.3` evidence: schema seed, Audit/HVAC migration, real submit smoke.
- `I0.7.1` evidence: visual system changes, before/after notes, desktop/mobile screenshots.
- `I0.7.2` evidence: core page narrative and CTA improvements.
- `I0.7.3` evidence: HVAC industry website sample and quote flow.
- `I0.7.4` evidence: mobile/form QA checklist and browser verification.

Create a short implementation summary before asking for review:

```text
docs/delivery/summaries/R0.6-R0.7-website-experience-summary.md
```

The summary must include:

- Changed files grouped by iteration.
- API endpoints added or changed.
- Database migrations added.
- Indexes added.
- Test commands and results.
- Known limitations.
- Any intentionally deferred R0.8 work.

## 8. Branch and Commit Rules

- Work on `develop/r0.6-dynamic-capability` unless a task branch is explicitly created.
- Do not commit directly to `main`.
- Keep commits grouped by capability when possible.
- Do not reuse review IDs.
- Do not mark an iteration `Completed` yourself unless review has passed.
- It is acceptable to mark implementation as `Ready for Review`.

## 9. Definition of Done For Architect Handoff

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
