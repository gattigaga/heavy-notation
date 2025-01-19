"use server";

import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";

import * as authHelper from "@/helpers/auth";
import { actionClient } from "@/app/helpers/actions";
import { signInSchema } from "./validation";

export const signIn = actionClient
  .schema(signInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    let isSuccess = false;

    try {
      await authHelper.signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      isSuccess = true;
    } catch (error: any) {
      if (error instanceof authHelper.InvalidCredentialsError) {
        returnValidationErrors(signInSchema, {
          _errors: [error.message],
        });
      }
    }

    if (isSuccess) {
      redirect("/home");
    }
  });
