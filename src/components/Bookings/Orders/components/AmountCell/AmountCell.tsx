import React from 'react';

import { ShopContext } from 'src/context/ShopContext';
import { IOrder } from 'src/shared/interfaces/Order';
import { getOrderAmount, getOrderCurrency } from 'src/helpers';

interface IAmountCellProps {
  item: IOrder;
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4',
  amount: 'text-sm font-bold leading-tight text-gray-500',
};

const AmountCell = ({ item, index }: IAmountCellProps) => {
  const { shop } = React.useContext(ShopContext);

  const amount = `${getOrderCurrency(item, shop?.currency.symbolNative)}${getOrderAmount(item)}`;

  return (
    <td className={classes.wrapper} key={index}>
      <p className={classes.amount}>{amount}</p>
    </td>
  );
};

export default AmountCell;
