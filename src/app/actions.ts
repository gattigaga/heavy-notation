"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { returnValidationErrors } from "next-safe-action";
import { t } from "@lingui/core/macro";
import md5 from "md5";

import * as authHelper from "@/helpers/auth";
import { prisma } from "@/helpers/prisma";
import { actionClient } from "@/app/helpers/actions";
import {
  getSignInSchema as signInSchema,
  getSignUpSchema as signUpSchema,
} from "@/app/validations";
import { getI18nInstance } from "./helpers/i18n";

const getSignUpSchema = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value || "en";
  const i18n = getI18nInstance(locale);

  return signUpSchema(i18n);
};

const getSignInSchema = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value || "en";
  const i18n = getI18nInstance(locale);

  return signInSchema(i18n);
};

export const signUp = actionClient
  .schema(getSignUpSchema)
  .action(async ({ parsedInput: { name, username, email, password } }) => {
    const cookieStore = await cookies();

    const locale = cookieStore.get("locale")?.value || "en";
    const i18n = getI18nInstance(locale);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      const errors: Record<string, { _errors: string[] }> = {};

      if (existingUser.email === email) {
        errors.email = {
          _errors: [t(i18n)`Email already registered`],
        };
      }

      if (existingUser.username === username) {
        errors.username = {
          _errors: [t(i18n)`Username already registered`],
        };
      }

      returnValidationErrors(getSignUpSchema, errors);
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

    redirect(locale !== "en" ? `/${locale}/auth/signin` : "/auth/signin");
  });

export const signIn = actionClient
  .schema(getSignInSchema)
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
        returnValidationErrors(getSignInSchema, {
          _errors: [error.message],
        });
      }
    }

    if (isSuccess) {
      redirect("/home");
    }
  });
