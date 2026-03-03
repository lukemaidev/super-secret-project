import { Router } from "express";

import { config } from "../config/env";
import { pingDatabase } from "../config/db";

export const healthRouter = Router();

healthRouter.get("/", (_request, response) => {
  response.json({
    status: "ok",
    service: "backend"
  });
});

healthRouter.get("/db", async (_request, response) => {
  try {
    await pingDatabase();

    response.json({
      status: "ok",
      database: config.dbName
    });
  } catch {
    response.status(500).json({
      status: "error",
      message: "Database unreachable"
    });
  }
});

