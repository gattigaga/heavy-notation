"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  onChange?: (value: string) => void;
};

const TitleBlock = ({ onChange }: Props) => {
  const [value, setValue] = useState("");

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
          onChange?.(value);
        }
      }}
    />
  );
};

export default TitleBlock;
