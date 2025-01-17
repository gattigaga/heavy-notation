"use server";

import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";

import * as auth from "@/helpers/auth";
import { actionClient } from "@/app/helpers/actions";
import { signInSchema } from "./validation";

export const signIn = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    let isSuccess = false;

    try {
      await auth.signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      isSuccess = true;
    } catch (error: any) {
      if (error instanceof auth.InvalidCredentialsError) {
        returnValidationErrors(signInSchema, {
          _errors: [error.message],
        });
      }
    }

    if (isSuccess) {
      redirect("/dashboard");
    }
  });
