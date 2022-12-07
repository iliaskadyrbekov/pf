import React from 'react';

interface IOneTimeEventFormLayoutProps {
  quantity: React.ReactNode;
  resourcesSelect: React.ReactNode;
  additionalOptions: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-2',
  actionsWrapper: 'flex space-x-4 ml-auto',
};

const OneTimeEventFormLayout = ({
  quantity,
  resourcesSelect,
  additionalOptions,
  actions,
}: IOneTimeEventFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {quantity}
      {resourcesSelect}
      {additionalOptions}
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default OneTimeEventFormLayout;
