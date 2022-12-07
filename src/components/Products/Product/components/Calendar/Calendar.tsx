import React from 'react';
import FullCalendar, { EventClickArg, EventContentArg, EventSourceInput, ViewApi } from '@fullcalendar/react';
import rrulePlugin from '@fullcalendar/rrule';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

export interface ICalendarEvent {
  date: Date;
  dateStr: string;
  allDay: boolean;
  dayEl: HTMLElement;
  jsEvent: MouseEvent;
  view: ViewApi;
}

interface ICalendarProps {
  onDateClick: (event: ICalendarEvent) => void;
  initialView: 'dayGridMonth' | 'timeGridWeek';
  renderEventContent?: (eventInfo: EventContentArg) => React.ReactNode;
  onEventClick?: (eventInfo: EventClickArg) => void;
  events?: EventSourceInput;
  timezone?: string;
}

const Calendar = ({
  onDateClick,
  initialView = 'dayGridMonth',
  events,
  timezone,
  renderEventContent,
  onEventClick,
}: ICalendarProps) => {
  const calendarRef = React.useRef<FullCalendar>(null);

  React.useEffect(() => {
    calendarRef.current?.getApi().changeView(initialView);
  }, [initialView, calendarRef]);

  const handleRenderEventContent = React.useCallback((eventInfo: EventContentArg) => {
    return (
      <div>
        <b>{eventInfo.timeText}</b>
      </div>
    );
  }, []);

  return (
    <div>
      <FullCalendar
        ref={calendarRef}
        timeZone={timezone}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'today',
        }}
        slotLabelFormat={{
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
          meridiem: false,
        }}
        eventClick={onEventClick}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin, momentTimezonePlugin]}
        initialView={initialView}
        events={events}
        eventContent={renderEventContent || handleRenderEventContent}
        dateClick={onDateClick}
      />
    </div>
  );
};

export default Calendar;
