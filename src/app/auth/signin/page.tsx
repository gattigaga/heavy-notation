import { Metadata } from "next";

import SignInForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Heavy Notation",
};

const SignInPage = () => {
  return (
    <main className="min-h-screen w-full bg-white">
      <SignInForm />
    </main>
  );
};

export default SignInPage;
