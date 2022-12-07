import { BadgesLayout } from '@components/common/Table/components';
import React from 'react';
import { badgeColorByOrderStatus, EOrderStatus, labelByOrderStatus } from 'src/shared/enums/OrderStatus';

interface IOrderStatusCellProps {
  item: {
    status: EOrderStatus;
  };
  index: number;
}

const OrderStatusCell = ({ item, index }: IOrderStatusCellProps) => {
  return (
    <BadgesLayout
      variant="contained"
      className="capitalize whitespace-nowrap"
      key={index}
      color={badgeColorByOrderStatus[item.status]}
    >
      {labelByOrderStatus[item.status]}
    </BadgesLayout>
  );
};

export default OrderStatusCell;
