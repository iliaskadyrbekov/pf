import React from 'react';

interface ISimpleTableLayoutProps {
  headRow: React.ReactNode;
  rows: React.ReactNode[];
  rowDivider?: boolean;
}

const classes = {
  table: 'w-full',
};

const SimpleTableLayout = ({ headRow, rows }: ISimpleTableLayoutProps) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>{headRow}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default SimpleTableLayout;
