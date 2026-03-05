import { apiClient } from "@/api";
import type { AuthResponse, LoginCredentials, RegisterCredentials } from "../types/auth.types";

export function registerUser(credentials: RegisterCredentials) {
  return apiClient.post<AuthResponse>("/auth/register", credentials).then((res) => res.data);
}

export function loginUser(credentials: LoginCredentials) {
  return apiClient.post<AuthResponse>("/auth/login", credentials).then((res) => res.data);
}
