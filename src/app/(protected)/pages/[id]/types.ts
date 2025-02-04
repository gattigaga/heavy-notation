import { BlockType } from "@prisma/client";

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

export type ToolbarStyle = "bold" | "italic" | "underline" | "strike";

export type ToolbarOptions = {
  type: BlockType;
  styles: {
    [style in ToolbarStyle]: boolean;
  };
};
