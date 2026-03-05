import { ObjectId } from "mongodb";

import { getDatabase } from "../../config/db";
import { CLARIFYING_QUESTIONS } from "./goals.questions";
import { generateGoalStatement } from "./goals.generator";
import type { GoalDocument } from "./goals.types";

function goalsCollection() {
  return getDatabase().collection<GoalDocument>("goals");
}

export async function createGoal(userId: string, initialText: string): Promise<GoalDocument> {
  const now = new Date();
  const goal: GoalDocument = {
    _id: new ObjectId(),
    userId: new ObjectId(userId),
    initialText,
    clarifyingAnswers: [],
    generatedStatement: null,
    finalStatement: null,
    currentStep: "clarifying",
    createdAt: now,
    updatedAt: now,
  };

  await goalsCollection().insertOne(goal);
  return goal;
}

export async function getGoalById(goalId: string, userId: string): Promise<GoalDocument | null> {
  return goalsCollection().findOne({
    _id: new ObjectId(goalId),
    userId: new ObjectId(userId),
  });
}

export function getCurrentQuestion(goal: GoalDocument) {
  if (goal.currentStep !== "clarifying") {
    return null;
  }

  const answeredIds = new Set(goal.clarifyingAnswers.map((a) => a.questionId));
  const next = CLARIFYING_QUESTIONS.find((q) => !answeredIds.has(q.id));

  if (!next) {
    return null;
  }

  const index = CLARIFYING_QUESTIONS.indexOf(next);

  return {
    questionId: next.id,
    questionText: next.text,
    questionNumber: index + 1,
    totalQuestions: CLARIFYING_QUESTIONS.length,
  };
}

export async function submitAnswer(
  goalId: string,
  userId: string,
  questionId: string,
  answer: string
): Promise<GoalDocument> {
  const goal = await getGoalById(goalId, userId);
  if (!goal) throw new Error("Goal not found");
  if (goal.currentStep !== "clarifying") throw new Error("Goal is not in clarifying step");

  const question = CLARIFYING_QUESTIONS.find((q) => q.id === questionId);
  if (!question) throw new Error("Invalid question ID");

  const alreadyAnswered = goal.clarifyingAnswers.some((a) => a.questionId === questionId);
  if (alreadyAnswered) throw new Error("Question already answered");

  const newAnswer = {
    questionId,
    questionText: question.text,
    answer,
    answeredAt: new Date(),
  };

  const updatedAnswers = [...goal.clarifyingAnswers, newAnswer];
  const allAnswered = updatedAnswers.length === CLARIFYING_QUESTIONS.length;

  await goalsCollection().updateOne(
    { _id: new ObjectId(goalId) },
    {
      $push: { clarifyingAnswers: newAnswer },
      $set: {
        currentStep: allAnswered ? "reviewing" : "clarifying",
        updatedAt: new Date(),
      },
    }
  );

  return (await getGoalById(goalId, userId))!;
}

export async function editAnswer(
  goalId: string,
  userId: string,
  questionId: string,
  answer: string
): Promise<GoalDocument> {
  const goal = await getGoalById(goalId, userId);
  if (!goal) throw new Error("Goal not found");
  if (goal.currentStep !== "reviewing") throw new Error("Goal is not in reviewing step");

  const answerIndex = goal.clarifyingAnswers.findIndex((a) => a.questionId === questionId);
  if (answerIndex === -1) throw new Error("Answer not found");

  await goalsCollection().updateOne(
    { _id: new ObjectId(goalId), "clarifyingAnswers.questionId": questionId },
    {
      $set: {
        "clarifyingAnswers.$.answer": answer,
        "clarifyingAnswers.$.answeredAt": new Date(),
        updatedAt: new Date(),
      },
    }
  );

  return (await getGoalById(goalId, userId))!;
}

export async function getReview(goalId: string, userId: string) {
  const goal = await getGoalById(goalId, userId);
  if (!goal) throw new Error("Goal not found");

  return {
    initialText: goal.initialText,
    answers: goal.clarifyingAnswers,
    currentStep: goal.currentStep,
  };
}

export async function generateStatement(goalId: string, userId: string): Promise<GoalDocument> {
  const goal = await getGoalById(goalId, userId);
  if (!goal) throw new Error("Goal not found");
  if (goal.currentStep !== "reviewing") throw new Error("Goal is not in reviewing step");

  const statement = await generateGoalStatement(goal.initialText, goal.clarifyingAnswers);

  await goalsCollection().updateOne(
    { _id: new ObjectId(goalId) },
    {
      $set: {
        generatedStatement: statement,
        currentStep: "generated",
        updatedAt: new Date(),
      },
    }
  );

  return (await getGoalById(goalId, userId))!;
}

export async function approveGoal(
  goalId: string,
  userId: string,
  finalStatement?: string
): Promise<GoalDocument> {
  const goal = await getGoalById(goalId, userId);
  if (!goal) throw new Error("Goal not found");
  if (goal.currentStep !== "generated") throw new Error("Goal is not in generated step");

  const statement = finalStatement ?? goal.generatedStatement;

  await goalsCollection().updateOne(
    { _id: new ObjectId(goalId) },
    {
      $set: {
        finalStatement: statement,
        currentStep: "approved",
        updatedAt: new Date(),
      },
    }
  );

  return (await getGoalById(goalId, userId))!;
}

export async function ensureIndexes(): Promise<void> {
  await goalsCollection().createIndex({ userId: 1 });
}
