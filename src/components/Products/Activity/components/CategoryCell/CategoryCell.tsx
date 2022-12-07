import React from 'react';

import { BadgesLayout, CellLayout } from '@components/common/Table/components';

interface ICategoryCellProps {
  item: string;
  index: number;
  emptyValue?: unknown;
}

const CategoryCell = ({ item, index, emptyValue }: ICategoryCellProps) => {
  return item && item !== emptyValue ? (
    <BadgesLayout variant="contained" key={index} color="blue">
      {item}
    </BadgesLayout>
  ) : (
    <CellLayout key={index}>-</CellLayout>
  );
};

export default CategoryCell;
