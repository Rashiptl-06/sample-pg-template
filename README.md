# Sample PostgreSQL Template

A clean, reusable backend template using **Node.js 18 + TypeScript + Express 5 + Sequelize 6 + PostgreSQL**.

This template is extracted from a production project and provides a fully-wired architecture that is ready to extend for any new PostgreSQL-based API service.

## Architecture

```
Request
  → Global Middleware (helmet, compression, log4js, requestId, JWT decode, CORS)
  → Route
  → Controller
  → Service (extends BaseService with authorization)
  → Repository
  → Sequelize Model
  → PostgreSQL
```

### Folder Structure

```
src/
├── index.ts            # Entry point — boots server, mounts routes
├── app.ts              # Express app setup, global middleware
├── server.ts           # HTTP server creation
├── swagger.json.ts     # OpenAPI spec
├── config/             # Environment variable configuration
├── controllers/        # HTTP request/response handlers (thin layer)
├── db/                 # Sequelize singleton connection
├── exceptions/         # Typed error hierarchy (AppError and subclasses)
├── interfaces/         # TypeScript contracts (entities, requests, responses)
├── models/             # Sequelize model definitions
├── repositories/       # Data access layer (Sequelize queries)
├── routes/             # Express route definitions
├── services/           # Business logic (extends BaseService)
├── types/              # Express type augmentation
├── utils/
│   ├── middlewares/    # All Express middleware
│   ├── asyncContext.ts # AsyncLocalStorage for request-scoped logging
│   ├── logging.ts      # log4js configuration with requestId token
│   ├── Http.ts         # Axios HTTP client
│   ├── QueryBuilder.ts # Fluent SQL query builder
│   └── ...
└── validation/         # fastest-validator schemas
```

## Requirements

- Node.js 18+
- PostgreSQL 14+

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

Create a `.env` file or export these variables:

```env
PORT=3000
NODE_ENV=development
POSTGRES_URL=postgres://admin:admin123@localhost:5432/sampledb
```

`POSTGRES_URL` is **required** — the app exits on startup if it is missing.

### 3. Run database migrations

```bash
npm run db:migrate:up
```

This creates the `testing` table:

| Column    | Type         | Constraint           |
|-----------|--------------|----------------------|
| id        | INTEGER      | Primary Key, Auto Inc|
| name      | VARCHAR(255) | NOT NULL             |
| createdAt | TIMESTAMP    | Auto-managed         |
| updatedAt | TIMESTAMP    | Auto-managed         |

### 4. Start development server

```bash
npm run dev
```

### 5. Test the endpoint

```bash
curl http://localhost:3000/healthcheck
# → "OK"

curl http://localhost:3000/api/v1/testingdata \
  -H "Authorization: Bearer <your-jwt-token>"
# → { "data": [] }
```

### 6. View API docs

Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs) in your browser.

## Docker

### Start with Docker Compose

```bash
sh start.sh
# or
docker-compose up -d
```

This starts:
- `sample-pg-template-app` — the API on port `9012`
- `sample-pg-template-pg` — PostgreSQL 14 on port `15434`

### Stop

```bash
sh stop.sh
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start in development mode (nodemon + ts-node) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run compiled production build |
| `npm run type-check` | TypeScript type checking (no emit) |
| `npm run eslint` | Lint source files |
| `npm run format` | Format with Prettier |
| `npm run db:migrate:up` | Run pending migrations |
| `npm run db:migrate:down` | Undo last migration |

## Sample Endpoint

### `GET /api/v1/testingdata`

Returns all records from the `testing` table.

**Requires:** Bearer JWT token in `Authorization` header.

**Response:**
```json
{
  "data": [
    { "id": 1, "name": "Sample", "createdAt": "...", "updatedAt": "..." }
  ]
}
```

## Error Handling

All errors are funnelled through the global `errorHandler` middleware. The exception hierarchy is:

| Class | HTTP Status | Type |
|-------|-------------|------|
| `AppError` | 400 | Base class |
| `ValidationError` | 400 | `invalid_request` |
| `InvalidRequestError` | 400 | `invalid_request` |
| `InvalidLicenseError` | 400 | `invalid_license` |
| `UnauthorizedError` | 401 | `unauthorized` |
| `ForbiddenError` | 403 | `forbidden` |
| `NotFoundError` | 404 | `resource_not_found` |
| `ConditionalBadRequest` | 412 | `action_not_allowed` |
| `ServerError` | 500 | `server_error` |

## Authorization

`BaseService.authorize(permission, user)` checks the JWT-decoded user's `role` field:

- `view` — any authenticated user
- `create`, `edit`, `delete`, `suspend`, `enable` — `admin` or `root` role only

## Extending the Template

1. Add a new table: create a migration in `migrations/`, a Sequelize model in `src/models/`, and register the table name in `src/repositories/tableNames.ts`.
2. Add a repository in `src/repositories/`.
3. Add a service in `src/services/` (extend `BaseService`).
4. Add a controller in `src/controllers/`.
5. Add a route in `src/routes/` and mount it in `src/index.ts`.
6. Add validation schemas in `src/validation/`.
7. Document the endpoint in `src/swagger.json.ts`.

## Logging

Log lines include `[timestamp] [level] category - requestId - message`.

Override the logger configuration by setting `LOGGER_CONFIG` to a JSON-encoded log4js `Configuration` object.
