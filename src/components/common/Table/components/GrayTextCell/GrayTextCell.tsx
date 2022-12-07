import { CellLayout } from '@components/common/Table/components';
import React from 'react';

interface IGrayTextCellProps {
  item?: string;
  index: number;
  emptyValue?: string;
}

const classes = {
  wrapper: 'px-6 py-4',
  text: 'text-sm leading-tight text-gray-500',
};

const GrayTextCell = ({ item, index, emptyValue }: IGrayTextCellProps) => {
  return item ? (
    <td className={classes.wrapper} key={index}>
      <p className={classes.text}>{item}</p>
    </td>
  ) : (
    <CellLayout key={index}>{emptyValue}</CellLayout>
  );
};

export default GrayTextCell;
