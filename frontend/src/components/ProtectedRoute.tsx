import { Navigate } from "react-router";
import { useAuthStore } from "@/features/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
