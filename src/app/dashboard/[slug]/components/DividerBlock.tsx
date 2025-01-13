"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import BlockControls from "./BlockControls";
import { GripAction } from "../types";

type Props = {
  id: string;
  onClickPlus?: () => void;
  onAltClickPlus?: () => void;
  onClickGripAction?: (action: GripAction) => void;
};

const DividerBlock = ({
  id,
  onClickPlus,
  onAltClickPlus,
  onClickGripAction,
}: Props) => {
  const sortable = useSortable({ id });

  const style = sortable.transform
    ? {
        transform: CSS.Translate.toString(sortable.transform),
        transition: sortable.transition,
        opacity: sortable.isDragging ? 0.25 : 1,
        zIndex: 2,
      }
    : undefined;

  return (
    <div ref={sortable.setNodeRef} className="group relative" style={style}>
      <div className="absolute -top-0.5 flex -translate-x-full items-center pr-1">
        <BlockControls
          id={id}
          type="text"
          sortable={sortable}
          onClickPlus={onClickPlus}
          onAltClickPlus={onAltClickPlus}
          onClickGripAction={onClickGripAction}
        />
      </div>

      <div className="flex h-7 flex-col justify-center">
        <hr />
      </div>
    </div>
  );
};

export default DividerBlock;
