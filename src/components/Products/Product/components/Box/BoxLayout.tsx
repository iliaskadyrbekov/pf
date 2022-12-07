import React from 'react';

interface IBoxLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'bg-gray-100 rounded-lg p-4',
};

const BoxLayout = ({ children }: IBoxLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default BoxLayout;
