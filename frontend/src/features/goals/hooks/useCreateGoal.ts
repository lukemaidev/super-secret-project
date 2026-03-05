import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { createGoal } from "../api/goals.api";

export function useCreateGoal() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (initialText: string) => createGoal(initialText),
    onSuccess: (goal) => {
      navigate(`/goals/${goal._id}`);
    },
  });
}
