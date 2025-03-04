"use client";

import { useEffect, useState } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";
import Cookies from "js-cookie";

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

  // Set locale to cookie to allow it accessible on the server-side.
  // NextJS built-in cookies() helper from "next/headers" won't allow me
  // to set cookie from the client/server component. So I have to use
  // the "js-cookie" package.
  useEffect(() => {
    Cookies.set("locale", locale);
  }, [locale]);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default Provider;
