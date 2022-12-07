import { classNames } from '@utils/classNames';
import React from 'react';

interface IDefaultMenuItemProps<T> {
  isActive?: boolean;
  isDisabled?: boolean;
  value: T;
  children: React.ReactNode;
  onClick?: (value: T) => void;
}

const classes = {
  active: 'bg-gray-100 text-gray-900',
  disabled: 'bg-gray-200 cursor-default pointer-events-none',
  notActive: 'text-gray-700',
  item: 'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900',
};

const DefaultMenuItem = <T,>({ isActive, onClick, value, children, isDisabled }: IDefaultMenuItemProps<T>) => {
  const handleClick = React.useCallback(() => onClick && onClick(value), [value]);

  return (
    <button
      onClick={handleClick}
      className={classNames(
        isActive ? classes.active : isDisabled ? classes.disabled : classes.notActive,
        classes.item,
      )}
    >
      {children}
    </button>
  );
};

export default DefaultMenuItem;
