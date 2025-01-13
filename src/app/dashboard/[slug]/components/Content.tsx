"use client";

import { createRef, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import TitleBlock from "./TitleBlock";
import TextBlock from "./TextBlock";
import HeadingBlock from "./HeadingBlock";
import DividerBlock from "./DividerBlock";
import { Block } from "../types";
import { addBlock, deleteBlock, updateBlock } from "../helpers/parser";

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

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0,
    },
  });

  const sensors = useSensors(pointerSensor);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);

      setBlocks(newBlocks);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Title */}
      <TitleBlock
        defaultValue={title}
        onPressEnter={() => {
          const newBlocks = addBlock({
            blocks,
            block: {
              id: uuid(),
              index: 0,
              type: "text",
              content: "",
            },
          });

          setBlocks(newBlocks);
        }}
        onChange={setTitle}
      />

      {/* Body  */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blockWithRefs}
          strategy={verticalListSortingStrategy}
        >
          {blockWithRefs.map((block, index) => {
            switch (block.type) {
              case "heading1":
              case "heading2":
              case "heading3":
                return (
                  <HeadingBlock
                    key={block.id}
                    ref={block.ref}
                    id={block.id}
                    type={block.type}
                    value={block.content}
                    onPressEnter={(values) => {
                      let newBlocks = blocks;

                      newBlocks = updateBlock({
                        blocks,
                        blockId: block.id,
                        data: {
                          content: values[0],
                        },
                      });

                      newBlocks = addBlock({
                        blocks: newBlocks,
                        block: {
                          id: uuid(),
                          index: index + 1,
                          type: block.type,
                          content: values[1],
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
                    onClickGripAction={(action) => {
                      switch (action.type) {
                        case "delete":
                          (() => {
                            const newBlocks = deleteBlock({
                              blocks,
                              blockId: block.id,
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        case "duplicate":
                          (() => {
                            const newBlocks = addBlock({
                              blocks,
                              block: {
                                id: uuid(),
                                index: index + 1,
                                type: block.type,
                                content: block.content,
                              },
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        case "turn_into":
                          (() => {
                            const newBlocks = updateBlock({
                              blocks,
                              blockId: block.id,
                              data: {
                                type: action.data?.type,
                              },
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        default:
                          break;
                      }
                    }}
                  />
                );

              case "divider":
                return (
                  <DividerBlock
                    key={block.id}
                    id={block.id}
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
                    onClickGripAction={(action) => {
                      switch (action.type) {
                        case "delete":
                          (() => {
                            const newBlocks = deleteBlock({
                              blocks,
                              blockId: block.id,
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        case "duplicate":
                          (() => {
                            const newBlocks = addBlock({
                              blocks,
                              block: {
                                id: uuid(),
                                index: index + 1,
                                type: block.type,
                                content: block.content,
                              },
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        case "turn_into":
                          (() => {
                            const newBlocks = updateBlock({
                              blocks,
                              blockId: block.id,
                              data: {
                                type: action.data?.type,
                              },
                            });

                            setBlocks(newBlocks);
                          })();

                        default:
                          break;
                      }
                    }}
                  />
                );

              default:
                return (
                  <TextBlock
                    key={block.id}
                    ref={block.ref}
                    id={block.id}
                    value={block.content}
                    onPressEnter={(values) => {
                      let newBlocks = blocks;

                      newBlocks = updateBlock({
                        blocks,
                        blockId: block.id,
                        data: {
                          content: values[0],
                        },
                      });

                      newBlocks = addBlock({
                        blocks: newBlocks,
                        block: {
                          id: uuid(),
                          index: index + 1,
                          type: "text",
                          content: values[1],
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
                    onClickGripAction={(action) => {
                      switch (action.type) {
                        case "delete":
                          (() => {
                            const newBlocks = deleteBlock({
                              blocks,
                              blockId: block.id,
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        case "duplicate":
                          (() => {
                            const newBlocks = addBlock({
                              blocks,
                              block: {
                                id: uuid(),
                                index: index + 1,
                                type: block.type,
                                content: block.content,
                              },
                            });

                            setBlocks(newBlocks);
                          })();
                          break;

                        case "turn_into":
                          (() => {
                            const newBlocks = updateBlock({
                              blocks,
                              blockId: block.id,
                              data: {
                                type: action.data?.type,
                              },
                            });

                            setBlocks(newBlocks);
                          })();

                        default:
                          break;
                      }
                    }}
                  />
                );
            }
          })}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default Content;
