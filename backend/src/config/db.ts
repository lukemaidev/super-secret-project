import { Db, MongoClient } from "mongodb";

import { config } from "./env";
import { logger } from "../utils/logger";

let client: MongoClient | null = null;
let database: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (database) {
    return database;
  }

  client = new MongoClient(config.mongodbUri);
  await client.connect();

  database = client.db(config.dbName);
  await database.command({ ping: 1 });
  logger.info("Connected to MongoDB");

  return database;
}

export async function pingDatabase(): Promise<void> {
  if (!database) {
    throw new Error("Database connection has not been initialized");
  }

  await database.command({ ping: 1 });
}

export function getDatabase(): Db {
  if (!database) {
    throw new Error("Database connection has not been initialized");
  }

  return database;
}

export async function closeDatabaseConnection(): Promise<void> {
  if (!client) {
    return;
  }

  await client.close();
  client = null;
  database = null;
}

