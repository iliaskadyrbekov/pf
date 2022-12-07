import React from 'react';
import { OrderCreatedFrom } from 'src/shared/enums/OrderCreatedFrom';
import { IOrder } from 'src/shared/interfaces/Order';

interface IBuyerCellProps {
  item: IOrder;
  index: number;
}

const classes = {
  td: 'px-6 py-4',
  wrapper: 'flex flex-col',
  fullName: 'text-sm font-medium leading-tight text-indigo-600',
  products: 'text-sm leading-tight text-gray-500',
};

const buyerNameByCreatedFrom = {
  [OrderCreatedFrom.ADMIN]: 'Created from admin',
  [OrderCreatedFrom.SHOP]: 'Site visitor',
};

const BuyerCell = ({ item, index }: IBuyerCellProps) => {
  const buyerName = item?.buyer?.fullName || buyerNameByCreatedFrom[item.createdFrom];

  return (
    <td key={index} className={classes.td}>
      <div className={classes.wrapper}>
        <p className={classes.fullName}>{buyerName}</p>
        <p className={classes.products}>{item.orderItems.length} products</p>
      </div>
    </td>
  );
};

export default BuyerCell;
