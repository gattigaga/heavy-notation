import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import imgLogoHeavyNotation from "../../../../public/images/logo-text-heavy-notation.png";
import SignUpForm from "./components/SignUpForm";
import { auth } from "@/helpers/auth";

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
    url: "/auth/signup",
  },
};

const SignUpPage = async () => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <header className="flex h-16 items-center px-4">
        <Link href="/">
          <Image
            src={imgLogoHeavyNotation}
            alt="Heavy Notation logo"
            className="h-8 w-auto"
          />
        </Link>
      </header>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
