import { Router } from "express";

import { authenticate } from "../../middlewares";
import {
  handleCreateGoal,
  handleGetGoal,
  handleGetCurrentQuestion,
  handleSubmitAnswer,
  handleEditAnswer,
  handleGetReview,
  handleGenerateStatement,
  handleApproveGoal,
} from "./goals.controller";

export const goalsRouter = Router();

goalsRouter.use(authenticate);

goalsRouter.post("/", handleCreateGoal);
goalsRouter.get("/:id", handleGetGoal);
goalsRouter.get("/:id/questions/current", handleGetCurrentQuestion);
goalsRouter.post("/:id/questions/:questionId/answer", handleSubmitAnswer);
goalsRouter.put("/:id/questions/:questionId/answer", handleEditAnswer);
goalsRouter.get("/:id/review", handleGetReview);
goalsRouter.post("/:id/generate-statement", handleGenerateStatement);
goalsRouter.put("/:id/approve", handleApproveGoal);
