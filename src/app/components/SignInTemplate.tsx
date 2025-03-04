import Link from "next/link";
import Image from "next/image";

import imgLogoHeavyNotation from "../../../public/images/logo-text-heavy-notation.png";
import GoogleTagScript from "./GoogleTagScript";
import SignInForm from "./SignInForm";

type Props = {
  lang?: string;
};

const SignInTemplate = async ({ lang = "en" }: Props) => {
  return (
    <>
      <GoogleTagScript />

      <div className="min-h-screen w-full bg-white">
        <header className="flex h-16 items-center px-4">
          <Link href={lang !== "en" ? `/${lang}` : "/"} prefetch={true}>
            <Image
              src={imgLogoHeavyNotation}
              alt="Heavy Notation logo"
              className="h-8 w-auto"
            />
          </Link>
        </header>
        <SignInForm lang={lang} />
      </div>
    </>
  );
};

export default SignInTemplate;
