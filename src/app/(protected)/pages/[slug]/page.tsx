import { Metadata } from "next";

import Header from "./components/Header";
import Content from "./components/Content";

export const metadata: Metadata = {
  title: "New Page | Heavy Notation",
};

const PageDetailPage = async () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex-1 overflow-y-scroll">
        <main className="min-h-screen w-full py-24">
          <Content />
        </main>
      </div>
    </div>
  );
};

export default PageDetailPage;
