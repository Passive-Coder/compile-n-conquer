'use server';

import { prisma } from '@/lib/db';
import { hashPassword, verifyPassword, generateToken, setAuthCookie, removeAuthCookie, getCurrentUser } from '@/lib/auth';
import { z } from 'zod';

// Validation schemas
const signupSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type AuthResult = {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    username: string;
    email: string;
    rating: number;
  };
};

export async function signup(formData: FormData): Promise<AuthResult> {
  try {
    // Parse and validate input
    const data = {
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validation = signupSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const { username, email, password } = validation.data;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return { success: false, error: 'Email already registered' };
      }
      return { success: false, error: 'Username already taken' };
    }

    // Hash password and create user
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
      },
    });

    // Generate token and set cookie
    const token = generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    });
    await setAuthCookie(token);

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating,
      },
    };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: 'An error occurred during signup' };
  }
}

export async function login(formData: FormData): Promise<AuthResult> {
  try {
    // Parse and validate input
    const data = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validation = loginSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: validation.error.issues[0].message };
    }

    const { email, password } = validation.data;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Verify password
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Generate token and set cookie
    const token = generateToken({
      userId: user.id,
      username: user.username,
      email: user.email,
    });
    await setAuthCookie(token);

    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        rating: user.rating,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'An error occurred during login' };
  }
}

export async function logout(): Promise<{ success: boolean }> {
  try {
    await removeAuthCookie();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false };
  }
}

export async function getUser() {
  const user = await getCurrentUser();
  if (!user) return null;

  const dbUser = await prisma.user.findUnique({
    where: { id: user.userId },
    select: {
      id: true,
      username: true,
      email: true,
      rating: true,
      gamesPlayed: true,
      gamesWon: true,
      createdAt: true,
    },
  });

  return dbUser;
}
