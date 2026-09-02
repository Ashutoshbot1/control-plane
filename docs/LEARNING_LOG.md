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

## Database Migration Direction

Question or confusion:

Why does a migration need both `up` and `down`, and why must a custom enum type be created before the table that uses it?

Clarification:

`up` applies one schema change; `down` reverses it. PostgreSQL must know a custom enum type before a table can declare a column of that type. When reversing the users migration, the table is dropped before the enum because the table depends on the enum.

Small example:

```js
pgm.createType("user_role", ["SUPER_ADMIN", "ADMIN", "USER"]);
pgm.createTable("users", { role: { type: "user_role", notNull: true } });

pgm.dropTable("users");
pgm.dropType("user_role");
```

Why it matters:

Reversible migrations make local development, testing, and safe schema iteration predictable. Dependency order prevents database errors during both migration and rollback.

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

## Rotating Refresh Tokens And Session Recovery

Question or confusion:

If every successful refresh creates a new refresh token, what makes a refresh token long-lived, and what happens when access or refresh tokens expire?

Clarification:

An access token is short-lived and repeatedly used for protected APIs. A refresh token is long-lived but single-use: it remains valid until its family expiry unless it is presented to the refresh endpoint, where it is revoked and replaced. The successor retains the same absolute family expiry. Lost in-memory access tokens are restored with the httpOnly refresh cookie; an expired or invalid refresh token requires a new login.

Small example:

```text
R1 active, expires 30 Sep
R1 refreshes -> R1 revoked, R2 active, expires 30 Sep
R1 reused   -> revoke R2 and require login
```

Why it matters:

Rotation makes replay of an already-used refresh token detectable while preserving a usable browser session without storing long-lived credentials in JavaScript.

## Parent-Owned Names In A Resource Hierarchy

Question or confusion:

Why does `resources` store `product_id`, and why is its name unique only within that product?

Clarification:

A product has many resources, so the foreign key belongs on the many-side: `resources.product_id -> products.id`. `UNIQUE(product_id, name)` prevents duplicate labels under one product while allowing separate products to both have a resource called `Reports`. The same pattern applies to sub-resources with `UNIQUE(resource_id, name)`.

Why it matters:

This models the real parent-child hierarchy directly and prevents ambiguous permission-management labels without imposing unnecessary global uniqueness.

## Exactly-One Leaf Assignment

Question or confusion:

How can one assignment table safely target either a resource leaf or a sub-resource leaf without allowing ambiguous rows?

Clarification:

Store nullable `resource_id` and `sub_resource_id`, then enforce an exclusive-or rule with a database `CHECK`: one must be present and the other absent. Two partial unique indexes ensure a user can have only one active row for the same resource leaf or sub-resource leaf. Missing rows represent `NONE`; only `VIEW` and `EDIT` are stored.

Why it matters:

The database prevents invalid or duplicate grants even if a future service/controller has a validation bug.
