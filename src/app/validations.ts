import { z } from "zod";
import { t } from "@lingui/core/macro";
import { I18n } from "@lingui/core";

export const getSignUpSchema = (i18n: I18n) => {
  return z
    .object({
      name: z
        .string()
        .nonempty(t(i18n)`Name is required`)
        .min(5, t(i18n)`Name should be at least 5 characters`)
        .max(50, t(i18n)`Name should be at most 50 characters`),
      username: z
        .string()
        .nonempty(t(i18n)`Username is required`)
        .min(8, t(i18n)`Username should be at least 8 characters`)
        .max(10, t(i18n)`Username should be at most 10 characters`),
      email: z
        .string()
        .nonempty(t(i18n)`Email is required`)
        .email(t(i18n)`Email format is invalid`)
        .min(10, t(i18n)`Email should be at least 10 characters`)
        .max(50, t(i18n)`Email should be at most 50 characters`),
      password: z
        .string()
        .nonempty(t(i18n)`Password is required`)
        .min(8, t(i18n)`Password should be at least 8 characters`)
        .max(50, t(i18n)`Password should be at most 50 characters`),
      confirmPassword: z
        .string()
        .nonempty(t(i18n)`Confirm Password is required`),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t(i18n)`Confirm Password is mismatch`,
      path: ["confirmPassword"],
    });
};

export const getSignInSchema = (i18n: I18n) => {
  return z.object({
    email: z
      .string()
      .nonempty(t(i18n)`Email is required`)
      .email(t(i18n)`Email format is invalid`)
      .min(10, t(i18n)`Email should be at least 10 characters`)
      .max(50, t(i18n)`Email should be at most 50 characters`),
    password: z
      .string()
      .nonempty(t(i18n)`Password is required`)
      .min(8, t(i18n)`Password should be at least 8 characters`)
      .max(50, t(i18n)`Password should be at most 50 characters`),
  });
};
