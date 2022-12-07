import React from 'react';

interface IEventsLayoutProps {
  children: React.ReactNode;
  loader: React.ReactNode;
}

const classes = {
  wrapper: 'space-y-4 py-4',
  loader: 'w-20 h-20 mx-auto my-6',
};

const EventsLayout = ({ children, loader }: IEventsLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {!!loader && <div className={classes.loader}>{loader}</div>}
      {children}
    </div>
  );
};

export default EventsLayout;
