"use client";

import { useSession } from "next-auth/react";
import { useLingui } from "@lingui/react/macro";

const Greeting = () => {
  const { t } = useLingui();
  const { data: session } = useSession();

  const hour = new Date().getHours();

  const greeting = (() => {
    if (hour < 12) return t`Good morning`;
    if (hour < 18) return t`Good afternoon`;
    if (hour < 22) return t`Good evening`;

    return t`Good night`;
  })();

  return (
    <h1 className="mb-8 whitespace-pre text-center text-2xl font-semibold text-zinc-700 md:text-4xl">
      {greeting},{"\n"}
      {session?.user?.name}
    </h1>
  );
};

export default Greeting;
