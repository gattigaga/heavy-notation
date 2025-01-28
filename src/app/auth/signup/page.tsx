import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import imgLogoHeavyNotation from "../../../../public/images/logo-text-heavy-notation.png";
import SignUpForm from "./components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | Heavy Notation",
};

const SignUpPage = () => {
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
