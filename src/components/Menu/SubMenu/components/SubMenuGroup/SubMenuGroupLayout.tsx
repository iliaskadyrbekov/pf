import React from 'react';

interface ISubMenuGroupLayoutProps {
  title?: React.ReactNode;
  items: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-3',
  itemsWrapper: 'space-y-1',
  title: 'text-xs font-bold tracking-wide leading-none text-gray-500 uppercase',
};

const SubMenuGroupLayout: React.FC<ISubMenuGroupLayoutProps> = ({ title, items }: ISubMenuGroupLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {title && <p className={classes.title}>{title}</p>}
      <div className={classes.itemsWrapper}>{items}</div>
    </div>
  );
};

export default SubMenuGroupLayout;
