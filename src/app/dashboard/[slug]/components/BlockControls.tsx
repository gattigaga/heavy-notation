"use client";

import { useState } from "react";
import { Copy, GripVertical, Plus, Trash } from "lucide-react";

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
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (type: ActionType) => void;
};

const BlockControls = ({
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
}: Props) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={cn(
        isDropdownOpen && "opacity-100",
        !isDropdownOpen && "opacity-0 group-hover:opacity-100",
      )}
    >
      {/* Plus button */}
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

      {/* Grip button */}
      <Tooltip
        open={isTooltipOpen}
        onOpenChange={(isOpen) => {
          setIsTooltipOpen(isDropdownOpen ? false : isOpen);
        }}
      >
        {/* TODO: Need to trigger drag mode if this grip dragged by user. */}
        <TooltipTrigger className="rounded p-1 hover:bg-zinc-100">
          <DropdownMenu
            open={isDropdownOpen}
            onOpenChange={(isOpen) => {
              setIsDropdownOpen(isOpen);
              setIsTooltipOpen(false);
            }}
          >
            <DropdownMenuTrigger asChild={true}>
              <GripVertical className="text-zinc-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" side="left">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onClickGripAction?.("delete")}>
                  <Trash />
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
