import React from 'react';

interface ICreateVATModalLayoutProps {
  title: React.ReactNode;
  VATValue: React.ReactNode;
  actions: React.ReactNode[];
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col items-center space-y-8 w-96',
  title: 'text-lg font-medium leading-normal text-gray-900',
  VATValueWrapper: 'mr-auto w-28',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const CreateVATModalLayout = ({ title, VATValue, actions }: ICreateVATModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.VATValueWrapper}>{VATValue}</div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default CreateVATModalLayout;
