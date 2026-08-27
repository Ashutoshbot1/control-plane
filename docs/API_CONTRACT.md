# API Contract

## Status

Draft endpoint inventory. Routes and payloads must be finalized only after role capabilities, leaf-level access rules, and database relationships are agreed.

## Base Convention

```text
Base path: /api/v1
Content type: application/json
Authentication: protected endpoints require an authenticated session/access token
```

Versioning is included because the frontend and backend are independently deployable clients and services. It is not permission to maintain multiple versions prematurely.

## Browser Session Strategy

```text
Access token: returned in JSON and stored in frontend memory only
Refresh token: stored in an httpOnly cookie
Protected API calls: use Authorization: Bearer <access_token>
Refresh calls: browser sends the refresh cookie automatically
```

On page reload, the frontend loses the in-memory access token and calls `POST /api/v1/auth/refresh` to restore the session if the refresh cookie is still valid.

Refresh tokens are rotated. Logout revokes the active refresh token and clears the refresh cookie.

For a protected-route `401`, the frontend may make one refresh-and-retry attempt. It must not refresh after the refresh endpoint itself returns `401`, must retry the original request at most once, and must clear auth state and show login if refresh fails. `403` responses must not trigger token refresh.

## Response Conventions

Proposed success response:

```json
{
  "success": true,
  "message": "User fetched successfully",
  "data": {}
}
```

Proposed validation/client error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

Unexpected server errors must not expose stack traces or internal details.

## Status-Code Principles

- `200` successful reads and normal updates
- `201` resource created
- `204` successful operation with no response body when appropriate
- `400` malformed or invalid input
- `401` missing, invalid, or expired authentication
- `403` authenticated but not authorized
- `404` resource unavailable to the caller
- `409` uniqueness, version, or state conflict
- `429` rate limit exceeded
- `500` unexpected internal failure

For protected resources, returning `404` instead of `403` may be appropriate when revealing existence would leak information.

## Endpoint Inventory

### System

```text
GET /health
GET /ready
```

### Authentication

```text
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
POST /api/v1/auth/forgot-password
POST /api/v1/auth/reset-password
POST /api/v1/auth/verify-invitation
```

### Authentication Endpoint Behavior

```text
POST /auth/login
  200 -> access token in JSON; refresh token set as an httpOnly cookie

POST /auth/refresh
  200 -> new access token in JSON; old refresh token revoked and replacement cookie set
  401 -> missing, invalid, revoked, expired, or reused refresh token; no replacement issued

POST /auth/logout
  204 -> active refresh token revoked when present; refresh cookie cleared; no replacement issued
```

On app startup, missing in-memory access state triggers one refresh attempt so a valid refresh cookie can restore the session. The frontend must coordinate simultaneous `401` responses so only one refresh request runs; pending requests wait for its result.

### Invitations

```text
POST   /api/v1/invitations
GET    /api/v1/invitations
DELETE /api/v1/invitations/:invitationId
```

### Users

```text
GET   /api/v1/users
GET   /api/v1/users/:userId
PATCH /api/v1/users/:userId
PATCH /api/v1/users/:userId/status
PATCH /api/v1/users/:userId/role
```

### Products

```text
GET    /api/v1/products
POST   /api/v1/products
GET    /api/v1/products/:productId
PATCH  /api/v1/products/:productId
DELETE /api/v1/products/:productId
```

### Resources

```text
POST   /api/v1/products/:productId/resources
PATCH  /api/v1/products/:productId/resources/:resourceId
DELETE /api/v1/products/:productId/resources/:resourceId
```

### Sub-resources

```text
POST   /api/v1/resources/:resourceId/sub-resources
PATCH  /api/v1/resources/:resourceId/sub-resources/:subResourceId
DELETE /api/v1/resources/:resourceId/sub-resources/:subResourceId
```

### User Access

```text
GET    /api/v1/users/:userId/access
PUT    /api/v1/users/:userId/products/:productId/access
PATCH  /api/v1/users/:userId/products/:productId/permissions
DELETE /api/v1/users/:userId/products/:productId/access
```

The exact mutation shape is unresolved. A transactional bulk permission update is preferable to many fragile single-checkbox network requests, but idempotency and concurrency behavior must be designed first.

### Audit Logs

```text
GET /api/v1/audit-logs
GET /api/v1/audit-logs/:auditLogId
```

## List Query Convention

Where applicable:

```text
?page=1
&limit=20
&search=ashutosh
&sortBy=created_at
&order=desc
```

Example pagination metadata:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 0,
    "totalPages": 0,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

## Security Rules

- Treat every route handler as publicly reachable.
- Validate params, query, body, and relevant headers.
- Authenticate before loading sensitive data.
- Authorize against the target resource and requested action.
- Never trust a role or permission sent by the frontend.
- Never accept ownership or actor identity from the request body.
- Apply rate limits to authentication and invitation flows.
- Record security-sensitive mutations in audit logs.

## Open Contract Decisions

- Cookie-based versus authorization-header access-token delivery
- Refresh-token cookie behavior
- Bulk permission mutation payload and concurrency control
- Soft deletion versus hard deletion responses
- Audit-log filtering dimensions
- Whether product/resource hierarchy creation uses nested or separate routes
