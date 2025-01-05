import { Metadata } from "next";

import SignUpForm from "./components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | Heavy Notation",
};

const SignUpPage = () => {
  return (
    <main className="w-full min-h-screen bg-white flex flex-col items-center px-6 py-24">
      <SignUpForm />
    </main>
  );
};

export default SignUpPage;
