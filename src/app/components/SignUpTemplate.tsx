import Link from "next/link";

import imgLogoHeavyNotation from "../../../public/images/logo-text-heavy-notation.png";
import SignUpForm from "./SignUpForm";
import GoogleTagScript from "./GoogleTagScript";
import Image from "next/image";

type Props = {
  lang?: string;
};

const SignUpTemplate = async ({ lang = "en" }: Props) => {
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
        <SignUpForm lang={lang} />
      </div>
    </>
  );
};

export default SignUpTemplate;
