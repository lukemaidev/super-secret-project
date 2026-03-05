import { Routes, Route, Navigate } from "react-router";
import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/features/theme";
import { AuthPage } from "@/features/auth";
import { GoalWizard, InitialGoalStep } from "@/features/goals";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HealthDashboard } from "@/features/health";

export default function App() {
  const { mode, toggleTheme } = useTheme();

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <Button
          type="text"
          icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        />
      </div>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/goals/new"
          element={
            <ProtectedRoute>
              <main className="w-full max-w-[1080px] mx-auto px-4 py-16 max-[720px]:py-8">
                <InitialGoalStep />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/goals/:id"
          element={
            <ProtectedRoute>
              <main className="w-full max-w-[1080px] mx-auto px-4 py-16 max-[720px]:py-8">
                <GoalWizard />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/health"
          element={
            <main className="w-full max-w-[1080px] mx-auto px-4 py-16 max-[720px]:py-8">
              <HealthDashboard />
            </main>
          }
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </>
  );
}
