"use client";

import { useEffect, useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockType } from "@prisma/client";
import Quill, { Range } from "quill";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import RichTextInput from "./RichTextInput";
import Toolbar from "./Toolbar";
import { GripAction, ToolbarOptions } from "../types";
import { cn } from "@/lib/utils";
import { getCursorPosition } from "@/app/(protected)/helpers/others";

type Position = {
  x: number;
  y: number;
};

type Props = {
  id: string;
  type: BlockType;
  defaultValue: string;
  onPressEnter?: (values: [string, string]) => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (action: GripAction) => void;
  onBlockSelected?: (type: BlockType) => void;
};

const HeadingBlock = ({
  id,
  type,
  defaultValue,
  onPressEnter,
  onChange,
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
  onBlockSelected,
}: Props) => {
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const sortable = useSortable({ id });
  const refInput = useRef<Quill>(null);

  const [selection, setSelection] = useState<Range | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<Position | null>(null);

  const [toolbarOptions, setToolbarOptions] = useState<ToolbarOptions>({
    type: type,
    styles: {
      bold: false,
      italic: false,
      underline: false,
      strike: false,
    },
  });

  const placeholder = (() => {
    switch (type) {
      case "HEADING1":
        return "Heading 1";

      case "HEADING2":
        return "Heading 2";

      case "HEADING3":
        return "Heading 3";

      default:
        return "";
    }
  })();

  const style = sortable.transform
    ? {
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.25 : 1,
        zIndex: 2,
      }
    : undefined;

  const showToolbar = (selection: Range) => {
    if (refInput.current && selection?.length > 0) {
      const cursorPosition = getCursorPosition();

      const styles = refInput.current.getFormat(
        selection.index,
        selection.length,
      );

      setToolbarOptions({
        type: type,
        styles: {
          bold: styles.bold as boolean,
          italic: styles.italic as boolean,
          underline: styles.underline as boolean,
          strike: styles.strike as boolean,
        },
      });

      setToolbarPosition(cursorPosition);
      setSelection(selection);
    }
  };

  // Refocus to the textarea when the dropdown is closed.
  useEffect(() => {
    if (!isBlocksOpen && refInput.current) {
      refInput.current.focus();
    }
  }, [isBlocksOpen]);

  // Apply value change when the textarea loses focus by clicking outside.
  // This is needed to avoid running onChange() when user press Enter to add a new block below it.
  // It's because we need to run sequential mutations in onPressEnter() and
  // not run onPressEnter() and onChange() at the same time.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        refInput.current &&
        !refInput.current.root.contains(event.target as Node)
      ) {
        if (isFocused) {
          const content = JSON.stringify(refInput.current?.getContents());

          onChange?.(content);
          setIsFocused(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isFocused]);

  return (
    <div
      ref={sortable.setNodeRef}
      className="group relative py-1"
      style={style}
    >
      {!isBlocksOpen && (
        <div
          className={cn("absolute flex -translate-x-full items-center pr-1", {
            "top-2": type === "HEADING1",
            "top-1": type === "HEADING2",
            "top-0": type === "HEADING3",
          })}
        >
          <BlockControls
            id={id}
            type={type}
            sortable={sortable}
            onClickPlus={onClickPlus}
            onAltClickPlus={onAltClickPlus}
            onClickGripAction={onClickGripAction}
          />
        </div>
      )}

      <BlocksDropdown
        isOpen={isBlocksOpen}
        onChange={(type) => {
          onBlockSelected?.(type);
          setIsBlocksOpen(false);
        }}
        onOpenChange={setIsBlocksOpen}
      >
        <RichTextInput
          ref={refInput}
          className={cn(
            "!placeholder:text-zinc-400 !w-full !font-bold !text-zinc-700",
            {
              "!text-3xl !leading-tight md:!text-4xl md:!leading-tight":
                type === "HEADING1",
              "!text-2xl !leading-tight md:!text-3xl md:!leading-tight":
                type === "HEADING2",
              "!text-xl !leading-tight md:!text-2xl md:!leading-tight":
                type === "HEADING3",
            },
          )}
          defaultValue={defaultValue}
          placeholder={placeholder}
          isPlaceholderHiddenWhenBlur={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onTextChange={(rawValue, value) => {
            const isBlocksWillOpen = value.replace(/\s/g, "") === "/";

            if (isBlocksWillOpen) {
              setIsBlocksOpen(true);
            }
          }}
          onPressEnter={onPressEnter}
          onSelectionChange={showToolbar}
        />
        {toolbarPosition && (
          <Toolbar
            position={{
              x: toolbarPosition.x - 40,
              y: toolbarPosition.y + 32,
            }}
            options={toolbarOptions}
            onChange={(options) => {
              if (options.type !== type) {
                onBlockSelected?.(options.type);
              }

              if (refInput.current && selection) {
                refInput.current.formatText(
                  selection.index,
                  selection.length,
                  options.styles,
                );
              }

              setToolbarOptions(options);
            }}
            onRequestClose={() => {
              setToolbarPosition(null);
            }}
          />
        )}
      </BlocksDropdown>
    </div>
  );
};

export default HeadingBlock;
