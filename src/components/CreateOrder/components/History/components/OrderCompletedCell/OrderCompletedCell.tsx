import React from 'react';

import { CellLayout } from '@components/common/Table/components';
import OrderCompletedLayout from './OrderCompletedCellLayout';

interface IOrderCompletedCellProps {
  action: string;
  status: string;
}

const OrderCompletedCell = ({ action, status }: IOrderCompletedCellProps) => {
  return (
    <CellLayout>
      <OrderCompletedLayout action={action} status={status} />
    </CellLayout>
  );
};

export default OrderCompletedCell;
