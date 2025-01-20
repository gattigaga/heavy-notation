import { Metadata } from "next";

import SignUpForm from "./components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | Heavy Notation",
};

const SignUpPage = () => {
  return (
    <main className="min-h-screen w-full bg-white">
      <SignUpForm />
    </main>
  );
};

export default SignUpPage;
