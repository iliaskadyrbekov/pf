import React from 'react';
import { CheckIcon } from '@heroicons/react/solid';

import { classNames } from '@utils/classNames';

interface ISimpleOptionProps {
  label: string;
  selected: boolean;
  disabled?: boolean;
}

const SimpleOption = ({ label, selected }: ISimpleOptionProps) => {
  return (
    <>
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
    </>
  );
};

export default SimpleOption;
