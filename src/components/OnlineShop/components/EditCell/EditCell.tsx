import React from 'react';
import Link from 'next/link';

interface IEditCellProps {
  item: string;
  index: number;
}

const classes = {
  cell: 'px-6 py-4 whitespace-nowrap text-left text-sm font-medium',
  link: 'text-indigo-600 hover:text-indigo-900',
};

const EditCell = ({ item, index }: IEditCellProps) => {
  return (
    <td key={index} className={classes.cell}>
      <Link href={item}>
        <a className={classes.link}>Edit</a>
      </Link>
    </td>
  );
};

export default EditCell;
