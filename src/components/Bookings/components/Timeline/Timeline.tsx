import React from 'react';
import FullCalendar, {
  DatesSetArg,
  DurationInput,
  EventClickArg,
  EventDropArg,
  EventSourceInput,
  FormatterInput,
  EventContentArg,
  CustomButtonInput,
  ToolbarInput,
} from '@fullcalendar/react';
import interactionPlugin, { EventDragStartArg, EventDragStopArg } from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import moment from 'moment-timezone';

interface ITimelineResource {
  id: string;
  title: string;
  eventColor?: string;
  children?: ITimelineResource[];
}

interface ITimelineProps {
  renderEventContent?: (eventInfo: EventContentArg) => React.ReactNode;
  initialView?: 'resourceTimelineDay' | 'resourceTimelineMonth';
  resourceAreaHeaderContent: string;
  slotLabelFormat?: FormatterInput;
  onEventClick?: (eventInfo: EventClickArg) => void;
  onDateChange: (date: DatesSetArg) => void;
  timezone?: string;
  resources?: ITimelineResource[];
  events?: EventSourceInput;
  eventResourceEditable?: boolean;
  slotDuration?: DurationInput;
  slotMinWidth?: number;
  headerToolbar?: ToolbarInput;
  customButtons?: { [name: string]: CustomButtonInput };
  eventDragStart?: (arg: EventDragStartArg) => void;
  eventDragStop?: (arg: EventDragStopArg) => void;
  eventDrop?: (arg: EventDropArg) => void;
}

const Timeline = ({
  initialView = 'resourceTimelineDay',
  slotLabelFormat,
  timezone,
  resourceAreaHeaderContent,
  events,
  resources,
  onDateChange,
  onEventClick,
  eventResourceEditable,
  slotDuration,
  slotMinWidth,
  customButtons,
  headerToolbar,
  eventDragStart,
  eventDragStop,
  eventDrop,
  renderEventContent,
}: ITimelineProps) => {
  const calendarRef = React.useRef<FullCalendar>(null);

  return (
    <FullCalendar
      headerToolbar={headerToolbar}
      height="100%"
      resourceAreaWidth="300px"
      customButtons={customButtons}
      ref={calendarRef}
      timeZone={timezone}
      datesSet={onDateChange}
      eventClick={onEventClick}
      initialView={initialView}
      plugins={[resourceTimelinePlugin, momentTimezonePlugin, interactionPlugin]}
      resourceAreaHeaderContent={resourceAreaHeaderContent}
      resources={resources}
      events={events}
      slotLabelFormat={[{ month: 'long', year: 'numeric' }, ...(slotLabelFormat ? [slotLabelFormat] : [])]}
      scrollTime={{
        day: moment(moment().subtract(3, 'days')).isSame(moment(), 'month')
          ? moment().subtract(3, 'days').date() - 1
          : moment().date() - 1,
      }}
      scrollTimeReset={false}
      schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
      displayEventTime={false}
      nowIndicator={true}
      eventResourceEditable={eventResourceEditable}
      eventDragStart={eventDragStart}
      eventDragStop={eventDragStop}
      eventDrop={eventDrop}
      slotDuration={slotDuration}
      slotMinWidth={slotMinWidth}
      eventContent={renderEventContent}
    />
  );
};

export default Timeline;
