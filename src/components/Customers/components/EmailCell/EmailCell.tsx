import React from 'react';

interface IEmailCellProps {
  index: number;
  item: string;
}

const classes = {
  td: 'px-6 py-4',
  email: 'text-sm font-medium leading-tight underline text-gray-500',
};

const EmailCell = ({ index, item }: IEmailCellProps) => {
  return (
    <td key={index} className={classes.td}>
      <p className={classes.email}>{item}</p>
    </td>
  );
};

export default EmailCell;
