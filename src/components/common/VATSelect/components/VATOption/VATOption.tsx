import React from 'react';
import { CheckIcon, CogIcon } from '@heroicons/react/solid';

import { classNames } from '@utils/classNames';

interface IVATOptionProps<T> {
  value: T;
  label: string;
  selected: boolean;
  active: boolean;
  disabled: boolean;
  onEdit: React.MouseEventHandler<SVGSVGElement>;
}

const classes = {
  wrapper: 'flex justify-between w-full',
};

const VATOption = <T,>({ label, selected, active, onEdit }: IVATOptionProps<T>) => {
  return (
    <div className={classes.wrapper}>
      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{label}</span>
      <CogIcon onClick={onEdit} className={`h-5 w-5 cursor-pointer mr-2 ${active ? 'text-white' : 'text-gray-500'}`} />
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

export default VATOption;
