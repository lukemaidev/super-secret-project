import { useState } from "react";
import { Navigate } from "react-router";

import { useAuthStore } from "../store/authStore";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type AuthTab = "login" | "register";

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");
  const token = useAuthStore((s) => s.token);

  if (token) {
    return <Navigate to="/goals/new" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{
            background: "radial-gradient(circle, var(--color-accent-highlight) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div
        className="w-full max-w-[420px] relative"
        style={{ animation: "authFadeIn 0.5s ease-out" }}
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-[1.75rem] font-bold tracking-tight text-foreground leading-tight">
            Goal Achiever
          </h1>
          <p className="mt-2 text-foreground-muted text-[0.95rem]">
            Turn ambitions into actionable plans
          </p>
        </div>

        {/* Auth card */}
        <div className="rounded-2xl border border-border bg-surface-glass backdrop-blur-xl shadow-[0_16px_48px_var(--color-shadow)] p-8">
          {/* Tab switcher */}
          <div className="flex gap-1 p-1 rounded-xl bg-border/40 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border-none ${
                activeTab === "login"
                  ? "bg-accent text-white shadow-sm"
                  : "bg-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer border-none ${
                activeTab === "register"
                  ? "bg-accent text-white shadow-sm"
                  : "bg-transparent text-foreground-muted hover:text-foreground"
              }`}
            >
              Register
            </button>
          </div>

          {activeTab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Footer accent */}
        <p className="text-center mt-6 text-xs text-foreground-muted/60 tracking-wide">
          Your goals, clarified and tracked
        </p>
      </div>

      <style>{`
        @keyframes authFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
