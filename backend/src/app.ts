import cors from "cors";
import express from "express";

import { config } from "./config/env";
import { healthRouter } from "./routes/health";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: config.corsOrigin
    })
  );
  app.use(express.json());

  app.use("/api/health", healthRouter);

  return app;
}

