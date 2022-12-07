import React from 'react';

export interface ITabLayoutProps {
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const classes = {
  tab: 'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm cursor-pointer',
  inactive: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
  active: 'border-indigo-500 text-indigo-600',
};

const TabLayout = ({ isActive, children, onClick }: ITabLayoutProps) => {
  const className = `${isActive ? classes.active : classes.inactive} ${classes.tab}`;

  return (
    <a onClick={onClick} className={className}>
      {children}
    </a>
  );
};

export default TabLayout;
