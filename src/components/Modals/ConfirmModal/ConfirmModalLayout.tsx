import React from 'react';

interface IConfirmModalLayoutProps {
  title: React.ReactNode;
  message: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 space-y-4 max-w-sm',
  title: 'text-lg font-medium leading-normal text-gray-900',
  divider: 'w-full border-t border-gray-200',
  message: 'text-sm font-medium leading-tight text-gray-600',
  typeWrapper: 'flex flex-col w-52',
  nameWrapper: 'flex flex-col w-52',
  langSwitcherWrapper: 'mt-6',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const ConfirmModalLayout = ({ title, message, actions }: IConfirmModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.divider} />
      <p className={classes.message}>{message}</p>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default ConfirmModalLayout;
