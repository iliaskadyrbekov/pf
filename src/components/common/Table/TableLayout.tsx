import React from 'react';

interface ITalbeLayoutProps {
  headRow: React.ReactNode;
  rows: React.ReactNode[];
  footer?: React.ReactNode;
}

const classes = {
  tableWrapper: 'flex flex-col',
  tableMargin: '-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8',
  tablePadding: 'py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8',
  tableBox: 'shadow overflow-hidden border-b border-gray-200 sm:rounded-lg',
  table: 'min-w-full divide-y divide-gray-200',
  tableHead: 'bg-gray-50',
  tableBody: 'bg-white divide-y divide-gray-200',
  nav: 'bg-white px-4 py-3 flex items-center border-t border-gray-200 sm:px-6',
};

const TalbeLayout = ({ headRow, rows, footer }: ITalbeLayoutProps) => {
  return (
    <div className={classes.tableWrapper}>
      <div className={classes.tableMargin}>
        <div className={classes.tablePadding}>
          <div className={classes.tableBox}>
            <table className={classes.table}>
              <thead className={classes.tableHead}>
                <tr>{headRow}</tr>
              </thead>
              <tbody className={classes.tableBody}>{rows}</tbody>
            </table>
            {footer && <nav className={classes.nav}>{footer}</nav>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalbeLayout;
