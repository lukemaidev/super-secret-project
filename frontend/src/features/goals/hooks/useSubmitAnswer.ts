import { useMutation, useQueryClient } from "@tanstack/react-query";

import { submitAnswer } from "../api/goals.api";

export function useSubmitAnswer(goalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, answer }: { questionId: string; answer: string }) =>
      submitAnswer(goalId, questionId, answer),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["goal", goalId] });
    },
  });
}
