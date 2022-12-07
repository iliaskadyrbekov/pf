import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';

import CellLayout from '../../layouts/CellLayout';

interface IRemoveCellProps {
  index: number;
  onRemove: (index: number) => void;
}

const RemoveCell = ({ index, onRemove }: IRemoveCellProps) => {
  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <CellLayout className="w-64" align="right">
      <TrashIcon onClick={handleRemove} className="h-5 w-5 cursor-pointer" />
    </CellLayout>
  );
};

export default RemoveCell;
