import React from 'react';

interface IDividedTableLayoutProps {
  headRow: React.ReactNode;
  rows: React.ReactNode[];
  rowDivider?: boolean;
}

const classes = {
  table: 'w-full',
  tableBody: 'divide-y',
};

const DividedTableLayout = ({ headRow, rows }: IDividedTableLayoutProps) => {
  return (
    <table className={classes.table}>
      <thead>
        <tr>{headRow}</tr>
      </thead>
      <tbody className={classes.tableBody}>{rows}</tbody>
    </table>
  );
};

export default DividedTableLayout;
