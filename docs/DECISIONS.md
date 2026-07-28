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

**Status:** Accepted
**Date:** 2026-07-23

### Decision

Model the MVP for one organization managing multiple internal products. Introduce organization-level multi-tenancy after the first deployed release.

### Reason

The existing frontend assumes one organizational context. Deferring tenancy reduces schema and authorization complexity while preserving a clear future extension.

### Trade-off

Tenant isolation will not be demonstrated in the first release.

## D-007 — Use One Super Admin And Operational Admins

**Status:** Accepted
**Date:** 2026-07-22

### Decision

ControlPlane has exactly one `SUPER_ADMIN` in the MVP. The super admin can perform every platform action, including assigning the `ADMIN` role.

`ADMIN` users handle normal operational management: inviting users, assigning `VIEW` or `EDIT` access, managing user access, and creating, updating, or deleting products, resources, and sub-resources.

`USER` accounts can view available products and use only accessible resources or sub-resources according to their effective `VIEW` or `EDIT` permission.

### Reason

This keeps the MVP authorization model understandable while still demonstrating real backend authorization boundaries and privilege-escalation prevention.

### Security Rules

- Only the super admin can assign or remove the `ADMIN` role.
- No admin can assign `SUPER_ADMIN`.
- No admin can change their own privilege level.
- Frontend disabled states are only user experience. Backend authorization remains mandatory for every protected operation.

### Trade-off

A single super admin simplifies the first release, but later multi-organization support may require organization owners or scoped super-admin equivalents.

## D-008 — Keep MVP Access At The Leaf Level

**Status:** Accepted
**Date:** 2026-07-22

### Decision

The MVP assigns user access at the deepest configured level. A leaf assignment has one stored access level: `VIEW` or `EDIT`.

If a resource has no sub-resources, access is assigned directly on the resource. If a resource has sub-resources, access is assigned on those sub-resources, not on the parent resource.

Product access is derived. A user can see a product when they have `VIEW` or `EDIT` access to at least one resource or sub-resource inside that product.

ControlPlane stores active grants only. A missing access-assignment row means the user has no access to that leaf. API responses may still derive `NONE` for admin access-management screens.

Normal users see only products with at least one accessible leaf. Products with no accessible leaves do not need to be shown as disabled in normal user product lists.

There is no parent-to-child inheritance and no `CUSTOM` permission state in the MVP.

### Reason

This matches the intended frontend logic while keeping the backend model simpler than full hierarchical inheritance. Access is explicit at one level only: the leaf level.

Storing only active grants keeps the database smaller and makes access queries safer: joined rows represent real access, while revocation is represented by deleting the active grant and writing an audit event.

### Alternative Considered

Store permissions at the product level only, or store permissions independently at product, resource, and sub-resource levels with inheritance and `CUSTOM` mixed states.

### Trade-off

Leaf-level access is more granular than product-level access, but still simpler than inherited hierarchical permissions. The backend must validate that resource assignments target standalone resources and sub-resource assignments target real sub-resources.

## D-009 — Archive Product Hierarchy Records Instead Of Hard Deleting

**Status:** Accepted
**Date:** 2026-07-23

### Decision

Products, resources, and sub-resources are archived instead of hard-deleted in the MVP.

Archived hierarchy records are hidden from normal user flows and treated as unavailable during access checks. Admin screens may expose archived records with filters when needed.

Access assignments and audit logs remain readable after archival.

### Reason

Archival avoids forcing admins to manually remove many access assignments before deleting a resource, while preserving security history and keeping audit logs understandable.

### Alternative Considered

Block deletion until all related access assignments are removed, or hard-delete records and cascade dependent access rows.

### Trade-off

Archival requires status filtering in queries, but it avoids losing important historical context.

## D-010 — Store Audit Display Snapshots

**Status:** Accepted
**Date:** 2026-07-23

### Decision

Audit logs store structured IDs plus display snapshots for the actor and target user:

```text
actor_user_id
actor_name
actor_role
action
target_user_id
target_user_name
target_user_role
target_type
target_id
metadata
```

The admin-facing audit view should be able to show:

```text
Actor Name | Actor Role | Action | Target User Name | Target User Role | Time
```

Login and logout are included in MVP audit events.

### Reason

IDs keep audit logs linkable to current records, while display snapshots preserve what the log meant when the event happened. This matters because user names and roles can change later.

### Security Rules

- Do not store passwords, raw tokens, token hashes, or secrets in audit metadata.
- Write audit logs in the same transaction as important security mutations where practical.
- Treat audit logs as append-only in normal application flows.

### Trade-off

Snapshot fields duplicate some user data, but they make historical logs easier to understand and safer to display.

## D-011 — Store Access Token In Memory And Refresh Token In HttpOnly Cookie

**Status:** Accepted
**Date:** 2026-07-28

### Decision

ControlPlane uses this browser session strategy:

```text
Access token: short-lived and stored in frontend memory only
Refresh token: longer-lived and stored in an httpOnly Secure SameSite cookie
Protected API calls: Authorization Bearer access token
Refresh endpoint: cookie-based
```

On page reload, the in-memory access token is lost. The frontend calls `POST /api/v1/auth/refresh`; if the refresh cookie is valid, the backend rotates the refresh token and returns a new access token.

### Reason

This limits long-lived token exposure to JavaScript while keeping API authorization explicit through the `Authorization` header.

### Security Rules

- Do not store access tokens in `localStorage` or `sessionStorage`.
- Do not expose refresh tokens to frontend JavaScript.
- Rotate refresh tokens on refresh.
- Revoke refresh tokens on logout and sensitive account events.
- Use `Secure` cookies in production.

### Trade-off

The frontend must restore the session after page reload by calling the refresh endpoint, and cross-origin deployments require deliberate CORS and cookie configuration.

## D-012 — Use node-pg-migrate For Database Migrations

**Status:** Accepted
**Date:** 2026-07-28

### Decision

Use `node-pg-migrate` for PostgreSQL schema migrations in the Express backend.

### Reason

`node-pg-migrate` gives proper migration tracking while keeping PostgreSQL schema design visible. It fits the project goal better than hiding too much database behavior behind a full ORM.

### Alternative Considered

Prisma migrations, Drizzle migrations, and a custom raw-SQL migration runner.

### Trade-off

The project will write more SQL/schema detail directly, but that supports the backend learning goal.
