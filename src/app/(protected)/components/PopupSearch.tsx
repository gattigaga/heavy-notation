"use client";

import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { Trans, useLingui } from "@lingui/react/macro";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import usePagesQuery from "../hooks/queries/use-pages-query";
import { formatToClientTimeAndAgo } from "../helpers/datetime";

type Props = {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export const PopupSearch = ({ isOpen, onOpenChange }: Props) => {
  const { t } = useLingui();
  const router = useRouter();
  const pagesQuery = usePagesQuery();

  const pages = pagesQuery.data?.filter((page) => !!page.title) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-lg border border-zinc-200 bg-white p-0 data-[state=open]:text-zinc-700 md:w-1/2 lg:w-1/3 dark:border-zinc-700 dark:bg-zinc-900 data-[state=open]:dark:text-white">
        <DialogTitle className="hidden">
          <Trans>Search a page</Trans>
        </DialogTitle>
        <Command className="bg-white dark:bg-zinc-900">
          <CommandInput
            className="h-16 text-base text-zinc-700 dark:text-white"
            placeholder={t`Search a page...`}
          />
          <CommandList>
            <CommandEmpty className="my-4 text-center text-sm text-zinc-700 dark:text-white">
              <Trans>No results found.</Trans>
            </CommandEmpty>
            <CommandGroup
              heading={
                <p className="text-zinc-400 dark:text-zinc-500">
                  <Trans>Pages</Trans>
                </p>
              }
            >
              {pages.map((page) => {
                const formattedTitle = (() => {
                  if (!page.title) return t`New Page`;

                  return page.title.length > 26
                    ? `${page.title.slice(0, 26)}...`
                    : page.title;
                })();

                const formattedDate = page.updatedAt
                  ? formatToClientTimeAndAgo(page.updatedAt)
                  : "";

                return (
                  <CommandItem
                    key={page.id}
                    className="flex w-full items-center gap-x-2 py-2 data-[selected=true]:bg-zinc-100 data-[selected=true]:dark:bg-zinc-800"
                    value={`${page.title}-${page.id}`}
                  >
                    <button
                      className="flex w-full items-center gap-x-2 py-2"
                      type="button"
                      onClick={() => {
                        onOpenChange?.(false);
                        router.push(`/pages/${page.id}`);
                      }}
                    >
                      <File className="text-zinc-700 dark:text-white" />
                      <span className="mr-auto text-base text-zinc-700 dark:text-white">
                        {formattedTitle}
                      </span>
                      <span className="text-sm text-zinc-400 dark:text-zinc-500">
                        {formattedDate}
                      </span>
                    </button>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};

export default PopupSearch;
