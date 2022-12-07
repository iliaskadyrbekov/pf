import React from 'react';
import { XIcon } from '@heroicons/react/outline';

import { CellLayout } from '..';
import { isNumber } from '@utils/isNumber';

type TRemoveByIndex = (index: number) => void;
type TRemove = () => void;

interface ICrossRemoveCellProps {
  index?: number;
  onRemove: TRemoveByIndex | TRemove;
}

const CrossRemoveCell = ({ index, onRemove }: ICrossRemoveCellProps) => {
  const handleRemove = () => {
    if (isNumber(index)) {
      return onRemove(index);
    }

    return (onRemove as TRemove)();
  };

  return (
    <CellLayout>
      <div className="flex items-center justify-center">
        <XIcon onClick={handleRemove} className="h-5 w-5 cursor-pointer" />
      </div>
    </CellLayout>
  );
};

export default CrossRemoveCell;
