"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { File, Home, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
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

type Props = {
  user: {
    name: string;
    email: string;
  };
};

const AppSidebar = ({ user }: Props) => {
  const [isPagesSectionShow, setIsPagesSectionShow] = useState(true);
  const { isMobile } = useSidebar();
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

  const pageItems = [
    {
      id: "page-1",
      title: "Untitled 1",
      url: "/pages/page-1",
      isActive: pathname === "/pages/page-1",
    },
    {
      id: "page-2",
      title: "Untitled Untitled Untitled Untitled 2",
      url: "/pages/page-2",
      isActive: pathname === "/pages/page-2",
    },
  ];

  return (
    <Sidebar>
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
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsPagesSectionShow(!isPagesSectionShow)}
              >
                Pages
              </SidebarMenuButton>
              <SidebarMenuAction
                showOnHover={true}
                onClick={() => {
                  // TODO: Create new page.
                }}
              >
                <Plus />
              </SidebarMenuAction>
            </SidebarMenuItem>
            {isPagesSectionShow && (
              <>
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
                        <SidebarMenuAction showOnHover={true}>
                          <MoreHorizontal />
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
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
