"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import AuthMenu from "./AuthMenu";
import PageList from "./PageList";

const AppSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "search",
      title: "Search",
      url: "#",
      icon: <Search className="text-zinc-700" />,
      isActive: false,
    },
    {
      id: "home",
      title: "Home",
      url: "/home",
      icon: <Home className="text-zinc-700" />,
      isActive: pathname === "/home",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <AuthMenu />
      </SidebarHeader>
      <SidebarContent className="gap-y-0 overflow-hidden">
        {/* Main */}
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={item.isActive} asChild={true}>
                  <Link href={item.url} title={item.title}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <div className="flex-1 overflow-y-auto border-t">
          <PageList />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
