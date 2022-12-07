import { classNames } from '@utils/classNames';
import React from 'react';

interface IDescriptionListItemsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const classes = {
  wrapper: 'border-t border-gray-200 px-4 py-5 sm:px-6',
  listWrapper: 'grid gap-x-4 gap-y-8',
};

const DescriptionListItemsLayout = ({ children, className }: IDescriptionListItemsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classNames(classes.listWrapper, className)}>{children}</div>
    </div>
  );
};

export default DescriptionListItemsLayout;
