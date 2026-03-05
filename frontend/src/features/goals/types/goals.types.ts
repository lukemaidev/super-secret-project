export type GoalStep = "initial" | "clarifying" | "reviewing" | "generated" | "approved";

export interface ClarifyingAnswer {
  questionId: string;
  questionText: string;
  answer: string;
  answeredAt: string;
}

export interface Goal {
  _id: string;
  userId: string;
  initialText: string;
  clarifyingAnswers: ClarifyingAnswer[];
  generatedStatement: string | null;
  finalStatement: string | null;
  currentStep: GoalStep;
  createdAt: string;
  updatedAt: string;
}

export interface CurrentQuestion {
  questionId: string;
  questionText: string;
  questionNumber: number;
  totalQuestions: number;
}

export interface QuestionsComplete {
  complete: true;
}

export interface ReviewData {
  initialText: string;
  answers: ClarifyingAnswer[];
  currentStep: GoalStep;
}
