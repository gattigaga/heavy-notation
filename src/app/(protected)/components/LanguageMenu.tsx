"use client";

import { useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Language } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useLingui } from "@lingui/react/macro";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import useUpdateUserMutation from "../hooks/mutations/use-update-user-mutation";

const LanguageMenu = () => {
  const { data: session, update: updateSession } = useSession();
  const { isMobile } = useSidebar();
  const { i18n } = useLingui();
  const updateLanguageMutation = useUpdateUserMutation();

  const languages: { name: string; code: Language }[] = [
    {
      name: "English (en)",
      code: "EN",
    },
    {
      name: "Bahasa Indonesia (id)",
      code: "ID",
    },
  ];

  const currentLanguage =
    languages.find((item) => item.code === session?.user.lang) || languages[0];

  const changeLanguage = async (code: Language) => {
    updateLanguageMutation.mutate(
      {
        lang: code,
      },
      {
        onSettled: async () => {
          await updateSession({
            lang: code,
          });
        },
      },
    );

    i18n.activate(code.toLowerCase());
  };

  // Activate the current language on mount.
  useEffect(() => {
    i18n.activate(currentLanguage.code.toLowerCase());
  }, [currentLanguage.code]);

  return (
    <SidebarMenu className="bg-zinc-100 dark:bg-zinc-800">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-zinc-200 data-[state=open]:bg-zinc-100 data-[state=open]:text-zinc-700 hover:dark:bg-zinc-700 data-[state=open]:dark:bg-zinc-700 data-[state=open]:dark:text-white"
            >
              <p className="text-zinc-700 dark:text-white">
                {currentLanguage?.name}
              </p>
              <ChevronsUpDown className="ml-auto size-4 text-zinc-700 dark:text-white" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {languages.map((item) => (
              <DropdownMenuItem
                key={item.code}
                className="text-zinc-700 focus:bg-zinc-200 focus:text-zinc-700 dark:text-white focus:dark:bg-zinc-700 focus:dark:text-white"
                onClick={() => changeLanguage(item.code)}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default LanguageMenu;
