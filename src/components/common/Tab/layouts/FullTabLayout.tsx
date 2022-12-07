import { classNames } from '@utils/classNames';
import React from 'react';

export interface IFullTabLayoutProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const classes = {
  tab: 'group flex-1 text-sm font-medium text-center border-b-2 cursor-pointer', // py-4 px-4
  inactive: 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300',
  active: 'text-indigo-500 border-indigo-500',
};

const FullTabLayout = ({ isActive, children, onClick }: IFullTabLayoutProps) => {
  return (
    <div onClick={onClick} className={classNames(isActive ? classes.active : classes.inactive, classes.tab)}>
      {children}
    </div>
  );
};

export default FullTabLayout;
