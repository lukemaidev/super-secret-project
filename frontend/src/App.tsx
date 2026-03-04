import { Routes, Route } from "react-router";
import { HealthDashboard } from "@/features/health";

export default function App() {
  return (
    <main className="w-full max-w-[1080px] mx-auto px-4 py-16 max-[720px]:py-8">
      <Routes>
        <Route path="/" element={<HealthDashboard />} />
      </Routes>
    </main>
  );
}
