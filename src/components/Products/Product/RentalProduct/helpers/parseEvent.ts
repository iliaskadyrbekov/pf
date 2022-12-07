import moment from 'moment-timezone';
import { RentalEventFrequencyType } from 'src/shared/enums';
import { EventType } from 'src/shared/enums/EventType';
import { TRentalEvent } from 'src/shared/interfaces/RentalEvent';
import { TWeekday } from 'src/shared/types/Weekday';

interface IParseBaseEventProps {
  id: string;
  quantity: number | null;
  startTime: string;
  endTime: string;
  type: EventType;
}

interface IParseBaseEvent {
  id: string;
  allDay: boolean;
}

interface IRecurringEventProps extends IParseBaseEventProps {
  freq: RentalEventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  dtstart: string | number | Date;
  until?: number | Date;
  exdate?: Date[];
  tzid?: string;
}

interface IOneTimeEventProps extends IParseBaseEventProps {
  startDate: Date;
  endDate?: Date;
}

export interface IParsedOneTimeEvent extends IParseBaseEvent {
  extendedProps: IParseBaseEventProps;
  start: Date;
  end?: Date;
}

export interface IParsedRecurringEvent extends IParseBaseEvent {
  extendedProps: IParseBaseEventProps;
  rrule: {
    freq: RentalEventFrequencyType;
    interval: number;
    byweekday: TWeekday[];
    dtstart: string | number | Date;
    until?: string | number | Date;
    tzid?: string;
  };
  exdate?: Date[] | string[];
}

const parseBaseEvent = (event: IParseBaseEventProps) => ({
  id: event.id,
  quantity: event.quantity,
  startTime: event.startTime,
  endTime: event.endTime,
  type: event.type,
});

export const parseRecurringEvent = ({
  freq,
  interval,
  byweekday,
  dtstart,
  until,
  ...event
}: IRecurringEventProps): IParsedRecurringEvent => ({
  extendedProps: parseBaseEvent(event),
  id: event.id,
  rrule: {
    freq,
    interval,
    byweekday,
    dtstart: moment(dtstart).toISOString(),
    until: until ? moment(until).toISOString() : undefined,
    tzid: event.tzid,
  },
  exdate: event.exdate?.map((date) => moment(date).toISOString()),
  allDay: true,
});

export const parseOneTimeEvent = ({ startDate, ...event }: IOneTimeEventProps): IParsedOneTimeEvent => ({
  extendedProps: parseBaseEvent(event),
  id: event.id,
  start: moment(startDate).toDate(),
  allDay: true,
});

export const parseRentalEvent = (event: TRentalEvent) => {
  switch (event.type) {
    case EventType.ONE_TIME:
      return parseOneTimeEvent(event);
    case EventType.RECURRING:
      return parseRecurringEvent(event);
  }
};
