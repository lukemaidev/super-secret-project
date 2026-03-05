import { useQuery } from "@tanstack/react-query";

import { fetchGoal } from "../api/goals.api";

export function useGoal(goalId: string) {
  return useQuery({
    queryKey: ["goal", goalId],
    queryFn: () => fetchGoal(goalId),
    enabled: !!goalId,
  });
}
