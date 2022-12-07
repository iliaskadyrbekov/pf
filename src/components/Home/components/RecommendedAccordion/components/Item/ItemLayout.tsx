import React from 'react';

interface IItemLayoutProps {
  children: React.ReactNode;
  title: React.ReactNode;
  icon: React.ReactNode;
  isActiveItem: boolean;
}

const classes = {
  wrapper: 'flex py-9 pl-4 pr-8 space-x-6 bg-white',
  iconWrapper: 'text-indigo-600 cursor-pointer',
  content: 'flex flex-col space-y-2',
};

const ItemLayout = ({ children, title, icon, isActiveItem }: IItemLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.iconWrapper}>{icon}</div>
      <div className={classes.content}>
        {title}
        {isActiveItem && children}
      </div>
    </div>
  );
};

export default ItemLayout;
