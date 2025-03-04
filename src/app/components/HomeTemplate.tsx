import Image from "next/image";
import Link from "next/link";
import { Trans, useLingui } from "@lingui/react/macro";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/magicui/marquee";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import LogoDuckDuckGo from "../components/LogoDuckDuckGo";
import LogoTwitch from "../components/LogoTwitch";
import LogoShopify from "../components/LogoShopify";
import LogoDiscord from "../components/LogoDiscord";
import LogoEvernote from "../components/LogoEvernote";
import LogoCoda from "../components/LogoCoda";
import LogoTrello from "../components/LogoTrello";
import LogoAsana from "../components/LogoAsana";
import LogoConfluence from "../components/LogoConfluence";
import GoogleTagScript from "../components/GoogleTagScript";
import ReviewCard from "../components/ReviewCard";
import imgLogoHeavyNotation from "../../../public/images/logo-text-heavy-notation.png";
import imgFeatureEditorMobile from "../../../public/images/home/feature-editor-mobile.webp";
import imgFeatureHomeMobile from "../../../public/images/home/feature-home-mobile.webp";
import imgFeatureSearchMobile from "../../../public/images/home/feature-search-mobile.webp";
import imgFeatureEditorDesktop from "../../../public/images/home/feature-editor-desktop.webp";
import imgFeatureHomeDesktop from "../../../public/images/home/feature-home-desktop.webp";
import imgFeatureSearchDesktop from "../../../public/images/home/feature-search-desktop.webp";

type Props = {
  lang?: string;
};

const HomeTemplate = ({ lang = "en" }: Props) => {
  const { t } = useLingui();

  const reviews = [
    {
      name: "Emma",
      username: "@emma",
      body: "This tool has been a game-changer for me. I can finally organize my work the way I want.",
      img: "https://avatar.vercel.sh/emma",
    },
    {
      name: "Olivia",
      username: "@olivia",
      body: "I was skeptical at first, but this tool has really helped me get more done in less time.",
      img: "https://avatar.vercel.sh/olivia",
    },
    {
      name: "Ava",
      username: "@ava",
      body: "I've tried a lot of different tools, but this one is the best. It's so easy to use.",
      img: "https://avatar.vercel.sh/ava",
    },
    {
      name: "Sophia",
      username: "@sophia",
      body: "I love that I can customize the layout to fit my needs. It's so flexible.",
      img: "https://avatar.vercel.sh/sophia",
    },
    {
      name: "Mia",
      username: "@mia",
      body: "I've been using this tool for a while now, and it just keeps getting better.",
      img: "https://avatar.vercel.sh/mia",
    },
    {
      name: "Isabella",
      username: "@isabella",
      body: "I was hesitant to switch from my old tool, but this one is so much better.",
      img: "https://avatar.vercel.sh/isabella",
    },
  ];

  const firstRowReviews = reviews.slice(0, reviews.length / 2);
  const secondRowReviews = reviews.slice(reviews.length / 2);

  return (
    <>
      <GoogleTagScript />

      <header className="flex h-16 items-center justify-between px-4">
        <Link href={lang !== "en" ? `/${lang}` : "/"}>
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
          <Link
            href={lang !== "en" ? `/${lang}/auth/signin` : "/auth/signin"}
            prefetch={true}
          >
            <Trans>Sign In</Trans>
          </Link>
        </Button>
      </header>
      <div className="flex max-w-screen-2xl flex-col gap-y-24 px-8 pt-4 md:gap-y-40 md:pt-10 lg:pt-16 2xl:mx-auto">
        <div className="flex flex-col md:px-16 lg:px-24 2xl:px-40">
          <TypingAnimation
            className="mb-4 text-center text-5xl font-bold tracking-tighter text-zinc-700 md:text-7xl"
            as="h1"
            duration={50}
          >
            {t`Organize your thoughts, notes and ideas in one place`}
          </TypingAnimation>
          <p className="mb-12 text-center text-2xl text-zinc-400">
            <Trans>
              Write documents, create knowledge bases, and organize your
              thoughts.
            </Trans>
          </p>
          <Button
            className="mb-12 h-12 w-full self-center bg-blue-500 text-base font-semibold hover:bg-blue-600 md:w-fit lg:w-auto"
            type="button"
          >
            <Link
              href={lang !== "en" ? `/${lang}/auth/signup` : "/auth/signup"}
              prefetch={true}
            >
              <Trans>Start Writing Now</Trans>
            </Link>
          </Button>

          <p className="mb-2 text-center text-base text-zinc-700">
            <Trans>Trusted by teams at</Trans>
          </p>
          <div className="mb-4 flex flex-wrap justify-center gap-4 lg:gap-8">
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
          <p className="mx-auto mb-8 text-center text-xs text-zinc-400 md:w-3/4 lg:w-1/2">
            <Trans>
              Note that these company logos are used only for demonstration
              purposes and do not imply any real-world endorsement or
              affiliation.
            </Trans>
          </p>

          <video
            className="aspect-[1678/912] w-full rounded-lg border shadow-lg"
            preload="none"
            controls={false}
            loop={true}
            muted={true}
            autoPlay={true}
          >
            <source src="/videos/home/demo.mov" type="video/mp4" />
            <Trans>Your browser does not support the video tag.</Trans>
          </video>
        </div>

        <div className="md:px-16 lg:px-24 2xl:px-40">
          <h2 className="mb-4 text-center text-4xl font-bold text-zinc-700 md:text-6xl">
            <Trans>Build perfect docs.</Trans>
          </h2>
          <p className="mb-8 text-center text-xl text-zinc-400">
            <Trans>
              Capture your ideas and create perfect documentation with our
              simple and intuitive interface.
            </Trans>
          </p>
          <picture className="mb-8 block aspect-square w-full overflow-hidden rounded-lg md:aspect-video">
            <source
              srcSet={imgFeatureEditorDesktop.src}
              media="(min-width: 768px)"
            />
            <Image
              className="h-full w-full scale-150 object-cover object-top md:scale-100 md:object-center"
              src={imgFeatureEditorMobile}
              alt="Editor feature"
              loading="lazy"
            />
          </picture>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="w-full shrink-0 text-center text-base font-semibold text-zinc-700 md:w-auto">
              <Trans>Replaces</Trans>
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

        <div className="md:px-16 lg:px-24 2xl:px-40">
          <h2 className="mb-4 text-center text-4xl font-bold text-zinc-700 md:text-6xl">
            <Trans>Your workflow. Your way.</Trans>
          </h2>
          <p className="mb-8 text-center text-xl text-zinc-400">
            <Trans>
              All your projects, goals, roadmaps, and more—in one
              tool—personalized to how you work.
            </Trans>
          </p>
          <picture className="mb-8 block aspect-square w-full overflow-hidden rounded-lg md:aspect-video">
            <source
              srcSet={imgFeatureHomeDesktop.src}
              media="(min-width: 768px)"
            />
            <Image
              className="h-full w-full scale-150 object-cover object-top md:scale-100 md:object-center"
              src={imgFeatureHomeMobile}
              alt="Editor feature"
              loading="lazy"
            />
          </picture>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="w-full shrink-0 text-center text-base font-semibold text-zinc-700 md:w-auto">
              <Trans>Replaces</Trans>
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

        <div className="md:px-16 lg:px-24 2xl:px-40">
          <h2 className="mb-4 text-center text-4xl font-bold text-zinc-700 md:text-6xl">
            <Trans>Find everything. Instantly.</Trans>
          </h2>
          <p className="mb-8 text-center text-xl text-zinc-400">
            <Trans>
              Find what you need quickly with our powerful search. Access your
              content stored in Heavy Notation.
            </Trans>
          </p>
          <picture className="mb-8 block aspect-square w-full overflow-hidden rounded-lg md:aspect-video">
            <source
              srcSet={imgFeatureSearchDesktop.src}
              media="(min-width: 768px)"
            />
            <Image
              className="h-full w-full scale-150 object-cover object-top md:scale-100 md:object-center"
              src={imgFeatureSearchMobile}
              alt="Editor feature"
              loading="lazy"
            />
          </picture>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="w-full shrink-0 text-center text-base font-semibold text-zinc-700 md:w-auto">
              <Trans>Replaces</Trans>
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

        <div className="flex w-full flex-col">
          <h2 className="mb-4 w-1/2 self-center text-center text-4xl font-bold text-zinc-700 md:text-6xl">
            <Trans>Don&apos;t just take our word for it.</Trans>
          </h2>
          <p className="mb-8 w-1/2 self-center text-center text-xl text-zinc-400">
            <Trans>
              Hear from people who have used Heavy Notation to revolutionize
              their writing and thinking.
            </Trans>
          </p>
          <div className="relative flex w-full flex-col overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRowReviews.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRowReviews.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-lg bg-zinc-100 p-8 md:p-16 lg:p-24">
          <h2 className="mb-4 whitespace-pre text-center text-4xl font-bold text-zinc-700 md:text-6xl">
            <Trans>Get Started.</Trans>
          </h2>
          <p className="mb-8 text-center text-base text-zinc-400">
            <Trans>
              Start organizing your work better. Access your content easily with
              our powerful search features.
            </Trans>
          </p>
          <Button
            className="h-12 w-full bg-blue-500 text-base font-semibold hover:bg-blue-600 md:w-fit md:self-center lg:w-auto"
            type="button"
          >
            <Link
              href={lang !== "en" ? `/${lang}/auth/signup` : "/auth/signup"}
              prefetch={true}
            >
              <Trans>Start Writing Now</Trans>
            </Link>
          </Button>
        </div>
      </div>

      <footer className="flex h-16 items-center justify-between px-24">
        <p className="text-center text-sm text-zinc-700">
          © {new Date().getFullYear()} Gattigaga Hayyuta Dewa
        </p>
        <div className="flex items-center gap-x-2">
          <Link
            className={cn(
              "text-sm text-zinc-700 hover:text-zinc-400",
              lang === "en" && "text-zinc-400",
            )}
            href="/"
          >
            English
          </Link>
          <span className="text-zinc-400">|</span>
          <Link
            className={cn(
              "text-sm text-zinc-700 hover:text-zinc-400",
              lang === "id" && "text-zinc-400",
            )}
            href="/id"
          >
            Bahasa Indonesia
          </Link>
        </div>
      </footer>
    </>
  );
};

export default HomeTemplate;
