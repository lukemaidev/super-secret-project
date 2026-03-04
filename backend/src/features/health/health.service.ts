import { config } from "../../config/env";
import { pingDatabase } from "../../config/db";

export function getAppHealth() {
  return {
    status: "ok",
    service: "backend"
  };
}

export async function getDbHealth() {
  await pingDatabase();

  return {
    status: "ok",
    database: config.dbName
  };
}
