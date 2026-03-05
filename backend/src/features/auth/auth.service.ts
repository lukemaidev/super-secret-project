import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import { getDatabase } from "../../config/db";
import { config } from "../../config/env";
import type { UserDocument, AuthResponse } from "./auth.types";

const SALT_ROUNDS = 10;

function usersCollection() {
  return getDatabase().collection<UserDocument>("users");
}

function signToken(userId: string): string {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: "7d" });
}

export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  return usersCollection().findOne({ email: email.toLowerCase().trim() });
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  const normalizedEmail = email.toLowerCase().trim();

  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    throw new Error("Email already registered");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const now = new Date();

  const result = await usersCollection().insertOne({
    _id: new ObjectId(),
    email: normalizedEmail,
    passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  const token = signToken(result.insertedId.toHexString());

  return {
    token,
    user: { id: result.insertedId.toHexString(), email: normalizedEmail },
  };
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error("Invalid email or password");
  }

  const token = signToken(user._id.toHexString());

  return {
    token,
    user: { id: user._id.toHexString(), email: user.email },
  };
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, config.jwtSecret) as { userId: string };
}

export async function ensureIndexes(): Promise<void> {
  await usersCollection().createIndex({ email: 1 }, { unique: true });
}
