import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface IDefaultLabelProps {
  children: React.ReactNode;
}

const classes = {
  wrapper:
    'inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500',
};

const DefaultLabel = ({ children }: IDefaultLabelProps) => {
  return (
    <div className={classes.wrapper}>
      {children}
      <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
    </div>
  );
};

export default DefaultLabel;
