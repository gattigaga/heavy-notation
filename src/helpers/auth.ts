import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { cookies } from "next/headers";
import { Language } from "@prisma/client";
import { t } from "@lingui/core/macro";
import md5 from "md5";

import { prisma } from "./prisma";
import { getI18nInstance } from "@/app/helpers/i18n";
import { getSignInSchema } from "@/app/validations";

export class InvalidCredentialsError extends AuthError {
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);

    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const cookieStore = await cookies();

        const locale = cookieStore.get("locale")?.value || "en";
        const i18n = getI18nInstance(locale);
        const schema = getSignInSchema(i18n);

        const { email, password } = await schema.parseAsync(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new InvalidCredentialsError(
            t(i18n)`Email or password is incorrect.`,
          );
        }

        const isValid = md5(password) === user.password;

        if (!isValid) {
          throw new InvalidCredentialsError(
            t(i18n)`Email or password is incorrect.`,
          );
        }

        return user;
      },
    }),
    Google,
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.lang = user.lang;
        token.image = user.image;
      }

      if (trigger === "update") {
        if (session?.name) {
          token.name = session.name;
        }

        if (session?.lang) {
          token.lang = session.lang;
        }

        if (session?.image) {
          token.image = session.image;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.lang = token.lang as Language;
        session.user.image = token.image as string;
      }

      return session;
    },
  },
});
