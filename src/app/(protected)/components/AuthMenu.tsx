"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown, LogOut, User2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Trans } from "@lingui/react/macro";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "../actions";
import PopupAccount from "./PopupAccount";

const AuthMenu = () => {
  const [isPopupAccountOpen, setIsPopupAccountOpen] = useState(false);
  const { isMobile } = useSidebar();
  const { data: session, update: updateSession } = useSession();

  const user = session?.user || {
    name: "",
    email: "",
  };

  useEffect(() => {
    updateSession();
  }, []);

  return (
    <>
      <SidebarMenu className="bg-zinc-100 dark:bg-zinc-800">
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="hover:bg-zinc-200 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-700 hover:dark:bg-zinc-700 data-[state=open]:dark:bg-zinc-700 data-[state=open]:dark:text-white"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-white">
                    {user.name[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-zinc-700 dark:text-white">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-zinc-700 dark:text-white">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4 text-zinc-700 dark:text-white" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg bg-zinc-300 text-zinc-700 dark:bg-zinc-600 dark:text-white">
                      {user.name[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-zinc-700 dark:text-white">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-zinc-700 dark:text-white">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-700" />
              <DropdownMenuItem
                className="text-zinc-700 focus:bg-zinc-200 focus:text-zinc-700 dark:text-white focus:dark:bg-zinc-700 focus:dark:text-white"
                onClick={() => setIsPopupAccountOpen(true)}
              >
                <User2 />
                <Trans>Account</Trans>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-200 dark:bg-zinc-700" />
              <DropdownMenuItem
                className="text-zinc-700 focus:bg-zinc-200 focus:text-zinc-700 dark:text-white focus:dark:bg-zinc-700 focus:dark:text-white"
                onClick={signOut}
              >
                <LogOut />
                <Trans>Sign Out</Trans>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <PopupAccount
        isOpen={isPopupAccountOpen}
        onOpenChange={setIsPopupAccountOpen}
      />
    </>
  );
};

export default AuthMenu;
