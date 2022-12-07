import Link from 'next/link';
import React from 'react';

export interface ISubMenuItemLayoutProps {
  icon?: React.ReactNode;
  name: string;
  isActive?: boolean;
  isInactive?: boolean;
  link?: string;
  onClick?(): void;
}

const classes = {
  wrapper: (isActive?: boolean, isInactive?: boolean) =>
    `group flex items-center justify-start space-x-3 p-2 border-2 rounded-md bg-white cursor-pointer ${
      isActive
        ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
        : isInactive
        ? 'border-white text-gray-300 cursor-default'
        : 'border-white hover:text-gray-600 hover:bg-indigo-50 text-gray-500'
    }`,
  name: 'text-sm font-medium leading-tight text-right',
  iconWrapper: 'w-5 h-5',
};

const SubMenuItemLayout: React.FC<ISubMenuItemLayoutProps> = ({
  icon,
  name,
  isActive = false,
  isInactive = false,
  link,
  onClick,
}: ISubMenuItemLayoutProps) => {
  const Component = (
    <a onClick={onClick} className={classes.wrapper(isActive, isInactive)}>
      <div className={classes.iconWrapper}>{icon}</div>
      <p className={classes.name}>{name}</p>
    </a>
  );

  return link ? <Link href={link}>{Component}</Link> : Component;
};

export default SubMenuItemLayout;
