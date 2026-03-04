import { Request, Response } from "express";

import { getAppHealth, getDbHealth } from "./health.service";

export function handleGetHealth(_req: Request, res: Response) {
  res.json(getAppHealth());
}

export async function handleGetDbHealth(_req: Request, res: Response) {
  try {
    const result = await getDbHealth();
    res.json(result);
  } catch {
    res.status(500).json({
      status: "error",
      message: "Database unreachable"
    });
  }
}
