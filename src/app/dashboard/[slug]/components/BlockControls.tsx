"use client";

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

type Props = {
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGrip?: () => void;
  onClickAction?: (type: ActionType) => void;
};

const BlockControls = ({
  onClickPlus,
  onAltClickPlus,
  onClickGrip,
  onClickAction,
}: Props) => {
  return (
    <div className="opacity-0 group-hover:opacity-100">
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
      <Tooltip>
        {/* TODO: Need to trigger drag mode if this grip dragged by user. */}
        <TooltipTrigger
          className="rounded p-1 hover:bg-zinc-100"
          type="button"
          onClick={onClickGrip}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <GripVertical className="text-zinc-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" side="left">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => onClickAction?.("delete")}>
                  <Trash />
                  <span>Delete</span>
                  <DropdownMenuShortcut>Del</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onClickAction?.("duplicate")}>
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
