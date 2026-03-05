import { apiClient } from "@/api";
import type { Goal, CurrentQuestion, QuestionsComplete, ReviewData } from "../types/goals.types";

export function createGoal(initialText: string) {
  return apiClient.post<Goal>("/goals", { initialText }).then((res) => res.data);
}

export function fetchGoal(goalId: string) {
  return apiClient.get<Goal>(`/goals/${goalId}`).then((res) => res.data);
}

export function fetchCurrentQuestion(goalId: string) {
  return apiClient
    .get<CurrentQuestion | QuestionsComplete>(`/goals/${goalId}/questions/current`)
    .then((res) => res.data);
}

export function submitAnswer(goalId: string, questionId: string, answer: string) {
  return apiClient
    .post<Goal>(`/goals/${goalId}/questions/${questionId}/answer`, { answer })
    .then((res) => res.data);
}

export function editAnswer(goalId: string, questionId: string, answer: string) {
  return apiClient
    .put<Goal>(`/goals/${goalId}/questions/${questionId}/answer`, { answer })
    .then((res) => res.data);
}

export function fetchReview(goalId: string) {
  return apiClient.get<ReviewData>(`/goals/${goalId}/review`).then((res) => res.data);
}

export function generateStatement(goalId: string) {
  return apiClient.post<Goal>(`/goals/${goalId}/generate-statement`).then((res) => res.data);
}

export function approveGoal(goalId: string, finalStatement?: string) {
  return apiClient
    .put<Goal>(`/goals/${goalId}/approve`, { finalStatement })
    .then((res) => res.data);
}
