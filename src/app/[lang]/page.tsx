import { Metadata } from "next";
import { redirect } from "next/navigation";
import { setI18n } from "@lingui/react/server";
import { t } from "@lingui/core/macro";

import { auth } from "@/helpers/auth";
import HomeTemplate from "../components/HomeTemplate";
import { getI18nInstance } from "../helpers/i18n";

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  const title =
    t(i18n)`Your workspace solution for projects` + "| Heavy Notation";

  const description = t(
    i18n,
  )`A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you.`;

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
          ? `https://heavynotation.vercel.app/${lang}`
          : "https://heavynotation.vercel.app",
    },
  };
};

type Props = {
  params: Promise<{ lang: string }>;
};

const HomePage = async ({ params }: Props) => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  const lang = (await params).lang;
  const i18n = getI18nInstance(lang);

  setI18n(i18n);

  return <HomeTemplate lang={lang} />;
};

export default HomePage;
