# Super Secret Project

Minimal full-stack starter with:

- `frontend/`: React + TypeScript + Vite
- `backend/`: Express + TypeScript + MongoDB driver
- `docker/`: MongoDB Docker Compose setup

## Prerequisites

- Node.js 20+
- npm
- Docker Desktop

## Project Structure

```text
.
|-- backend
|-- docker
|-- frontend
`-- README.md
```

## 1. Start MongoDB

From the `docker/` directory:

```powershell
docker compose up
```

MongoDB will be available at `mongodb://localhost:27017`.

## 2. Start the Backend

From the `backend/` directory:

```powershell
npm install
npm run dev
```

The API will run at `http://localhost:5000`.

### Health endpoints

- `GET http://localhost:5000/api/health`
- `GET http://localhost:5000/api/health/db`

## 3. Start the Frontend

From the `frontend/` directory:

```powershell
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

## Environment Files

### `docker/.env`

```env
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_PORT=27017
```

### `backend/.env`

```env
PORT=5000
MONGODB_URI=mongodb://admin:password@localhost:27017/appdb?authSource=admin
DB_NAME=appdb
CORS_ORIGIN=http://localhost:5173
```

### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Expected Result

When everything is running:

- the frontend loads at `http://localhost:5173`
- the frontend shows backend health status
- the frontend shows MongoDB status
- the backend serves JSON responses from both health endpoints
