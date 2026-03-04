# Super Secret Project

Full-stack starter built with React, Express, and MongoDB. Uses a feature-based architecture on both frontend and backend with TypeScript throughout.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 18, Vite, TypeScript          |
| Backend  | Express, MongoDB driver, Pino, TypeScript |
| Database | MongoDB 7 (Docker)                  |

## Prerequisites

- Node.js 20+
- npm
- Docker Desktop

## Quick Start

### 1. Start MongoDB

```sh
cd docker
docker compose up -d
```

MongoDB will be available at `mongodb://localhost:27017`.

### 2. Start the Backend

```sh
cd backend
npm install
npm run dev
```

API runs at `http://localhost:5000`. See [backend/README.md](backend/README.md) for details.

### 3. Start the Frontend

```sh
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`. See [frontend/README.md](frontend/README.md) for details.

## Project Structure

```text
.
├── backend/          # Express API server
├── docker/           # MongoDB compose setup
├── frontend/         # React SPA
└── README.md
```

## Environment Configuration

Each layer has its own environment files:

| Location               | Variables                                        |
| ---------------------- | ------------------------------------------------ |
| `docker/.env`          | `MONGO_INITDB_ROOT_USERNAME`, `MONGO_INITDB_ROOT_PASSWORD`, `MONGO_PORT` |
| `backend/.env.*`       | `PORT`, `MONGODB_URI`, `DB_NAME`, `CORS_ORIGIN`  |
| `frontend/.env`        | `VITE_API_BASE_URL`                              |

See the backend and frontend READMEs for full details.
