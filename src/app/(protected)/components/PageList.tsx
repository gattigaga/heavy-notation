"use client";

import { useState } from "react";
import { File, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";
import { Trans, useLingui } from "@lingui/react/macro";

import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import usePagesQuery from "../hooks/queries/use-pages-query";
import useAddPageMutation from "../hooks/mutations/use-add-page-mutation";
import useRemovePageMutation from "../hooks/mutations/use-remove-page-mutation";

const PageList = () => {
  const [isPagesSectionShow, setIsPagesSectionShow] = useState(true);
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const pagesQuery = usePagesQuery();
  const addPageMutation = useAddPageMutation();
  const removePageMutation = useRemovePageMutation();
  const { t } = useLingui();

  const pages =
    pagesQuery.data?.filter((item) => {
      if (item.id === removePageMutation.variables?.id) {
        return false;
      }

      return true;
    }) || [];

  const addPage = () => {
    const id = createId();

    addPageMutation.mutate(
      {
        id,
        title: "",
        body: "",
      },
      {
        onError: () => {
          toast.error(t`Failed to add a new page.`);
        },
        onSettled: () => {
          addPageMutation.reset();
        },
      },
    );

    router.push(`/pages/${id}`);
  };

  const removePage = (id: string) => {
    removePageMutation.mutate(
      {
        id,
      },
      {
        onError: () => {
          toast.error(t`Failed to remove the page.`);
        },
        onSuccess: () => {
          toast.success(t`Page successfully removed.`);
        },
        onSettled: () => {
          removePageMutation.reset();
        },
      },
    );

    const isCurrentPage = pathname === `/pages/${id}`;

    if (isCurrentPage) {
      router.replace("/home");
    }
  };

  return (
    <>
      {pagesQuery.isSuccess && (
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="!text-zinc-500 hover:!bg-zinc-200 hover:!text-zinc-700 data-[active=true]:!bg-zinc-200 dark:!text-zinc-400 dark:hover:!bg-zinc-700 dark:hover:!text-white data-[active=true]:dark:!bg-zinc-700"
                onClick={() => setIsPagesSectionShow(!isPagesSectionShow)}
              >
                <Trans>Pages</Trans>
              </SidebarMenuButton>
              {!addPageMutation.isPending && (
                <SidebarMenuAction
                  className="hover:bg-transparent"
                  showOnHover={true}
                  onClick={addPage}
                >
                  <Plus className="text-zinc-700 dark:text-white" />
                </SidebarMenuAction>
              )}
            </SidebarMenuItem>
            {isPagesSectionShow && (
              <>
                {/* Show all pages. */}
                {pages.map((item) => {
                  const url = `/pages/${item.id}`;
                  const isActive = pathname === url;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        className="!text-zinc-500 hover:!bg-zinc-200 hover:!text-zinc-700 data-[active=true]:!bg-zinc-200 dark:!text-zinc-400 dark:hover:!bg-zinc-700 dark:hover:!text-white data-[active=true]:dark:!bg-zinc-700"
                        isActive={isActive}
                        asChild={true}
                      >
                        <Link href={url} title={item.title}>
                          <File className="text-zinc-700 dark:text-white" />
                          <span>{item.title || <Trans>New Page</Trans>}</span>
                        </Link>
                      </SidebarMenuButton>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild={true}>
                          <SidebarMenuAction
                            className="hover:bg-transparent"
                            showOnHover={true}
                          >
                            <MoreHorizontal className="text-zinc-700 dark:text-white" />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="w-56 rounded-lg border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
                          side={isMobile ? "bottom" : "right"}
                          align={isMobile ? "end" : "start"}
                        >
                          <DropdownMenuItem
                            className="text-zinc-700 focus:bg-zinc-200 focus:text-zinc-700 dark:text-white focus:dark:bg-zinc-700 focus:dark:text-white"
                            onClick={() => removePage(item.id)}
                          >
                            <Trash2 className="text-zinc-700 dark:text-white" />
                            <span>
                              <Trans>Delete</Trans>
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  );
                })}
                {/* Show the placeholder data when adding page. */}
                {addPageMutation.isPending && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="!text-zinc-500 hover:!bg-zinc-200 hover:!text-zinc-700 data-[active=true]:!bg-zinc-200 dark:!text-zinc-400 dark:hover:!bg-zinc-700 dark:hover:!text-white data-[active=true]:dark:!bg-zinc-700"
                      isActive={true}
                      asChild={true}
                    >
                      <Link href={`/pages/${addPageMutation.variables.id}`}>
                        <File className="text-zinc-700 dark:text-white" />
                        <span>
                          <Trans>New Page</Trans>
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {/* Show empty data if have no pages yet and when not adding page. */}
                {pages.length === 0 && !addPageMutation.isPending && (
                  <p className="mx-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Trans>No pages found.</Trans>
                  </p>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
      {pagesQuery.isError && (
        <div className="mt-4 px-2">
          <p className="mx-2 text-xs text-red-500">
            <Trans>Cannot fetch pages data.</Trans>
          </p>
        </div>
      )}
      {pagesQuery.isLoading && (
        <div className="my-4 flex flex-col gap-y-2 px-4">
          <Skeleton className="h-6 w-1/2 rounded-lg bg-zinc-400/10 dark:bg-zinc-500/10" />
          {[...Array(20)].map((_, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <Skeleton className="h-6 w-6 rounded-lg bg-zinc-400/10 dark:bg-zinc-500/10" />
              <Skeleton className="h-6 flex-1 rounded-lg bg-zinc-400/10 dark:bg-zinc-500/10" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PageList;
