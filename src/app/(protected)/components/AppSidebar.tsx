"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLingui } from "@lingui/react/macro";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import AuthMenu from "./AuthMenu";
import PageList from "./PageList";
import PopupSearch from "./PopupSearch";
import LanguageMenu from "./LanguageMenu";

const AppSidebar = () => {
  const { t } = useLingui();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      id: "search",
      title: t`Search`,
      url: "#",
      icon: <Search className="text-zinc-700 dark:text-white" />,
      isActive: false,
    },
    {
      id: "home",
      title: t`Home`,
      url: "/home",
      icon: <Home className="text-zinc-700 dark:text-white" />,
      isActive: pathname === "/home",
    },
  ];

  // Toggle search when ⌘K is pressed.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [isSearchOpen]);

  return (
    <Sidebar className="border-zinc-200 dark:border-zinc-700">
      <SidebarHeader className="bg-zinc-100 dark:bg-zinc-800">
        <AuthMenu />
      </SidebarHeader>
      <SidebarContent className="gap-y-0 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {/* Main */}
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
              return (
                <SidebarMenuItem key={item.id}>
                  {item.id === "search" && (
                    <SidebarMenuButton
                      className="!text-zinc-500 hover:!bg-zinc-200 hover:!text-zinc-700 data-[active=true]:!bg-zinc-200 dark:!text-zinc-400 dark:hover:!bg-zinc-700 dark:hover:!text-white data-[active=true]:dark:!bg-zinc-700"
                      isActive={item.isActive}
                      onClick={() => setIsSearchOpen(true)}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                  {item.id === "home" && (
                    <SidebarMenuButton
                      className="!text-zinc-500 hover:!bg-zinc-200 hover:!text-zinc-700 data-[active=true]:!bg-zinc-200 dark:!text-zinc-400 dark:hover:!bg-zinc-700 dark:hover:!text-white data-[active=true]:dark:!bg-zinc-700"
                      isActive={item.isActive}
                      asChild={true}
                    >
                      <Link href={item.url} title={item.title}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <div className="flex-1 overflow-y-auto border-t border-zinc-200 dark:border-zinc-700">
          <PageList />
        </div>

        <PopupSearch isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
      </SidebarContent>
      <SidebarFooter className="bg-zinc-100 dark:bg-zinc-800">
        <LanguageMenu />
      </SidebarFooter>
      <SidebarRail className="hover:after:bg-zinc-200 hover:after:dark:bg-zinc-700" />
    </Sidebar>
  );
};

export default AppSidebar;
