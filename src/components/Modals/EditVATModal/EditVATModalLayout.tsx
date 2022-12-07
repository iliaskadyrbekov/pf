import React from 'react';

interface IEditVATModalLayoutProps {
  title: React.ReactNode;
  VATValue: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col items-center space-y-8 w-96',
  title: 'text-lg font-medium leading-normal text-gray-900',
  VATValueWrapper: 'mr-auto w-28',
};

const EditVATModalLayout = ({ title, VATValue, actions }: IEditVATModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.VATValueWrapper}>{VATValue}</div>
      {actions}
    </div>
  );
};

export default EditVATModalLayout;
