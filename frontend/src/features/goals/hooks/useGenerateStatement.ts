import { useMutation, useQueryClient } from "@tanstack/react-query";

import { generateStatement } from "../api/goals.api";

export function useGenerateStatement(goalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => generateStatement(goalId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
    },
  });
}
