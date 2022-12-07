import React from 'react';

interface IHistoryLayoutProps {
  title: React.ReactNode;
  table: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-2',
  title: 'text-xl font-bold leading-normal text-gray-800',
};

const HistoryLayout = ({ title, table }: IHistoryLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      {table}
    </div>
  );
};

export default HistoryLayout;
