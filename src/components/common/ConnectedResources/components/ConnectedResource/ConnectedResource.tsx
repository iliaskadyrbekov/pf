import React from 'react';
import { useDnd } from '@hooks/useDnd';
import { TrashIcon } from '@heroicons/react/outline';
import { DotsVerticalIcon } from '@heroicons/react/solid';

import ConnectedResourceLayout from './ConnectedResourceLayout';

interface IConnectedResourceProps {
  name: string;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onRemove: (index: number) => void;
}

const ConnectedResource = ({ name, index, moveRow, onRemove }: IConnectedResourceProps) => {
  const { preview, dropRef, dragRef, isDragging, isOver } = useDnd<HTMLDivElement, HTMLDivElement>({
    type: 'row',
    index,
    moveFn: moveRow,
  });

  const handleRemove = () => {
    onRemove(index);
  };

  const previewRef = preview(dropRef);

  return (
    <ConnectedResourceLayout
      previewRef={previewRef}
      dragRef={dragRef}
      dragIcon={<DotsVerticalIcon className={`${isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'} h-5 w-5`} />}
      name={name}
      showDivider={isOver}
      trashIcon={<TrashIcon onClick={handleRemove} className="h-5 w-5 cursor-pointer" />}
    />
  );
};

export default ConnectedResource;
