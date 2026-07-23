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

## D-008 — Keep MVP Access At The Product Root Level

**Status:** Accepted
**Date:** 2026-07-22

### Decision

The MVP assigns user access at the product/root level only. A product assignment has one stored access level: `VIEW` or `EDIT`.

ControlPlane stores active grants only. A missing `user_product_access` row means the user has no access to that product. API responses may still derive `NONE` for admin access-management screens.

Resources and sub-resources remain part of the product structure, but they are not separately permissioned in the first release. If a user can access a product, they can inspect its resources and sub-resources according to the product access level.

Normal users see only assigned products in the MVP. Unassigned products do not need to be shown as disabled in normal user product lists.

`CUSTOM` and child-level overrides are deferred until after the core IAM flow works.

### Reason

This matches the existing frontend logic, keeps the first backend permission model clear, and avoids adding hierarchical permission complexity before authentication, product access, and authorization tests exist.

Storing only active grants keeps the database smaller and makes access queries safer: joined rows represent real access, while revocation is represented by deleting the active grant and writing an audit event.

### Alternative Considered

Store permissions independently at product, resource, and sub-resource levels, with `CUSTOM` representing mixed child permissions.

### Trade-off

The MVP is less granular, but it is easier to implement, test, explain, and evolve. Hierarchical permissions can be added later as a versioned expansion of the access model.
