import React from 'react';

interface IGiftCardInfoCellProps {
  item: {
    name: string;
    caption: string;
  };
  index: number;
}

const classes = {
  wrapper: 'px-6 py-4 flex flex-col',
  name: 'text-sm font-medium leading-tight text-gray-900',
  caption: 'text-sm leading-tight text-gray-500',
};

const GiftCardInfoCell = ({ item, index }: IGiftCardInfoCellProps) => {
  return (
    <td className={classes.wrapper} key={index}>
      <p className={classes.name}>{item.name}</p>
      <p className={classes.caption}>{item.caption}</p>
    </td>
  );
};

export default GiftCardInfoCell;
