import { Block } from "../types";

export const addBlock = ({
  blocks,
  block,
}: {
  blocks: Block[];
  block: Block;
}): Block[] => {
  const beforeBlocks = blocks.slice(0, block.index);
  const afterBlocks = blocks.slice(block.index);

  const result = [...beforeBlocks, block, ...afterBlocks].map(
    (block, index) => {
      return {
        ...block,
        index,
      };
    },
  );

  return result;
};

export const updateBlock = ({
  blocks,
  blockId,
  data,
}: {
  blocks: Block[];
  blockId: string;
  data: Partial<Omit<Block, "id">>;
}): Block[] => {
  const newBlocks = blocks.map((block) => {
    if (block.id === blockId) {
      return {
        ...block,
        ...data,
        id: blockId,
      };
    }

    return block;
  });

  return newBlocks;
};

export const deleteBlock = ({
  blocks,
  blockId,
}: {
  blocks: Block[];
  blockId: string;
}): Block[] => {
  const newBlocks = blocks
    .filter((block) => {
      return block.id !== blockId;
    })
    .map((block, index) => {
      return {
        ...block,
        index,
      };
    });

  return newBlocks;
};
