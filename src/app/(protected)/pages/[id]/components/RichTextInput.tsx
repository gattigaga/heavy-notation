import React, { useEffect, useRef } from "react";
import Quill, { Delta, EmitterSource, Range } from "quill";
import "quill/dist/quill.snow.css";

type Props = {
  ref: React.RefObject<Quill | null>;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  isPlaceholderHiddenWhenBlur?: boolean;
  onTextChange?: (rawValue: string, value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onPressEnter?: (rawValues: [string, string]) => void;
  onSelectionChange?: (
    range: Range,
    oldRange: Range,
    source: EmitterSource,
  ) => void;
};

const RichTextInput = ({
  ref,
  className,
  placeholder,
  defaultValue,
  isPlaceholderHiddenWhenBlur,
  onTextChange,
  onBlur,
  onFocus,
  onPressEnter,
  onSelectionChange,
}: Props) => {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refContainer.current) {
      const quill = new Quill(refContainer.current, {
        placeholder,
      });

      const quillContainer =
        refContainer.current.querySelector(".ql-container");

      if (quillContainer) {
        quillContainer.className = className || "";
      }

      ref.current = quill;

      if (defaultValue) {
        const content = defaultValue ? JSON.parse(defaultValue) : new Delta();

        ref.current.setContents(content);
      }

      if (isPlaceholderHiddenWhenBlur) {
        quill.root.setAttribute("data-placeholder", "");
      }

      // Prevent create a new line break when press enter.
      quill.keyboard.bindings["Enter"] = [];

      quill.on(Quill.events.TEXT_CHANGE, (delta, oldContent) => {
        const content = oldContent.compose(delta);
        const stringified = JSON.stringify(content);
        const innerValue = content.ops[0]?.insert as string;

        onTextChange?.(stringified, innerValue);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChange?.(...args);
      });

      quill.root.addEventListener("blur", () => {
        if (isPlaceholderHiddenWhenBlur) {
          quill.root.setAttribute("data-placeholder", "");
        }

        onBlur?.();
      });

      quill.root.addEventListener("focus", () => {
        quill.root.setAttribute("data-placeholder", placeholder || "");
        onFocus?.();
      });

      quill.root.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();

          const selection = ref.current?.getSelection();
          const before = ref.current?.getContents(0, selection?.index);
          const after = ref.current?.getContents(selection?.index);

          const a = JSON.stringify(before);
          const b = JSON.stringify(after);

          if (before && after) {
            ref.current?.setContents(before);
            onPressEnter?.([a, b]);
          }
        }
      });
    }

    return () => {
      ref.current = null;

      if (refContainer.current) {
        refContainer.current.innerHTML = "";
      }
    };
  }, [placeholder]);

  return <div ref={refContainer} className={className} />;
};

export default RichTextInput;
