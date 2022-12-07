import React from 'react';

interface IIncomeCellProps {
  item: {
    currency: string;
    incomeAfterVAT: number;
  };
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4',
  income: 'text-sm font-bold leading-tight text-center text-gray-500',
};

const IncomeCell = ({ item, index }: IIncomeCellProps) => {
  return (
    <td className={classes.wrapper} key={index}>
      <p className={classes.income}>{`${item.currency} ${item.incomeAfterVAT.toFixed(2)}`}</p>
    </td>
  );
};

export default IncomeCell;
