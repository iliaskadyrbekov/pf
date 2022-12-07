import React from 'react';

interface IItemLayoutProps {
  children: React.ReactNode;
  upIcon: React.ReactNode;
  downIcon: React.ReactNode;
  trashIcon: React.ReactNode;

  isUpDisabled: boolean;
  isDownDisabled: boolean;

  onUpClick: () => void;
  onDownClick: () => void;
}

const classes = {
  wrapper: 'flex',
  actionsWrapper: 'flex flex-col space-y-4 items-center justify-center pl-4',
  trashWrapper: 'absolute',
  iconWrapper: (isDisabled: boolean) => (isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'),
};

const ItemLayout = ({
  children,
  upIcon,
  downIcon,
  trashIcon,
  onUpClick,
  onDownClick,
  isUpDisabled,
  isDownDisabled,
}: IItemLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {children}
      <div className={classes.actionsWrapper} style={{ marginRight: '-100%' }}>
        {upIcon && (
          <div onClick={!isUpDisabled ? onUpClick : undefined} className={classes.iconWrapper(isUpDisabled)}>
            {upIcon}
          </div>
        )}

        <div className={classes.iconWrapper(false)}>{trashIcon}</div>

        {downIcon && (
          <div onClick={!isDownDisabled ? onDownClick : undefined} className={classes.iconWrapper(isDownDisabled)}>
            {downIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemLayout;
