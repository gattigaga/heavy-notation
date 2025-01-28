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
    <div className="flex flex-col gap-y-24 px-8 pt-16">
      <div>
        <h1 className="mb-4 text-5xl font-bold tracking-tighter text-zinc-700">
          The happier workspace
        </h1>
        <p className="mb-4 text-2xl font-medium text-zinc-700">
          Think. Write. Plan your ideas with a better way.
        </p>
        <Button
          className="mb-8 mt-4 h-12 w-full bg-blue-500 text-base font-semibold"
          type="button"
        >
          Get Started
        </Button>

        <p className="mb-2 text-base text-zinc-400">Trusted by teams at</p>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoDuckDuckGo width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">DuckDuckGo</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoTwitch width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Twitch</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoShopify width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Shopify</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoDiscord width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Discord</p>
          </div>
        </div>

        <div className="aspect-video w-full bg-zinc-200" />
      </div>

      <div>
        <h2 className="mb-4 text-5xl font-bold text-zinc-700">
          Build perfect docs, together.
        </h2>
        <p className="mb-8 text-xl font-medium text-zinc-400">
          Capture your ideas, get feedback from teammates, and ask AI to add the
          finishing touches.
        </p>
        <div className="aspect-video w-full bg-zinc-200" />
        <p className="mb-2 mt-8 text-base text-zinc-400">Replaces</p>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoEvernote width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Evernote</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoCoda width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Coda</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-5xl font-bold text-zinc-700">
          Your workflow. Your way.
        </h2>
        <p className="mb-8 text-xl font-medium text-zinc-400">
          All your projects, goals, calendars, roadmaps, and more—in one
          tool—personalized to how you and your team work.
        </p>
        <div className="aspect-video w-full bg-zinc-200" />
        <p className="mb-2 mt-8 text-base text-zinc-400">Replaces</p>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoTrello width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Trello</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoAsana width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Asana</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-5xl font-bold text-zinc-700">
          Find everything. Instantly.
        </h2>
        <p className="mb-8 text-xl font-medium text-zinc-400">
          No more endless searching. Our built-in AI finds what you{"'"}re
          looking for, whether its stored in Heavy Notation or one of your other
          apps.
        </p>
        <div className="aspect-video w-full bg-zinc-200" />
        <p className="mb-2 mt-8 text-base text-zinc-400">Replaces</p>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoConfluence width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Confluence</p>
          </div>
          <div className="col-span-1 flex items-center gap-x-2">
            <LogoAsana width={24} height={24} fill="#a1a1aa" />
            <p className="text-base font-semibold text-zinc-400">Asana</p>
          </div>
        </div>
      </div>

      <footer className="flex h-24 items-center justify-center">
        <p className="text-center text-sm text-zinc-700">
          © {new Date().getFullYear()} Gattigaga Hayyuta Dewa
        </p>
      </footer>
    </div>
  );
}
