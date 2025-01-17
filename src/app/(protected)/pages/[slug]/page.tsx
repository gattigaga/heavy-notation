import { Metadata } from "next";

import Content from "./components/Content";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Page Name Here | Heavy Notation",
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PageDetailPage = async ({ params }: Props) => {
  const paramsResult = await params;
  const title = paramsResult.slug.replace(/-/g, " ");
  const updatedAt = "2025-01-10T05:00:00Z";

  return (
    <div className="flex h-screen flex-col">
      <Header title={title} updatedAt={updatedAt} />
      <div className="flex-1 overflow-y-scroll">
        <main className="min-h-screen w-full py-24">
          <Content />
        </main>
      </div>
    </div>
  );
};

export default PageDetailPage;
