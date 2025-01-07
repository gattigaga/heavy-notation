import { marked } from "marked";

type Block = {
  id: number;
  blockId: string;
  content: string;
};

export const parseMarkdownToBlocks = (markdown: string): Block[] => {
  const html = marked.parse(markdown) as string;
  const lines = html.split("\n");

  const result = lines.map((line, index) => {
    const blockId = (() => {
      if (line.startsWith("<h1>")) {
        return "heading1";
      }

      if (line.startsWith("<h2>")) {
        return "heading2";
      }

      if (line.startsWith("<h3>")) {
        return "heading3";
      }

      return "text";
    })();

    const parser = new DOMParser();
    const doc = parser.parseFromString(line, "text/html");
    const content = doc.body.firstElementChild?.innerHTML || "";

    return {
      id: index,
      blockId: blockId,
      content: content,
    };
  });

  return result;
};
