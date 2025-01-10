import { Metadata } from "next";

import Content from "./components/Content";

export const metadata: Metadata = {
  title: "Page Name Here | Heavy Notation",
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PageDetailPage = async ({}: Props) => {
  return (
    <main className="min-h-screen w-full py-24">
      <Content />
    </main>
  );
};

export default PageDetailPage;
