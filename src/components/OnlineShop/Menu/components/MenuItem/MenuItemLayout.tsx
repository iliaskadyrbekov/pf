import React from 'react';

interface IMenuItemLayoutProps {
  menuName: React.ReactNode;
  langSwitcher: React.ReactNode;
  linkedPages: React.ReactNode;
  save: React.ReactNode | null;
  trash: React.ReactNode;
  dragIcon: React.ReactNode;
  dragRef: React.RefObject<HTMLDivElement>;
  showDivider: boolean;
}

const classes = {
  wrapper: 'flex space-x-8 py-3 items-center',
  menuNameBlock: 'space-y-2',
  inputWrapper: '-mt-6 w-full',
  linkedPagesBlock: 'flex flex-1 min-w-0',
  actionsBlock: 'flex flex-1 space-x-8 justify-end items-center',
  trashWrapper: 'cursor-pointer',
};

const MenuItemLayout = ({
  menuName,
  langSwitcher,
  linkedPages,
  save,
  trash,
  dragIcon,
  dragRef,
}: IMenuItemLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div ref={dragRef}>{dragIcon}</div>
      <div className={classes.menuNameBlock}>
        {langSwitcher}
        <div className={classes.inputWrapper}>{menuName}</div>
      </div>
      <div className={classes.linkedPagesBlock}>
        <div className={classes.inputWrapper}>{linkedPages}</div>
      </div>
      <div className={classes.actionsBlock}>
        {save}
        <div className={classes.trashWrapper}>{trash}</div>
      </div>
    </div>
  );
};

export default MenuItemLayout;
