import React from 'react';

interface ICreatedCheckoutSessionCellLayoutProps {
  action: string;
  sessionId: string;
}

const classes = {
  wrapper: 'flex flex-col',
  text: 'text-sm leading-tight',
  sessionId: 'text-indigo-600',
};

const CreatedCheckoutSessionCellLayout = ({ action, sessionId }: ICreatedCheckoutSessionCellLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      <p className={classes.text}>{action}</p>
      <p className={classes.sessionId}>{sessionId}</p>
    </div>
  );
};

export default CreatedCheckoutSessionCellLayout;
