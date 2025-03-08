"use client";

import { useRef, useState } from "react";
import { useLingui } from "@lingui/react/macro";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  defaultValue: string;
  onPressEnter?: (values: [string, string]) => void;
  onChange?: (value: string) => void;
};

const TitleBlock = ({ defaultValue, onPressEnter, onChange }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const { t } = useLingui();
  const refInput = useRef<HTMLTextAreaElement>(null);

  return (
    <TextareaAutosize
      ref={refInput}
      className="mb-4 h-fit w-full resize-none bg-transparent text-4xl font-bold leading-tight text-zinc-700 outline-none placeholder:text-zinc-400 md:text-5xl md:leading-tight dark:text-white placeholder:dark:text-zinc-500"
      placeholder={t`New Page`}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      onBlur={() => {
        const content = refInput.current?.value;

        if (content === undefined) {
          return;
        }

        onChange?.(content);
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          // Prevent the default action of adding a new line.
          event.preventDefault();

          const content = value;
          const cursorPosition = refInput.current?.selectionStart;

          if (content === undefined || cursorPosition === undefined) {
            return;
          }

          const a = content.slice(0, cursorPosition);
          const b = content.slice(cursorPosition);

          setValue(a);
          onPressEnter?.([a, b]);
        }
      }}
    />
  );
};

export default TitleBlock;
