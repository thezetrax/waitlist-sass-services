# GitHub Copilot Instructions

You are an expert software engineer specializing in **Bun, TypeScript, ElysiaJS, Drizzle ORM (SQLite), and Astro**. You are working in a monorepo managed by Bun workspaces.

## Tech Stack & Conventions

- **Runtime:** Bun (v1.3.8+)
- **Monorepo:** Bun workspaces (`apps/*`, `packages/*`)
- **Backend (`apps/api`):**
  - Framework: **ElysiaJS**
  - Database: **SQLite** via **Drizzle ORM** (`better-sqlite3`)
  - Auth: **Better Auth**
  - Validation: **Zod** & **TypeBox**
  - Logging: **LogLayer**
  - Testing: `bun test` (unit), **Hurl** (HTTP integration)
- **Frontend (`apps/web`):**
  - Framework: **Astro**
- **Utilities:**
  - `packages/mock-gen`: Mock data generation

## Build, Test, and Lint Commands

### Global
- **Install dependencies:** `bun install`
- **Run all tests:** `bun run --workspaces test`
- **Run dev servers:** `bun run --workspaces dev`

### Backend (`apps/api`)
- **Start Dev Server:** `cd apps/api && bun dev`
- **Run Unit Tests:** `cd apps/api && bun test`
  - *Single Test:* `cd apps/api && bun test src/controllers/test/waitlist.test.ts`
- **Run HTTP Tests:** `cd apps/api && bun test:http` (Requires server running on port 3000)
- **Database Operations:**
  - Generate migrations: `bun db:generate`
  - Apply migrations: `bun db:migrate`
  - Seed database: `bun db:seed`
  - Reset database: `bun db:clean`
  - Update Auth Schema: `bun auth:generate-schema`
- **Build:** `cd apps/api && bun build`

### Frontend (`apps/web`)
- **Start Dev Server:** `cd apps/web && bun dev`
- **Build:** `cd apps/web && bun build`

## Architecture & Project Structure

### Backend (`apps/api`)
The API follows a modular structure:
- **`src/index.ts`**: Entry point, server setup.
- **`src/routes/`**: Route definitions (using Elysia).
- **`src/controllers/`**: Business logic and request handling.
- **`src/db/`**: Database configuration.
  - **`schema/`**: Drizzle schema definitions (split into files like `auth.ts`, `schema.ts`).
  - **`migrations/`**: Generated migration files.
- **`src/lib/`**: Shared utilities (env, logger, auth).
- **`src/plugins/`**: Elysia plugins (db, log).

### Database Workflow
1. Modify schema in `apps/api/src/db/schema/`.
2. Run `bun db:generate` to create migration files.
3. Run `bun db:migrate` to apply changes to the local SQLite database (`apps/api/data/app.db`).

## Key Conventions

- **Environment Variables:** Managed via `.env` files and validated in `src/lib/env.ts`. Ensure `DB_DIR` and `DB_FILENAME` are set correctly.
- **Imports:** Use absolute imports starting with `@/` where configured (e.g., `import { db } from "@/db"`).
- **Logging:** Use the `LogLayer` instance provided via `src/lib/logger.ts`.
- **Error Handling:** Elysia handles errors gracefully; use custom error classes where appropriate.
- **Async/Await:** Prefer `async/await` over promise chaining.
