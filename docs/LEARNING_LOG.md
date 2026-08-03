# Project Learning Log

This file records reusable concepts clarified while building ControlPlane. It should not become a diary of every task or a duplicate of Git history.

## Entry Format

```md
## Concept

Question or confusion:

Clarification:

Small example:

Why it matters:
```

## Prior-Knowledge Baseline

These concepts were already practised in the Notes API and should receive revision-level guidance:

- Express request lifecycle and middleware
- Routes, controllers, services, and repositories
- Zod runtime validation
- Centralized application errors
- PostgreSQL CRUD, migrations, foreign keys, and connection pools
- Pagination, search, sorting, and parameterized SQL
- JWT access tokens and rotating refresh tokens
- Password hashing and logout revocation
- Ownership filtering
- Rate limiting and request logging

## Expected New Learning

- Hierarchical RBAC and resource permissions
- Effective-permission calculation
- Allow/deny and inheritance rules
- Privilege-escalation prevention
- Authorization-boundary testing
- Transactions and concurrency
- Idempotent security mutations
- Efficient refresh-token lookup and reuse detection
- Audit-log integrity
- Index selection and query analysis
- Redis caching and invalidation
- Background jobs and failure handling
- CI/CD, deployment, metrics, and monitoring

## Entries

## Higher-Order Async Route Wrapper

Question or confusion:

How can `asyncHandler(healthCheck)` pass `req`, `res`, and `next` to `healthCheck`, and why does TypeScript allow a controller to ignore `next`?

Clarification:

`asyncHandler` is a higher-order function. It receives a controller during route setup and returns a new Express route handler. Later, Express calls that returned handler with `req`, `res`, and `next`. The wrapper then calls the original controller and forwards rejected promises to `next`.

Small example:

```ts
router.get("/", asyncHandler(healthCheck));
```

This is similar to:

```ts
router.get("/", (req, res, next) => {
  Promise.resolve(healthCheck(req, res, next)).catch(next);
});
```

Why it matters:

It avoids repeating `try/catch` in every async controller while still sending errors to the centralized error middleware. A controller may accept fewer parameters because JavaScript ignores extra arguments.
