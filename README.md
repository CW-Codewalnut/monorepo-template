This is a full-stack monorepo template built with a modern TypeScript-first technology stack, designed for rapid development and type safety from end-to-end.

Tech Stack:

- **Backend API (`apps/api`):**
  - [Hono](https://hono.dev/).
  - [tRPC](https://trpc.io/).
  - [Drizzle ORM](https://orm.drizzle.team/) with [Turso](https://turso.tech/).
  - [Better Auth](https://better-auth.com/).
  - [T3 Env](https://env.t3.gg/).
- **Frontend Web App (`apps/web`):**
  - [React](https://react.dev/).
  - [Vite](https://vite.dev/)
  - [React Router v7](https://reactrouter.com/).
  - [Tailwind CSS v4](https://tailwindcss.com/).
  - [Shadcn-UI](https://ui.shadcn.com/).
  - [TanStack Query](https://tanstack.com/query/latest) with [tRPC](https://trpc.io/docs/client/tanstack-react-query).
- **Tooling & Shared Packages:**
  - [Bun](https://bun.sh/).
  - [Turbo](https://turborepo.com/).
  - [Biome](https://biomejs.dev/).

## Table of Contents

1.  [Prerequisites](#prerequisites)
2.  [Getting Started](#getting-started)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installation](#installation)
    - [Environment Setup](#environment-setup)
3.  [Project Structure](#project-structure)
    - [Root Directory](#root-directory)
    - [Apps (`apps/`)](#apps-apps)
      - [API (`apps/api/`)](#api-appsapi)
      - [Web (`apps/web/`)](#web-appsweb)
    - [Packages (`packages/`)](#packages-packages)
      - [Shared (`packages/shared/`)](#shared-packagesshared)
      - [TSConfig (`packages/tsconfig/`)](#tsconfig-packagestsconfig)
4.  [Available Scripts](#available-scripts)

## Prerequisites

- [Git](https://git-scm.com/)
- [Bun](https://bun.sh/docs/installation) (v1.2.15 or later recommended)

## Local Setup & Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/CW-Codewalnut/monorepo-template.git
    cd monorepo-template
    ```

2.  **Run the Setup Script**
    This command will install all dependencies, copy the example `.env` files, and run the initial database migration & seed the DB with a sample system settings.

    ```bash
    bun setup
    ```

3.  **Configure Environment Variables**
    The `bun setup` script creates `.env` files in `apps/api` and `apps/web`. You must fill them with your credentials.

    **Backend** ([`apps/api/.env`](apps/api/.env))
    | Variable | Description | Example |
    | ----------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
    | `APP_PORT` | Port for the backend server. | `5000` |
    | `APP_URL` | Full public URL of the backend. | `http://localhost:5000` |
    | `CORS_ORIGIN_1` | The URL of your frontend app to allow CORS. | `http://localhost:3000` |
    | `DATABASE_URL` | Turso DB URL or local file path. | `file:./.database/local.db` |
    | `DATABASE_AUTH_TOKEN` | Turso auth token (leave blank for local file DB). | `your-turso-token` |
    | `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID. | `your-google-client-id.apps.googleusercontent.com` |
    | `GOOGLE_CLIENT_SECRET` | Your Google OAuth Client Secret. | `your-google-client-secret` |
    | `AUTH_SECRET` | A long, random secret for signing auth tokens. Generate one with `openssl rand -hex 32`. | `a_very_long_and_random_secret_string` |

    **Frontend** ([`apps/web/.env`](apps/web/.env))
    | Variable | Description | Example |
    | ----------------- | ------------------------------------------- | ----------------------- |
    | `VITE_APP_URL` | The full URL of your frontend application. | `http://localhost:3000` |
    | `VITE_API_URL` | The full URL of your backend API. | `http://localhost:5000` |

4.  **Start the Development Servers**
    This command uses Turborepo to start both the backend and frontend servers concurrently.

    ```bash
    bun dev
    ```

    - API will be running at `http://localhost:5000`
    - Web app will be running at `http://localhost:3000`

## Project Structure

The monorepo is organized into `apps` (runnable applications) and `packages` (shared libraries).

### Root Directory

- `biome.jsonc`: Configuration for Biome (formatter and linter).
- `package.json`: Root project configuration, workspace definitions, and top-level scripts orchestrated by Turbo.
- `turbo.json`: Configuration for Turbo, defining tasks, dependencies between tasks, and caching strategies.
- `.editorconfig`: Defines consistent coding styles across different editors.

### Apps (`apps/`)

Contains the individual applications of the monorepo.

#### API (`apps/api/`)

The backend application built with Hono, tRPC, Drizzle, and Better Auth.

- `drizzle.config.ts`: Configuration for Drizzle Kit (migrations, schema path, database credentials).
- `package.json`: API-specific dependencies (`hono`, `trpc`, `drizzle-orm`, `better-auth`) and scripts (`dev`, database scripts).
- `tsconfig.json`: TypeScript configuration, extending the base config, enabling Hono JSX.
- `.env`, `.env.example`: Environment variable files (see [Environment Setup](#environment-setup)).
- `src/`:
  - `index.ts`: Main entry point for the Hono server. Sets up middleware (logger, CORS, auth handlers, tRPC server).
  - `types.ts`: Exports types like `AppRouter` (for tRPC client) and `Auth` (for Better Auth client).
  - `db/`:
    - `index.ts`: Initializes the Drizzle ORM client with Turso.
    - `migrations/`: Directory where Drizzle Kit stores generated database migration files.
    - `schema/`:
      - `auth.ts`: Drizzle schemas for `user`, `session`, `account`, `verification` tables (used by Better Auth).
      - `index.ts`: Exports all schemas and schema types.
      - `types.ts`: TypeScript types inferred from Drizzle schemas (e.g., `User`, `Session`).
      - `utils.ts`: Utility functions for schema definitions (e.g., `commonTableCols` for ID and timestamps).
  - `lib/`:
    - `auth.ts`: Configuration for `better-auth` (Google provider, Drizzle adapter, secrets).
    - `constants.ts`: (Currently empty) For API-specific constants.
    - `context.ts`: Defines the tRPC context, including session information from `better-auth`.
    - `env.ts`: Environment variable validation using `@t3-oss/env-core`.
    - `trpc.ts`: tRPC initialization, router definition, and `publicProcedure`/`protectedProcedure` helpers.
  - `routers/`:
    - `index.ts`: Root tRPC application router. (Currently empty, ready for your procedures).
  - `utils/`:
    - `index.ts`: General utility functions (e.g., `uuid` v7 generator).
- `.database/`: Contains the local SQLite database file (e.g., `local.db`) when using `turso dev`.

#### Web (`apps/web/`)

The frontend application built with React, Vite, React Router, and Tailwind CSS.

- `components.json`: Configuration for `shadcn/ui` CLI.
- `package.json`: Web-specific dependencies (`react`, `vite`, `react-router`, `tailwindcss`, `@trpc/client`) and scripts (`dev`, `build`).
- `react-router.config.ts`: Configuration for React Router's Vite plugin (e.g., `ssr: false`, `appDirectory`).
- `tsconfig.json`: TypeScript configuration, extending base, setting up JSX for React, path aliases (`~/*`).
- `vite.config.ts`: Vite build tool configuration. Includes plugins for Tailwind CSS, React Router, and tsconfig paths. Sets up a proxy for `/api` requests to `VITE_API_URL`.
- `.env`, `.env.example`: Environment variable files (see [Environment Setup](#environment-setup)).
- `public/`: Static assets that are copied directly to the build output.
- `src/`:
  - `app.css`: Global styles, Tailwind CSS imports (`@import "tailwindcss";`), `tw-animate-css`, and custom theme variables (Shadcn-UI).
  - `root.tsx`: The root component for React Router. Includes HTML shell, global context providers, and the main `AppLayout`.
  - `routes.ts`: Configures React Router's file-system based routing using `@react-router/fs-routes`.
  - `components/`:
    - `app-layout/`:
      - `index.tsx`: Main application layout. Handles authentication state (loading, redirecting to login or dashboard) and renders `Outlet` for nested routes.
      - `login.tsx`: Login component displayed when the user is not authenticated.
    - `icons/`: Custom SVG icon components.
    - `providers/`:
      - `index.tsx`: Combines all app-level context providers.
      - `query.tsx`: Sets up `QueryClientProvider` for TanStack Query.
      - `theme.tsx`: Theme provider for managing light/dark/system mode.
      - `toaster.tsx`: Configures `sonner` for toast notifications.
    - `ui/`: Reusable, Shadcn-UI and custom components.
  - `hooks/`:
    - `use-auth.tsx`: Custom hook to access the authenticated user's session data from React Router's outlet context.
  - `lib/`:
    - `auth.ts`: Initializes the `better-auth` client, configured to communicate with the API.
    - `constants.ts`: Frontend-specific constants (routes, storage keys, media queries, etc.).
    - `trpc.ts`: Initializes the tRPC client and proxy for TanStack Query integration. Includes global error handling for queries (shows a toast).
    - `utils.ts`: Utility functions like `cn` (for `clsx` and `tailwind-merge`).
  - `routes/`: Page components corresponding to file-system routes.
    - `dashboard.tsx`: Page shown after successful login.
    - `login.tsx`: Placeholder for the login route (actual UI is handled by `AppLayout`).

### Packages (`packages/`)

Contains shared code used by multiple applications.

#### Shared (`packages/shared/`)

A package for code or types that might be shared between `api` and `web` or other future packages.

- `package.json`: Package definition.
- `tsconfig.json`: TypeScript configuration.
- `src/index.ts`: Entry point for shared code.

#### TSConfig (`packages/tsconfig/`)

Contains base TypeScript configurations that other packages can extend.

- `base.json`: A strict base `tsconfig.json` for shared compiler options.
- `package.json`: Package definition.

## Available Scripts

Scripts are defined in the root `package.json` and orchestrated by Turbo.

- `bun setup`: Runs the setup script, which installs dependencies, copies environment files, runs database migrations and seeds the database.
- `bun clean`: Removes `node_modules`, `.turbo`, `dist`, `build` directories, and `bun.lock`, `*.tsbuildinfo` files across the monorepo.
- `bun format`: Formats code using Biome.
- `bun lint`: Lints code using Biome and applies auto-fixes.
- `bun check`: Runs Biome's comprehensive check (format, lint, etc.) and applies auto-fixes.
- `bun check-types`: Runs TypeScript type checking across all packages using `turbo run check-types`.
- `bun fun`: A convenience script that runs `check` (Biome) and `check-types` (TypeScript). (Named so, for convinience (three letters, rhymes 🙂)).
- `bun build`: Builds all applications and packages using `turbo run build`.
- `bun dev`: Starts all development servers (API and Web) using `turbo run dev`.
- `bun dev:web`: Starts only the Web app development server.
- `bun dev:api`: Starts only the API development server.
- **Database Scripts (run via Turbo, filtering for `@cw/api`):**
  - `bun db:studio`: Opens Drizzle Studio to inspect the database.
  - `bun db:push`: Pushes schema changes directly to the database (useful for prototyping, skips migrations).
  - `bun db:generate`: Generates Drizzle migration files based on schema changes.
  - `bun db:migrate`: Applies pending migrations to the database.
  - `bun db:seed`: Seeds the database with sample data.
