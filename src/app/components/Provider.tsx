"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const Provider = ({ children }: Props) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HelmetProvider>
  );
};

export default Provider;
