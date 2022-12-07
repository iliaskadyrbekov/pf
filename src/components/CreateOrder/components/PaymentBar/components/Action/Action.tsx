import { classNames } from '@utils/classNames';
import React from 'react';

interface IActionProps {
  isActive?: boolean;
  isDisabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const classes = {
  active: 'bg-gray-100 text-gray-900',
  disabled: 'bg-gray-200 cursor-default pointer-events-none',
  notActive: 'text-gray-700',
  item: 'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900',
};

const Action = ({ isActive, onClick, children, isDisabled }: IActionProps) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        isActive ? classes.active : isDisabled ? classes.disabled : classes.notActive,
        classes.item,
      )}
    >
      {children}
    </button>
  );
};

export default Action;
