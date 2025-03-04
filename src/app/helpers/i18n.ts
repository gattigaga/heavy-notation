import "server-only";

import linguiConfig from "../../../lingui.config";
import { I18n, Messages, setupI18n } from "@lingui/core";

const { locales } = linguiConfig;

async function loadCatalog(locale: string): Promise<{
  [k: string]: Messages;
}> {
  const { messages } = await import(`../../locales/${locale}/messages.po`);

  return {
    [locale]: messages,
  };
}

const catalogs = await Promise.all(locales.map(loadCatalog));

export const allMessages = catalogs.reduce((acc, catalog) => {
  return { ...acc, ...catalog };
}, {});

type AllI18nInstances = { [K in string]: I18n };

export const allI18nInstances: AllI18nInstances = locales.reduce(
  (acc, locale) => {
    const messages = allMessages[locale] ?? {};

    const i18n = setupI18n({
      locale,
      messages: { [locale]: messages },
    });

    return { ...acc, [locale]: i18n };
  },
  {},
);

export const getI18nInstance = (locale: string): I18n => {
  if (!allI18nInstances[locale]) {
    console.warn(`No i18n instance found for locale "${locale}"`);
  }

  return allI18nInstances[locale]! || allI18nInstances["en"]!;
};
