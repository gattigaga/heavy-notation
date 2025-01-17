"use client";

import { RefObject, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import { BlockType, GripAction } from "../types";

type Props = {
  ref: RefObject<HTMLTextAreaElement | null>;
  id: string;
  value: string;
  onPressEnter?: (values: [string, string]) => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (action: GripAction) => void;
  onBlockSelected?: (type: BlockType) => void;
};

const TextBlock = ({
  ref,
  id,
  value,
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

  const placeholder = isFocused
    ? "Write something, or press '/' for commands..."
    : "";

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
        <div className="absolute -top-0.5 flex -translate-x-full items-center pr-1">
          <BlockControls
            id={id}
            type="text"
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
          className="w-full resize-none bg-transparent text-lg font-medium text-zinc-700 outline-none placeholder:text-zinc-400"
          value={value}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onChange={(event) => {
            const newValue = event.target.value;

            onChange?.(newValue);

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

              onPressEnter?.([a, b]);
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default TextBlock;
