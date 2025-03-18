import { Metadata } from "next";
import { setI18n } from "@lingui/react/server";

import SignInTemplate from "@/app/components/SignInTemplate";
import { getI18nInstance } from "@/app/helpers/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: "Sign In | Heavy Notation",
  description: "Sign in to your Heavy Notation account.",
  alternates: {
    canonical: "/auth/signin",
    languages: {
      en: "/en/auth/signin",
      id: "/id/auth/signin",
      "x-default": "/auth/signin",
    },
  },
  openGraph: {
    title: "Sign In | Heavy Notation",
    description: "Sign in to your Heavy Notation account.",
    type: "website",
    locale: "en",
    siteName: "Heavy Notation",
    url: "/auth/signin",
    images: [
      {
        url: "/images/home/screenshot.webp",
        type: "image/webp",
        width: 1665,
        height: 951,
        alt: "Heavy Notation website homepage",
      },
    ],
  },
};

const SignInPage = async () => {
  const lang = "en";
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <SignInTemplate />;
};

export default SignInPage;
