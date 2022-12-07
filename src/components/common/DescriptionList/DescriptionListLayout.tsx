import { classNames } from '@utils/classNames';
import React from 'react';

interface IDescriptionListLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const classes = {
  wrapper: 'sm:rounded-lg',
};

const DescriptionListLayout = ({ children, className }: IDescriptionListLayoutProps) => {
  return <div className={classNames(classes.wrapper, className)}>{children}</div>;
};

export default DescriptionListLayout;
