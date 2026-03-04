export type HealthResponse = {
  status: "ok";
  service: string;
};

export type DbHealthResponse = {
  status: "ok" | "error";
  database?: string;
  message?: string;
};

export type StatusState = {
  loading: boolean;
  ok: boolean;
  detail: string;
};
