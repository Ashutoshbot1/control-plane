# ControlPlane

ControlPlane is a full-stack Identity and Access Management platform for managing user access across an organization's internal applications.

The project is currently in the planning and foundation stage. The frontend will be adapted from a permitted Next.js office project, while the backend will be independently designed and implemented with Express and TypeScript.

## Planned Capabilities

- User invitation, verification, login, logout, and password recovery
- Short-lived access tokens and rotating refresh tokens
- `SUPER_ADMIN`, `ADMIN`, and `USER` roles
- Internal product/application management
- Resource and sub-resource definitions
- `VIEW`, `EDIT`, and `NONE` resource access
- Backend-enforced authorization
- Security-sensitive activity and audit logs
- Automated integration and authorization tests
- Docker-based local development and CI/CD

## Planned Stack

### Frontend

- Next.js
- React
- TypeScript migration in incremental stages
- Zod and a form library when frontend forms are revised
- TanStack Query when server-state handling is revised

### Backend

- Node.js
- Express
- TypeScript
- PostgreSQL
- Zod
- Pino
- Vitest or Jest with Supertest
- Redis and BullMQ after the MVP

## Repository Structure

```text
controlplane/
├── frontend/     Next.js application
├── backend/      Express and TypeScript API
├── docs/         Product, architecture, progress, and learning records
├── AGENTS.md     Persistent collaboration and mentoring instructions
└── README.md
```

## Project Status

```text
Current phase: Database foundation
Frontend: Empty; permitted source has not yet been copied
Backend: Express/TypeScript foundation and users, invitations, and refresh-token migrations are complete
```

See [`docs/CURRENT_STATE.md`](docs/CURRENT_STATE.md) for the active task and [`docs/ROADMAP.md`](docs/ROADMAP.md) for milestone progress.

## Documentation

- [`PROJECT_CONTEXT.md`](docs/PROJECT_CONTEXT.md) — product problem, users, terminology, and scope
- [`ROADMAP.md`](docs/ROADMAP.md) — phased implementation checklist
- [`CURRENT_STATE.md`](docs/CURRENT_STATE.md) — short handoff for the next session
- [`DECISIONS.md`](docs/DECISIONS.md) — important engineering decisions and trade-offs
- [`API_CONTRACT.md`](docs/API_CONTRACT.md) — draft HTTP API conventions and endpoint inventory
- [`DATABASE_DESIGN.md`](docs/DATABASE_DESIGN.md) — draft entities, relationships, and constraints
- [`LEARNING_LOG.md`](docs/LEARNING_LOG.md) — project-specific reusable learning

## Local Development

Setup commands will be added after the frontend and backend packages are created. Do not infer installation instructions while these directories are empty.

## Security

This repository must use synthetic data and environment-variable examples only. Real credentials, tokens, internal endpoints, company data, and `.env` files must never be committed.
