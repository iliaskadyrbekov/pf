import React from 'react';

import { CellLayout } from '@components/common/Table/components';

interface IOrderCreatedCellProps {
  action: string;
}

const OrderCreatedCell = ({ action }: IOrderCreatedCellProps) => {
  return (
    <CellLayout>
      <p className="text-sm font-medium leading-tight text-gray-800">{action}</p>
    </CellLayout>
  );
};

export default OrderCreatedCell;
