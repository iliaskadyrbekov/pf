import React from 'react';

interface IInputSelectLeftLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'absolute inset-y-0 left-0 flex items-center',
};

const InputSelectLeftLayout = ({ children }: IInputSelectLeftLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default InputSelectLeftLayout;
