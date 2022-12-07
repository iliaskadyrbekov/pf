import React from 'react';
interface IBuyerCellProps {
  item: {
    buyerName?: string;
    pricingName: string;
  };
  index: number;
}

const classes = {
  td: 'px-6 py-4',
  wrapper: 'flex flex-col',
  fullName: 'text-sm font-medium leading-tight text-indigo-600',
  ticketName: 'text-sm leading-tight text-gray-500',
};

const BuyerCell = ({ item, index }: IBuyerCellProps) => {
  return (
    <td key={index} className={classes.td}>
      <div className={classes.wrapper}>
        <p className={classes.fullName}>{item.buyerName || 'Site visitor'}</p>
        <p className={classes.ticketName}>{item.pricingName}</p>
      </div>
    </td>
  );
};

export default BuyerCell;
