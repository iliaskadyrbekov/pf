import React from 'react';

interface IHeadCellProps {
  item: {
    label?: string;
  };
  index: number;
}

const HeadCell = ({ item, index }: IHeadCellProps) => (
  <td key={index} className="text-sm font-medium leading-tight text-gray-700 pb-2">
    {item.label}
  </td>
);

export default HeadCell;
