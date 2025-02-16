"use client";

import Quill, { Delta } from "quill";
import { useRef } from "react";
import { useLingui } from "@lingui/react/macro";

import RichTextInput from "./RichTextInput";

type Props = {
  defaultValue: string;
  onPressEnter?: (values: [string, string]) => void;
  onChange?: (value: string) => void;
};

const TitleBlock = ({ defaultValue, onPressEnter, onChange }: Props) => {
  const { t } = useLingui();
  const refInput = useRef<Quill>(null);

  return (
    <RichTextInput
      ref={refInput}
      className="!placeholder:text-zinc-400 !mb-4 !h-fit !w-full !text-4xl !font-bold !leading-tight !text-zinc-700 md:!text-5xl md:!leading-tight"
      defaultValue={JSON.stringify(new Delta().insert(defaultValue))}
      placeholder={t`New Page`}
      onBlur={() => {
        const content = refInput.current?.getContents().ops[0]?.insert;

        if (typeof content === "string") {
          onChange?.(content);
        }
      }}
      onPressEnter={(values) => {
        const title = JSON.parse(values[0]).ops[0].insert;

        onPressEnter?.([title, values[1]]);
      }}
    />
  );
};

export default TitleBlock;
