import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { setI18n } from "@lingui/react/server";

import { auth } from "@/helpers/auth";
import { getI18nInstance } from "./helpers/i18n";
import { Toaster } from "@/components/ui/sonner";
import HomeTemplate from "./components/HomeTemplate";
import Provider from "./components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: "Your workspace solution for projects | Heavy Notation",
  description:
    "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      id: "/id",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Your workspace solution for projects | Heavy Notation",
    description:
      "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you.",
    type: "website",
    locale: "en",
    siteName: "Heavy Notation",
    url: "/",
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
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  const lang = "en";
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased dark:bg-zinc-900`}
      >
        <Provider locale={lang} messages={i18n.messages}>
          <HomeTemplate />
        </Provider>
        <Toaster
          toastOptions={{
            className: "bg-zinc-100 dark:bg-zinc-800",
          }}
        />
      </body>
    </html>
  );
};

export default HomePage;
