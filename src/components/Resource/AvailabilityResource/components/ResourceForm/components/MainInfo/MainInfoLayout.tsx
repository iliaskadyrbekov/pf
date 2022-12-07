import React from 'react';

interface IMainInfoLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4',
};

const MainInfoLayout = ({ children }: IMainInfoLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default MainInfoLayout;
