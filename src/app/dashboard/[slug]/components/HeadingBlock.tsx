"use client";

import { RefObject, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import { BlockType } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  ref: RefObject<HTMLTextAreaElement | null>;
  type: BlockType;
  defaultValue: string;
  onPressEnter?: (value: string) => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onClickAltPlus?: () => void;
  onClickGrip?: () => void;
  onBlockSelected?: (type: BlockType) => void;
};

const HeadingBlock = ({
  ref,
  type,
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

  // Refocus to the textarea when the dropdown is closed.
  useEffect(() => {
    if (!isBlocksOpen && ref.current) {
      ref.current.focus();
    }
  }, [isBlocksOpen]);

  return (
    <div className="group relative">
      {!isBlocksOpen && (
        <div
          className={cn("absolute flex -translate-x-full items-center pr-1", {
            "top-2": type === "heading1",
            "top-1": type === "heading2",
            "top-0": type === "heading3",
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
        onChange={(type) => {
          onBlockSelected?.(type);
          setIsBlocksOpen(false);
        }}
        onOpenChange={setIsBlocksOpen}
      >
        <TextareaAutosize
          ref={ref}
          className={cn(
            "w-full resize-none font-bold text-foreground outline-none",
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
