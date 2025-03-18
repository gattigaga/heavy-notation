import { redirect } from "next/navigation";

import { auth } from "@/helpers/auth";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await auth();

  // If user is authenticated,
  // redirect them to the home page in protected routes.
  if (session) {
    redirect("/home");
  }

  return children;
};

export default Layout;
