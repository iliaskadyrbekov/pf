import React from 'react';

interface IMenuLayoutProps {
  items: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  itemsWrapper: 'space-y-4',
};

const MenuLayout = ({ items, actions }: IMenuLayoutProps) => {
  return (
    <div>
      <div className={classes.itemsWrapper}>{items}</div>
      {actions}
    </div>
  );
};

export default MenuLayout;
