import React from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { CellLayout } from '../Cell';

interface IDNDCellProps {
  props?: {
    isDragging: boolean;
    dragRef: React.Ref<HTMLTableCellElement>;
  };
}

const DNDCell = ({ props }: IDNDCellProps) => {
  const { isDragging, dragRef } = props || {};
  return (
    <CellLayout ref={dragRef} className={`${isDragging ? 'cursor-grabbing opacity-50' : 'cursor-grab'}`}>
      <DotsVerticalIcon className="h-5 w-5" />
    </CellLayout>
  );
};

export default DNDCell;
