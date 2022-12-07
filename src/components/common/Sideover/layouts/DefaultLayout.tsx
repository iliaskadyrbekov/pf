import React from 'react';

interface IDefaultLayoutProps {
  children: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wapper: 'h-full flex flex-col justify-between bg-gray-50',
  contentWrapper: 'px-4 py-2',
  actionsWrapper: 'bg-white px-4 py-4',
};

const DefaultLayout = ({ children, actions }: IDefaultLayoutProps) => {
  return (
    <div className={classes.wapper}>
      <div className={classes.contentWrapper}>{children}</div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default DefaultLayout;
