# Database Design

## Status

Conceptual draft. No migration should be written until the MVP database relationships are reviewed against the accepted role and product-access rules.

## Design Goals

- Keep authentication data separate from public user responses.
- Preserve referential integrity with explicit foreign keys.
- Enforce important uniqueness and nullability rules in PostgreSQL.
- Keep MVP access records at the product/root level.
- Preserve historical audit references when accounts are deactivated.
- Support transactional access updates.
- Add indexes from actual query patterns rather than guesswork.

## Initial Entity Model

```text
users
  ├── refresh_tokens
  ├── invitations (as inviter or accepted user)
  ├── user_product_access
  └── audit_logs (as actor or target)

products
  ├── resources
  │     └── sub_resources
  └── user_product_access
```

## Proposed Tables

### `users`

Purpose: authentication identity, profile, tool-level role, and account state.

Candidate fields:

```text
id
name
email
password_hash
role
status
created_at
updated_at
```

Important rules:

- Normalize email consistently and enforce uniqueness.
- Store password hashes only.
- Prefer deactivation over deleting users referenced by audit history.
- Decide whether roles use a PostgreSQL enum, check constraint, or role table.

### `refresh_tokens`

Purpose: revocable login sessions and refresh-token rotation.

Candidate fields:

```text
id
user_id
token_hash or token_selector + token_hash
expires_at
revoked_at
replaced_by_token_id
created_at
```

The Notes API scanned active bcrypt hashes. This project should evaluate a selector/token-family design that permits direct lookup and reuse detection.

### `invitations`

Purpose: controlled user onboarding.

Candidate fields:

```text
id
email
role
token_hash
invited_by_user_id
expires_at
accepted_at
revoked_at
created_at
```

### `products`

Purpose: internal applications controlled through ControlPlane.

Candidate fields:

```text
id
name
slug
description
launch_url
status
created_by_user_id
created_at
updated_at
```

### `resources`

Purpose: major protected capabilities within a product.

Candidate fields:

```text
id
product_id
name
key
description
created_at
updated_at
```

Candidate uniqueness:

```text
UNIQUE(product_id, key)
```

### `sub_resources`

Purpose: narrower capabilities within a resource.

Candidate fields:

```text
id
resource_id
name
key
description
created_at
updated_at
```

Candidate uniqueness:

```text
UNIQUE(resource_id, key)
```

### `user_product_access`

Purpose: declares that a user is assigned to a product and stores the MVP root-level access.

Candidate fields:

```text
id
user_id
product_id
access_level
granted_by_user_id
created_at
updated_at
```

Candidate uniqueness:

```text
UNIQUE(user_id, product_id)
```

Important rules:

- `access_level` is one of `VIEW` or `EDIT`.
- A missing assignment row means the user cannot use the product.
- Normal user product lists should return only assigned products.
- Admin access-management screens may derive `NONE` for products without an assignment.
- Resources and sub-resources remain product structure in the MVP, not separately permissioned targets.
- Resource-level, sub-resource-level, and `CUSTOM` permission designs are deferred.

### `audit_logs`

Purpose: immutable application history for security-sensitive actions.

Candidate fields:

```text
id
actor_user_id
action
target_type
target_id
metadata
request_id
ip_address
created_at
```

Important rules:

- Normal application flows must not update audit events.
- Avoid storing secrets, tokens, or password material in metadata.
- Decide how to retain an actor label if a user is later removed.
- Permission mutations and their audit events should commit atomically.

## Expected Relationships

```text
users 1 ─── * refresh_tokens
users 1 ─── * invitations as inviter
users * ─── * products through user_product_access
products 1 ─── * resources
resources 1 ─── * sub_resources
users 1 ─── * audit_logs as actor
```

## Deletion Principles

- User deactivation should normally preserve access and audit history for review, while authentication is blocked.
- Deleting a product must not silently destroy important audit history.
- Resource deletion may require archival or a transaction that handles dependent permissions deliberately.
- Cascades should be used only when dependent data has no independent historical value.

## Transaction Candidates

- Accept invitation and activate/create user
- Rotate refresh token
- Change role and write audit event
- Apply a product-access update and write audit events
- Revoke all access during offboarding
- Delete/archive hierarchy records and reconcile assignments

## Index Candidates

Do not create all of these automatically. Confirm them against query patterns:

- normalized unique user email
- active refresh-token selector
- invitation token selector and expiry
- product slug
- resources by product
- sub-resources by resource
- user-product assignment by user and product
- audit logs by actor, target, action, and creation time

## Open Database Decisions

- Single organization versus organization table in the MVP
- Tool-role representation
- Soft-delete strategy
- Refresh-token selector and reuse-detection design
- Migration library
- Timestamp/time-zone convention
