import { createApp } from "./app";
import { closeDatabaseConnection, connectToDatabase } from "./config/db";
import { config } from "./config/env";
import { ensureAuthIndexes } from "./features/auth";
import { ensureGoalsIndexes } from "./features/goals";
import { logger } from "./utils/logger";

async function startServer() {
  await connectToDatabase();
  await ensureAuthIndexes();
  await ensureGoalsIndexes();

  const app = createApp();
  const server = app.listen(config.port, () => {
    logger.info(`Backend listening on http://localhost:${config.port}`);
  });

  const shutdown = async () => {
    server.close(async () => {
      await closeDatabaseConnection();
      process.exit(0);
    });
  };

  process.on("SIGINT", () => {
    void shutdown();
  });

  process.on("SIGTERM", () => {
    void shutdown();
  });
}

void startServer().catch((error: unknown) => {
  logger.error(error, "Failed to start backend");
  process.exit(1);
});

