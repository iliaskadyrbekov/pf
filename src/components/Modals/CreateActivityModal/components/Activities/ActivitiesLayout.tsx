import React from 'react';

interface IActivitiesLayoutProps {
  title: React.ReactNode;
  activities: React.ReactNode;
}

const classes = {
  wrapper: 'px-8 py-3 flex flex-col space-y-4',
  activitiesWrapper: 'space-y-2',
  title: 'text-lg font-medium leading-normal text-gray-900',
};

const ActivitiesLayout = ({ activities, title }: IActivitiesLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.activitiesWrapper}>{activities}</div>
    </div>
  );
};

export default ActivitiesLayout;
