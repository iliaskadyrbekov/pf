import React from 'react';
import { getS3FileUrl } from '@utils/getS3FileUrl';

interface INameCellProps {
  item: {
    name: string;
    image: string;
  };
  index: number;
}

const classes = {
  td: 'px-6 py-4',
  wrapper: 'flex items-center',
  image: 'h-10 w-10 rounded-full object-cover mr-4',
  name: 'text-sm font-medium leading-tight text-gray-900',
};

const NameCell = ({ item, index }: INameCellProps) => {
  return (
    <td className={classes.td} key={index}>
      <div className={classes.wrapper}>
        {item.image && <img className={classes.image} src={getS3FileUrl(item.image)} alt={item.name} />}
        <span className={classes.name}>{item.name}</span>
      </div>
    </td>
  );
};

export default NameCell;
