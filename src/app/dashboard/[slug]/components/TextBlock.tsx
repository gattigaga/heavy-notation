"use client";

import { RefObject, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";
import { ActionType, BlockType } from "../types";

type Props = {
  ref: RefObject<HTMLTextAreaElement | null>;
  defaultValue: string;
  onPressEnter?: (value: string) => void;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGrip?: () => void;
  onClickAction?: (type: ActionType) => void;
  onBlockSelected?: (type: BlockType) => void;
};

const TextBlock = ({
  ref,
  defaultValue,
  onPressEnter,
  onChange,
  onClickPlus,
  onAltClickPlus,
  onClickGrip,
  onClickAction,
  onBlockSelected,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const placeholder = isFocused
    ? "Write something, or press '/' for commands..."
    : "";

  // Refocus to the textarea when the dropdown is closed.
  useEffect(() => {
    if (!isBlocksOpen && ref.current) {
      ref.current.focus();
    }
  }, [isBlocksOpen]);

  return (
    <div className="group relative">
      {!isBlocksOpen && (
        <div className="absolute -top-0.5 flex -translate-x-full items-center pr-1">
          <BlockControls
            onClickPlus={onClickPlus}
            onAltClickPlus={onAltClickPlus}
            onClickGrip={onClickGrip}
            onClickAction={onClickAction}
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
          className="w-full resize-none text-lg font-medium text-foreground outline-none"
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
          onBlur={() => {
            setIsFocused(false);
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

export default TextBlock;
