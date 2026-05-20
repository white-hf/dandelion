# Branching Strategy

## Goal

Use one development branch per release/version. All iterations for the same release are developed and reviewed on that branch. Merge to `main` only after the release has passed all planned iteration reviews and validation.

## Branch Types

### `main`

- Stable integration branch.
- Represents the latest accepted release baseline.
- Do not develop directly on `main`.
- Only merge completed release branches into `main`.

### `develop/rX.Y-release-name`

- Release development branch.
- Used for all implementation, review fixes, docs, and validation artifacts in that release.
- Example: `develop/r0.6-dynamic-capability`.

### Optional task branches

- Use only when work becomes large or risky enough to isolate.
- Naming: `task/rX.Y-short-topic`.
- Merge back into the release development branch, not directly into `main`.

## Current Active Branch

`develop/r0.6-dynamic-capability`

Scope:

- Finish R0.6 Dynamic Capability.
- Close I0.6.1 Backend Form Engine review blockers.
- Continue with I0.6.2 Frontend FormRenderer only after I0.6.1 passes.

## Release Completion Gate

Before merging a release branch into `main`:

- All iteration reviews for the release are `Passed`.
- `docs/delivery/Iteration_Plan.md` reflects the final release state.
- `docs/delivery/reviews/README.md` points to the latest passed review.
- Backend tests pass.
- Frontend build passes.
- Any required real client app smoke test is recorded in the review.

## Agent Rules

- Start new work from the active release development branch.
- Do not commit implementation work directly to `main`.
- Do not reuse review IDs.
- When a release is completed and merged, create the next release development branch from updated `main`.
