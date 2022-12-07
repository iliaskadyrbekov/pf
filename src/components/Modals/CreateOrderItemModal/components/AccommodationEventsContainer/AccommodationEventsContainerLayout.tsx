import React from 'react';

interface IActivityEventsContainerLayoutProps {
  events: React.ReactNode;
  datePicker: React.ReactNode;
  loader?: React.ReactNode;
}

const classes = {
  loaderWrapper: 'space-y-4 py-10',
  loader: 'w-20 h-20 mx-auto',
};

const ActivityEventsContainerLayout = ({ datePicker, events, loader }: IActivityEventsContainerLayoutProps) => {
  return (
    <React.Fragment>
      {datePicker}
      {!!loader && (
        <div className={classes.loaderWrapper}>
          <div className={classes.loader}>{loader}</div>
        </div>
      )}
      {events}
    </React.Fragment>
  );
};

export default ActivityEventsContainerLayout;
