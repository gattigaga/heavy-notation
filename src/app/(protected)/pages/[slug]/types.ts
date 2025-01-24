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
