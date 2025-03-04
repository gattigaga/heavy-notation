import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/helpers/auth";
import SignInTemplate from "@/app/components/SignInTemplate";

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
