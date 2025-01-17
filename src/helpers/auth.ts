import md5 from "md5";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "./prisma";
import { signInSchema } from "@/app/auth/signin/validation";

export class InvalidCredentialsError extends AuthError {
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);

    this.message = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
});
