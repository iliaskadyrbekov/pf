import React from 'react';

interface IFiltersLayoutProps {
  dateRange: React.ReactNode;
  activity: React.ReactNode;
}

const classes = {
  wrapper: 'flex space-x-5 items-center',
  dateRangeWrapper: 'max-w-94',
};

const FiltersLayout = ({ dateRange, activity }: IFiltersLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.dateRangeWrapper}>{dateRange}</div>
      <div>{activity}</div>
    </div>
  );
};

export default FiltersLayout;
