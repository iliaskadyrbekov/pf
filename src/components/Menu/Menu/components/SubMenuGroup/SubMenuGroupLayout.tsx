import React from 'react';

interface ISubMenuGroupLayoutProps {
  children?: React.ReactNode;
}

const classes = {
  wrapper: 'py-4',
  title: 'text-xs font-bold tracking-wide leading-none text-gray-500 uppercase',
};

const SubMenuGroupLayout: React.FC<ISubMenuGroupLayoutProps> = ({ children }: ISubMenuGroupLayoutProps) => {
  return <div className={classes.wrapper}>{children}</div>;
};

export default SubMenuGroupLayout;
