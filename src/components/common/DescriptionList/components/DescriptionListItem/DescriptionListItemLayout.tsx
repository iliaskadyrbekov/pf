import { classNames } from '@utils/classNames';
import React from 'react';

interface IDescriptionListItemLayoutProps {
  label: React.ReactNode;
  item: React.ReactNode;
  className: string;
}

const classes = {
  wrapper: '',
  label: 'text-sm font-medium text-gray-500',
  itemWrapper: 'mt-1 text-sm text-gray-900',
};

const DescriptionListItemLayout = ({ label, item, className }: IDescriptionListItemLayoutProps) => {
  return (
    <div className={classNames(classes.wrapper, className)}>
      <dt className={classes.label}>{label}</dt>
      <dd className={classes.itemWrapper}>{item}</dd>
    </div>
  );
};

export default DescriptionListItemLayout;
