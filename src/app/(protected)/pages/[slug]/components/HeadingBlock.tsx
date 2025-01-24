"use client";

import { RefObject, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockType } from "@prisma/client";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import { GripAction } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  ref: RefObject<HTMLTextAreaElement | null>;
  id: string;
  type: BlockType;
  value: string;
  onPressEnter?: (values: [string, string]) => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (action: GripAction) => void;
  onBlockSelected?: (type: BlockType) => void;
};

const HeadingBlock = ({
  ref,
  id,
  type,
  value,
  onPressEnter,
  onChange,
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
  onBlockSelected,
}: Props) => {
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);
  const sortable = useSortable({ id });

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

  // Refocus to the textarea when the dropdown is closed.
  useEffect(() => {
    if (!isBlocksOpen && ref.current) {
      ref.current.focus();
    }
  }, [isBlocksOpen]);

  return (
    <div ref={sortable.setNodeRef} className="group relative" style={style}>
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
        <TextareaAutosize
          ref={ref}
          className={cn(
            "w-full resize-none bg-transparent font-bold text-zinc-700 outline-none placeholder:text-zinc-400",
            {
              "text-4xl leading-normal": type === "HEADING1",
              "text-3xl leading-normal": type === "HEADING2",
              "text-2xl leading-normal": type === "HEADING3",
            },
          )}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            const newValue = event.target.value;

            onChange?.(newValue);

            if (!value && newValue.startsWith("/")) {
              setIsBlocksOpen(true);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();

              const cursorPosition = ref.current?.selectionStart;
              const a = value.slice(0, cursorPosition);
              const b = value.slice(cursorPosition);

              onPressEnter?.([a, b]);
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default HeadingBlock;
