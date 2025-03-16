import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/helpers/auth";
import SignUpTemplate from "@/app/components/SignUpTemplate";

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
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  return <SignUpTemplate />;
};

export default SignUpPage;
