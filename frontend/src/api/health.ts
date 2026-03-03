export type HealthResponse = {
  status: "ok";
  service: string;
};

export type DbHealthResponse = {
  status: "ok" | "error";
  database?: string;
  message?: string;
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export function fetchAppHealth() {
  return fetchJson<HealthResponse>("/health");
}

export function fetchDbHealth() {
  return fetchJson<DbHealthResponse>("/health/db");
}

