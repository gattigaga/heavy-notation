import { Metadata } from "next";
import { redirect } from "next/navigation";
import { setI18n } from "@lingui/react/server";
import { t } from "@lingui/core/macro";

import { auth } from "@/helpers/auth";
import SignUpTemplate from "@/app/components/SignUpTemplate";
import { getI18nInstance } from "@/app/helpers/i18n";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  const title = t(i18n)`Sign Up` + " | Heavy Notation";
  const description = t(i18n)`Create a new Heavy Notation account.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: "/images/home/screenshot.webp",
          type: "image/webp",
          width: 1665,
          height: 951,
          alt: "Heavy Notation website homepage",
        },
      ],
      url:
        lang !== "en"
          ? `https://heavynotation.vercel.app/${lang}/auth/signup`
          : "https://heavynotation.vercel.app/auth/signup",
    },
  };
};

type Props = {
  params: Promise<{ lang: string }>;
};

const SignUpPage = async ({ params }: Props) => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <SignUpTemplate lang={lang} />;
};

export default SignUpPage;
