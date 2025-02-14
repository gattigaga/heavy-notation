"use client";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";

import { useStore } from "@/store/store";
import { messages as enMessages } from "@/locales/en/messages";
import { messages as idMessages } from "@/locales/id/messages";

i18n.load({
  en: enMessages,
  id: idMessages,
});

i18n.activate("en");

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  const language = useStore((state) => state.language);

  useEffect(() => {
    i18n.activate(language);
  }, [language]);

  return (
    <I18nProvider i18n={i18n}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </I18nProvider>
  );
};

export default Provider;
