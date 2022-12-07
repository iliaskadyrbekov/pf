import React from 'react';

interface IOneTimeEventFormLayoutProps {
  startTime?: React.ReactNode | null;
  quantity: React.ReactNode;
  resourcesSelect: React.ReactNode;
  connectedResources: React.ReactNode;
  additionalOptions: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-2',
  actionsWrapper: 'flex space-x-4 ml-auto',
};

const OneTimeEventFormLayout = ({
  startTime,
  quantity,
  resourcesSelect,
  connectedResources,
  additionalOptions,
  actions,
}: IOneTimeEventFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {startTime}
      {quantity}
      {resourcesSelect}
      {connectedResources}
      {additionalOptions}
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default OneTimeEventFormLayout;
