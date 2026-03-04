import { useQuery } from "@tanstack/react-query";
import { fetchAppHealth, fetchDbHealth } from "../api/health.api";

export function useHealthCheck() {
  const appQuery = useQuery({
    queryKey: ["health", "app"],
    queryFn: fetchAppHealth,
  });

  const dbQuery = useQuery({
    queryKey: ["health", "db"],
    queryFn: fetchDbHealth,
  });

  function refresh() {
    void appQuery.refetch();
    void dbQuery.refetch();
  }

  return { appQuery, dbQuery, refresh };
}
