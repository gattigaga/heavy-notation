import { marked } from "marked";

import { BlockType } from "../types";

type Block = {
  id: number;
  type: BlockType;
  content: string;
};

export const parseMarkdownToBlocks = (markdown: string): Block[] => {
  const html = marked.parse(markdown) as string;
  const lineElements = html.split("\n");

  const result = lineElements.map((lineElement, index) => {
    const type: BlockType = (() => {
      if (lineElement.startsWith("<h1>")) {
        return "heading1";
      }

      if (lineElement.startsWith("<h2>")) {
        return "heading2";
      }

      if (lineElement.startsWith("<h3>")) {
        return "heading3";
      }

      return "text";
    })();

    const parser = new DOMParser();
    const doc = parser.parseFromString(lineElement, "text/html");
    const content = doc.body.firstElementChild?.innerHTML || "";

    return {
      id: index,
      type,
      content,
    };
  });

  return result;
};
