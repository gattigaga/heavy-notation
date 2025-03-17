import Link from "next/link";
import Image from "next/image";
import { useLingui } from "@lingui/react/macro";

import imgLogoHeavyNotation from "../../../public/images/logo-text-heavy-notation.png";
import GoogleTagScript from "./GoogleTagScript";
import SignInForm from "./SignInForm";

type Props = {
  lang?: string;
};

const SignInTemplate = ({ lang = "en" }: Props) => {
  const { t } = useLingui();

  return (
    <>
      <div className="min-h-screen w-full bg-white dark:bg-zinc-900">
        <header className="flex h-16 items-center px-4">
          <Link href={lang !== "en" ? `/${lang}` : "/"} prefetch={true}>
            <Image
              src={imgLogoHeavyNotation}
              alt={t`Heavy Notation logo`}
              className="h-8 w-auto dark:invert"
            />
          </Link>
        </header>
        <SignInForm lang={lang} />
      </div>

      <GoogleTagScript />
    </>
  );
};

export default SignInTemplate;
