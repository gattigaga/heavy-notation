import {
  CaseSensitive,
  Heading1,
  Heading2,
  Heading3,
  SquareSplitVertical,
} from "lucide-react";
import { Fragment } from "react";
import { BlockType } from "@prisma/client";
import { Trans, useLingui } from "@lingui/react/macro";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const { t } = useLingui();
  const blockSections: BlockSection[] = [
    {
      id: "basic",
      title: t`Basic Blocks`,
      items: [
        {
          type: "TEXT",
          title: t`Text`,
          description: t`Just start writing with plain text.`,
          icon: CaseSensitive,
        },
        {
          type: "HEADING1",
          title: t`Heading 1`,
          description: t`Big section heading.`,
          icon: Heading1,
        },
        {
          type: "HEADING2",
          title: t`Heading 2`,
          description: t`Medium section heading.`,
          icon: Heading2,
        },
        {
          type: "HEADING3",
          title: t`Heading 3`,
          description: t`Small section heading.`,
          icon: Heading3,
        },
        {
          type: "DIVIDER",
          title: t`Divider`,
          description: t`Visually divide blocks.`,
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
      <PopoverContent
        className="max-h-72 w-72 p-0 md:w-96"
        side="bottom"
        align="start"
      >
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
                        key={item.type}
                        className="flex items-center gap-x-4 rounded p-2 hover:bg-zinc-100"
                        type="button"
                        onClick={() => onChange?.(item.type)}
                      >
                        <div className="flex items-center gap-x-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded border bg-white md:h-16 md:w-16">
                            <Icon className="h-6 w-6 text-zinc-700 md:h-8 md:w-8" />
                          </div>
                          <div>
                            <p className="text-left text-base text-zinc-700 md:text-lg">
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
          <div className="p-3 text-sm text-zinc-400">
            <Trans>No results found.</Trans>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default BlocksDropdown;
