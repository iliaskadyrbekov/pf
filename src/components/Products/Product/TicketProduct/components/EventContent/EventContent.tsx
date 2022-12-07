import React from 'react';
import { EventContentArg } from '@fullcalendar/react';
import { RefreshIcon } from '@heroicons/react/solid';

import { EventType } from 'src/shared/enums/EventType';

interface IEventContentProps {
  eventInfo: EventContentArg;
}

const EventContent = ({ eventInfo }: IEventContentProps) => {
  const {
    event: {
      extendedProps: { availability, type },
    },
  } = eventInfo;

  return (
    <div className="cursor-pointer flex justify-center items-center space-x-1">
      <b>{availability || 'No availability'}</b>
      {type === EventType.RECURRING && <RefreshIcon className="w-4 h-4" />}
    </div>
  );
};

export default EventContent;
