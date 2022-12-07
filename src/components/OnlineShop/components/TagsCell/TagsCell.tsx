import React from 'react';

interface ITagsCellProps {
  item: React.ReactNode[];
  index: number;
}

const classes = {
  td: 'px-6 py-4',
};

const TagsCell = ({ item: items, index }: ITagsCellProps) => {
  return (
    <td className={classes.td} key={index}>
      {items.length ? items : '-'}
    </td>
  );
};

export default TagsCell;
