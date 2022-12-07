import React from 'react';

import { CellLayout } from '@components/common/Table/components';

interface IPriceCellProps {
  price?: string;
}

const PriceCell = ({ price }: IPriceCellProps) => {
  return price ? (
    <CellLayout>
      <span className="text-base leading-normal text-gray-500">{price}</span>
    </CellLayout>
  ) : (
    <CellLayout>-</CellLayout>
  );
};

export default PriceCell;
