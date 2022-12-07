import React from 'react';

interface ICreateRentalCategoryModalLayoutProps {
  title: React.ReactNode;
  categoryName: React.ReactNode;
  actions: React.ReactNode[];
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 flex flex-col items-center space-y-8',
  title: 'text-lg font-medium leading-normal text-gray-900',
  border: 'w-full border border-dashed border-opacity-10',
  inputsWrapper: 'w-full max-w-112 flex items-start space-x-4',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const CreateRentalCategoryModalLayout = ({ title, categoryName, actions }: ICreateRentalCategoryModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.border} />
      <div className={classes.inputsWrapper}>{categoryName}</div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default CreateRentalCategoryModalLayout;
