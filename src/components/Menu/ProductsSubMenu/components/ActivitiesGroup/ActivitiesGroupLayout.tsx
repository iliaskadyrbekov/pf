import React from 'react';

interface IActivitiesGroupLayoutProps {
  title: React.ReactNode;
  addIcon: React.ReactNode;
  items?: React.ReactNode;

  onAddClick: () => void;
}

const classes = {
  wrapper: 'space-y-3',
  itemsWrapper: 'space-y-1',
  titleWrapper: 'flex items-center justify-between',
  title: 'text-xs font-bold tracking-wide leading-none text-gray-500 uppercase',
  addIconWrapper:
    'w-5 h-5 flex items-center justify-center p-0.5 bg-white border rounded border-gray-200 cursor-pointer',
};

const ActivitiesGroupLayout = ({ title, items, addIcon, onAddClick }: IActivitiesGroupLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.titleWrapper}>
        <p className={classes.title}>{title}</p>
        <div className={classes.addIconWrapper} onClick={onAddClick}>
          {addIcon}
        </div>
      </div>
      {!!items && <div className={classes.itemsWrapper}>{items}</div>}
    </div>
  );
};

export default ActivitiesGroupLayout;
