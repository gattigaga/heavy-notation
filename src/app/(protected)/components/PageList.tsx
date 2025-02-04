"use client";

import { useState } from "react";
import { File, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";

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
      },
      {
        onError: () => {
          toast.error("Failed to add a new page.");
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
          toast.error("Failed to remove the page.");
        },
        onSuccess: () => {
          toast.success("Page successfully removed.");
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
                onClick={() => setIsPagesSectionShow(!isPagesSectionShow)}
              >
                Pages
              </SidebarMenuButton>
              {!addPageMutation.isPending && (
                <SidebarMenuAction showOnHover={true} onClick={addPage}>
                  <Plus />
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
                      <SidebarMenuButton isActive={isActive} asChild={true}>
                        <Link href={url} title={item.title}>
                          <File />
                          <span>{item.title || "New Page"}</span>
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
                          <DropdownMenuItem onClick={() => removePage(item.id)}>
                            <Trash2 className="text-muted-foreground" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  );
                })}
                {/* Show the placeholder data when adding page. */}
                {addPageMutation.isPending && (
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive={true} asChild={true}>
                      <Link href={`/pages/${addPageMutation.variables.id}`}>
                        <File />
                        <span>New Page</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {/* Show empty data if have no pages yet and when not adding page. */}
                {pages.length === 0 && !addPageMutation.isPending && (
                  <p className="mx-2 text-xs text-zinc-400">No pages found.</p>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
      {pagesQuery.isError && (
        <div className="mt-4 px-2">
          <p className="mx-2 text-xs text-red-500">Cannot fetch pages data.</p>
        </div>
      )}
      {pagesQuery.isLoading && (
        <div className="mt-4 flex flex-col gap-y-2 px-4">
          <Skeleton className="h-6 w-1/2 rounded-lg" />
          {[...Array(20)].map((_, index) => (
            <div key={index} className="flex items-center gap-x-2">
              <Skeleton className="h-6 w-6 rounded-lg" />
              <Skeleton className="h-6 flex-1 rounded-lg" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PageList;
