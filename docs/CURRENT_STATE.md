# Current State

Last updated: 2026-07-22

## Current Phase

Phase 0 — Product and repository foundation.

## Completed

- Created the initial repository documentation structure.
- Recorded the mentoring, prior-knowledge, verification, and context-recovery rules.
- Chosen the high-level architecture: Next.js frontend plus a separate Express and TypeScript backend.
- Chosen a modular monolith for the backend.
- Drafted the product scope, roadmap, API surface, and database entities.
- Declared `frontend/` and `backend/` intentionally empty until planning is reviewed.

## In Progress

- The user is initializing the Git repository.
- The product definition and authorization boundaries are awaiting review.

## Next Task

Define in the student's own words what `SUPER_ADMIN`, `ADMIN`, and `USER` can do. Use that answer to finalize role boundaries before designing tables or endpoints in detail.

## Known Blockers

None.

## Important Open Decisions

- Exact difference between super-admin and admin authority
- Product/resource/sub-resource permission inheritance
- Whether the MVP is strictly single-organization
- Browser token/session storage strategy
- Migration tool choice

## Verification State

```text
Frontend: intentionally empty; no build available
Backend: intentionally empty; no build available
Tests: not configured
Git: being initialized by the user
```

## Resume Point

When resuming, read `AGENTS.md`, this file, and `ROADMAP.md`. Do not scaffold code until the role and permission rules have been reviewed.
