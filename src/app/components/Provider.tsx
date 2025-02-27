"use client";

import { useState } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";

type Props = {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
};

const Provider = ({ children, locale, messages }: Props) => {
  const [i18n] = useState(() => {
    return setupI18n({
      locale,
      messages: { [locale]: messages },
    });
  });

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default Provider;
