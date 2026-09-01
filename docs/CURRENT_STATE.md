# Current State

Last updated: 2026-09-01

## Current Phase

Phase 2 — Database foundation.

## Completed

- Created the initial repository documentation structure.
- Recorded the mentoring, prior-knowledge, verification, and context-recovery rules.
- Chosen the high-level architecture: Next.js frontend plus a separate Express and TypeScript backend.
- Chosen a modular monolith for the backend.
- Drafted the product scope, roadmap, API surface, and database entities.
- Scaffolded the backend as a separate Express and TypeScript package.
- Separated `app.ts` and `server.ts`.
- Added strict `PORT` loading and validation through `src/config/env.ts`.
- Added `GET /health`.
- Added a base 404 JSON handler.
- Added centralized error middleware and `AppError`.
- Added `asyncHandler` for wrapping async controllers.
- Added TypeScript project configuration and a `typecheck` script.
- Finalized the initial `SUPER_ADMIN`, `ADMIN`, and `USER` role capabilities.
- Finalized the MVP permission boundary: leaf-level access only.
- Accepted active-grants-only storage: no access-assignment row means no access.
- Accepted invited-user storage: create `users` rows with a nullable `password_hash`; keep invitation lifecycle state in `invitations`, then set the password on acceptance.
- Accepted invitation token storage: selector plus hashed secret, with accepted/revoked rows retained.
- Accepted refresh-token storage: selector plus hashed secret for efficient lookup and safe rotation.
- Accepted product setup rule: product creation includes at least one resource in the same transaction.
- Accepted sub-resource rule: sub-resources are optional; standalone resources can receive access directly.
- Accepted deletion behavior: archive products, resources, and sub-resources instead of hard-deleting.
- Accepted audit-log shape: actor/target display snapshots, login/logout events, and append-only security history.
- Accepted single-organization MVP: no organizations table or tenant isolation in the first release.
- Accepted browser token strategy: in-memory access token plus httpOnly refresh-token cookie with rotation.
- Accepted migration tool: `node-pg-migrate`.
- Configured a PostgreSQL `Pool` using the validated `DATABASE_URL`.
- Added `GET /ready`, which verifies database connectivity with `SELECT 1 AS ok`.
- Added Docker Compose for local PostgreSQL; the container exposes PostgreSQL on host port `5434` to avoid the existing local PostgreSQL service on port `5432`.
- Installed and configured `pg` and `node-pg-migrate`.
- Created and applied the initial `users` schema migration.
- Added the `user_role` enum: `SUPER_ADMIN`, `ADMIN`, and `USER`.
- Created the `users` table with unique email, nullable password hash for invitation onboarding, nullable `deactivated_at`, and timestamp defaults.
- Created and applied the `invitations` schema migration with selector-plus-hash token storage, inviter and invited-user references, expiry, acceptance, and revocation timestamps.
- Added a constraint preventing an invitation from being both accepted and revoked.
- Created and applied the `refresh_tokens` schema migration with selector-plus-hash token storage, expiry and revocation timestamps, and a self-reference for token rotation chains.
- Added a constraint preventing a refresh token from replacing itself.
- Created and applied the `products`, `resources`, and `sub_resources` migrations with the product-to-resource-to-sub-resource foreign-key hierarchy.
- Added global product-name uniqueness and per-parent resource/sub-resource name uniqueness constraints.
- Added nullable `archived_at` and required creation/update timestamps to each hierarchy table.

## In Progress

- The remaining database schema is in progress.

## Next Task

Create the access-assignment schema for resource and sub-resource leaves.

## Known Blockers

None.

## Important Open Decisions

None blocking backend scaffolding.

## Verification State

```text
Frontend: intentionally empty; no build available
Backend: `npm run typecheck` passes; `/health` and database-backed `/ready` are available
Database: local Docker PostgreSQL is configured; users, invitations, refresh-token, and product-hierarchy migrations are applied and verified, including rollback and re-apply of the latest migration
Tests: not configured yet
Git: main matches origin; the current authentication-lifecycle documentation changes are uncommitted
```

## Resume Point

When resuming, read `AGENTS.md`, this file, and `ROADMAP.md`. Continue Phase 2 in `backend/` by designing and migrating resource/sub-resource access assignments.
