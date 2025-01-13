"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  defaultValue: string;
  onPressEnter?: (value: string) => void;
  onChange?: (value: string) => void;
};

const TitleBlock = ({ defaultValue, onPressEnter, onChange }: Props) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <TextareaAutosize
      className="w-full resize-none bg-transparent text-5xl font-bold leading-normal text-zinc-700 outline-none placeholder:text-zinc-400"
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
          onPressEnter?.(value);
        }
      }}
    />
  );
};

export default TitleBlock;
