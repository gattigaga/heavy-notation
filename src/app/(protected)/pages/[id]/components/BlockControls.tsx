"use client";

import { useState } from "react";
import {
  CaseSensitive,
  Check,
  Copy,
  GripVertical,
  Heading1,
  Heading2,
  Heading3,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  DraggableAttributes,
  UniqueIdentifier,
  useDndMonitor,
} from "@dnd-kit/core";
import { BlockType } from "@prisma/client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { GripAction } from "../types";

type BlockItem = {
  type: BlockType;
  title: string;
  description: string;
  icon: React.ElementType;
};

type Props = {
  id: string;
  type: BlockType;
  sortable: {
    isDragging: boolean;
    listeners?: SyntheticListenerMap;
    attributes: DraggableAttributes;
  };
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (action: GripAction) => void;
};

const BlockControls = ({
  id,
  type,
  sortable,
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
}: Props) => {
  const [draggedId, setDraggedId] = useState<UniqueIdentifier | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const blocks: BlockItem[] = [
    {
      type: "TEXT",
      title: "Text",
      description: "Just start writing with plain text.",
      icon: CaseSensitive,
    },
    {
      type: "HEADING1",
      title: "Heading 1",
      description: "Big section heading.",
      icon: Heading1,
    },
    {
      type: "HEADING2",
      title: "Heading 2",
      description: "Medium section heading.",
      icon: Heading2,
    },
    {
      type: "HEADING3",
      title: "Heading 3",
      description: "Small section heading.",
      icon: Heading3,
    },
  ];

  // Prevent tooltip and dropdown to open when dragging.
  useDndMonitor({
    onDragStart(event) {
      setDraggedId(event.active.id);
      setIsTooltipOpen(false);
      setIsDropdownOpen(false);
    },
    onDragMove() {
      setIsTooltipOpen(false);
      setIsDropdownOpen(false);
    },
    onDragOver() {
      setIsTooltipOpen(false);
      setIsDropdownOpen(false);
    },
    onDragEnd() {
      setDraggedId(null);
      setIsTooltipOpen(false);
      setIsDropdownOpen(false);
    },
    onDragCancel() {
      setDraggedId(null);
      setIsTooltipOpen(false);
      setIsDropdownOpen(false);
    },
  });

  return (
    <div
      className={cn(
        isDropdownOpen && "opacity-100",
        !isDropdownOpen && "opacity-0 group-hover:opacity-100",
        draggedId && draggedId === id && "opacity-100",
        draggedId && draggedId !== id && "group-hover:opacity-0",
      )}
    >
      {/* Plus button */}
      {!sortable.isDragging && (
        <Tooltip>
          <TooltipTrigger
            className="rounded p-1 hover:bg-zinc-100"
            type="button"
            onClick={(event) => {
              if (event.altKey) {
                onAltClickPlus?.();
                return;
              }

              onClickPlus?.();
            }}
          >
            <Plus className="text-zinc-400" />
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-center text-sm">
              <strong>Click</strong> to add below
            </p>
            <p className="text-center text-sm">
              <strong>Alt-click</strong> to add above
            </p>
          </TooltipContent>
        </Tooltip>
      )}

      {/* Grip button */}
      <Tooltip
        disableHoverableContent={true}
        open={isTooltipOpen}
        onOpenChange={(isOpen) => {
          setIsTooltipOpen(isDropdownOpen ? false : isOpen);
        }}
      >
        <TooltipTrigger className="rounded p-1 hover:bg-zinc-100">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <div className="relative">
              <div
                className="absolute left-0 top-0 z-10"
                onClick={() => setIsDropdownOpen(true)}
                {...sortable.listeners}
                {...sortable.attributes}
              >
                <GripVertical className="text-zinc-400" />
              </div>
              <DropdownMenuTrigger className="opacity-0" asChild={true}>
                <GripVertical className="text-zinc-400" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="w-64" side="left">
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    onClickGripAction?.({
                      type: "delete",
                      data: null,
                    });
                  }}
                >
                  <Trash2 />
                  <span>Delete</span>
                  <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    onClickGripAction?.({
                      type: "duplicate",
                      data: null,
                    });
                  }}
                >
                  <Copy />
                  <span>Duplicate</span>
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <RefreshCw />
                    <span>Turn into</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {blocks.map((block) => {
                        const Icon = block.icon;

                        return (
                          <DropdownMenuItem
                            key={block.type}
                            className="flex items-center gap-x-4 rounded p-2 hover:bg-zinc-100"
                            onClick={() => {
                              onClickGripAction?.({
                                type: "turn_into",
                                data: {
                                  type: block.type,
                                },
                              });
                            }}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded border bg-white">
                              <Icon className="text-zinc-700" size={24} />
                            </div>
                            <div className="flex-1">
                              <p className="text-left text-base">
                                {block.title}
                              </p>
                              <p className="text-left text-sm text-zinc-400">
                                {block.description}
                              </p>
                            </div>
                            {block.type === type && (
                              <Check
                                className="ml-auto text-zinc-700"
                                size={20}
                              />
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-center text-sm">
            <strong>Drag</strong> to move
          </p>
          <p className="text-center text-sm">
            <strong>Click</strong> to open menu
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BlockControls;
