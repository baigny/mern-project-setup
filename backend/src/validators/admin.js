import { z } from "zod";

export const updateUserSchema = z
  .object({
    username: z.string().trim().min(3, "Username must be at least 3 characters"),
    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
    isAdmin: z.boolean(),
  })
  .partial(); // every field optional — it's a partial update