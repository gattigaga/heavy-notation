import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import LogoDuckDuckGo from "./components/LogoDuckDuckGo";
import LogoTwitch from "./components/LogoTwitch";
import LogoShopify from "./components/LogoShopify";
import LogoDiscord from "./components/LogoDiscord";
import LogoEvernote from "./components/LogoEvernote";
import LogoCoda from "./components/LogoCoda";
import LogoTrello from "./components/LogoTrello";
import LogoAsana from "./components/LogoAsana";
import LogoConfluence from "./components/LogoConfluence";

export const metadata: Metadata = {
  title: "Your workspace solution for projects | Heavy Notation",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-y-24 px-8 pt-16 md:gap-y-40 md:px-16">
      <div className="flex flex-col">
        <h1 className="mb-4 whitespace-pre text-5xl font-bold tracking-tighter text-zinc-700 md:text-center md:text-7xl">
          The happier{"\n"}workspace
        </h1>
        <p className="mb-4 text-2xl font-medium text-zinc-700 md:text-center">
          Think. Write. Plan your ideas with a better way.
        </p>
        <Button
          className="mb-8 mt-4 h-12 w-full bg-blue-500 text-base font-semibold md:w-fit md:self-center"
          type="button"
        >
          Get Started
        </Button>

        <p className="mb-2 text-base text-zinc-400 md:text-center">
          Trusted by teams at
        </p>
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="col-span-1 flex items-center gap-x-2 md:col-start-2">
            <LogoDuckDuckGo
              className="shrink-0"
              width={24}
              height={24}
              fill="#a1a1aa"
            />
            <p className="text-base font-semibold text-zinc-400">DuckDuckGo</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoTwitch
              className="shrink-0"
              width={24}
              height={24}
              fill="#a1a1aa"
            />
            <p className="text-base font-semibold text-zinc-400">Twitch</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2 md:col-start-2">
            <LogoShopify
              className="shrink-0"
              width={24}
              height={24}
              fill="#a1a1aa"
            />
            <p className="text-base font-semibold text-zinc-400">Shopify</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoDiscord
              className="shrink-0"
              width={24}
              height={24}
              fill="#a1a1aa"
            />
            <p className="text-base font-semibold text-zinc-400">Discord</p>
          </div>
        </div>

        <div className="aspect-video w-full bg-zinc-200" />
      </div>

      <div>
        <h2 className="mb-4 whitespace-pre text-4xl font-bold text-zinc-700 md:text-6xl">
          Build perfect{"\n"}docs, together.
        </h2>
        <p className="mb-8 text-xl font-medium text-zinc-400">
          Capture your ideas, get feedback from teammates, and ask AI to add the
          finishing touches.
        </p>
        <div className="mb-8 aspect-video w-full bg-zinc-200" />
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          <p className="w-full shrink-0 text-base font-semibold text-zinc-700 md:w-auto">
            Replaces
          </p>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoEvernote width={24} height={24} fill="#a1a1aa" />
            <p className="text-base text-zinc-400">Evernote</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoCoda width={24} height={24} fill="#a1a1aa" />
            <p className="text-base text-zinc-400">Coda</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 whitespace-pre text-4xl font-bold text-zinc-700 md:text-6xl">
          Your workflow.{"\n"}Your way.
        </h2>
        <p className="mb-8 text-xl font-medium text-zinc-400">
          All your projects, goals, calendars, roadmaps, and more—in one
          tool—personalized to how you and your team work.
        </p>
        <div className="mb-8 aspect-video w-full bg-zinc-200" />
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          <p className="w-full shrink-0 text-base font-semibold text-zinc-700 md:w-auto">
            Replaces
          </p>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoTrello width={24} height={24} fill="#a1a1aa" />
            <p className="text-base text-zinc-400">Trello</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoAsana width={24} height={24} fill="#a1a1aa" />
            <p className="text-base text-zinc-400">Asana</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 whitespace-pre text-4xl font-bold text-zinc-700 md:text-6xl">
          Find everything.{"\n"}Instantly.
        </h2>
        <p className="mb-8 text-xl font-medium text-zinc-400">
          No more endless searching. Our built-in AI finds what you{"'"}re
          looking for, whether its stored in Heavy Notation or one of your other
          apps.
        </p>
        <div className="mb-8 aspect-video w-full bg-zinc-200" />
        <div className="flex flex-wrap gap-x-4 gap-y-3">
          <p className="w-full shrink-0 text-base font-semibold text-zinc-700 md:w-auto">
            Replaces
          </p>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoConfluence width={24} height={24} fill="#a1a1aa" />
            <p className="text-base text-zinc-400">Confluence</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoAsana width={24} height={24} fill="#a1a1aa" />
            <p className="text-base text-zinc-400">Asana</p>
          </div>
        </div>
      </div>

      <footer className="flex h-24 items-center justify-center">
        <p className="text-center text-sm text-zinc-700 md:text-base">
          © {new Date().getFullYear()} Gattigaga Hayyuta Dewa
        </p>
      </footer>
    </div>
  );
}
