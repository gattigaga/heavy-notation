"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import BlockControls from "./BlockControls";
import BlocksDropdown from "./BlocksDropdown";

type Props = {
  onChange?: (value: string) => void;
  onClickPlus?: () => void;
  onClickAltPlus?: () => void;
  onClickGrip?: () => void;
};

const TextBlock = ({
  onChange,
  onClickPlus,
  onClickAltPlus,
  onClickGrip,
}: Props) => {
  const [value, setValue] = useState("");
  const [isBlocksOpen, setIsBlocksOpen] = useState(false);

  return (
    <div className="relative group">
      <BlockControls
        onClickPlus={onClickPlus}
        onAltClickPlus={onClickAltPlus}
        onClickGrip={onClickGrip}
      />

      <BlocksDropdown
        isOpen={isBlocksOpen}
        onChange={onChange}
        onOpenChange={setIsBlocksOpen}
      >
        <TextareaAutosize
          className="w-full resize-none outline-none text-lg font-medium"
          value={value}
          placeholder="Write something, or press '/' for commands..."
          onChange={(event) => {
            const newValue = event.target.value;

            setValue(newValue);

            if (!value && newValue.startsWith("/")) {
              setIsBlocksOpen(true);
            }
          }}
        />
      </BlocksDropdown>
    </div>
  );
};

export default TextBlock;
