import { Metadata } from "next";
import { setI18n } from "@lingui/react/server";
import { t } from "@lingui/core/macro";

import SignInTemplate from "@/app/components/SignInTemplate";
import { getI18nInstance } from "@/app/helpers/i18n";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  const title = t(i18n)`Sign In` + " | Heavy Notation";
  const description = t(i18n)`Sign in to your Heavy Notation account.`;

  const urls: Record<string, string> = {
    en: "/en/auth/signin",
    id: "/id/auth/signin",
  };

  const currentUrl = urls[lang] || "";

  return {
    metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
    title,
    description,
    alternates: {
      canonical: currentUrl,
      languages: {
        ...urls,
        "x-default": "/auth/signin",
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: lang,
      siteName: "Heavy Notation",
      url: currentUrl,
      images: [
        {
          url: "/images/home/screenshot.webp",
          type: "image/webp",
          width: 1665,
          height: 951,
          alt: "Heavy Notation website homepage",
        },
      ],
    },
  };
};

type Props = {
  params: Promise<{ lang: string }>;
};

const SignInPage = async ({ params }: Props) => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <SignInTemplate lang={lang} />;
};

export default SignInPage;
