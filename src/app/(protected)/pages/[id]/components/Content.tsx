"use client";

import { createRef, useEffect, useMemo, useState } from "react";
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
import { useParams } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";

import { Skeleton } from "@/components/ui/skeleton";
import TitleBlock from "./TitleBlock";
import TextBlock from "./TextBlock";
import HeadingBlock from "./HeadingBlock";
import DividerBlock from "./DividerBlock";
import { Block } from "../types";
import { addBlock, updateBlock } from "../helpers/parser";
import useBlocksQuery from "@/app/(protected)/hooks/queries/use-blocks-query";
import usePageQuery from "@/app/(protected)/hooks/queries/use-page-query";
import useUpdatePageMutation from "@/app/(protected)/hooks/mutations/use-update-page-mutation";
import useAddBlockMutation from "@/app/(protected)/hooks/mutations/use-add-block-mutation";
import useRemoveBlockMutation from "@/app/(protected)/hooks/mutations/use-remove-block-mutation";

type Params = {
  id: string;
};

const Content = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const params = useParams<Params>();
  const pageQuery = usePageQuery({ id: params.id });
  const blocksQuery = useBlocksQuery({ pageId: params.id });
  const updatePageMutation = useUpdatePageMutation();
  const addBlockMutation = useAddBlockMutation();
  const removeBlockMutation = useRemoveBlockMutation();

  const blockWithRefs = useMemo(() => {
    const blocks =
      blocksQuery.data
        ?.filter((block) => block.id !== removeBlockMutation.variables?.id)
        .map((block) => {
          return {
            ...block,
            ref: createRef<HTMLTextAreaElement>(),
          };
        }) || [];

    if (addBlockMutation.isPending) {
      return [
        ...blocks,
        {
          id: createId(),
          index: addBlockMutation.variables.index,
          type: addBlockMutation.variables.type,
          content: "",
          ref: createRef<HTMLTextAreaElement>(),
        },
      ].sort((a, b) => a.index - b.index);
    }

    return blocks;
  }, [
    blocksQuery.data,
    addBlockMutation.variables,
    addBlockMutation.isPending,
    removeBlockMutation.variables,
  ]);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 0,
    },
  });

  const sensors = useSensors(pointerSensor);

  const title = updatePageMutation.isPending
    ? updatePageMutation.variables.title
    : pageQuery.data?.title || "";

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);
      const newBlocks = arrayMove(blocks, oldIndex, newIndex);

      setBlocks(newBlocks);
    }
  };

  // Handle keyboard focus navigation for blocks.
  useEffect(() => {
    const handleFocus = (event: KeyboardEvent) => {
      if (
        document.activeElement &&
        document.activeElement instanceof HTMLTextAreaElement
      ) {
        const index = blockWithRefs.findIndex(
          (block) => block.ref.current === document.activeElement,
        );

        switch (event.key) {
          case "ArrowUp":
            if (index > 0) {
              blockWithRefs[index - 1].ref.current?.focus();
            }
            break;

          case "ArrowDown":
            if (index < blockWithRefs.length - 1) {
              blockWithRefs[index + 1].ref.current?.focus();
            }
            break;

          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleFocus);

    return () => {
      document.removeEventListener("keydown", handleFocus);
    };
  }, [blocks]);

  // Initialize blocks.
  useEffect(() => {
    if (blocksQuery.isSuccess) {
      setBlocks(blocksQuery.data);
    }
  }, [blocksQuery.isSuccess, blocksQuery.data]);

  return (
    <>
      {pageQuery.isSuccess && (
        <div className="mx-auto max-w-3xl">
          {/* Title */}
          <TitleBlock
            defaultValue={title}
            onPressEnter={(title) => {
              updatePageMutation.mutate({
                id: params.id,
                title,
              });

              addBlockMutation.mutate({
                pageId: params.id,
                index: 0,
                type: "TEXT",
                content: "",
              });
            }}
            onChange={(title) => {
              updatePageMutation.mutate({
                id: params.id,
                title,
              });
            }}
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
                  case "HEADING1":
                  case "HEADING2":
                  case "HEADING3":
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
                              id: createId(),
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
                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index + 1,
                            type: "TEXT",
                            content: "",
                          });
                        }}
                        onAltClickPlus={() => {
                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index,
                            type: "TEXT",
                            content: "",
                          });
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
                                removeBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                });
                              })();
                              break;

                            case "duplicate":
                              (() => {
                                addBlockMutation.mutate({
                                  pageId: params.id,
                                  index: index + 1,
                                  type: block.type,
                                  content: block.content,
                                });
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

                  case "DIVIDER":
                    return (
                      <DividerBlock
                        key={block.id}
                        id={block.id}
                        onClickPlus={() => {
                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index + 1,
                            type: "TEXT",
                            content: "",
                          });
                        }}
                        onAltClickPlus={() => {
                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index,
                            type: "TEXT",
                            content: "",
                          });
                        }}
                        onClickGripAction={(action) => {
                          switch (action.type) {
                            case "delete":
                              (() => {
                                removeBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                });
                              })();
                              break;

                            case "duplicate":
                              (() => {
                                addBlockMutation.mutate({
                                  pageId: params.id,
                                  index: index + 1,
                                  type: block.type,
                                  content: block.content,
                                });
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
                              id: createId(),
                              index: index + 1,
                              type: "TEXT",
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
                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index + 1,
                            type: "TEXT",
                            content: "",
                          });
                        }}
                        onAltClickPlus={() => {
                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index,
                            type: "TEXT",
                            content: "",
                          });
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
                                removeBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                });
                              })();
                              break;

                            case "duplicate":
                              (() => {
                                addBlockMutation.mutate({
                                  pageId: params.id,
                                  index: index + 1,
                                  type: block.type,
                                  content: block.content,
                                });
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
      )}
      {pageQuery.isError && (
        <div className="flex w-full flex-col items-center justify-center">
          <h1 className="mb-2 text-7xl font-bold text-zinc-700">404</h1>
          <p className="text-center text-sm text-zinc-400">
            The page you are looking for does not exist.
          </p>
        </div>
      )}
      {pageQuery.isLoading && (
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      )}
    </>
  );
};

export default Content;
