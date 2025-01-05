import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Name Here | Heavy Notation",
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PageDetailPage = async ({ params }: Props) => {
  const slug = (await params).slug;

  return <main className="w-full min-h-screen bg-white">{slug}</main>;
};

export default PageDetailPage;
