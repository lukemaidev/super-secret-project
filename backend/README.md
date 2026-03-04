# Backend

Express API server with MongoDB, structured logging, and feature-based architecture.

## Tech Stack

- **Runtime:** Node.js 20+, TypeScript
- **Framework:** Express 4
- **Database:** MongoDB driver 6
- **Logging:** Pino + pino-http
- **Dev tooling:** nodemon, tsx, pino-pretty

## Project Structure

```text
src/
├── config/
│   ├── db.ts              # MongoDB connection management
│   └── env.ts             # Environment variable loading & validation
├── features/
│   └── health/
│       ├── health.controller.ts
│       ├── health.routes.ts
│       ├── health.service.ts
│       └── index.ts        # Public barrel export
├── middlewares/
│   ├── requestLogger.ts    # pino-http request logging
│   └── index.ts
├── types/
│   └── index.ts
├── utils/
│   ├── logger.ts           # Pino logger instance
│   └── index.ts
├── app.ts                  # Express app factory
└── server.ts               # Entry point, starts server & handles shutdown
```

## Architecture

Each feature is a self-contained module under `src/features/` with:

| File                 | Responsibility                          |
| -------------------- | --------------------------------------- |
| `*.routes.ts`        | Express router with endpoint definitions |
| `*.controller.ts`    | Request handlers (parse input, send response) |
| `*.service.ts`       | Business logic and database access       |
| `index.ts`           | Barrel export for the feature            |

Routes are mounted in `app.ts`.

## Scripts

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Start dev server with nodemon + tsx       |
| `npm run build` | Compile TypeScript to `dist/`             |
| `npm run start` | Run compiled output (`dist/server.js`)    |

## Environment Variables

Loaded from `.env.development` or `.env.production` based on `NODE_ENV`.

| Variable       | Description                        | Example                                                        |
| -------------- | ---------------------------------- | -------------------------------------------------------------- |
| `PORT`         | Server listen port                 | `5000`                                                         |
| `MONGODB_URI`  | MongoDB connection string          | `mongodb://admin:password@localhost:27017/appdb?authSource=admin` |
| `DB_NAME`      | Database name                      | `appdb`                                                        |
| `CORS_ORIGIN`  | Allowed CORS origin                | `http://localhost:5173`                                        |

## API Endpoints

| Method | Path              | Description              |
| ------ | ----------------- | ------------------------ |
| GET    | `/api/health`     | Basic health check       |
| GET    | `/api/health/db`  | Database connectivity check |

## Adding a New Feature

1. Create `src/features/<name>/` with `*.routes.ts`, `*.controller.ts`, `*.service.ts`, and `index.ts`.
2. Export the router from `index.ts`.
3. Mount the router in `src/app.ts`:
   ```ts
   import { myRouter } from "./features/my-feature";
   app.use("/api/my-feature", myRouter);
   ```
