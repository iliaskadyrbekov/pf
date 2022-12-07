import React from 'react';

interface ITicketEventsContainerLayoutProps {
  datePicker: React.ReactNode;
  events: React.ReactNode;
}

const classes = {
  wrapper: '',
};

const TicketEventsContainerLayout = ({ datePicker, events }: ITicketEventsContainerLayoutProps) => {
  return (
    <div className={classes.wrapper}>
      {datePicker}
      {events}
    </div>
  );
};

export default TicketEventsContainerLayout;
