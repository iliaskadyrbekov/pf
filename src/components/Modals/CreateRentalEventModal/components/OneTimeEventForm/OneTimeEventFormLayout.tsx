import React from 'react';

interface IOneTimeEventFormLayoutProps {
  quantity: React.ReactNode;
  startTime: React.ReactNode;
  additionalOptions: React.ReactNode;
  endTime: React.ReactNode;
  actions: React.ReactNode;
}

const classes = {
  wrapper: 'flex flex-col space-y-2',
  actionsWrapper: 'flex space-x-4 ml-auto',
};

const OneTimeEventFormLayout = ({
  quantity,
  startTime,
  endTime,
  actions,
  additionalOptions,
}: IOneTimeEventFormLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {quantity}
      {startTime}
      {endTime}
      {additionalOptions}
      <div className={classes.actionsWrapper}>{actions}</div>
    </div>
  );
};

export default OneTimeEventFormLayout;
