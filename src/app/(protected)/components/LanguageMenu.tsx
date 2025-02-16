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

  const currentLanguage = languages.find(
    (item) => item.code === (session?.user.lang || "EN"),
  );

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
    i18n.activate(session?.user.lang.toLowerCase() || "en");
  }, [session?.user.lang]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <p>{currentLanguage?.name}</p>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {languages.map((item) => (
              <DropdownMenuItem
                key={item.code}
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
