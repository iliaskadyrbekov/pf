import { Badge } from '@components/common/Badge';
import Link from 'next/link';
import React from 'react';

export interface ISubMenuItemLayoutProps {
  icon: React.ReactNode;
  name: string;
  isActive: boolean;
  link: string;
  count?: number;
}

const classes = {
  wrapper: (isActive: boolean) =>
    `group flex items-center justify-between p-2 border-2 rounded-md bg-white cursor-pointer ${
      isActive
        ? 'border-indigo-500 text-indigo-600 bg-indigo-50'
        : 'border-white hover:text-gray-600 hover:bg-indigo-50 text-gray-500'
    }`,
  name: 'text-sm font-medium leading-tight',
  infoWrapper: 'flex space-x-3 items-center',
  iconWrapper: 'w-5 h-5',
};

const SubMenuItemLayout = ({ icon, name, isActive, link, count }: ISubMenuItemLayoutProps) => {
  return (
    <Link href={link}>
      <a className={classes.wrapper(isActive)}>
        <div className={classes.infoWrapper}>
          <div className={classes.iconWrapper}>{icon}</div>
          <p className={classes.name}>{name}</p>
        </div>
        {count ? (
          <Badge variant="contained" color="gray">
            {count}
          </Badge>
        ) : null}
      </a>
    </Link>
  );
};

export default SubMenuItemLayout;
