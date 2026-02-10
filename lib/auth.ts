// ============================================================
// JWT Auth Utilities
// ============================================================

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_dev_secret";
const JWT_EXPIRES_IN = "7d";

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
}

// ---- Password Hashing ----

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ---- JWT Token ----

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
}

// ---- Extract user from request ----

export function getUserFromRequest(req: NextRequest): JwtPayload | null {
  // Check Authorization header first
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    try {
      return verifyToken(authHeader.slice(7));
    } catch {
      return null;
    }
  }

  // Check cookie as fallback
  const token = req.cookies.get("token")?.value;
  if (token) {
    try {
      return verifyToken(token);
    } catch {
      return null;
    }
  }

  return null;
}
