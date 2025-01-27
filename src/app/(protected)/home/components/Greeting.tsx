"use client";

import { useSession } from "next-auth/react";

const Greeting = () => {
  const { data: session } = useSession();

  const hour = new Date().getHours();

  const greeting = (() => {
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    if (hour < 22) return "Good evening";

    return "Good night";
  })();

  return (
    <h1 className="mb-8 text-center text-4xl font-semibold text-zinc-700">
      {greeting}, {session?.user?.name}
    </h1>
  );
};

export default Greeting;
