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
  defaultValue: string;
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
  const [isFocused, setIsFocused] = useState(false);
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

  // Apply value change when the textarea loses focus by clicking outside.
  // This is needed to avoid running onChange() when user press Enter to add a new block below it.
  // It's because we need to run sequential mutations in onPressEnter() and
  // not run onPressEnter() and onChange() at the same time.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isFocused) {
          onChange?.(value);
          setIsFocused(false);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isFocused, value]);

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
          onFocus={() => setIsFocused(true)}
          onChange={(event) => {
            const newValue = event.target.value;

            setValue(newValue);

            if (!value && newValue.startsWith("/")) {
              setIsBlocksOpen(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();

              const cursorPosition = ref.current?.selectionStart;
              const a = value.slice(0, cursorPosition);
              const b = value.slice(cursorPosition);

              setValue(a);
              onPressEnter?.([a, b]);
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default HeadingBlock;
