"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </HelmetProvider>
    </SessionProvider>
  );
};

export default Provider;
