import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/helpers/auth";
import SignInTemplate from "@/app/components/SignInTemplate";

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
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  return <SignInTemplate />;
};

export default SignInPage;
