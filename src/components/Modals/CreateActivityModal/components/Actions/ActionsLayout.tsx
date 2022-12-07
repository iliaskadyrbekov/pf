import React from 'react';

interface IActionsLayoutProps {
  nameInput: React.ReactNode;
  langSwitcher: React.ReactNode;
  actions: React.ReactNode[];
}

const classes = {
  wrapper: 'flex flex-col space-y-7 px-4 py-5',
  inputsWrapper: 'w-full',
  nameInputWrapper: 'flex-1',
  actionsWrapper: 'flex flex-row space-x-4 ml-auto',
  langSwitcherWrapper: 'mb-6',
};

const ActionsLayout = ({ nameInput, langSwitcher, actions }: IActionsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.inputsWrapper}>
        <div className={classes.langSwitcherWrapper}>{langSwitcher}</div>
        <div className={classes.nameInputWrapper}>{nameInput}</div>
      </div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default ActionsLayout;
