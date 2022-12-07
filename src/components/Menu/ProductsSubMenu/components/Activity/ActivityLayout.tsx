import Link from 'next/link';
import React from 'react';

export interface IActivityLayoutProps {
  icon: React.ReactNode;
  name: string;
  isActive: boolean;
  href: string;
  dragIcon: React.ReactNode;
  dragRef: React.RefObject<HTMLDivElement>;
  previewRef: any;
}

const classes = {
  wrapper: (isActive: boolean) =>
    `group w-full flex items-center justify-start space-x-3 p-2 border-2 rounded-md bg-white ${
      isActive
        ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
        : 'border-white hover:text-gray-600 hover:bg-indigo-50 text-gray-500'
    }`,
  link: 'cursor-pointer',
  name: 'text-sm font-medium leading-tight',
  iconWrapper: 'w-5 h-5',
};

const ActivityLayout = ({ icon, name, isActive, href, dragIcon, previewRef, dragRef }: IActivityLayoutProps) => {
  return (
    <div ref={previewRef} className="flex items-center w-full">
      <div ref={dragRef}>{dragIcon}</div>
      <Link href={href}>
        <a className={classes.wrapper(isActive)}>
          <div className={classes.iconWrapper}>{icon}</div>
          <p className={classes.name}>{name}</p>
        </a>
      </Link>
    </div>
  );
};

export default ActivityLayout;
