"use client";

import { useState } from "react";
import { Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import {
  DraggableAttributes,
  UniqueIdentifier,
  useDndMonitor,
} from "@dnd-kit/core";

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
} from "@/components/ui/dropdown-menu";
import { ActionType } from "../types";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  sortable: {
    isDragging: boolean;
    listeners?: SyntheticListenerMap;
    attributes: DraggableAttributes;
  };
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (type: ActionType) => void;
};

const BlockControls = ({
  id,
  sortable,
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
}: Props) => {
  const [draggedId, setDraggedId] = useState<UniqueIdentifier | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
            <p className="text-center text-sm font-medium">
              <strong>Click</strong> to add below
            </p>
            <p className="text-center text-sm font-medium">
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
                <DropdownMenuItem onClick={() => onClickGripAction?.("delete")}>
                  <Trash2 />
                  <span>Delete</span>
                  <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onClickGripAction?.("duplicate")}
                >
                  <Copy />
                  <span>Duplicate</span>
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-center text-sm font-medium">
            <strong>Drag</strong> to move
          </p>
          <p className="text-center text-sm font-medium">
            <strong>Click</strong> to open menu
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BlockControls;
