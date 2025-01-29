import React, { useEffect, useRef } from "react";
import Quill, { Delta, EmitterSource, Op, Range } from "quill";
import "quill/dist/quill.snow.css";

type Props = {
  ref: React.RefObject<Quill | null>;
  placeholder?: string;
  value?: Delta | Op[];
  onTextChange?: (
    delta: Delta,
    oldContent: Delta,
    source: EmitterSource,
  ) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onSelectionChange?: (
    range: Range,
    oldRange: Range,
    source: EmitterSource,
  ) => void;
};

const RichTextInput = ({
  ref,
  value,
  placeholder,
  onTextChange: onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onSelectionChange,
}: Props) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refContainer.current) {
      const editorContainer = refContainer.current.appendChild(
        refContainer.current.ownerDocument.createElement("div"),
      );

      const quill = new Quill(editorContainer, {
        placeholder,
      });

      ref.current = quill;

      if (value) {
        quill.setContents(value);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onChange?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChange?.(...args);
      });

      quill.root.addEventListener("blur", () => {
        onBlur?.();
      });

      quill.root.addEventListener("focus", () => {
        onFocus?.();
      });

      quill.root.addEventListener("keydown", (event) => {
        onKeyDown?.(event);
      });
    }

    return () => {
      ref.current = null;

      if (refContainer.current) {
        refContainer.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={refContainer}
      className="w-full bg-transparent text-zinc-700 placeholder:text-zinc-400"
    />
  );
};

export default RichTextInput;
