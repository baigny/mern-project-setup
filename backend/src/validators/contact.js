import { z } from "zod";

export const contactSchema = z.object({
  username: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});