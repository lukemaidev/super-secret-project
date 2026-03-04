import { StatusCard } from "@/components";
import { useHealthCheck } from "../hooks/useHealthCheck";

export function HealthDashboard() {
  const { appStatus, dbStatus, refresh } = useHealthCheck();

  return (
    <>
      <div className="p-8 border border-white/12 rounded-3xl backdrop-blur-[12px] bg-[rgba(9,14,24,0.6)] shadow-[0_20px_45px_rgba(0,0,0,0.24)]">
        <p className="m-0 mb-3 uppercase tracking-[0.2em] text-[#f2a900] text-[0.8rem]">Starter Stack</p>
        <h1 className="m-0 text-[clamp(2.4rem,4vw,4.2rem)] leading-[1.05]">React, Express, and MongoDB are wired together.</h1>
        <p className="max-w-[56ch] mt-4 mb-0 text-[rgba(245,239,230,0.84)] leading-relaxed">
          This starter verifies that the frontend can reach the backend and the backend can reach MongoDB.
        </p>
        <button
          className="mt-6 px-5 py-3.5 border-0 rounded-full bg-gradient-to-br from-[#f2a900] to-[#ff7a18] text-[#101010] cursor-pointer font-bold"
          type="button"
          onClick={() => void refresh()}
        >
          Refresh status
        </button>
      </div>

      <div className="grid grid-cols-2 max-[720px]:grid-cols-1 gap-4 mt-6">
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
