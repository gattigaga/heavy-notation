export type BlockType = "text" | "heading1" | "heading2" | "heading3";

export type Block = {
  id: string;
  index: number;
  type: BlockType;
  content: string;
};
