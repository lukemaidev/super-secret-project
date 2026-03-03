import { createApp } from "./app";
import { closeDatabaseConnection, connectToDatabase } from "./config/db";
import { config } from "./config/env";

async function startServer() {
  await connectToDatabase();

  const app = createApp();
  const server = app.listen(config.port, () => {
    console.log(`Backend listening on http://localhost:${config.port}`);
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
  console.error("Failed to start backend", error);
  process.exit(1);
});

