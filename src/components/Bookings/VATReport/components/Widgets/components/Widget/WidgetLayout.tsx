import React from 'react';

interface IWidgetLayoutProps {
  title: React.ReactNode;
  value: React.ReactNode;
}

const classes = {
  wrapper: '',
  title: 'text-base leading-normal text-gray-900',
  value: 'text-2xl font-semibold leading-loose text-indigo-600',
};

const WidgetLayout = ({ title, value }: IWidgetLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.value}>{value}</div>
    </div>
  );
};

export default WidgetLayout;
