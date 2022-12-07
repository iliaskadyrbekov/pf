import React from 'react';

interface IExcelAccommodationOrderItemsModalLayoutProps {
  title: React.ReactNode;
  filters: React.ReactNode;
  form: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 space-y-4 max-w-sm',
  title: 'text-lg font-medium leading-normal text-gray-900',
  divider: 'w-full border-t border-gray-200',
  content: 'space-y-6',
  filters: 'space-y-2',
  form: 'text-sm font-medium leading-tight text-gray-600',
  typeWrapper: 'flex flex-col w-52',
  nameWrapper: 'flex flex-col w-52',
  langSwitcherWrapper: 'mt-6',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const ExcelAccommodationOrderItemsModalLayout = ({
  title,
  filters,
  form,
  actions,
}: IExcelAccommodationOrderItemsModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.divider} />
      <div className={classes.content}>
        <div className={classes.filters}>{filters}</div>
        <div className={classes.form}>{form}</div>
      </div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default ExcelAccommodationOrderItemsModalLayout;
