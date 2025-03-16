"use client";

import { Trans } from "@lingui/react/macro";

import useColorScheme from "@/hooks/use-color-scheme";
import LogoDiscord from "./LogoDiscord";
import LogoDuckDuckGo from "./LogoDuckDuckGo";
import LogoShopify from "./LogoShopify";
import LogoTwitch from "./LogoTwitch";

const TrustedByTeams = () => {
  const theme = useColorScheme();

  const fill = theme === "dark" ? "#fff" : "#3f3f46";

  const items = [
    {
      name: "DuckDuckGo",
      logo: (
        <LogoDuckDuckGo
          className="shrink-0"
          width={24}
          height={24}
          fill={fill}
        />
      ),
    },
    {
      name: "Twitch",
      logo: (
        <LogoTwitch className="shrink-0" width={24} height={24} fill={fill} />
      ),
    },
    {
      name: "Shopify",
      logo: (
        <LogoShopify className="shrink-0" width={24} height={24} fill={fill} />
      ),
    },
    {
      name: "Discord",
      logo: (
        <LogoDiscord className="shrink-0" width={24} height={24} fill={fill} />
      ),
    },
  ];

  return (
    <>
      <p className="mb-2 text-center text-base text-zinc-700 dark:text-white">
        <Trans>Trusted by teams at</Trans>
      </p>
      <div className="mb-4 flex flex-wrap justify-center gap-4 lg:gap-8">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-x-2">
            {item.logo}
            <p className="text-base font-semibold text-zinc-700 dark:text-white">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <p className="mx-auto mb-8 text-center text-xs text-zinc-400 md:w-3/4 lg:w-1/2 dark:text-zinc-500">
        <Trans>
          Note that these company logos are used only for demonstration purposes
          and do not imply any real-world endorsement or affiliation.
        </Trans>
      </p>
    </>
  );
};

export default TrustedByTeams;
