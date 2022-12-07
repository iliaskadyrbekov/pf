import React from 'react';

interface IMultipleMediaLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-wrap gap-4',
};

const MultipleMediaLayout = ({ children }: IMultipleMediaLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default MultipleMediaLayout;
