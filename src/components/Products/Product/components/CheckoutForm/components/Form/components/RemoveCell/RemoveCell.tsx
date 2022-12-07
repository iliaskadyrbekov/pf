import React from 'react';
import { TrashIcon } from '@heroicons/react/outline';

import { CellLayout } from '@components/Products/Product/components';

interface IRemoveCellProps {
  index: number;
  onRemove: (index: number) => void;
}

const RemoveCell = ({ index, onRemove }: IRemoveCellProps) => {
  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <CellLayout className="pt-3.5">
      <TrashIcon onClick={handleRemove} className="h-5 w-5 cursor-pointer" />
    </CellLayout>
  );
};

export default RemoveCell;
