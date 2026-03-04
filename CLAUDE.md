# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Goal Achievement App — helps users turn vague ambitions into actionable, milestone-based plans with progress tracking. Full-stack TypeScript monorepo with separate `backend/` and `frontend/` directories (no workspace manager — each has its own `package.json` and `node_modules`).

## Commands

### Database (prerequisite)
```sh
cd docker && docker compose up -d   # Start MongoDB on localhost:27017
```

### Backend (Express + MongoDB)
```sh
cd backend
npm install
npm run dev          # Dev server with nodemon+tsx on http://localhost:5000
npm run build        # tsc compile to dist/
npm run start        # Run compiled dist/server.js (production)
```

### Frontend (React + Vite)
```sh
cd frontend
npm install
npm run dev          # Vite dev server on http://localhost:5173
npm run build        # tsc && vite build
npm run preview      # Preview production build
```

### Environment Setup
Copy `.env.example` to the appropriate `.env` file in each directory:
- `docker/.env` — Mongo credentials and port
- `backend/.env.development` / `.env.production` — `PORT`, `MONGODB_URI`, `DB_NAME`, `CORS_ORIGIN`
- `frontend/.env` — `VITE_API_BASE_URL`

## Architecture

### Feature-based structure (both frontend and backend)
Each feature lives in its own directory under `src/features/<name>/` and exposes a barrel `index.ts`. Everything for a feature (routes, controllers, services, components, hooks, types, API calls) stays colocated.

**Backend feature layout** (`backend/src/features/<name>/`):
- `<name>.routes.ts` — Express Router definition
- `<name>.controller.ts` — Request handlers (thin; delegates to service)
- `<name>.service.ts` — Business logic
- `index.ts` — Public exports (router)

Routes are mounted in `app.ts` at `/api/<name>`.

**Frontend feature layout** (`frontend/src/features/<name>/`):
- `components/` — React components
- `hooks/` — Custom hooks
- `api/` — API call functions using the shared `fetchJson` client
- `types/` — TypeScript types
- `index.ts` — Public exports

### Shared modules
- **Backend**: `src/config/env.ts` (validated env config), `src/config/db.ts` (MongoDB connection singleton via native driver), `src/utils/logger.ts` (Pino), `src/middlewares/` (pino-http request logger)
- **Frontend**: `src/api/client.ts` (`fetchJson` wrapper over `fetch`), `src/components/ui/` (reusable UI components), `src/styles/global.css` (Tailwind v4 import + base styles)

### Key conventions
- Backend uses the native MongoDB driver (not Mongoose) — access the `Db` instance via `getDatabase()` from `config/db.ts`
- Frontend uses Tailwind CSS v4 via `@tailwindcss/vite` plugin — styles use utility classes directly in JSX
- Frontend path alias: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`)
- Backend runs through `tsx` in dev (via nodemon) for TypeScript execution without a build step
- Logging uses Pino (structured JSON in production, pino-pretty in development)
