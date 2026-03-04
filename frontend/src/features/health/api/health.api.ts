import { fetchJson } from "@/api";
import type { HealthResponse, DbHealthResponse } from "../types/health.types";

export function fetchAppHealth() {
  return fetchJson<HealthResponse>("/health");
}

export function fetchDbHealth() {
  return fetchJson<DbHealthResponse>("/health/db");
}
