import React from 'react';

interface IWidgetsLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'flex space-x-4',
};

const WidgetsLayout = ({ children }: IWidgetsLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default WidgetsLayout;
