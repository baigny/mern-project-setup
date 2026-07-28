import { z } from "zod";

// Mirrors backend/src/validators/auth.js and contact.js — keep in sync.

export const registerSchema = z.object({
  username: z.string().trim().min(3, "Username must be at least 3 characters long"),
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
  password: z.string().min(1, "Password is required"),
});

export const contactSchema = z.object({
  username: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});
