import React from 'react';

interface IPhoneCellProps {
  item: string;
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4',
  phone: 'text-sm font-medium leading-tight text-gray-500',
};

const PhoneCell = ({ item, index }: IPhoneCellProps) => {
  return (
    <td className={classes.wrapper} key={index}>
      <p className={classes.phone}>{item}</p>
    </td>
  );
};

export default PhoneCell;
