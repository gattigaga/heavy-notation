import { z } from "zod";
import { t } from "@lingui/core/macro";
import { I18n } from "@lingui/core";

export const getUpdateAccountSchema = (i18n: I18n) => {
  return z.object({
    name: z
      .string()
      .nonempty(t(i18n)`Name is required`)
      .min(5, t(i18n)`Name should be at least 5 characters`)
      .max(50, t(i18n)`Name should be at most 50 characters`),
    avatar: z.any().optional(),
  });
};
