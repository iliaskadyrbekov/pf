import React from 'react';

interface IRentalEventsContainerLayoutProps {
  datePicker: React.ReactNode;
  events: React.ReactNode;
}

const RentalEventsContainerLayout = ({ datePicker, events }: IRentalEventsContainerLayoutProps) => {
  return (
    <div>
      {datePicker}
      {events}
    </div>
  );
};

export default RentalEventsContainerLayout;
