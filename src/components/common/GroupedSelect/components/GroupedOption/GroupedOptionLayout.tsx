import React from 'react';

interface IGroupedOptionLayoutProps {
  children: React.ReactNode;
  onClick(): void;
}

const classes = {
  option:
    'text-gray-900 bg-gray-200 cursor-default select-none relative py-2 pl-3 pr-9 group hover:bg-indigo-600 hover:text-white',
};

const GroupedOptionLayout = ({ children, onClick }: IGroupedOptionLayoutProps) => {
  return (
    <li role="option" className={classes.option} onClick={onClick}>
      {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
      {children}
    </li>
  );
};

export default GroupedOptionLayout;
