import React from 'react';

interface IActionsLayoutProps {
  remove: React.ReactNode;
  cancel: React.ReactNode;
  save: React.ReactNode;
}

const classes = {
  wrapper: 'flex justify-between',
  buttonsWrapper: 'space-x-3',
};

const ActionsLayout = ({ remove, cancel, save }: IActionsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {remove}
      <div className={classes.buttonsWrapper}>
        {cancel}
        {save}
      </div>
    </div>
  );
};

export default ActionsLayout;
