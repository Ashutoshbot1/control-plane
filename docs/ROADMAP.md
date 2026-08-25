# Project Roadmap

## Status Meanings

- `[ ]` Not started
- `[~]` In progress
- `[x]` Completed and verified

An implementation item is marked complete only after relevant verification passes.

## Phase 0 — Product And Repository Foundation

- `[x]` Create the project documentation skeleton
- `[x]` Record mentoring and context-recovery rules
- `[x]` Initialize the Git repository
- `[~]` Define the product problem and MVP boundary
- `[x]` Finalize role capabilities
- `[x]` Finalize MVP permission boundary
- `[ ]` Select the public product name and neutral branding
- `[ ]` Copy and sanitize the permitted frontend
- `[ ]` Verify no internal secrets, endpoints, identifiers, or data remain
- `[ ]` Establish clean baseline lint and build results

## Phase 1 — Backend Foundation

- `[x]` Create the Express and TypeScript package
- `[x]` Separate `app.ts` and `server.ts`
- `[x]` Add environment validation
- `[x]` Configure PostgreSQL connection pooling
- `[x]` Add health and readiness endpoints
- `[x]` Add centralized errors and response conventions
- `[ ]` Add Zod validation middleware
- `[ ]` Add structured request and error logging
- `[ ]` Add test runner and integration-test foundation
- `[x]` Add Docker Compose for local PostgreSQL

## Phase 2 — Database Foundation

- `[x]` Choose and configure a migration workflow
- `[x]` Create users and roles schema
- `[ ]` Create products, resources, and sub-resources schema
- `[ ]` Create access-assignment schema
- `[x]` Create refresh-token and invitation schema
- `[ ]` Create audit-log schema
- `[ ]` Add development seed data
- `[ ]` Review foreign keys, delete behavior, uniqueness, and nullability

## Phase 3 — Authentication And Account Lifecycle

- `[ ]` Invite a user
- `[ ]` Verify an invited account
- `[ ]` Set an initial password securely
- `[ ]` Log in with email and password
- `[ ]` Issue a minimal access token
- `[ ]` Store hashed refresh tokens
- `[ ]` Rotate refresh tokens
- `[ ]` Log out by revoking the active refresh token
- `[ ]` Request and complete a password reset
- `[ ]` Rate-limit sensitive authentication endpoints
- `[ ]` Test successful and unsuccessful authentication flows

## Phase 4 — Users And Tool Roles

- `[ ]` List and search users
- `[ ]` View a user profile
- `[ ]` Update allowed profile fields
- `[ ]` Activate or deactivate an account
- `[ ]` Assign and change tool-level roles
- `[ ]` Prevent unauthorized role changes
- `[ ]` Prevent privilege escalation
- `[ ]` Test every role-management boundary

## Phase 5 — Products And Resource Hierarchy

- `[ ]` Create, read, update, and remove products
- `[ ]` Define resources within a product
- `[ ]` Define sub-resources within a resource
- `[ ]` Validate hierarchy ownership
- `[ ]` Decide safe deletion and archival behavior
- `[ ]` Add pagination, filtering, search, and sorting where useful
- `[ ]` Test product and hierarchy operations

## Phase 6 — Permission Engine

- `[ ]` Assign a resource or sub-resource leaf to a user
- `[ ]` Grant `VIEW` or `EDIT` access
- `[ ]` Revoke access explicitly
- `[ ]` Calculate effective permissions
- `[ ]` Enforce permissions in backend middleware/services
- `[ ]` Prevent grants beyond the actor's authority
- `[ ]` Apply multi-change updates transactionally
- `[ ]` Make sensitive mutations idempotent where needed
- `[ ]` Test allow, deny, leaf-access, and escalation cases

## Phase 7 — Audit Logging

- `[ ]` Define auditable event types
- `[ ]` Record actor, target, action, and timestamp
- `[ ]` Record permission and role changes transactionally
- `[ ]` List audit events with pagination and filters
- `[ ]` Protect audit-log access
- `[ ]` Prevent normal application flows from modifying historical events
- `[ ]` Test audit creation and access boundaries

## Phase 8 — Frontend Integration

- `[ ]` Centralize frontend API configuration
- `[ ]` Choose one consistent browser authentication strategy
- `[ ]` Replace office authentication APIs
- `[ ]` Replace dashboard and product APIs
- `[ ]` Replace user and role APIs
- `[ ]` Replace permission APIs
- `[ ]` Replace activity-log APIs
- `[ ]` Add consistent loading, error, and empty states
- `[ ]` Verify frontend role checks are only UX controls
- `[ ]` Add critical frontend tests

## Phase 9 — Production Hardening

- `[ ]` Add security headers and deliberate CORS configuration
- `[ ]` Validate request content types and size limits
- `[ ]` Review secret and token handling
- `[ ]` Add database indexes based on query patterns
- `[ ]` Inspect important queries with `EXPLAIN`
- `[ ]` Add graceful shutdown and pool cleanup
- `[ ]` Add liveness and readiness checks
- `[ ]` Add structured production logging
- `[ ]` Add security-focused integration tests

## Phase 10 — Delivery And Resume Readiness

- `[ ]` Dockerize frontend and backend
- `[ ]` Add GitHub Actions for lint, type-check, tests, and build
- `[ ]` Deploy PostgreSQL, API, and frontend
- `[ ]` Add synthetic demo data and a demo account
- `[ ]` Complete public README and setup instructions
- `[ ]` Publish API documentation
- `[ ]` Add an architecture diagram
- `[ ]` Add screenshots and a short demo video
- `[ ]` Document important trade-offs and known limitations
- `[ ]` Prepare resume bullets and interview explanation

## Post-MVP Learning Releases

- `[ ]` Add Redis only for a demonstrated caching or coordination need
- `[ ]` Add BullMQ for invitations or notification jobs
- `[ ]` Add retries, backoff, and failed-job handling
- `[ ]` Add metrics and monitoring
- `[ ]` Add multi-tenant organizations
- `[ ]` Evaluate custom roles or attribute-based policies
- `[ ]` Incrementally migrate remaining frontend JavaScript to TypeScript
