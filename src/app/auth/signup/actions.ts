"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";

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

    const salt = crypto.randomBytes(16).toString("hex");

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        passwordSalt: salt,
      },
    });

    redirect("/auth/signin");
  });
