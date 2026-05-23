# DevPulse

DevPulse is a lightweight issue tracking API built with Node.js, Express, TypeScript, and PostgreSQL. It supports user authentication, JWT-based authorization, issue creation, issue querying, and role-based update/delete permissions.

Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

## Features

- User signup and login with password hashing
- JWT authentication for protected routes
- Issue CRUD operations
- Role-based access control for issues:
  - `contributor`
  - `maintainer`
- Issue filtering via query parameters
- Automatic PostgreSQL table creation on startup

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- bcrypt
- JSON Web Tokens (`jsonwebtoken`)
- CORS
- dotenv
- tsx

## Getting Started

### Prerequisites

- Node.js (recommended v18+)
- PostgreSQL database

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=4000
CONNECTION_STRING=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret_here
```

### Run the Project

```bash
npm run dev
```

The server starts by default on the configured `PORT`. The project initializes the `users` and `issues` tables automatically when started.

## API Endpoints

### Authentication

#### POST `/api/auth/signup`

Registers a new user.

Body:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securePassword",
  "role": "contributor"
}
```

Response:
- `201 Created` on success

#### POST `/api/auth/login`

Logs in an existing user.

Body:

```json
{
  "email": "jane@example.com",
  "password": "securePassword"
}
```

Response:
- `200 OK` on success
- Returns a JWT token and user object

### Issues

> Protected issue routes require the JWT token in the `Authorization` header. The current implementation expects the raw token string, not a `Bearer` prefix.

#### POST `/api/issues`

Create a new issue.

Headers:
- `Authorization: <JWT token>`

Body:

```json
{
  "title": "Bug in login flow",
  "description": "When submitting the login form, the API returns 500.",
  "type": "bug"
}
```

Allowed roles:
- `contributor`
- `maintainer`

Response:
- `201 Created`

#### GET `/api/issues`

Retrieve issues with optional filters.

Query parameters:
- `sort=oldest` or omit for newest first
- `type=bug` or `type=feature-request`
- `status=open`, `in_progress`, or `resolved`

Response:
- `200 OK`

#### GET `/api/issues/:id`

Retrieve a single issue by ID.

Response:
- `200 OK` if found
- `404 Not Found` if missing

#### PUT `/api/issues/:id`

Update an issue.

Headers:
- `Authorization: <JWT token>`

Allowed roles:
- `contributor` (owns the issue and the issue is still open)
- `maintainer`

Body examples:

```json
{
  "title": "Updated issue title",
  "description": "Updated description details",
  "type": "feature-request"
}
```

Response:
- `200 OK` if updated
- `404 Not Found` if issue does not exist

#### DELETE `/api/issues/:id`

Delete an issue.

Headers:
- `Authorization: <JWT token>`

Allowed role:
- `maintainer`

Response:
- `200 OK` if deleted
- `404 Not Found` if issue does not exist

## Database Schema

### users

- `id` - serial primary key
- `name` - required string
- `email` - required unique string
- `password` - hashed string
- `role` - `contributor` or `maintainer` (default: `contributor`)
- `created_at` - timestamp
- `updated_at` - timestamp

### issues

- `id` - serial primary key
- `title` - required string (max 150)
- `description` - required string (minimum 20 chars)
- `type` - issue category
- `status` - `open` by default
- `reporter_id` - user ID who created the issue
- `created_at` - timestamp
- `updated_at` - timestamp

## Project Structure

- `src/server.ts` — app entry point
- `src/app.ts` — Express application setup
- `src/config/index.ts` — environment config loader
- `src/db/initDB.ts` — PostgreSQL pool and schema init
- `src/modules/auth/` — auth routes, controllers, and services
- `src/modules/issues/` — issue routes, controllers, and services
- `src/middleware/` — auth and update authorization middleware
- `src/utils/sendResponse.ts` — unified JSON response helper

## Notes

- The app uses `tsx watch` for development.
- JWTs expire in 1 day.
- The app loads `.env` from the project root.


