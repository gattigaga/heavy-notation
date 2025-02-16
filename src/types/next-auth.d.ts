import { Language } from "@prisma/client";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    username: string | null;
    lang: Language | null;
  }

  interface Session {
    user: {
      username: string | null;
      lang: Language | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string | null;
    lang: Language | null;
  }
}
