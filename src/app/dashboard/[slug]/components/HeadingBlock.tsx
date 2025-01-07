"use client";

import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import { BlockId } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  blockId: BlockId;
  defaultValue: string;
  onPressEnter?: () => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onClickAltPlus?: () => void;
  onClickGrip?: () => void;
  onBlockSelected?: (blockId: BlockId) => void;
};

const HeadingBlock = ({
  blockId,
  defaultValue,
  onPressEnter,
  onChange,
  onClickPlus,
  onClickAltPlus,
  onClickGrip,
  onBlockSelected,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const placeholder = (() => {
    switch (blockId) {
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

  // Refocus to the textarea when the dropdown is closed.
  useEffect(() => {
    if (!isBlocksOpen && refTextarea.current) {
      refTextarea.current.focus();
    }
  }, [isBlocksOpen]);

  return (
    <div className="group relative">
      {!isBlocksOpen && (
        <div
          className={cn("absolute flex -translate-x-full items-center pr-1", {
            "top-2": blockId === "heading1",
            "top-1": blockId === "heading2",
            "top-0": blockId === "heading3",
          })}
        >
          <BlockControls
            onClickPlus={onClickPlus}
            onAltClickPlus={onClickAltPlus}
            onClickGrip={onClickGrip}
          />
        </div>
      )}

      <BlocksDropdown
        isOpen={isBlocksOpen}
        onChange={onBlockSelected}
        onOpenChange={setIsBlocksOpen}
      >
        <TextareaAutosize
          ref={refTextarea}
          className={cn(
            "w-full resize-none font-bold text-foreground outline-none",
            {
              "text-4xl leading-normal": blockId === "heading1",
              "text-3xl leading-normal": blockId === "heading2",
              "text-2xl leading-normal": blockId === "heading3",
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
              onPressEnter?.();
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default HeadingBlock;
