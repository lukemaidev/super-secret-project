import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "production"
  ? ".env.production"
  : ".env.development";

dotenv.config({ path: path.resolve(__dirname, "../../", envFile) });

type AppConfig = {
  port: number;
  mongodbUri: string;
  dbName: string;
  corsOrigin: string;
  jwtSecret: string;
  awsRegion: string | undefined;
  awsAccessKeyId: string | undefined;
  awsSecretAccessKey: string | undefined;
};

function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function parsePort(value: string): number {
  const port = Number.parseInt(value, 10);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: ${value}`);
  }

  return port;
}

export const config: AppConfig = {
  port: parsePort(requireEnv("PORT")),
  mongodbUri: requireEnv("MONGODB_URI"),
  dbName: requireEnv("DB_NAME"),
  corsOrigin: requireEnv("CORS_ORIGIN"),
  jwtSecret: requireEnv("JWT_SECRET"),
  awsRegion: process.env.AWS_REGION,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

