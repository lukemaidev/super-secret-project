import { Routes, Route } from "react-router";
import { Button } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "@/features/theme";
import { HealthDashboard } from "@/features/health";

export default function App() {
  const { mode, toggleTheme } = useTheme();

  return (
    <main className="w-full max-w-[1080px] mx-auto px-4 py-16 max-[720px]:py-8">
      <div className="flex justify-end mb-4">
        <Button
          type="text"
          icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
          onClick={toggleTheme}
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        />
      </div>
      <Routes>
        <Route path="/" element={<HealthDashboard />} />
      </Routes>
    </main>
  );
}
