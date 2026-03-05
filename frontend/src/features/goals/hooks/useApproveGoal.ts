import { useMutation, useQueryClient } from "@tanstack/react-query";

import { approveGoal } from "../api/goals.api";

export function useApproveGoal(goalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (finalStatement?: string) => approveGoal(goalId, finalStatement),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
    },
  });
}
