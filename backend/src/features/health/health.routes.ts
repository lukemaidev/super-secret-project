import { Router } from "express";

import { handleGetHealth, handleGetDbHealth } from "./health.controller";

export const healthRouter = Router();

healthRouter.get("/", handleGetHealth);
healthRouter.get("/db", handleGetDbHealth);
