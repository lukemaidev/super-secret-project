import { Request, Response } from "express";

import { register, login } from "./auth.service";
import type { RegisterRequest, LoginRequest } from "./auth.types";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { email, password } = req.body as RegisterRequest;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: "Password must be at least 6 characters" });
      return;
    }

    const result = await register(email, password);
    res.status(201).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Registration failed";
    const status = message === "Email already registered" ? 409 : 500;
    res.status(status).json({ error: message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body as LoginRequest;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const result = await login(email, password);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    const status = message === "Invalid email or password" ? 401 : 500;
    res.status(status).json({ error: message });
  }
}
