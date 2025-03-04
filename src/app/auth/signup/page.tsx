import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/helpers/auth";
import SignUpTemplate from "@/app/components/SignUpTemplate";

export const metadata: Metadata = {
  title: "Sign Up | Heavy Notation",
  description: "Create a new Heavy Notation account.",
  openGraph: {
    title: "Sign Up | Heavy Notation",
    description: "Create a new Heavy Notation account.",
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
    url: "https://heavynotation.vercel.app/auth/signup",
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
