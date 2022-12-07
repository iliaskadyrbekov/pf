import React from 'react';

interface IOptionsHeadCellProps {
  item: {
    label?: string;
  };
  index: number;
}

const OptionsHeadCell = ({ item, index }: IOptionsHeadCellProps) => {
  return (
    <td key={index} className="w-1/3 text-sm font-medium leading-tight text-gray-700 pb-2">
      {item.label}
    </td>
  );
};
export default OptionsHeadCell;
