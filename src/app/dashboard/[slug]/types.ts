export type BlockType = "text" | "heading1" | "heading2" | "heading3";

export type Block = {
  id: string;
  index: number;
  type: BlockType;
  content: string;
};

export type ActionType = "delete" | "duplicate" | "turn_into";

export type GripAction = {
  type: ActionType;
  data: { type: BlockType } | null;
};
