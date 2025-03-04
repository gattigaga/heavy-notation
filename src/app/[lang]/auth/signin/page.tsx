import { Metadata } from "next";
import { redirect } from "next/navigation";
import { setI18n } from "@lingui/react/server";

import { auth } from "@/helpers/auth";
import SignInTemplate from "@/app/components/SignInTemplate";
import { getI18nInstance } from "@/app/helpers/i18n";

export const metadata: Metadata = {
  title: "Sign In | Heavy Notation",
  description: "Sign in to your Heavy Notation account.",
  openGraph: {
    title: "Sign In | Heavy Notation",
    description: "Sign in to your Heavy Notation account.",
    type: "website",
    images: [
      {
        url: "/images/home/screenshot.webp",
        type: "image/webp",
        width: 1665,
        height: 951,
        alt: "Heavy Notation website homepage",
      },
    ],
    url: "https://heavynotation.vercel.app/auth/signin",
  },
};

type Props = {
  params: Promise<{ lang: string }>;
};

const SignInPage = async ({ params }: Props) => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <SignInTemplate lang={lang} />;
};

export default SignInPage;
