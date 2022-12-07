import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

import { classNames } from '@utils/classNames';

interface IIconTextOptionProps {
  Icon?: React.FC<{ className: string }>;
  disabled?: boolean;
  label: string;
  selected: boolean;
}

const classes = {
  wrapper: 'flex align-center space-x-4',
};

const IconTextOption = ({ Icon, label, selected }: IIconTextOptionProps) => {
  return (
    <div className={classes.wrapper}>
      {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{label}</span>

      {selected ? (
        <span
          className={classNames(
            'absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-hover:text-white',
          )}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );
};

export default IconTextOption;
