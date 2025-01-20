"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { formatToClientTimeAndAgo } from "../helpers/datetime";

type Props = {
  title: string;
  updatedAt: string;
};

const Header = ({ title, updatedAt }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = formatToClientTimeAndAgo(updatedAt);

  const data = [
    [
      {
        label: "Delete",
        icon: Trash2,
      },
    ],
  ];

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      {/* Left navigation bar */}
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden text-zinc-700 md:block">
            {title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Right navigation bar */}
      <div className="ml-auto flex items-center gap-2 text-sm">
        <div className="hidden font-medium text-muted-foreground md:inline-block">
          {formattedDate}
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 data-[state=open]:bg-accent"
            >
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-56 overflow-hidden rounded-lg p-0"
            align="end"
          >
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                {data.map((group, index) => (
                  <SidebarGroup
                    key={index}
                    className="border-b last:border-none"
                  >
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => (
                          <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                              <item.icon /> <span>{item.label}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                ))}
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default Header;
