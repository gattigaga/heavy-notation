"use client";

import { useEffect, useRef } from "react";
import { BlockType } from "@prisma/client";
import {
  Bold,
  CaseSensitive,
  Check,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Trans, useLingui } from "@lingui/react/macro";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { ToolbarOptions, ToolbarStyle } from "../types";

type BlockItem = {
  type: BlockType;
  title: string;
  description: string;
  icon: React.ElementType;
};

type Props = {
  position: {
    x: number;
    y: number;
  };
  options: ToolbarOptions;
  onChange?: (options: ToolbarOptions) => void;
  onRequestClose?: () => void;
};

export const Toolbar = ({
  position,
  options,
  onChange,
  onRequestClose,
}: Props) => {
  const { t } = useLingui();
  const refContainer = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);

  const blocks: BlockItem[] = [
    {
      type: "TEXT",
      title: "Text",
      description: t`Just start writing with plain text.`,
      icon: CaseSensitive,
    },
    {
      type: "HEADING1",
      title: "Heading 1",
      description: t`Big section heading.`,
      icon: Heading1,
    },
    {
      type: "HEADING2",
      title: "Heading 2",
      description: t`Medium section heading.`,
      icon: Heading2,
    },
    {
      type: "HEADING3",
      title: "Heading 3",
      description: t`Small section heading.`,
      icon: Heading3,
    },
  ];

  const typeLabel = blocks.find((block) => block.type === options.type)?.title;

  const activeStyles = Object.entries(options.styles)
    .filter(([, isActive]) => isActive)
    .map(([style]) => style);

  // Close the toolbar when clicking outside of it.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        refContainer.current &&
        !refContainer.current.contains(target) &&
        !(refContent.current && refContent.current.contains(target))
      ) {
        onRequestClose?.();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <Menubar
      ref={refContainer}
      className={cn("fixed z-10 h-12 w-fit")}
      style={{
        top: position.y,
        left: position.x,
      }}
    >
      <MenubarMenu>
        <MenubarTrigger>
          <span className="mr-2 text-base text-zinc-700">
            {typeLabel || <Trans>Text</Trans>}
          </span>
          <ChevronDown className="text-zinc-700" size={16} />
        </MenubarTrigger>
        <MenubarContent ref={refContent}>
          {blocks.map((block) => {
            const Icon = block.icon;

            return (
              <MenubarItem
                key={block.type}
                className="flex items-center gap-x-4 rounded p-2 hover:bg-zinc-100"
                onSelect={() => {
                  const newOptions: ToolbarOptions = {
                    type: block.type,
                    styles: options.styles,
                  };

                  onChange?.(newOptions);
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded border bg-white">
                  <Icon className="text-zinc-700" size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-left text-base">{block.title}</p>
                  <p className="text-left text-sm text-zinc-400">
                    {block.description}
                  </p>
                </div>
                {block.type === options?.type && (
                  <Check className="ml-auto text-zinc-700" size={20} />
                )}
              </MenubarItem>
            );
          })}
        </MenubarContent>
      </MenubarMenu>
      <ToggleGroup
        type="multiple"
        value={activeStyles}
        onValueChange={(values: ToolbarStyle[]) => {
          const newOptions: ToolbarOptions = {
            type: options.type,
            styles: {
              bold: values.includes("bold"),
              italic: values.includes("italic"),
              underline: values.includes("underline"),
              strike: values.includes("strike"),
            },
          };

          onChange?.(newOptions);
        }}
      >
        <ToggleGroupItem value="bold" aria-label={t`Toggle bold`}>
          <Bold size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label={t`Toggle italic`}>
          <Italic size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label={t`Toggle underline`}>
          <Underline size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="strike" aria-label={t`Toggle strikethrough`}>
          <Strikethrough size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Menubar>
  );
};

export default Toolbar;
