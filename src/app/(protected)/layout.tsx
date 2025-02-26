import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";

import AppSidebar from "./components/AppSidebar";
import Provider from "./components/Provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/helpers/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>{children}</SidebarInset>
          </SidebarProvider>
        </Provider>
        <Toaster />
      </body>
    </html>
  );
};

export default Layout;
