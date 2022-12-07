import React from 'react';

interface IVisibilityWidgetLayoutProps {
  title: React.ReactNode;
  value: React.ReactNode;
  color: string;
}

const classes = {
  wrapper: '',
  title: 'text-base leading-normal text-gray-900',
  value: (color: string) => `text-2xl font-semibold leading-loose ${color}`,
};

const VisibilityWidgetLayout = ({ title, value, color }: IVisibilityWidgetLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{title}</div>
      <div className={classes.value(color)}>{value}</div>
    </div>
  );
};

export default VisibilityWidgetLayout;
