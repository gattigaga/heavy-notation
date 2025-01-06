"use client";

import { GripVertical, Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGrip?: () => void;
};

const BlockControls = ({ onClickPlus, onAltClickPlus, onClickGrip }: Props) => {
  return (
    <div className="opacity-0 flex items-center absolute -translate-x-full top-0 pr-1 -mt-1 group-hover:opacity-100">
      <Tooltip>
        <TooltipTrigger
          className="p-1 rounded hover:bg-zinc-100"
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
          className="p-1 rounded hover:bg-zinc-100"
          type="button"
          onClick={onClickGrip}
        >
          <GripVertical className="text-zinc-400" />
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
