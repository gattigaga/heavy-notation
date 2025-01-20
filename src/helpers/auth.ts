import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import md5 from "md5";

import { prisma } from "./prisma";
import { signInSchema } from "@/app/auth/signin/validation";

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
        const { email, password } = await signInSchema.parseAsync(credentials);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new InvalidCredentialsError("Email or password is incorrect.");
        }

        const isValid = md5(password) === user.password;

        if (!isValid) {
          throw new InvalidCredentialsError("Email or password is incorrect.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }

      return session;
    },
  },
});
