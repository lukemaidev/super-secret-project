import { useEffect, useState } from "react";

import { fetchAppHealth, fetchDbHealth } from "../api/health.api";
import type { StatusState } from "../types/health.types";

const initialStatus: StatusState = {
  loading: true,
  ok: false,
  detail: "Waiting for response..."
};

export function useHealthCheck() {
  const [appStatus, setAppStatus] = useState<StatusState>(initialStatus);
  const [dbStatus, setDbStatus] = useState<StatusState>(initialStatus);

  async function loadHealth() {
    setAppStatus(initialStatus);
    setDbStatus(initialStatus);

    const [appResult, dbResult] = await Promise.allSettled([fetchAppHealth(), fetchDbHealth()]);

    if (appResult.status === "fulfilled") {
      const appHealth = appResult.value;

      setAppStatus({
        loading: false,
        ok: appHealth.status === "ok",
        detail: `Service "${appHealth.service}" responded successfully.`
      });
    } else {
      const error = appResult.reason;

      setAppStatus({
        loading: false,
        ok: false,
        detail: error instanceof Error ? error.message : "Backend is unavailable."
      });
    }

    if (dbResult.status === "fulfilled") {
      const dbHealth = dbResult.value;

      setDbStatus({
        loading: false,
        ok: dbHealth.status === "ok",
        detail: dbHealth.database
          ? `Connected to database "${dbHealth.database}".`
          : "Database responded successfully."
      });
    } else {
      const error = dbResult.reason;

      setDbStatus({
        loading: false,
        ok: false,
        detail: error instanceof Error ? error.message : "Database check failed."
      });
    }
  }

  useEffect(() => {
    void loadHealth();
  }, []);

  return { appStatus, dbStatus, refresh: loadHealth };
}
