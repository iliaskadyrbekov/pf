import React from 'react';
import { EventContentArg } from '@fullcalendar/react';

interface IEventContentProps {
  eventInfo: EventContentArg;
}

const EventContent = ({ eventInfo }: IEventContentProps) => {
  const {
    event: {
      extendedProps: { productName },
      title,
    },
  } = eventInfo;

  return (
    <div>
      <p className="text-[10px]">{productName}</p>
      <p className="text-base">{title}</p>
    </div>
  );
};

export default EventContent;
