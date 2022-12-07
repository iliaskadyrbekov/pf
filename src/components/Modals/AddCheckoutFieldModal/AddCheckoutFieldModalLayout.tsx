import React from 'react';

interface IAddCheckoutFieldModalLayoutProps {
  title: React.ReactNode;
  type: React.ReactNode;
  name: React.ReactNode;
  langSwitcher: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 space-y-4',
  title: 'text-lg font-medium leading-normal text-gray-900',
  divider: 'w-full border-t border-gray-200',
  formWrapper: 'space-y-4',
  typeWrapper: 'flex flex-col',
  nameWrapper: 'flex flex-col',
  langSwitcherWrapper: 'mt-6',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const AddCheckoutFieldModalLayout = ({
  title,
  type,
  name,
  langSwitcher,
  actions,
}: IAddCheckoutFieldModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.divider} />
      <div className={classes.formWrapper}>
        <div className={classes.langSwitcherWrapper}>{langSwitcher}</div>
        <div className={classes.typeWrapper}>{type}</div>
        <div className={classes.nameWrapper}>{name}</div>
      </div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default AddCheckoutFieldModalLayout;
