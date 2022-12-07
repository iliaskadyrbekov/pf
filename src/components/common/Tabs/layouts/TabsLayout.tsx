import { classNames } from '@utils/classNames';
import React from 'react';

interface ITabsLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

const classes = {
  wrapper: 'border-b border-gray-200',
  nav: '-mb-px flex',
};

const TabsLayout = ({ children, className }: ITabsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <nav className={classNames(classes.nav, className)}>{children}</nav>
    </div>
  );
};

export default TabsLayout;
