"use server";

import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";
import md5 from "md5";

import { prisma } from "@/helpers/prisma";
import { actionClient } from "@/app/helpers/actions";
import { signUpSchema } from "./validation";

export const signUp = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { name, username, email, password } }) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const errors: Record<string, { _errors: string[] }> = {};

      if (existingUser.email === email) {
        errors.email = {
          _errors: ["Email already registered"],
        };
      }

      if (existingUser.username === username) {
        errors.username = {
          _errors: ["Username already registered"],
        };
      }

      returnValidationErrors(signUpSchema, errors);
    }

    const hashedPassword = md5(password);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    redirect("/auth/signin");
  });
