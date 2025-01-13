import {
  CaseSensitive,
  Heading1,
  Heading2,
  Heading3,
  SquareSplitVertical,
} from "lucide-react";
import { Fragment } from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlockType } from "../types";
import BlocksDropdownItem from "./BlocksDropdownItem";

type BlockItem = {
  type: BlockType;
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
  onChange?: (type: BlockType) => void;
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
          type: "text",
          title: "Text",
          description: "Just start writing with plain text.",
          icon: CaseSensitive,
        },
        {
          type: "heading1",
          title: "Heading 1",
          description: "Big section heading.",
          icon: Heading1,
        },
        {
          type: "heading2",
          title: "Heading 2",
          description: "Medium section heading.",
          icon: Heading2,
        },
        {
          type: "heading3",
          title: "Heading 3",
          description: "Small section heading.",
          icon: Heading3,
        },
        {
          type: "divider",
          title: "Divider",
          description: "Visually divide blocks.",
          icon: SquareSplitVertical,
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
                    return (
                      <BlocksDropdownItem
                        key={item.type}
                        title={item.title}
                        description={item.description}
                        icon={item.icon}
                        onClick={() => onChange?.(item.type)}
                      />
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
