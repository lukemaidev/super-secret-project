import { apiClient } from "@/api";
import type { HealthResponse, DbHealthResponse } from "../types/health.types";

export function fetchAppHealth() {
  return apiClient.get<HealthResponse>("/health").then((res) => res.data);
}

export function fetchDbHealth() {
  return apiClient.get<DbHealthResponse>("/health/db").then((res) => res.data);
}
