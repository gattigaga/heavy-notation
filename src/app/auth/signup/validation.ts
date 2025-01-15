import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(5, "Name should be at least 5 characters")
      .max(50, "Name should be at most 50 characters"),
    username: z
      .string()
      .nonempty("Username is required")
      .min(8, "Username should be at least 8 characters")
      .max(10, "Username should be at most 10 characters"),
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
    confirmPassword: z.string().nonempty("Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password is mismatch",
    path: ["confirmPassword"],
  });
