import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

import { auth } from "@/helpers/auth";
import { getI18nInstance } from "../helpers/i18n";
import { Toaster } from "@/components/ui/sonner";
import Provider from "../components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  const lang = "en";
  const i18n = getI18nInstance(lang);

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white antialiased dark:bg-zinc-900`}
      >
        <Provider locale={lang} messages={i18n.messages}>
          {children}
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

export default Layout;
