import { ObjectId } from "mongodb";

export type GoalStep = "initial" | "clarifying" | "reviewing" | "generated" | "approved";

export interface ClarifyingAnswer {
  questionId: string;
  questionText: string;
  answer: string;
  answeredAt: Date;
}

export interface GoalDocument {
  _id: ObjectId;
  userId: ObjectId;
  initialText: string;
  clarifyingAnswers: ClarifyingAnswer[];
  generatedStatement: string | null;
  finalStatement: string | null;
  currentStep: GoalStep;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGoalRequest {
  initialText: string;
}

export interface SubmitAnswerRequest {
  answer: string;
}

export interface ApproveGoalRequest {
  finalStatement?: string;
}
