import React from 'react';

interface IDayLayoutProps {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}

const classes = {
  wrapper: (isActive: boolean) =>
    `${
      isActive ? 'bg-indigo-600' : 'bg-gray-100'
    } group cursor-pointer	 rounded-full h-10 w-10 flex items-center justify-center hover:bg-indigo-500`,
  text: (isActive: boolean) =>
    `${isActive ? 'text-white' : 'text-gray-700'} text-sm font-medium text-gray-700 group-hover:text-white`,
};

const DayLayout = ({ children, onClick, isActive }: IDayLayoutProps) => {
  return (
    <div onClick={onClick} className={classes.wrapper(isActive)}>
      <p className={classes.text(isActive)}>{children}</p>
    </div>
  );
};

export default DayLayout;
