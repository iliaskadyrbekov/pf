import React from 'react';

import { ChevronDownIcon } from '@heroicons/react/solid';

interface IIndigoTextLabelProps {
  children: string;
  isOpen?: boolean;
}

const classes = {
  wrapper: 'flex items-center text-sm leading-tight text-indigo-600 group hover:text-indigo-500',
  arrowIcon: (open?: boolean) =>
    `${
      open ? 'transform rotate-180' : ''
    } h-5 w-5 group-hover:text-indigo-500 transition-transform duration-300 ease-in-out`,
};

const IndigoTextLabel = ({ children, isOpen }: IIndigoTextLabelProps) => {
  return (
    <div className={classes.wrapper}>
      {children} <ChevronDownIcon className={classes.arrowIcon(isOpen)} />
    </div>
  );
};

export default IndigoTextLabel;
