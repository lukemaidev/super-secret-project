import { StatusCard } from "@/components";
import { useHealthCheck } from "../hooks/useHealthCheck";

export function HealthDashboard() {
  const { appStatus, dbStatus, refresh } = useHealthCheck();

  return (
    <>
      <div className="hero">
        <p className="hero__eyebrow">Starter Stack</p>
        <h1>React, Express, and MongoDB are wired together.</h1>
        <p className="hero__copy">
          This starter verifies that the frontend can reach the backend and the backend can reach MongoDB.
        </p>
        <button className="hero__button" type="button" onClick={() => void refresh()}>
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
    </>
  );
}
