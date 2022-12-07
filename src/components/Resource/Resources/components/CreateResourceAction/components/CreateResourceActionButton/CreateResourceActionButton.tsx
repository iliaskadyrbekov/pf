import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { classNames } from '@utils/classNames';

interface ICreateResourceActionButtonProps {
  children: string;
  isOpen?: boolean;
}

const classes = {
  wrapper: 'px-4 py-2 border border-transparent rounded-md shadow-sm bg-indigo-600 hover:bg-indigo-700',
  childrenWrapper: 'inline-flex items-center justify-center text-sm font-medium text-white',
  arrowIcon: 'ml-2 h-5 w-5 group-hover:text-indigo-500 transition-transform duration-300 ease-in-out',
};

const CreateResourceActionButton = ({ children, isOpen }: ICreateResourceActionButtonProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.childrenWrapper}>
        {children} <ChevronDownIcon className={classNames(classes.arrowIcon, isOpen && 'transform rotate-180')} />
      </div>
    </div>
  );
};
export default CreateResourceActionButton;
