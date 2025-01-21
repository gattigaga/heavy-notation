import { useState } from "react";
import { File, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

const PageList = () => {
  const [isPagesSectionShow, setIsPagesSectionShow] = useState(true);
  const { isMobile } = useSidebar();
  const pathname = usePathname();
  const pagesQuery = usePagesQuery();

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
                {pagesQuery.data.map((item) => {
                  const url = `/pages/${item.slug}`;
                  const isActive = pathname === url;

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton isActive={isActive} asChild={true}>
                        <Link href={url} title={item.title}>
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
                  );
                })}
                {pagesQuery.data.length === 0 && (
                  <p className="mx-2 text-xs text-zinc-400">No pages found.</p>
                )}
                {pagesQuery.data.length > 10 && (
                  <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                      <MoreHorizontal />
                      <span>More</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}
      {pagesQuery.isLoading && (
        <div className="mt-4 flex flex-col gap-y-2 px-4">
          <Skeleton className="h-6 w-full rounded-lg" />
          {[...Array(10)].map((_, index) => (
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
