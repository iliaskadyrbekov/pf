import React from 'react';

export interface IConnectedResourceLayoutProps {
  name: string;
  showDivider: boolean;
  trashIcon: React.ReactNode;
  dragIcon: React.ReactNode;
  dragRef: React.RefObject<HTMLDivElement>;
  previewRef: any;
}

const classes = {
  wrapper: 'flex items-center justify-between w-full relative',
  mainInfoWrapper: 'flex items-center space-x-4',
  text: 'text-sm font-medium leading-tight text-gray-700',
  divider: 'absolute -bottom-1 border-dashed mt-2 w-full border-t border-gray-400',
};

const ConnectedResourceLayout = ({
  trashIcon,
  showDivider,
  dragIcon,
  previewRef,
  dragRef,
  name,
}: IConnectedResourceLayoutProps) => {
  return (
    <div ref={previewRef as any} className={classes.wrapper}>
      <div className={classes.mainInfoWrapper}>
        <div ref={dragRef}>{dragIcon}</div>
        <span className={classes.text}>{name}</span>
      </div>

      {trashIcon}
      {showDivider && <div className={classes.divider} />}
    </div>
  );
};

export default ConnectedResourceLayout;
