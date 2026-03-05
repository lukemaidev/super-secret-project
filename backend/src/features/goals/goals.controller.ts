import { Request, Response } from "express";

import * as goalsService from "./goals.service";
import type { CreateGoalRequest, SubmitAnswerRequest, ApproveGoalRequest } from "./goals.types";

export async function handleCreateGoal(req: Request, res: Response) {
  try {
    const { initialText } = req.body as CreateGoalRequest;

    if (!initialText?.trim()) {
      res.status(400).json({ error: "Initial goal text is required" });
      return;
    }

    const goal = await goalsService.createGoal(req.userId!, initialText.trim());
    res.status(201).json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create goal";
    res.status(500).json({ error: message });
  }
}

export async function handleGetGoal(req: Request, res: Response) {
  try {
    const goal = await goalsService.getGoalById(req.params.id, req.userId!);
    if (!goal) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }
    res.json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get goal";
    res.status(500).json({ error: message });
  }
}

export async function handleGetCurrentQuestion(req: Request, res: Response) {
  try {
    const goal = await goalsService.getGoalById(req.params.id, req.userId!);
    if (!goal) {
      res.status(404).json({ error: "Goal not found" });
      return;
    }

    const question = goalsService.getCurrentQuestion(goal);
    if (!question) {
      res.json({ complete: true });
      return;
    }

    res.json(question);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get question";
    res.status(500).json({ error: message });
  }
}

export async function handleSubmitAnswer(req: Request, res: Response) {
  try {
    const { answer } = req.body as SubmitAnswerRequest;

    if (!answer?.trim()) {
      res.status(400).json({ error: "Answer is required" });
      return;
    }

    const goal = await goalsService.submitAnswer(
      req.params.id,
      req.userId!,
      req.params.questionId,
      answer.trim()
    );
    res.json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to submit answer";
    const status = message.includes("not found") ? 404 : 400;
    res.status(status).json({ error: message });
  }
}

export async function handleEditAnswer(req: Request, res: Response) {
  try {
    const { answer } = req.body as SubmitAnswerRequest;

    if (!answer?.trim()) {
      res.status(400).json({ error: "Answer is required" });
      return;
    }

    const goal = await goalsService.editAnswer(
      req.params.id,
      req.userId!,
      req.params.questionId,
      answer.trim()
    );
    res.json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to edit answer";
    const status = message.includes("not found") ? 404 : 400;
    res.status(status).json({ error: message });
  }
}

export async function handleGetReview(req: Request, res: Response) {
  try {
    const review = await goalsService.getReview(req.params.id, req.userId!);
    res.json(review);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to get review";
    const status = message.includes("not found") ? 404 : 500;
    res.status(status).json({ error: message });
  }
}

export async function handleGenerateStatement(req: Request, res: Response) {
  try {
    const goal = await goalsService.generateStatement(req.params.id, req.userId!);
    res.json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to generate statement";
    const status = message.includes("not found") ? 404 : 400;
    res.status(status).json({ error: message });
  }
}

export async function handleApproveGoal(req: Request, res: Response) {
  try {
    const { finalStatement } = req.body as ApproveGoalRequest;

    const goal = await goalsService.approveGoal(
      req.params.id,
      req.userId!,
      finalStatement?.trim()
    );
    res.json(goal);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve goal";
    const status = message.includes("not found") ? 404 : 400;
    res.status(status).json({ error: message });
  }
}
