import { cookies } from "next/headers";
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
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value || "en";

  // If user isn't authenticated,
  // redirect them back to the sign in page.
  if (!session) {
    redirect(locale !== "en" ? `/${locale}/auth/signin` : "/auth/signin");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-white dark:bg-zinc-900">
              {children}
            </SidebarInset>
          </SidebarProvider>
        </Provider>
        <Toaster
          toastOptions={{
            className: "bg-zinc-100 dark:bg-zinc-800",
          }}
        />
      </body>
    </html>
  );
};

export default Layout;
