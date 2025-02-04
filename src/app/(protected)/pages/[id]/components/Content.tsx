"use client";

import { useMemo } from "react";
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
import { Delta } from "quill";

import { Skeleton } from "@/components/ui/skeleton";
import TitleBlock from "./TitleBlock";
import TextBlock from "./TextBlock";
import HeadingBlock from "./HeadingBlock";
import DividerBlock from "./DividerBlock";
import useBlocksQuery from "@/app/(protected)/hooks/queries/use-blocks-query";
import usePageQuery from "@/app/(protected)/hooks/queries/use-page-query";
import useUpdatePageMutation from "@/app/(protected)/hooks/mutations/use-update-page-mutation";
import useAddBlockMutation from "@/app/(protected)/hooks/mutations/use-add-block-mutation";
import useUpdateBlockMutation from "@/app/(protected)/hooks/mutations/use-update-block-mutation";
import useRemoveBlockMutation from "@/app/(protected)/hooks/mutations/use-remove-block-mutation";

type Params = {
  id: string;
};

const Content = () => {
  const params = useParams<Params>();
  const pageQuery = usePageQuery({ id: params.id });
  const blocksQuery = useBlocksQuery({ pageId: params.id });
  const updatePageMutation = useUpdatePageMutation();
  const addBlockMutation = useAddBlockMutation();
  const updateBlockMutation = useUpdateBlockMutation();
  const removeBlockMutation = useRemoveBlockMutation();

  const blocks = useMemo(() => {
    let blocks =
      blocksQuery.data
        ?.filter((block) => {
          if (
            removeBlockMutation.isPending &&
            block.id === removeBlockMutation.variables?.id
          ) {
            return false;
          }

          return true;
        })
        .map((block) => {
          if (
            updateBlockMutation.isPending &&
            block.id === updateBlockMutation.variables?.id
          ) {
            const type =
              updateBlockMutation.variables?.type !== undefined
                ? updateBlockMutation.variables.type
                : block.type;

            const content =
              updateBlockMutation.variables?.content !== undefined
                ? updateBlockMutation.variables.content
                : block.content;

            return {
              ...block,
              type,
              content,
            };
          }

          return block;
        }) || [];

    if (
      updateBlockMutation.isPending &&
      updateBlockMutation.variables?.index !== undefined
    ) {
      const oldIndex = blocks.findIndex(
        (block) => block.id === updateBlockMutation.variables.id,
      );

      blocks = arrayMove(
        blocks,
        oldIndex,
        updateBlockMutation.variables.index,
      ).map((block, index) => {
        return {
          ...block,
          index,
        };
      });
    }

    if (addBlockMutation.isPending) {
      const block = {
        id: createId(),
        index: addBlockMutation.variables.index,
        type: addBlockMutation.variables.type,
        content: addBlockMutation.variables.content,
      };

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
    }

    return blocks;
  }, [
    blocksQuery.data,
    addBlockMutation.isPending,
    addBlockMutation.variables,
    updateBlockMutation.isPending,
    updateBlockMutation.variables,
    removeBlockMutation.isPending,
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
      const block = blocks.find((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over?.id);

      if (block) {
        updateBlockMutation.mutate({
          id: block.id,
          pageId: params.id,
          index: newIndex,
        });
      }
    }
  };

  return (
    <>
      {pageQuery.isSuccess && (
        <div className="mx-auto max-w-3xl">
          {/* Title */}
          <TitleBlock
            defaultValue={title}
            onPressEnter={(title) => {
              const delta = new Delta();

              updatePageMutation.mutate({
                id: params.id,
                title,
              });

              addBlockMutation.mutate({
                pageId: params.id,
                index: 0,
                type: "TEXT",
                content: JSON.stringify(delta),
              });
            }}
            onChange={(title) => {
              if (pageQuery.data?.title === title) {
                return;
              }

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
              items={blocks}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block, index) => {
                switch (block.type) {
                  case "HEADING1":
                  case "HEADING2":
                  case "HEADING3":
                    return (
                      <HeadingBlock
                        key={block.id}
                        id={block.id}
                        type={block.type}
                        defaultValue={block.content}
                        onPressEnter={(values) => {
                          addBlockMutation.mutate(
                            {
                              pageId: params.id,
                              index: index + 1,
                              type: "TEXT",
                              content: values[1],
                            },
                            {
                              onSuccess: () => {
                                if (block.content === values[0]) {
                                  return;
                                }

                                updateBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                  content: values[0],
                                });
                              },
                            },
                          );
                        }}
                        onChange={(value) => {
                          if (block.content === value) {
                            return;
                          }

                          updateBlockMutation.mutate({
                            id: block.id,
                            pageId: params.id,
                            content: value,
                          });
                        }}
                        onClickPlus={() => {
                          const delta = new Delta();

                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index + 1,
                            type: "TEXT",
                            content: JSON.stringify(delta),
                          });
                        }}
                        onAltClickPlus={() => {
                          const delta = new Delta();

                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index,
                            type: "TEXT",
                            content: JSON.stringify(delta),
                          });
                        }}
                        onBlockSelected={(type) => {
                          if (block.type === type) {
                            return;
                          }

                          updateBlockMutation.mutate({
                            id: block.id,
                            pageId: params.id,
                            type: type,
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
                                if (block.type === action.data?.type) {
                                  return;
                                }

                                updateBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                  type: action.data?.type,
                                });
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
                          const delta = new Delta();

                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index + 1,
                            type: "TEXT",
                            content: JSON.stringify(delta),
                          });
                        }}
                        onAltClickPlus={() => {
                          const delta = new Delta();

                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index,
                            type: "TEXT",
                            content: JSON.stringify(delta),
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
                                if (block.type === action.data?.type) {
                                  return;
                                }

                                updateBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                  type: action.data?.type,
                                });
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
                        id={block.id}
                        defaultValue={block.content}
                        onPressEnter={(values) => {
                          addBlockMutation.mutate(
                            {
                              pageId: params.id,
                              index: index + 1,
                              type: "TEXT",
                              content: values[1],
                            },
                            {
                              onSuccess: () => {
                                if (block.content === values[0]) {
                                  return;
                                }

                                updateBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                  content: values[0],
                                });
                              },
                            },
                          );
                        }}
                        onChange={(value) => {
                          if (block.content === value) {
                            return;
                          }

                          updateBlockMutation.mutate({
                            id: block.id,
                            pageId: params.id,
                            content: value,
                          });
                        }}
                        onClickPlus={() => {
                          const delta = new Delta();

                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index + 1,
                            type: "TEXT",
                            content: JSON.stringify(delta),
                          });
                        }}
                        onAltClickPlus={() => {
                          const delta = new Delta();

                          addBlockMutation.mutate({
                            pageId: params.id,
                            index: index,
                            type: "TEXT",
                            content: JSON.stringify(delta),
                          });
                        }}
                        onBlockSelected={(type) => {
                          if (block.type === type) {
                            return;
                          }

                          updateBlockMutation.mutate({
                            id: block.id,
                            pageId: params.id,
                            type: type,
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
                                if (block.type === action.data?.type) {
                                  return;
                                }

                                updateBlockMutation.mutate({
                                  id: block.id,
                                  pageId: params.id,
                                  type: action.data?.type,
                                });
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
