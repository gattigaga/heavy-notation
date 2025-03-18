import { Metadata } from "next";
import { setI18n } from "@lingui/react/server";
import { t } from "@lingui/core/macro";

import SignUpTemplate from "@/app/components/SignUpTemplate";
import { getI18nInstance } from "@/app/helpers/i18n";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  const title = t(i18n)`Sign Up` + " | Heavy Notation";
  const description = t(i18n)`Create a new Heavy Notation account.`;

  const urls: Record<string, string> = {
    en: "/en/auth/signup",
    id: "/id/auth/signup",
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
        "x-default": "/auth/signup",
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

const SignUpPage = async ({ params }: Props) => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <SignUpTemplate lang={lang} />;
};

export default SignUpPage;
