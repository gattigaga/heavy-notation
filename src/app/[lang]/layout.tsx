import { Geist, Geist_Mono } from "next/font/google";
import { setI18n } from "@lingui/react/server";

import { Toaster } from "@/components/ui/sonner";
import Provider from "../components/Provider";
import { getI18nInstance } from "../helpers/i18n";

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
  params: Promise<{ lang: string }>;
};

const Layout = async ({ children, params }: Props) => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider locale={lang} messages={i18n.messages}>
          {children}
        </Provider>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
