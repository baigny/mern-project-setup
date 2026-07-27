import z from 'zod';
export const registerSchema = z.object({

    username:z.string().trim().min(3, "Username must be at least 3 characters long"),

    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
    password: z.string().min(8, "Password must be at least 8 characters long")

});

export const loginSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email address")),
    password: z.string().min(1, "Password is required")
});