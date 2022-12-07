import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

import { classNames } from '@utils/classNames';

interface IIconTextOptionProps {
  Icon?: React.FC<{ className: string }>;
  icon?: React.ReactNode;
  label?: string;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
}

const classes = {
  wrapper: 'flex align-center space-x-4',
};

const IconTextOption = ({ icon, Icon, label, selected, active, disabled = false }: IIconTextOptionProps) => {
  return (
    <div className={classes.wrapper}>
      {Icon ? (
        <Icon className={classNames(disabled ? 'text-gray-300' : 'black', 'h-5 w-5')} aria-hidden="true" />
      ) : (
        icon
      )}
      {label && (
        <span
          className={classNames(
            selected && disabled
              ? 'font-semibold text-gray-300'
              : selected
              ? 'font-semibold'
              : disabled
              ? 'font-normal text-gray-300'
              : 'font-normal',
            'block truncate',
          )}
        >
          {label}
        </span>
      )}

      {selected ? (
        <span
          className={classNames(
            active ? 'text-white' : 'text-indigo-600',
            'absolute inset-y-0 right-0 flex items-center pr-4',
          )}
        >
          <CheckIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );
};

export default IconTextOption;
