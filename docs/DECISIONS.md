# Engineering Decisions

This log records decisions that materially affect architecture, security, scope, or operations. It should not record routine implementation details.

## D-001 — Use One Repository For The Full-Stack Product

**Status:** Accepted  
**Date:** 2026-07-22

### Decision

Keep the frontend, backend, documentation, and delivery configuration in one Git repository.

### Reason

One repository keeps coordinated frontend/backend changes, API documentation, CI, and project context together. The frontend and backend remain separate packages and can still be deployed independently.

### Alternative Considered

Separate frontend and backend repositories.

### Trade-off

A monorepo requires clear package boundaries, but it reduces coordination overhead for a solo learning project.

## D-002 — Use Next.js For Frontend And Express For Backend

**Status:** Accepted  
**Date:** 2026-07-22

### Decision

Use the permitted Next.js application as the frontend and build an independent Express + TypeScript REST API.

### Reason

The student already has meaningful Next.js experience. A standalone API gives stronger practice and evidence in backend design, authorization, testing, deployment, and operations.

### Alternative Considered

Use Next.js Route Handlers and Server Actions for all backend behavior.

### Trade-off

The separate API adds CORS, authentication-integration, deployment, and contract-management work.

## D-003 — Start With A Modular Monolith

**Status:** Accepted  
**Date:** 2026-07-22

### Decision

Organize the backend by business modules while deploying it as one service using one PostgreSQL database.

Expected modules include authentication, users, products, permissions, invitations, and audit logs.

### Reason

The domain is larger than the Notes API, so feature grouping prevents global controller/service/repository folders from becoming crowded. A single service keeps transactions, testing, and deployment manageable.

### Alternative Considered

Microservices or purely technical top-level folders.

### Trade-off

Module boundaries require discipline, but they must not become artificial internal frameworks.

## D-004 — Reuse The Permitted Frontend Incrementally

**Status:** Accepted  
**Date:** 2026-07-22

### Decision

Copy and sanitize the permitted office frontend, replace its API integrations module by module, and improve its architecture and UI incrementally.

### Reason

This preserves work the student understands and concentrates new effort on backend learning.

### Alternative Considered

Rebuild the frontend from scratch.

### Trade-off

The copied frontend contains existing lint, state-management, and authentication inconsistencies that must be corrected without allowing frontend refactoring to consume the backend schedule.

## D-005 — Defer Advanced Infrastructure

**Status:** Accepted  
**Date:** 2026-07-22

### Decision

Do not add Redis, BullMQ, WebSockets, microservices, or complex observability until core authentication and authorization work and have integration tests.

### Reason

Infrastructure should solve demonstrated problems. Early additions would increase moving parts before the security model is reliable.

## D-006 — Begin With A Single Organization

**Status:** Proposed; requires confirmation  
**Date:** 2026-07-22

### Proposed Decision

Model the MVP for one organization managing multiple internal products. Introduce organization-level multi-tenancy after the first deployed release.

### Reason

The existing frontend assumes one organizational context. Deferring tenancy reduces schema and authorization complexity while preserving a clear future extension.

### Trade-off

Tenant isolation will not be demonstrated in the first release.
