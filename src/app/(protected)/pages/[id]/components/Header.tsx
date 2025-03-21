"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMutationState } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLingui, Trans } from "@lingui/react/macro";

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
  const [formattedDate, setFormattedDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLingui();
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

  const title = (() => {
    const variable = updatePageMutationVariables.find((variable) => {
      return variable.id === params.id;
    });

    const result = variable?.title || pageQuery.data?.title || t`New Page`;

    return result.length > 26 ? `${result.slice(0, 26)}...` : result;
  })();

  const menuItems = [
    [
      {
        label: t`Delete`,
        icon: Trash2,
        onClick: () => {
          removePageMutation.mutate(
            {
              id: params.id,
            },
            {
              onError: () => {
                toast.error(t`Failed to remove the page.`);
              },
              onSuccess: () => {
                toast.success(t`Page successfully removed.`);
              },
            },
          );

          router.replace("/home");
        },
      },
    ],
  ];

  // Set page title in the head.
  useEffect(() => {
    document.title = `${title} | Heavy Notation`;
  }, [title]);

  // Update formatted date every 1 second.
  useEffect(() => {
    const interval = setInterval(() => {
      const formattedDate = pageQuery.data?.updatedAt
        ? formatToClientTimeAndAgo(pageQuery.data.updatedAt)
        : "";

      setFormattedDate(formattedDate);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [pageQuery.data?.updatedAt]);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 px-4">
      {/* Left navigation bar */}
      <SidebarTrigger className="-ml-1 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-700 dark:text-white hover:dark:bg-zinc-800 hover:dark:text-white" />
      <Separator
        orientation="vertical"
        className="mr-2 h-4 bg-zinc-200 dark:bg-zinc-700"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="text-zinc-700 dark:text-white">
            {title}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Right navigation bar */}
      <div className="ml-auto flex items-center gap-2 text-sm">
        <div className="hidden text-zinc-400 md:inline-block dark:text-zinc-500">
          {formattedDate ? <Trans>Edited {formattedDate}</Trans> : ""}
        </div>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild={true}>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 hover:bg-zinc-100 data-[state=open]:bg-zinc-100 hover:dark:bg-zinc-800 data-[state=open]:dark:bg-zinc-800"
            >
              <MoreHorizontal className="text-zinc-700 dark:text-white" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-56 overflow-hidden rounded-lg border-zinc-200 bg-zinc-100 p-0 dark:border-zinc-700 dark:bg-zinc-800"
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
                              <SidebarMenuButton
                                className="!text-zinc-700 hover:!bg-zinc-200 hover:!text-zinc-700 dark:!text-white dark:hover:!bg-zinc-700 dark:hover:!text-white"
                                onClick={item.onClick}
                              >
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
