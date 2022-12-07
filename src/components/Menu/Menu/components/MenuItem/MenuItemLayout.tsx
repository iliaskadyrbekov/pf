import Link from 'next/link';
import React from 'react';

export interface IMenuItemLayoutProps {
  icon: React.ReactNode;
  name: string;
  isActive: boolean;
  link: string;
}

const classes = {
  wrapper: (isActive: boolean) =>
    `${
      isActive ? 'bg-white text-indigo-600' : 'text-gray-600'
    } group flex flex-col items-center justify-center hover:bg-white rounded-lg h-16 w-16 cursor-pointer`,
  name: 'mt-1 text-xs font-bold leading-tight text-justify capitalize group-hover:text-indigo-600',
  iconWrapper: 'w-6 h-6 group-hover:text-indigo-600',
};

const MenuItemLayout: React.FC<IMenuItemLayoutProps> = ({ icon, name, isActive, link }: IMenuItemLayoutProps) => {
  return (
    <Link href={link}>
      <a className={classes.wrapper(isActive)}>
        <div className={classes.iconWrapper}>{icon}</div>
        <p className={classes.name}>{name}</p>
      </a>
    </Link>
  );
};

export default MenuItemLayout;
