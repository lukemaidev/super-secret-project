import { Button, App as AntApp } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { StatusCard } from "@/components";
import { useHealthCheck } from "../hooks/useHealthCheck";

export function HealthDashboard() {
  const { appQuery, dbQuery, refresh } = useHealthCheck();
  const { message } = AntApp.useApp();

  function handleRefresh() {
    refresh();
    void message.info("Refreshing health status...");
  }

  return (
    <>
      <div className="p-8 border border-border rounded-3xl backdrop-blur-[12px] bg-surface-glass shadow-[0_20px_45px_var(--color-shadow)]">
        <p className="m-0 mb-3 uppercase tracking-[0.2em] text-accent-highlight text-[0.8rem]">Starter Stack</p>
        <h1 className="m-0 text-[clamp(2.4rem,4vw,4.2rem)] leading-[1.05]">
          React, Express, and MongoDB are wired together.
        </h1>
        <p className="max-w-[56ch] mt-4 mb-0 text-foreground-muted leading-relaxed">
          This starter verifies that the frontend can reach the backend and the backend can reach MongoDB.
        </p>
        <Button
          type="primary"
          size="large"
          icon={<ReloadOutlined />}
          className="mt-6"
          onClick={handleRefresh}
        >
          Refresh status
        </Button>
      </div>

      <div className="grid grid-cols-2 max-[720px]:grid-cols-1 gap-4 mt-6">
        <StatusCard
          title="Backend API"
          loading={appQuery.isLoading}
          ok={appQuery.isSuccess && appQuery.data.status === "ok"}
          detail={
            appQuery.isLoading
              ? "Checking..."
              : appQuery.isSuccess
                ? `Service "${appQuery.data.service}" responded successfully.`
                : appQuery.error instanceof Error
                  ? appQuery.error.message
                  : "Backend is unavailable."
          }
        />
        <StatusCard
          title="MongoDB"
          loading={dbQuery.isLoading}
          ok={dbQuery.isSuccess && dbQuery.data.status === "ok"}
          detail={
            dbQuery.isLoading
              ? "Checking..."
              : dbQuery.isSuccess
                ? dbQuery.data.database
                  ? `Connected to database "${dbQuery.data.database}".`
                  : "Database responded successfully."
                : dbQuery.error instanceof Error
                  ? dbQuery.error.message
                  : "Database check failed."
          }
        />
      </div>
    </>
  );
}
