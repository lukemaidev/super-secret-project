import cors from "cors";
import express from "express";

import { config } from "./config/env";
import { authRouter } from "./features/auth";
import { goalsRouter } from "./features/goals";
import { healthRouter } from "./features/health";
import { requestLogger } from "./middlewares";

export function createApp() {
  const app = express();

  app.use(requestLogger);
  app.use(
    cors({
      origin: config.corsOrigin
    })
  );
  app.use(express.json());

  app.use("/api/health", healthRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/goals", goalsRouter);

  return app;
}

