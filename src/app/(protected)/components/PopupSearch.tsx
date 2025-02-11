"use client";

import { File } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const pagesQuery = usePagesQuery();

  const pages = pagesQuery.data?.filter((page) => !!page.title) || [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-11/12 rounded-lg p-0 md:w-1/2 lg:w-1/3">
        <DialogTitle className="hidden">Search a page</DialogTitle>
        <Command>
          <CommandInput
            className="h-16 text-base"
            placeholder="Search a page..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {pages.map((page) => {
                const formattedTitle = (() => {
                  if (!page.title) return "New Page";

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
                    className="flex w-full items-center gap-x-2 py-2"
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
                      <File className="text-zinc-700" />
                      <span className="mr-auto text-base text-zinc-700">
                        {formattedTitle}
                      </span>
                      <span className="text-sm text-zinc-400">
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
