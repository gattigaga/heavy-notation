"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  defaultValue: string;
  onPressEnter?: () => void;
  onChange?: (value: string) => void;
};

const TitleBlock = ({ defaultValue, onPressEnter, onChange }: Props) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TextareaAutosize
      className="w-full resize-none text-5xl font-bold leading-normal text-foreground outline-none"
      value={value}
      placeholder="New Page"
      onChange={(event) => {
        const newValue = event.target.value;

        setValue(newValue);
      }}
      onBlur={() => onChange?.(value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          onPressEnter?.();
        }
      }}
    />
  );
};

export default TitleBlock;
