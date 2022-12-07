import React from 'react';

interface IPhoneInputSelectLayoutProps {
  children: React.ReactNode;
}

const classes = {
  wrapper: 'absolute inset-y-0 left-0 flex items-center',
};

const PhoneInputSelectLayout = ({ children }: IPhoneInputSelectLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default PhoneInputSelectLayout;
