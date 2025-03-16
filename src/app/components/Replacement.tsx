"use client";

import { Trans } from "@lingui/react/macro";

import useColorScheme from "@/hooks/use-color-scheme";
import LogoEvernote from "./LogoEvernote";
import LogoCoda from "./LogoCoda";
import LogoAsana from "./LogoAsana";
import LogoConfluence from "./LogoConfluence";
import LogoTrello from "./LogoTrello";

type ItemKey = "evernote" | "coda" | "trello" | "asana" | "confluence";

type Props = {
  items: ItemKey[];
};

const Replacement = ({ items }: Props) => {
  const theme = useColorScheme();

  const fill = theme === "dark" ? "#71717a" : "#a1a1aa";

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <p className="w-full shrink-0 text-center text-base font-semibold text-zinc-700 md:w-auto dark:text-white">
        <Trans>Replaces</Trans>
      </p>
      {items.map((key) => {
        const item = (() => {
          switch (key) {
            case "evernote":
              return {
                name: "Evernote",
                logo: <LogoEvernote width={24} height={24} fill={fill} />,
              };

            case "coda":
              return {
                name: "Coda",
                logo: <LogoCoda width={24} height={24} fill={fill} />,
              };

            case "trello":
              return {
                name: "Trello",
                logo: <LogoTrello width={24} height={24} fill={fill} />,
              };

            case "asana":
              return {
                name: "Asana",
                logo: <LogoAsana width={24} height={24} fill={fill} />,
              };

            case "confluence":
              return {
                name: "Confluence",
                logo: <LogoConfluence width={24} height={24} fill={fill} />,
              };

            default:
              return null;
          }
        })();

        if (!item) {
          return null;
        }

        return (
          <div key={key} className="col-span-1 flex items-center gap-x-2">
            {item.logo}
            <p className="text-base text-zinc-400 dark:text-zinc-500">
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Replacement;
