"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { File, Home, MoreHorizontal, Search, Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import AuthMenu from "./AuthMenu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = React.ComponentProps<typeof Sidebar>;

const AppSidebar = (props: Props) => {
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const user = {
    name: "Gattigaga Hayyuta Dewa",
    username: "gattigaga",
    email: "gattigaga@heavy-notation.com",
    avatar: "/avatars/gattigaga.jpg",
  };

  const menuItems = [
    {
      id: "search",
      title: "Search",
      url: "#",
      icon: <Search className="text-foreground" />,
      isActive: false,
    },
    {
      id: "home",
      title: "Home",
      url: "/dashboard",
      icon: <Home className="text-foreground" />,
      isActive: pathname === "/dashboard",
    },
  ];

  const pageItems = [
    {
      id: "page-1",
      title: "Untitled 1",
      url: "/dashboard/page-1",
      isActive: pathname === "/dashboard/page-1",
    },
    {
      id: "page-2",
      title: "Untitled Untitled Untitled Untitled 2",
      url: "/dashboard/page-2",
      isActive: pathname === "/dashboard/page-2",
    },
  ];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <AuthMenu user={user} />
      </SidebarHeader>
      <SidebarContent>
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

        {/* Pages */}
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarMenu>
            {pageItems.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={item.isActive} asChild={true}>
                  <Link href={item.url} title={item.title}>
                    <File />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild={true}>
                    <SidebarMenuAction showOnHover>
                      <MoreHorizontal />
                      <span className="sr-only">More</span>
                    </SidebarMenuAction>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align={isMobile ? "end" : "start"}
                  >
                    <DropdownMenuItem>
                      <Trash2 className="text-muted-foreground" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground/70">
                <MoreHorizontal />
                <span>More</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
