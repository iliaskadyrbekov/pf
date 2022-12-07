import React from 'react';

interface IMenuLayoutProps {
  menuItems: React.ReactNode[];
}

const classes = {
  wrapper: 'flex flex-col p-3 bg-gray-100 justify-between h-full',
  groupsWrapper: 'space-y-3 divide-y divide-gray-200',
};

const MenuLayout: React.FC<IMenuLayoutProps> = ({ menuItems }: IMenuLayoutProps) => {
  const firstGroups = menuItems.slice(0, menuItems.length - 1);
  const lastGroups = menuItems.slice(-1);

  return (
    <nav className={classes.wrapper}>
      <div className={classes.groupsWrapper}>{firstGroups}</div>
      <div className={classes.groupsWrapper}>{lastGroups}</div>
    </nav>
  );
};

export default MenuLayout;
