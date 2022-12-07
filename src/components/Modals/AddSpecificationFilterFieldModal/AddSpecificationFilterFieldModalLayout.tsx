import React from 'react';

interface IAddSpecificationFilterFieldModalLayoutProps {
  title: React.ReactNode;
  type: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'px-4 pt-5 pb-4 sm:p-6 space-y-4',
  title: 'text-lg font-medium leading-normal text-gray-900',
  divider: 'w-full border-t border-gray-200',
  typeWrapper: 'flex flex-col',
  actionsWrapper: 'w-full flex justify-end flex-row space-x-4',
};

const AddSpecificationFilterFieldModalLayout = ({
  title,
  type,
  actions,
}: IAddSpecificationFilterFieldModalLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.title}>{title}</p>
      <div className={classes.divider} />
      <div>
        <div className={classes.typeWrapper}>{type}</div>
      </div>
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default AddSpecificationFilterFieldModalLayout;
