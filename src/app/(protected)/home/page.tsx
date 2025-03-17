import { Metadata } from "next";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Greeting from "./components/Greeting";
import PageList from "./components/PageList";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: "Home | Heavy Notation",
  description:
    "This page is for authenticated user. Please enter your credentials to access.",
  alternates: {
    canonical: "/home",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: "noindex",
  },
  openGraph: {
    title: "Home | Heavy Notation",
    description:
      "This page is for authenticated user. Please enter your credentials to access.",
    type: "website",
    locale: "en",
    siteName: "Heavy Notation",
    url: "/home",
    images: [
      {
        url: "/images/home/screenshot.webp",
        type: "image/webp",
        width: 1665,
        height: 951,
        alt: "Heavy Notation website home page",
      },
    ],
  },
};

const HomePage = async () => {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-700 dark:text-white hover:dark:bg-zinc-800 hover:dark:text-white" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 bg-zinc-200 dark:bg-zinc-700"
        />
      </header>
      <div className="flex-1 overflow-y-scroll">
        <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-y-4 px-4 py-20 md:px-16">
          <Greeting />
          <PageList />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
