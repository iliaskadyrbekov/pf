import { useDnd } from '@hooks/useDnd';
import React from 'react';

import MultipleMediaItemLayout from './MultipleMediaItemLayout';

interface IMultipleMediaItemProps {
  index: number;
  isDND: boolean;
  uploadForm: React.ReactNode;
  removeIcon: React.ReactNode;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

const MultipleMediaItem = ({ moveColumn, index, uploadForm, removeIcon, isDND }: IMultipleMediaItemProps) => {
  const { dropRef, dragRef } = useDnd<HTMLDivElement, HTMLDivElement>({
    type: 'column',
    index,
    moveFn: moveColumn,
  });

  return isDND ? (
    <MultipleMediaItemLayout dragRef={dragRef} dropRef={dropRef} removeIcon={removeIcon} uploadForm={uploadForm} />
  ) : (
    <MultipleMediaItemLayout removeIcon={removeIcon} uploadForm={uploadForm} />
  );
};

export default MultipleMediaItem;
