"use client";

import { RefObject, useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockType } from "@prisma/client";
import Quill from "quill";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import RichTextInput from "./RichTextInput";
import Toolbar from "./Toolbar";
import { GripAction } from "../types";
import { getCursorPosition } from "@/app/(protected)/helpers/others";

type Position = {
  x: number;
  y: number;
};

type Props = {
  ref: RefObject<Quill | null>;
  id: string;
  defaultValue: string;
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
  defaultValue,
  onPressEnter,
  onChange,
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
  onBlockSelected,
}: Props) => {
  const [toolbarPosition, setToolbarPosition] = useState<Position | null>(null);
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

  // Apply value change when the textarea loses focus by clicking outside.
  // This is needed to avoid running onChange() when user press Enter to add a new block below it.
  // It's because we need to run sequential mutations in onPressEnter() and
  // not run onPressEnter() and onChange() at the same time.
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.root.contains(event.target as Node)) {
        if (isFocused) {
          const content = JSON.stringify(ref.current?.getContents());

          onChange?.(content);
          setIsFocused(false);
          setToolbarPosition(null);
        }
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isFocused]);

  return (
    <div ref={sortable.setNodeRef} className="group relative" style={style}>
      {!isBlocksOpen && (
        <div className="absolute -top-0.5 flex -translate-x-full items-center pr-1">
          <BlockControls
            id={id}
            type="TEXT"
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
          ref={ref}
          className="!h-fit !w-full !text-lg !font-medium !text-zinc-700"
          defaultValue={defaultValue}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onTextChange={(rawValue, value) => {
            const isBlocksWillOpen = value.replace(/\s/g, "") === "/";

            if (isBlocksWillOpen) {
              setIsBlocksOpen(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            setToolbarPosition(null);
          }}
          onPressEnter={onPressEnter}
          onSelectionChange={(range) => {
            if (range?.length > 0) {
              const cursorPosition = getCursorPosition();

              setToolbarPosition(cursorPosition);
            }
          }}
        />
        {toolbarPosition && (
          <Toolbar
            position={{
              x: toolbarPosition.x - 40,
              y: toolbarPosition.y - 56,
            }}
          />
        )}
      </BlocksDropdown>
    </div>
  );
};

export default TextBlock;
