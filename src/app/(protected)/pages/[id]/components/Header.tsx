"use client";

import { useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Helmet } from "react-helmet-async";
import { useMutationState } from "@tanstack/react-query";
import { toast } from "sonner";

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
import { formatToClientTimeAndAgo } from "../../../helpers/datetime";
import usePageQuery from "@/app/(protected)/hooks/queries/use-page-query";
import { ActionPayload as UpdatePageActionPayload } from "@/app/(protected)/hooks/mutations/use-update-page-mutation";
import useRemovePageMutation from "@/app/(protected)/hooks/mutations/use-remove-page-mutation";

type Params = {
  id: string;
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams<Params>();
  const router = useRouter();
  const pageQuery = usePageQuery({ id: params.id });
  const removePageMutation = useRemovePageMutation();

  const updatePageMutationVariables = useMutationState({
    filters: {
      mutationKey: ["updatePage"],
      status: "pending",
    },
    select: (mutation) => {
      return mutation.state.variables as UpdatePageActionPayload;
    },
  });

  const formattedDate = pageQuery.data?.updatedAt
    ? formatToClientTimeAndAgo(pageQuery.data.updatedAt)
    : "";

  const title = (() => {
    const variable = updatePageMutationVariables.find((variable) => {
      return variable.id === params.id;
    });

    return variable?.title || pageQuery.data?.title || "New Page";
  })();

  const menuItems = [
    [
      {
        label: "Delete",
        icon: Trash2,
        onClick: () => {
          removePageMutation.mutate(
            {
              id: params.id,
            },
            {
              onError: () => {
                toast.error("Failed to remove the page.");
              },
              onSettled: () => {
                removePageMutation.reset();
              },
            },
          );

          router.push("/home");
        },
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
          {formattedDate ? `Edited ${formattedDate}` : ""}
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
                              <SidebarMenuButton onClick={item.onClick}>
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
