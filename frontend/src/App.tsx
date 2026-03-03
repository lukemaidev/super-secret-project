import { useEffect, useState } from "react";

import { fetchAppHealth, fetchDbHealth } from "./api/health";
import { StatusCard } from "./components/StatusCard";

type StatusState = {
  loading: boolean;
  ok: boolean;
  detail: string;
};

const initialStatus: StatusState = {
  loading: true,
  ok: false,
  detail: "Waiting for response..."
};

export default function App() {
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

  return (
    <main className="app-shell">
      <div className="hero">
        <p className="hero__eyebrow">Starter Stack</p>
        <h1>React, Express, and MongoDB are wired together.</h1>
        <p className="hero__copy">
          This starter verifies that the frontend can reach the backend and the backend can reach MongoDB.
        </p>
        <button className="hero__button" type="button" onClick={() => void loadHealth()}>
          Refresh status
        </button>
      </div>

      <div className="status-grid">
        <StatusCard
          title="Backend API"
          loading={appStatus.loading}
          ok={appStatus.ok}
          detail={appStatus.detail}
        />
        <StatusCard
          title="MongoDB"
          loading={dbStatus.loading}
          ok={dbStatus.ok}
          detail={dbStatus.detail}
        />
      </div>
    </main>
  );
}
