import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editAnswer } from "../api/goals.api";

export function useEditAnswer(goalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, answer }: { questionId: string; answer: string }) =>
      editAnswer(goalId, questionId, answer),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
    },
  });
}
