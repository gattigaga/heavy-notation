import { Metadata } from "next";

import Greeting from "./components/Greeting";
import PageList from "./components/PageList";

export const metadata: Metadata = {
  title: "Home | Heavy Notation",
};

const HomePage = async () => {
  return (
    <div className="min-h-screen w-full py-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-y-4">
        <Greeting />
        <PageList />
      </div>
    </div>
  );
};

export default HomePage;
