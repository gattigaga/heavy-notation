import { redirect } from "next/navigation";

import AppSidebar from "./components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/helpers/auth";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await auth();

  // If user isn't authenticated,
  // redirect them back to the sign in page.
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
