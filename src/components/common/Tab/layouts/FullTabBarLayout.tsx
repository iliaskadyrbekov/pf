import { classNames } from '@utils/classNames';
import React from 'react';

export interface IFullTabBarLayoutProps {
  isActive?: boolean;
  children?: React.ReactNode;
  index: number;
  length: number;
  onClick?: () => void;
}

const classes = {
  tab: 'group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer',
  inactive: 'text-gray-500 hover:text-gray-700',
  active: 'text-indigo-500',
  firstTab: 'rounded-l-lg',
  lastTab: 'rounded-r-lg',
};

const FullTabBarLayout = ({ isActive, children, onClick, index, length }: IFullTabBarLayoutProps) => {
  return (
    <a
      onClick={onClick}
      className={classNames(
        isActive ? classes.active : classes.inactive,
        index === 0 ? classes.firstTab : '',
        index === length - 1 ? classes.lastTab : '',
        classes.tab,
      )}
    >
      {children}
      <span
        className={classNames(isActive ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5')}
      />
    </a>
  );
};

export default FullTabBarLayout;
