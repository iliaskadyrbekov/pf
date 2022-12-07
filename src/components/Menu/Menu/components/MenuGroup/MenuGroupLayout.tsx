import React from 'react';

interface IMenuGroupLayoutProps {
  groupItems: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-3 pt-3',
};

const MenuGroupLayout: React.FC<IMenuGroupLayoutProps> = ({ groupItems }: IMenuGroupLayoutProps) => {
  return <div className={classes.wrapper}>{groupItems}</div>;
};

export default MenuGroupLayout;
