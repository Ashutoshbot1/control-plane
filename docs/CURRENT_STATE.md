# Current State

Last updated: 2026-07-28

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
- Accepted audit-log shape: actor/target display snapshots, login/logout events, and append-only security history.
- Accepted single-organization MVP: no organizations table or tenant isolation in the first release.
- Accepted browser token strategy: in-memory access token plus httpOnly refresh-token cookie with rotation.
- Accepted migration tool: `node-pg-migrate`.

## In Progress

- Backend scaffold is ready to begin.

## Next Task

Scaffold the Express and TypeScript backend package.

## Known Blockers

None.

## Important Open Decisions

None blocking backend scaffolding.

## Verification State

```text
Frontend: intentionally empty; no build available
Backend: intentionally empty; no build available
Tests: not configured
Git: initialized and pushed by the user
```

## Resume Point

When resuming, read `AGENTS.md`, this file, and `ROADMAP.md`. Start backend scaffolding in `backend/`.
