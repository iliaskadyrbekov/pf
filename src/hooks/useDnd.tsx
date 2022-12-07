import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface IDragObject {
  index: number;
}

interface IWithDndProps {
  type: string;
  index: number;
  moveFn: (dragIndex: number, hoverIndex: number) => void;
}

export function useDnd<DropRef extends Element, DragRef extends Element>({ type, index, moveFn }: IWithDndProps) {
  const dropRef = React.useRef<DropRef>(null);
  const dragRef = React.useRef<DragRef>(null);

  const [{ isOver }, drop] = useDrop<IDragObject, void, { isOver: boolean }>({
    accept: type,
    drop(item /*, monitor: DropTargetMonitor */) {
      if (!dragRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // // Determine rectangle on screen
      // const hoverBoundingRect = dragRef.current.getBoundingClientRect();

      // // Get vertical middle
      // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // // Determine mouse position
      // const clientOffset = monitor.getClientOffset();

      // // Get pixels to the top
      // const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      // // Only perform the move when the mouse has crossed half of the items height
      // // When dragging downwards, only move when the cursor is below 50%
      // // When dragging upwards, only move when the cursor is above 50%

      // // Dragging downwards
      // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      //   return;
      // }

      // // Dragging upwards
      // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      //   return;
      // }

      // Time to actually perform the action
      moveFn(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const [{ isDragging, item }, drag, preview] = useDrag({
    type,
    item: () => ({ index }),
    collect: (monitor) => ({
      item: monitor.getItem(),
      isDragging: monitor.isDragging(),
    }),
  });

  drop(dropRef);
  drag(dragRef);

  return {
    preview,
    itemIndex: item?.index as number | undefined,
    index,
    dragRef,
    dropRef,
    isDragging,
    isOver,
  };
}
