import { Metadata } from "next";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Greeting from "./components/Greeting";
import PageList from "./components/PageList";

export const metadata: Metadata = {
  title: "Home | Heavy Notation",
};

const HomePage = async () => {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </header>
      <div className="flex-1 overflow-y-scroll">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-y-4 px-4 py-20 md:px-16">
          <Greeting />
          <PageList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
