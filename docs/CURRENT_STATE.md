# Current State

Last updated: 2026-07-23

## Current Phase

Phase 0 — Product and repository foundation.

## Completed

- Created the initial repository documentation structure.
- Recorded the mentoring, prior-knowledge, verification, and context-recovery rules.
- Chosen the high-level architecture: Next.js frontend plus a separate Express and TypeScript backend.
- Chosen a modular monolith for the backend.
- Drafted the product scope, roadmap, API surface, and database entities.
- Declared `frontend/` and `backend/` intentionally empty until planning is reviewed.
- Finalized the initial `SUPER_ADMIN`, `ADMIN`, and `USER` role capabilities.
- Finalized the MVP permission boundary: leaf-level access only.
- Accepted active-grants-only storage: no access-assignment row means no access.
- Accepted invited-user storage: create `users` rows with `INVITED` status, then activate on invitation acceptance.
- Accepted invitation token storage: selector plus hashed secret, with accepted/revoked rows retained.
- Accepted refresh-token storage: selector plus hashed secret for efficient lookup and safe rotation.
- Accepted product setup rule: product creation includes at least one resource in the same transaction.
- Accepted sub-resource rule: sub-resources are optional; standalone resources can receive access directly.
- Accepted deletion behavior: archive products, resources, and sub-resources instead of hard-deleting.

## In Progress

- MVP database relationships are being reviewed before backend scaffolding.

## Next Task

Continue reviewing the database model table by table. Next focus: audit-log actor/target retention.

## Known Blockers

None.

## Important Open Decisions

- Whether the MVP is strictly single-organization
- Browser token/session storage strategy
- Migration tool choice

## Verification State

```text
Frontend: intentionally empty; no build available
Backend: intentionally empty; no build available
Tests: not configured
Git: initialized and pushed by the user
```

## Resume Point

When resuming, read `AGENTS.md`, this file, and `ROADMAP.md`. Start with database relationship review before scaffolding backend code.
