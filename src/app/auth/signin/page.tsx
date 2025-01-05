import { Metadata } from "next";

import SignInForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In | Heavy Notation",
};

const SignInPage = () => {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center px-6 py-24">
      <SignInForm />
    </main>
  );
};

export default SignInPage;
