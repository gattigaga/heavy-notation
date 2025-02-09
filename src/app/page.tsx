import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@/helpers/auth";
import { Button } from "@/components/ui/button";
import LogoDuckDuckGo from "./components/LogoDuckDuckGo";
import LogoTwitch from "./components/LogoTwitch";
import LogoShopify from "./components/LogoShopify";
import LogoDiscord from "./components/LogoDiscord";
import LogoEvernote from "./components/LogoEvernote";
import LogoCoda from "./components/LogoCoda";
import LogoTrello from "./components/LogoTrello";
import LogoAsana from "./components/LogoAsana";
import LogoConfluence from "./components/LogoConfluence";
import imgLogoHeavyNotation from "../../public/images/logo-text-heavy-notation.png";
import img1 from "../../public/images/home/annie-spratt-5cFwQ-WMcJU-unsplash.webp";
import img2 from "../../public/images/home/beatriz-perez-moya-XN4T2PVUUgk-unsplash.webp";
import img3 from "../../public/images/home/arisa-chattasa-0LaBRkmH4fM-unsplash.webp";
import img4 from "../../public/images/home/wesley-tingey-snNHKZ-mGfE-unsplash.webp";

export const metadata: Metadata = {
  title: "Your workspace solution for projects | Heavy Notation",
};

const Home = async () => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between px-4">
        <Link href="/">
          <Image
            src={imgLogoHeavyNotation}
            alt="Heavy Notation logo"
            className="h-8 w-auto"
          />
        </Link>
        <Button
          className="font-semibold text-zinc-700"
          type="button"
          variant="outline"
        >
          <Link href="/auth/signin">Sign In</Link>
        </Button>
      </header>
      <div className="flex max-w-screen-2xl flex-col gap-y-24 px-8 pt-4 md:gap-y-40 md:px-16 md:pt-10 lg:px-24 lg:pt-16 2xl:mx-auto 2xl:px-40">
        <div className="flex flex-col">
          <h1 className="mb-4 whitespace-pre text-5xl font-bold tracking-tighter text-zinc-700 md:text-center md:text-7xl lg:text-left">
            The happier{"\n"}workspace
          </h1>
          <p className="mb-4 whitespace-pre text-2xl text-zinc-700 md:text-center lg:text-left">
            Think. Write. Plan your ideas{"\n"}in a better way.
          </p>
          <Button
            className="mb-8 mt-4 h-12 w-full bg-blue-500 text-base font-semibold md:w-fit md:self-center lg:mb-8 lg:w-auto lg:self-start"
            type="button"
          >
            <Link href="/auth/signup">Start Writing Now</Link>
          </Button>

          <p className="mb-2 text-base text-zinc-700 md:text-center lg:text-left">
            Trusted by teams at
          </p>
          <div className="mb-8 flex flex-wrap gap-4 md:justify-center lg:justify-start lg:gap-8">
            <div className="flex items-center gap-x-2">
              <LogoDuckDuckGo
                className="shrink-0"
                width={24}
                height={24}
                fill="#3f3f46"
              />
              <p className="text-base font-semibold text-zinc-700">
                DuckDuckGo
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <LogoTwitch
                className="shrink-0"
                width={24}
                height={24}
                fill="#3f3f46"
              />
              <p className="text-base font-semibold text-zinc-700">Twitch</p>
            </div>
            <div className="flex items-center gap-x-2">
              <LogoShopify
                className="shrink-0"
                width={24}
                height={24}
                fill="#3f3f46"
              />
              <p className="text-base font-semibold text-zinc-700">Shopify</p>
            </div>
            <div className="flex items-center gap-x-2">
              <LogoDiscord
                className="shrink-0"
                width={24}
                height={24}
                fill="#3f3f46"
              />
              <p className="text-base font-semibold text-zinc-700">Discord</p>
            </div>
          </div>

          <Image
            className="aspect-video w-full rounded-lg"
            src={img1}
            alt="Vintage page sheet background by Annie Spratt"
          />
        </div>

        <div>
          <h2 className="mb-4 whitespace-pre text-4xl font-bold text-zinc-700 md:text-6xl">
            Build perfect{"\n"}docs.
          </h2>
          <p className="mb-8 text-xl text-zinc-400">
            Capture your ideas and create perfect documentation with our simple
            and intuitive interface.
          </p>
          <Image
            className="mb-8 aspect-video w-full rounded-lg"
            src={img2}
            alt="Folder stack by Beatriz Perez Moya"
          />
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
          <p className="mb-8 text-xl text-zinc-400">
            All your projects, goals, calendars, roadmaps, and more—in one
            tool—personalized to how you work.
          </p>
          <Image
            className="mb-8 aspect-video w-full rounded-lg"
            src={img3}
            alt="Document stack by Arisa Chattasa"
          />
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
          <p className="mb-8 text-xl text-zinc-400">
            Find what you need quickly with our powerful search. Access your
            content stored in Heavy Notation.
          </p>
          <Image
            className="mb-8 aspect-video w-full rounded-lg"
            src={img4}
            alt="Bunch of documents by Wesley Tingey"
          />
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

        <div className="flex flex-col items-center rounded-lg bg-zinc-100 p-8 md:p-16 lg:p-24">
          <h2 className="mb-4 whitespace-pre text-center text-4xl font-bold text-zinc-700 md:text-6xl">
            Get Started.
          </h2>
          <p className="mb-8 text-center text-base text-zinc-400">
            Start organizing your work better. Access your content easily with
            our powerful search features.
          </p>
          <Button
            className="h-12 w-full bg-blue-500 text-base font-semibold md:w-fit md:self-center lg:w-auto"
            type="button"
          >
            <Link href="/auth/signup">Start Writing Now</Link>
          </Button>
        </div>
      </div>

      <footer className="flex h-16 items-center justify-center">
        <p className="text-center text-sm text-zinc-700 md:text-base">
          © {new Date().getFullYear()} Gattigaga Hayyuta Dewa
        </p>
      </footer>
    </>
  );
};

export default Home;
