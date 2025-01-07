import { CaseSensitive, Heading1, Heading2, Heading3 } from "lucide-react";
import { Fragment } from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlockId } from "../types";

type BlockItem = {
  id: BlockId;
  title: string;
  description: string;
  icon: React.ElementType;
};

type BlockSection = {
  id: string;
  title: string;
  items: BlockItem[];
};

type Props = {
  children?: React.ReactNode;
  keyword?: string;
  isOpen?: boolean;
  onChange?: (blockId: BlockId) => void;
  onOpenChange?: (isOpen: boolean) => void;
};

const BlocksDropdown = ({
  children,
  keyword,
  isOpen,
  onChange,
  onOpenChange,
}: Props) => {
  const blockSections: BlockSection[] = [
    {
      id: "basic",
      title: "Basic Blocks",
      items: [
        {
          id: "text",
          title: "Text",
          description: "Just start writing with plain text.",
          icon: CaseSensitive,
        },
        {
          id: "heading1",
          title: "Heading 1",
          description: "Big section heading.",
          icon: Heading1,
        },
        {
          id: "heading2",
          title: "Heading 2",
          description: "Medium section heading.",
          icon: Heading2,
        },
        {
          id: "heading3",
          title: "Heading 3",
          description: "Small section heading.",
          icon: Heading3,
        },
      ],
    },
  ];

  const filteredBlockSections = blockSections
    .map((block) => {
      const filteredBlockItems = block.items.filter((item) => {
        if (keyword) {
          return item.title.toLowerCase().includes(keyword.toLowerCase());
        }

        return true;
      });

      return {
        ...block,
        items: filteredBlockItems,
      };
    })
    .filter((block) => block.items.length > 0);

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverAnchor>{children}</PopoverAnchor>
      <PopoverContent className="max-h-72 w-96 p-0" side="bottom" align="start">
        {filteredBlockSections.length > 0 && (
          <ScrollArea className="h-72 pr-2">
            {filteredBlockSections.map((block) => (
              <Fragment key={block.id}>
                <p className="p-3 pb-1 text-sm font-semibold text-zinc-400">
                  {block.title}
                </p>
                <div className="flex flex-col p-2">
                  {block.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        className="flex items-center gap-x-4 rounded p-2 hover:bg-zinc-100"
                        type="button"
                        onClick={() => onChange?.(item.id)}
                      >
                        <div className="flex items-center gap-x-4">
                          <div className="flex h-16 w-16 items-center justify-center rounded border bg-white">
                            <Icon size={40} />
                          </div>
                          <div>
                            <p className="text-left text-lg font-medium">
                              {item.title}
                            </p>
                            <p className="text-left text-sm text-zinc-400">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Fragment>
            ))}
          </ScrollArea>
        )}
        {filteredBlockSections.length === 0 && (
          <div className="p-3 text-sm text-zinc-400">No results found.</div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default BlocksDropdown;
