import React from 'react';

interface ICardLayoutProps {
  date: React.ReactNode;
  title: React.ReactNode;
  count: React.ReactNode;
  secondDate: React.ReactNode;
  prevCount: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col items-start p-6 bg-white shadow rounded-md space-y-1',
  date: 'text-xs leading-normal text-gray-500',
  title: 'text-base leading-normal text-gray-900',
  count: 'text-2xl font-semibold leading-loose text-indigo-600',
  prevCount: 'text-sm font-medium leading-tight text-gray-500 pb-3',
  countWrapper: 'flex items-end space-x-2',
};

const CardLayout = ({ date, title, count, secondDate, prevCount }: ICardLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.date}>{date}</p>
      <p className={classes.title}>{title}</p>
      <div className={classes.countWrapper}>
        <p className={classes.count}>{count}</p>
        <p className={classes.prevCount}>{secondDate}</p>
        <p className={classes.prevCount}>{prevCount}</p>
      </div>
    </div>
  );
};

export default CardLayout;
