import React from 'react';

interface IWeekDaysLayoutProps {
  days: React.ReactNode[];
  label: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col',
  label: 'text-sm font-medium text-gray-700',
  days: 'flex space-x-2 mt-1',
};

const WeekDaysLayout = ({ days, label }: IWeekDaysLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.label}>{label}</p>
      <div className={classes.days}>{days}</div>
    </div>
  );
};

export default WeekDaysLayout;
