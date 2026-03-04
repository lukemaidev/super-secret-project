export type HealthResponse = {
  status: "ok";
  service: string;
};

export type DbHealthResponse = {
  status: "ok" | "error";
  database?: string;
  message?: string;
};