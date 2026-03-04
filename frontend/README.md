# Frontend

React SPA with Vite, TypeScript, and a custom CSS dark-themed UI. Uses feature-based architecture.

## Tech Stack

- **Framework:** React 18
- **Build tool:** Vite 5
- **Language:** TypeScript
- **Styling:** Custom CSS (no framework)

## Project Structure

```text
src/
├── api/
│   ├── client.ts           # Base HTTP client (fetch wrapper)
│   └── index.ts
├── components/
│   ├── ui/
│   │   ├── StatusCard.tsx   # Reusable status card component
│   │   └── index.ts
│   └── index.ts
├── features/
│   └── health/
│       ├── api/
│       │   └── health.api.ts
│       ├── components/
│       │   └── HealthDashboard.tsx
│       ├── hooks/
│       │   └── useHealthCheck.ts
│       ├── types/
│       │   └── health.types.ts
│       └── index.ts         # Public barrel export
├── hooks/
│   └── index.ts
├── lib/
│   └── index.ts
├── styles/
│   └── global.css           # Global styles and dark theme
├── types/
│   └── index.ts
├── App.tsx                   # Root component
├── main.tsx                  # Entry point
└── vite-env.d.ts
```

## Architecture

Each feature is a self-contained module under `src/features/` with:

| Directory      | Responsibility                           |
| -------------- | ---------------------------------------- |
| `api/`         | API call functions for the feature        |
| `components/`  | React components scoped to the feature    |
| `hooks/`       | Custom hooks for data fetching and logic  |
| `types/`       | TypeScript types for the feature          |
| `index.ts`     | Barrel export for public API              |

Shared UI components live in `src/components/ui/`. The base HTTP client in `src/api/client.ts` is used by all feature API modules.

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173)         |
| `npm run build`   | Type-check and build for production       |
| `npm run preview` | Preview the production build locally      |

## Environment Variables

| Variable             | Description           | Example                       |
| -------------------- | --------------------- | ----------------------------- |
| `VITE_API_BASE_URL`  | Backend API base URL  | `http://localhost:5000/api`   |

## Path Aliases

The `@/` alias maps to `src/`, configured in both `vite.config.ts` and `tsconfig.json`.

```ts
import { StatusCard } from "@/components/ui";
```

## Adding a New Feature

1. Create `src/features/<name>/` with `api/`, `components/`, `hooks/`, `types/`, and `index.ts`.
2. Add API functions in `api/<name>.api.ts` using the base client from `@/api/client`.
3. Create hooks in `hooks/` to manage data fetching.
4. Build components in `components/` and export the main component from `index.ts`.
5. Import the feature component into `App.tsx` or wherever needed.
