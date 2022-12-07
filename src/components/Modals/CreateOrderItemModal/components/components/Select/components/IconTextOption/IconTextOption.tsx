import React from 'react';

import { classNames } from '@utils/classNames';

interface IIconTextOptionProps {
  Icon?: React.FC<{ className: string }>;
  label: string;
  selected: boolean;
}

const classes = {
  wrapper: 'flex items-center space-x-4',
  icon: 'h-6 w-6 text-indigo-600',
};

const IconTextOption = ({ Icon, label, selected }: IIconTextOptionProps) => {
  return (
    <div className={classes.wrapper}>
      {Icon && <Icon className={classes.icon} aria-hidden="true" />}
      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate pr-4')}>{label}</span>
    </div>
  );
};

export default IconTextOption;
