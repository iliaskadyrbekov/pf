import React from 'react';

interface INumberCellProps {
  item: string;
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4',
  income: 'text-sm leading-tight text-left text-gray-500',
};

const NumberCell = ({ item, index }: INumberCellProps) => {
  return (
    <td className={classes.wrapper} key={index}>
      <p className={classes.income}>{item}</p>
    </td>
  );
};

export default NumberCell;
