import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/helpers/auth";
import HomeTemplate from "../components/HomeTemplate";

export const metadata: Metadata = {
  title: "Your workspace solution for projects | Heavy Notation",
  description:
    "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you.",
  openGraph: {
    title: "Your workspace solution for projects | Heavy Notation",
    description:
      "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you.",
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
    url: "https://heavynotation.vercel.app",
  },
};

type Props = {
  params: Promise<{ lang: string }>;
};

const Home = async ({ params }: Props) => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  const lang = (await params).lang;

  return <HomeTemplate lang={lang} />;
};

export default Home;
