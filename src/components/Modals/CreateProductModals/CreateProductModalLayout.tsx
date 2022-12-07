import React from 'react';

interface ICreateProductModalLayoutProps {
  title: React.ReactNode;
  langSwitcher: React.ReactNode;
  fields: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col max-w-[667px] px-7 py-4',
  border: 'w-full border border-dashed border-opacity-10 mt-4 mb-3',
  title: 'text-lg font-medium leading-normal text-gray-900',
  langSwitcherWrapper: 'ml-auto mb-2',
  actionsWrapper: 'w-full flex justify-center flex-row space-x-4 mt-8',
  fieldsWrapper: 'space-y-5',
};

const CreateProductModalLayout = ({ title, langSwitcher, fields, actions }: ICreateProductModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.border} />
      <div className={classes.langSwitcherWrapper}>{langSwitcher}</div>
      <div className={classes.fieldsWrapper}>{fields}</div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default CreateProductModalLayout;
