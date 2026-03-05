import { useQuery } from "@tanstack/react-query";

import { fetchCurrentQuestion } from "../api/goals.api";

export function useCurrentQuestion(goalId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["goal", goalId, "currentQuestion"],
    queryFn: () => fetchCurrentQuestion(goalId),
    enabled: !!goalId && enabled,
  });
}
