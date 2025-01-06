"use client";

import { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";

type Props = {
  defaultValue: string;
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onClickAltPlus?: () => void;
  onClickGrip?: () => void;
  onBlockSelected?: (blockId: string) => void;
};

const TextBlock = ({
  defaultValue,
  onChange,
  onClickPlus,
  onClickAltPlus,
  onClickGrip,
  onBlockSelected,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const refTextarea = useRef<HTMLTextAreaElement>(null);

  const placeholder = isFocused
    ? "Write something, or press '/' for commands..."
    : "";

  // Refocus to the textarea when the dropdown is closed.
  useEffect(() => {
    if (!isBlocksOpen && refTextarea.current) {
      refTextarea.current.focus();
    }
  }, [isBlocksOpen]);

  return (
    <div className="group relative">
      {!isBlocksOpen && (
        <BlockControls
          onClickPlus={onClickPlus}
          onAltClickPlus={onClickAltPlus}
          onClickGrip={onClickGrip}
        />
      )}

      <BlocksDropdown
        isOpen={isBlocksOpen}
        onChange={onBlockSelected}
        onOpenChange={setIsBlocksOpen}
      >
        <TextareaAutosize
          ref={refTextarea}
          className="w-full resize-none text-lg font-medium outline-none"
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
              onChange?.(value);
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default TextBlock;
