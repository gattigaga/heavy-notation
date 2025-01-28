"use server";

import * as authHelper from "@/helpers/auth";

export const signOut = async () => {
  await authHelper.signOut({
    redirectTo: "/auth/signin",
  });
};

export const signInWithOAuth = async (provider: string) => {
  await authHelper.signIn(provider, {
    redirectTo: "/home",
  });
};
