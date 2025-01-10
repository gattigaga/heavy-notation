"use client";

import { createRef, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

import TitleBlock from "./TitleBlock";
import TextBlock from "./TextBlock";
import HeadingBlock from "./HeadingBlock";
import { addBlock, updateBlock } from "../helpers/parser";
import { Block } from "../types";

type Props = Record<string, unknown>;

const Content = ({}: Props) => {
  const [title, setTitle] = useState("");

  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: uuid(),
      index: 0,
      type: "heading1",
      content: "Hello",
    },
    {
      id: uuid(),
      index: 1,
      type: "text",
      content: "This is a text.",
    },
    {
      id: uuid(),
      index: 2,
      type: "text",
      content: "",
    },
    {
      id: uuid(),
      index: 3,
      type: "text",
      content: "",
    },
    {
      id: uuid(),
      index: 4,
      type: "heading2",
      content: "World",
    },
    {
      id: uuid(),
      index: 5,
      type: "text",
      content: "",
    },
    {
      id: uuid(),
      index: 6,
      type: "text",
      content: "This is a text.",
    },
    {
      id: uuid(),
      index: 7,
      type: "text",
      content: "This is game.",
    },
  ]);

  const blockWithRefs = useMemo(() => {
    return blocks.map((block) => {
      return {
        ...block,
        ref: createRef<HTMLTextAreaElement>(),
      };
    });
  }, [blocks]);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-y-4">
      {/* Title */}
      <TitleBlock
        defaultValue={title}
        onPressEnter={() => console.log("press enter")}
        onChange={setTitle}
      />

      {/* Body  */}
      {blockWithRefs.map((block, index) => {
        switch (block.type) {
          case "heading1":
          case "heading2":
          case "heading3":
            return (
              <HeadingBlock
                key={block.id}
                ref={block.ref}
                type={block.type}
                defaultValue={block.content}
                onPressEnter={() => {
                  const newBlocks = addBlock({
                    blocks,
                    block: {
                      id: uuid(),
                      index: index + 1,
                      type: "text",
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onChange={(value) => {
                  const newBlocks = updateBlock({
                    blocks,
                    blockId: block.id,
                    data: {
                      content: value,
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onClickPlus={() => {
                  const newBlocks = addBlock({
                    blocks,
                    block: {
                      id: uuid(),
                      index: index + 1,
                      type: "text",
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onAltClickPlus={() => {
                  const newBlocks = addBlock({
                    blocks,
                    block: {
                      id: uuid(),
                      index: index,
                      type: "text",
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onClickGrip={() => console.log("click grip")}
                onBlockSelected={(type) => {
                  const newBlocks = updateBlock({
                    blocks,
                    blockId: block.id,
                    data: {
                      type: type,
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
              />
            );

          default:
            return (
              <TextBlock
                key={block.id}
                ref={block.ref}
                defaultValue={block.content}
                onPressEnter={() => {
                  const newBlocks = addBlock({
                    blocks,
                    block: {
                      id: uuid(),
                      index: index + 1,
                      type: "text",
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onChange={(value) => {
                  const newBlocks = updateBlock({
                    blocks,
                    blockId: block.id,
                    data: {
                      content: value,
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onClickPlus={() => {
                  const newBlocks = addBlock({
                    blocks,
                    block: {
                      id: uuid(),
                      index: index + 1,
                      type: "text",
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onAltClickPlus={() => {
                  const newBlocks = addBlock({
                    blocks,
                    block: {
                      id: uuid(),
                      index: index,
                      type: "text",
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
                onClickGrip={() => console.log("click grip")}
                onBlockSelected={(type) => {
                  const newBlocks = updateBlock({
                    blocks,
                    blockId: block.id,
                    data: {
                      type: type,
                      content: "",
                    },
                  });

                  setBlocks(newBlocks);
                }}
              />
            );
        }
      })}
    </div>
  );
};

export default Content;
