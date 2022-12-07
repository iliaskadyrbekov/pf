import React from 'react';

interface ISubMenuLayoutLayoutProps {
  group: React.ReactNode;
}

const classes = {
  wrapper: 'w-72 flex-col px-8 pt-7 bg-white shadow',
};

const SubMenuLayoutLayout: React.FC<ISubMenuLayoutLayoutProps> = ({ group }: ISubMenuLayoutLayoutProps) => {
  return <div className={classes.wrapper}>{group}</div>;
};

export default SubMenuLayoutLayout;
