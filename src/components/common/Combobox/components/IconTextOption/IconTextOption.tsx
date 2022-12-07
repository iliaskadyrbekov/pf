import React from 'react';

import { classNames } from '@utils/classNames';

interface IIconTextOptionProps {
  icon?: React.ReactNode;
  label?: string;
  selected?: boolean;
  active?: boolean;
}

const classes = {
  wrapper: 'flex items-center space-x-4',
};

const IconTextOption = ({ icon, label, selected = false, active = false }: IIconTextOptionProps) => {
  return (
    <div className={classes.wrapper}>
      {icon}
      {label && (
        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>{label}</span>
      )}

      {selected ? (
        <span
          className={classNames(
            active ? 'text-white' : 'text-indigo-600',
            'absolute inset-y-0 right-0 flex items-center pr-4',
          )}
        />
      ) : null}
    </div>
  );
};

export default IconTextOption;
