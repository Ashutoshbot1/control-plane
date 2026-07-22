# Project Context

## Status

This is a working product brief. The overall direction, initial role capabilities, and MVP permission boundary are accepted.

## Product Summary

ControlPlane is an Identity and Access Management platform for an organization that operates multiple internal applications. It gives authorized administrators one place to invite users, manage roles, assign application access, configure product modules, and review security-sensitive activity.

## Problem

Organizations often manage access separately inside each internal tool. This creates inconsistent permissions, slow onboarding and offboarding, unclear ownership, excessive access, and poor auditability.

ControlPlane centralizes those decisions:

```text
Organization
  -> internal products/applications
  -> products, resources, and sub-resources
  -> users and roles
  -> explicit root-level access assignments
  -> auditable permission changes
```

## Intended Users

### Super Admin

The single highest-privilege account in ControlPlane. The super admin can do everything in the platform, including assigning the `ADMIN` role, managing products, managing users, managing user access, and viewing audit logs.

There should be only one super admin in the MVP.

### Admin

An administrator for normal operational work. An admin can invite users, manage user access, assign `VIEW` or `EDIT` access, and create, update, or delete products, resources, and sub-resources.

An admin cannot create another admin, assign the `SUPER_ADMIN` role, change their own privilege level, or bypass backend authorization rules.

### User

An end user of the managed products. A user can view products available to them and inspect the resources or sub-resources inside each accessible product. For each accessible product, the user can act only according to their assigned access level: `VIEW` or `EDIT`.

Unassigned products should appear disabled or unavailable in the frontend. Resources and sub-resources inside an accessible product inherit the product access level in the MVP. Frontend disabled states are usability rules only; the backend must still enforce authorization for every protected request.

## Domain Terminology

### Product

An internal application managed through ControlPlane, such as a sales dashboard, administration portal, analytics tool, or content manager.

### Resource

A major protected area or capability inside a product, such as reports, users, billing, content, or settings.

### Sub-resource

A narrower protected capability inside a resource, such as `reports.export`, `users.invite`, or `settings.api-keys`.

### Tool Role

A coarse platform-level role:

```text
SUPER_ADMIN
ADMIN
USER
```

### Product Access

The MVP assigns access at the product/root level:

```text
NONE
VIEW
EDIT
```

`NONE` or a missing assignment means the product is not usable by the user. The frontend may show it as disabled or unavailable, but backend authorization is still required.

Resource-level, sub-resource-level, and `CUSTOM` mixed permissions are deferred until after the core IAM flow is working.

## MVP Scope

- Email/password authentication
- Access-token and refresh-token lifecycle
- User invitation and account verification
- Forgot/reset password
- User listing and account-status management
- Three tool-level roles
- Product creation, update, listing, and removal
- Resource and sub-resource configuration
- User-to-product assignment
- Product-level `NONE`, `VIEW`, and `EDIT` permissions
- Backend authorization for every protected endpoint
- Security-sensitive audit logs
- Validation and consistent error responses
- Integration tests for authentication and authorization boundaries
- PostgreSQL migrations and seed data
- Docker-based local dependencies
- Deployed frontend and API

## Deferred Until After MVP

- Google authentication
- Redis caching
- Background email queues
- Real-time notifications
- Multiple organizations/tenants
- Custom roles
- Attribute-based access control
- Single sign-on and external identity providers
- Mobile application
- Microservices
- Resource-level custom permissions
- Sub-resource-level custom permissions
- `CUSTOM` mixed permission state

## Non-Goals

- Reproducing a commercial enterprise IAM suite
- Implementing OAuth or OpenID Connect as an identity provider
- Supporting every possible permission model
- Implementing hierarchical permission inheritance in the first release
- Migrating the entire frontend to TypeScript before backend integration
- Building infrastructure before core authorization is correct and tested

## Planned Architecture

```text
Next.js frontend
      -> Express + TypeScript REST API
      -> PostgreSQL

Later:
Express API -> Redis/BullMQ -> background worker
```

The backend will be a modular monolith. Initial modules are expected to include authentication, users, products, permissions, invitations, and audit logs.

## Resume Outcome

The finished project should demonstrate that its author can design and deliver a secure full-stack product with independent frontend and backend applications, relational modeling, hierarchical authorization, automated tests, operational tooling, and documented trade-offs.

## Open Product Questions

- What happens when a resource is removed while assignments exist?
- Should deactivated users retain historical audit references?
