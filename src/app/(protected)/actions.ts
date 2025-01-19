"use server";

import * as authHelper from "@/helpers/auth";

export const signOut = async () => {
  await authHelper.signOut({
    redirectTo: "/auth/signin",
  });
};
