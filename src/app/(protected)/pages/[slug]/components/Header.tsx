"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { Helmet } from "react-helmet-async";

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
import usePageQuery from "@/app/(protected)/hooks/queries/use-page-query";

type Params = {
  slug: string;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams<Params>();
  const pageQuery = usePageQuery({ slug: params.slug });

  const formattedDate = formatToClientTimeAndAgo(
    pageQuery.data?.updatedAt || "",
  );

  const title = pageQuery.data?.title || "New Page";

  const menuItems = [
    [
      {
        label: "Delete",
        icon: Trash2,
      },
    ],
  ];

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      <Helmet>
        <title>{`${title} | Heavy Notation`}</title>
      </Helmet>

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
          Edited {formattedDate}
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
                {menuItems.map((group, index) => (
                  <SidebarGroup
                    key={index}
                    className="border-b last:border-none"
                  >
                    <SidebarGroupContent className="gap-0">
                      <SidebarMenu>
                        {group.map((item, index) => {
                          const Icon = item.icon;

                          return (
                            <SidebarMenuItem key={index}>
                              <SidebarMenuButton>
                                <Icon /> <span>{item.label}</span>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          );
                        })}
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
