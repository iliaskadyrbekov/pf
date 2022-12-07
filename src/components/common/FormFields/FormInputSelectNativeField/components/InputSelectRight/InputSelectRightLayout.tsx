import React from 'react';

import { classNames } from '@utils/classNames';

interface IInputSelectRightLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const classes = {
  wrapper: 'absolute inset-y-0 right-0 flex items-center',
};

const InputSelectRightLayout = ({ children, className }: IInputSelectRightLayoutProps) => {
  return <div className={classNames(classes.wrapper, className)}>{children}</div>;
};

export default InputSelectRightLayout;
