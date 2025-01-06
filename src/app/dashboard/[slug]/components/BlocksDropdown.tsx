import { CaseSensitive, Heading1, Heading2, Heading3 } from "lucide-react";
import { Fragment } from "react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  children?: React.ReactNode;
  keyword?: string;
  isOpen?: boolean;
  onChange?: (value: string) => void;
  onOpenChange?: (isOpen: boolean) => void;
};

const BlocksDropdown = ({
  children,
  keyword,
  isOpen,
  onChange,
  onOpenChange,
}: Props) => {
  const blockSections = [
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
      <PopoverContent className="w-96 max-h-72 p-0" side="bottom" align="start">
        {filteredBlockSections.length > 0 && (
          <ScrollArea className="h-72 pr-2">
            {filteredBlockSections.map((block) => (
              <Fragment key={block.id}>
                <p className="font-semibold p-3 pb-1 text-sm text-zinc-400">
                  {block.title}
                </p>
                <div className="flex flex-col p-2">
                  {block.items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        className="p-2 rounded hover:bg-zinc-100 flex items-center gap-x-4"
                        type="button"
                        onClick={() => onChange?.(item.id)}
                      >
                        <div className="flex items-center gap-x-4">
                          <div className="w-16 h-16 rounded border flex items-center justify-center bg-white">
                            <Icon size={40} />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-left">
                              {item.title}
                            </p>
                            <p className="text-zinc-400 text-left text-sm">
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
