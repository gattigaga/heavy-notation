import Link from "next/link";
import Image from "next/image";
import { useLingui } from "@lingui/react/macro";

import imgLogoHeavyNotation from "../../../public/images/logo-text-heavy-notation.png";
import SignUpForm from "./SignUpForm";
import GoogleTagScript from "./GoogleTagScript";

type Props = {
  lang?: string;
};

const SignUpTemplate = ({ lang = "en" }: Props) => {
  const { t } = useLingui();

  return (
    <>
      <div className="min-h-screen w-full bg-white dark:bg-zinc-900">
        <header className="flex h-16 items-center px-4">
          <Link href={lang !== "en" ? `/${lang}` : "/"}>
            <Image
              src={imgLogoHeavyNotation}
              alt={t`Heavy Notation logo`}
              className="h-8 w-auto dark:invert"
            />
          </Link>
        </header>
        <SignUpForm lang={lang} />
      </div>

      <GoogleTagScript />
    </>
  );
};

export default SignUpTemplate;
