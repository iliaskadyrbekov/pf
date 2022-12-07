import React from 'react';

interface IActionsLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

const classes = {
  wrapper: 'w-full flex flex-row space-x-4',
  left: 'mr-auto space-x-4',
  right: 'ml-auto space-x-4',
};

const ActionsLayout = ({ left, right }: IActionsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.left}>{left}</div>
      <div className={classes.right}>{right}</div>
    </div>
  );
};

export default ActionsLayout;
