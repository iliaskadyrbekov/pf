import React from 'react';

interface IDateCellProps {
  item: string;
  index: number;
}

const classes = {
  td: 'px-6 py-4',
  name: 'text-sm leading-tight text-gray-500',
};

const DateCell = ({ item, index }: IDateCellProps) => {
  return (
    <td className={classes.td} key={index}>
      <span className={classes.name}>{item}</span>
    </td>
  );
};

export default DateCell;
