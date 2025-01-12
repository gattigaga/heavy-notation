"use client";

import { RefObject, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import { ActionType, BlockType } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  ref: RefObject<HTMLTextAreaElement | null>;
  id: string;
  type: BlockType;
  defaultValue: string;
  onPressEnter?: (value: string) => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (type: ActionType) => void;
  onBlockSelected?: (type: BlockType) => void;
};

const HeadingBlock = ({
  ref,
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
  const [value, setValue] = useState(defaultValue);
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);
  const sortable = useSortable({ id });

  const placeholder = (() => {
    switch (type) {
      case "heading1":
        return "Heading 1";

      case "heading2":
        return "Heading 2";

      case "heading3":
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
            "top-2": type === "heading1",
            "top-1": type === "heading2",
            "top-0": type === "heading3",
          })}
        >
          <BlockControls
            id={id}
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
            "w-full resize-none bg-transparent font-bold text-zinc-700 outline-none placeholder:text-zinc-300",
            {
              "text-4xl leading-normal": type === "heading1",
              "text-3xl leading-normal": type === "heading2",
              "text-2xl leading-normal": type === "heading3",
            },
          )}
          value={value}
          placeholder={placeholder}
          onChange={(event) => {
            const newValue = event.target.value;

            setValue(newValue);

            if (!value && newValue.startsWith("/")) {
              setIsBlocksOpen(true);
            }
          }}
          onBlur={() => {
            onChange?.(value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onPressEnter?.(value);
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default HeadingBlock;
