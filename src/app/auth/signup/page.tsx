import { Metadata } from "next";
import { setI18n } from "@lingui/react/server";

import SignUpTemplate from "@/app/components/SignUpTemplate";
import { getI18nInstance } from "@/app/helpers/i18n";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: "Sign Up | Heavy Notation",
  description: "Create a new Heavy Notation account.",
  alternates: {
    canonical: "/auth/signup",
    languages: {
      en: "/en/auth/signup",
      id: "/id/auth/signup",
      "x-default": "/auth/signup",
    },
  },
  openGraph: {
    title: "Sign Up | Heavy Notation",
    description: "Create a new Heavy Notation account.",
    type: "website",
    locale: "en",
    siteName: "Heavy Notation",
    url: "/auth/signup",
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

const SignUpPage = async () => {
  const lang = "en";
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <SignUpTemplate />;
};

export default SignUpPage;
