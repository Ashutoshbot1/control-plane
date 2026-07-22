# Project Context

## Status

This is a working product brief. The overall direction is agreed, while detailed role capabilities and permission inheritance rules still require explicit review before implementation.

## Product Summary

ControlPlane is an Identity and Access Management platform for an organization that operates multiple internal applications. It gives authorized administrators one place to invite users, manage roles, assign application access, configure resource-level permissions, and review security-sensitive activity.

## Problem

Organizations often manage access separately inside each internal tool. This creates inconsistent permissions, slow onboarding and offboarding, unclear ownership, excessive access, and poor auditability.

ControlPlane centralizes those decisions:

```text
Organization
  -> internal products/applications
  -> resources and sub-resources
  -> users and roles
  -> explicit access assignments
  -> auditable permission changes
```

## Intended Users

### Super Admin

Expected to control the IAM platform itself, including administrators and the highest-risk configuration. Exact restrictions require review before implementation.

### Admin

Expected to manage normal users, products, and access assignments within limits established by a super admin. An admin must never be able to grant permissions beyond their own authority.

### User

Expected to view only assigned products and use only the resources allowed by their effective permissions. A user cannot administer IAM configuration.

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

### Resource Access

An access level assigned within a product hierarchy:

```text
NONE
VIEW
EDIT
```

The precise inheritance and conflict-resolution rules are intentionally unresolved until the authorization model is designed.

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
- Resource-level `NONE`, `VIEW`, and `EDIT` permissions
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

## Non-Goals

- Reproducing a commercial enterprise IAM suite
- Implementing OAuth or OpenID Connect as an identity provider
- Supporting every possible permission model
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

- What exact actions distinguish `SUPER_ADMIN` from `ADMIN`?
- Can an admin create or modify products, or only assign existing access?
- Can a user hold different access levels at product, resource, and sub-resource levels?
- Does an explicit child permission override its parent?
- What happens when a resource is removed while assignments exist?
- Should deactivated users retain historical audit references?
