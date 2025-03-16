import { Metadata } from "next";

import Header from "./components/Header";
import Content from "./components/Content";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  const responsePage = await fetch(`${process.env.BASE_URL}/api/pages/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonPage = await responsePage.json();

  if (!responsePage.ok) {
    throw new Error(jsonPage.message);
  }

  const page = jsonPage.data;

  return {
    metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
    title: `${page.title} | Heavy Notation`,
    description:
      "This page is for authenticated user. Please enter your credentials to access.",
    alternates: {
      canonical: `/pages/${id}`,
    },
    robots: {
      index: false,
      follow: false,
      googleBot: "noindex",
    },
    openGraph: {
      title: `${page.title} | Heavy Notation`,
      description:
        "This page is for authenticated user. Please enter your credentials to access.",
      type: "website",
      locale: "en",
      siteName: "Heavy Notation",
      url: `/pages/${id}`,
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
};

const PageDetailPage = async () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-y-scroll">
        <div className="min-h-screen w-full py-20">
          <Content />
        </div>
      </div>
    </div>
  );
};

export default PageDetailPage;
