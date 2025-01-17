import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Email format is invalid")
    .min(10, "Email should be at least 10 characters")
    .max(50, "Email should be at most 50 characters"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password should be at least 8 characters")
    .max(50, "Password should be at most 50 characters"),
});
