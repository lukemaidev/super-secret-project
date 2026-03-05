export interface ClarifyingQuestion {
  id: string;
  text: string;
}

export const CLARIFYING_QUESTIONS: ClarifyingQuestion[] = [
  { id: "motivation", text: "Why is this goal important to you right now?" },
  { id: "timeline", text: "When would you ideally like to achieve this?" },
  { id: "constraints", text: "What limitations might affect your progress?" },
  { id: "experience", text: "Have you tried working toward this before?" },
  { id: "success", text: "What would success look like to you?" },
];
