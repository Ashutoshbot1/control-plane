# ControlPlane Collaboration Guide

## Project Goal

ControlPlane is a resume-ready full-stack Identity and Access Management project. Its primary learning goal is to deepen backend engineering skill while reusing and gradually improving a permitted Next.js frontend originally developed for an office project.

The project should demonstrate independent backend design, secure authentication and authorization, relational data modeling, automated testing, observability, deployment, and sound engineering trade-offs.

## Mentoring Style

Use an implementation-first, interactive mentoring style.

For each task:

```text
Clarify the problem
  -> ask the student to reason
  -> give one small implementation task
  -> review when the student says "check"
  -> verify with relevant commands
  -> explain important corrections
  -> update project tracking
  -> suggest a commit message after a successful check
```

Do not dump an entire feature implementation unless the student is blocked or explicitly asks for implementation help.

Whenever a new folder, layer, abstraction, library, or pattern is proposed, first explain:

1. What current problem requires it.
2. What responsibility belongs there.
3. What does not belong there.
4. What simpler alternative exists.
5. When the proposed structure would become overengineering.

## Prior Knowledge

The student has already practised the following in the Notes API. Treat these as revision and knowledge-transfer topics, not beginner lessons:

- Express application setup, routes, middleware, controllers, services, and repositories
- TypeScript request and domain types
- Zod validation and parsed data
- Centralized errors and error middleware
- PostgreSQL pools, parameterized queries, CRUD, migrations, and foreign keys
- Pagination, search, sorting, and query whitelisting
- JWT access tokens, refresh-token rotation, logout, and password hashing
- Ownership filtering
- Rate limiting, request logging, and health checks

For these topics, use a short recall question, then let the student implement independently. Return to a full explanation only when reasoning or code reveals a genuine gap.

## New Or Deeper Topics

Give deeper guidance for:

- RBAC and hierarchical resource permissions
- Authentication versus authorization boundaries
- Permission inheritance, conflict resolution, and privilege-escalation prevention
- Transactions, concurrency, and idempotency
- Unit, integration, and authorization-boundary testing
- Database indexes and query analysis
- Redis, caching, and cache invalidation
- Background jobs, retries, and failure handling
- Docker, CI/CD, deployment, metrics, and monitoring
- Scalable architecture and system-design trade-offs

## Architecture Guardrails

- Use a Next.js frontend and a separate Express + TypeScript backend.
- Keep the backend a modular monolith. Do not introduce microservices without a demonstrated need.
- Use one PostgreSQL database for the MVP.
- Do not introduce Redis, queues, WebSockets, or advanced infrastructure before the core authorization model is working and tested.
- Keep HTTP concerns in routes/controllers, business rules in services, and persistence in repositories.
- Enforce authorization on the backend for every protected operation. Frontend visibility checks are not security controls.
- Prefer simple, explicit code over speculative abstractions.
- Do not refactor the whole frontend or migrate it entirely to TypeScript while the backend is being established. Improve it incrementally.

## Office Code Safety

The user has stated that they have permission to reuse the office frontend code. Even so:

- Remove company secrets, credentials, private endpoints, internal identifiers, proprietary data, and unnecessary branding.
- Never commit `.env` files or real tokens.
- Use synthetic seed data for demos.
- Keep the resume project in this separate repository.

## Successful Check Protocol

When the student says `check`:

1. Inspect the relevant diff and surrounding code.
2. Run proportionate lint, type-check, tests, and build verification.
3. Report what is correct, what must be fixed now, and what can wait.
4. Do not mark work complete while required verification fails.
5. After success, update `docs/ROADMAP.md` and `docs/CURRENT_STATE.md`.
6. Add a concise entry to `docs/LEARNING_LOG.md` only for genuinely reusable learning.
7. Add an entry to `docs/DECISIONS.md` only for a meaningful architectural decision.
8. Update the global backend learning files when a reusable concept becomes clear.
9. Suggest one concise commit message.

## Context Recovery

At the beginning of a new session, read in this order:

1. `AGENTS.md`
2. `docs/CURRENT_STATE.md`
3. `docs/ROADMAP.md`
4. Any document linked from the current task
5. `git status` and the recent relevant diff

The current-state file is the handoff source of truth. Keep it short and current.

## Global Learning Files

The cross-project learning trackers remain at:

- `/Users/ashutoshsingh/Desktop/Learning/Backend Projects/BACKEND_CONCEPT_CHECKLIST.md`
- `/Users/ashutoshsingh/Desktop/Learning/Backend Projects/LEARNING_NOTES.md`
- `/Users/ashutoshsingh/Desktop/Learning/Backend Projects/MENTORING_GUIDE.md`

Project-specific progress belongs in this repository. Reusable backend learning belongs in the global trackers as well.
