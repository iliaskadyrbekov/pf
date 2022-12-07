import moment from 'moment-timezone';

import { TWeekday } from 'src/shared/types/Weekday';
import { EventType } from 'src/shared/enums/EventType';
import { AccommodationEventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { TAccommodationEvent } from 'src/shared/interfaces/AccommodationEvent';
import { zonedTimeToUtc } from 'src/helpers/zonedTimeToUtc';

interface IBaseEventProps {
  id: string;
  type: EventType;
  quantity: number;
  availability?: number;
  minPurchase: number;
  maxPurchase: number;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
}

interface IExtendedProps {
  id: string;
  type: EventType;
  quantity: number;
  minPurchase: number;
  maxPurchase: number;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
}

interface IRecurringEventProps extends IBaseEventProps {
  byweekday: TWeekday[];
  interval: number;
  dtstart: Date;
  freq: AccommodationEventFrequencyType;
  exdate?: Date[];
  until?: Date;
}

interface IParseRecurringEventProps {
  event: IRecurringEventProps;
}

interface IParsedOneTimeEvent {
  extendedProps: IExtendedProps;
  start: Date;
  id: string;
  allDay: boolean;
}

interface IParsedRecurringEvent {
  extendedProps: IBaseEventProps;
  rrule: {
    freq: AccommodationEventFrequencyType;
    interval: number;
    byweekday: TWeekday[];
    dtstart: string | number | Date;
    until?: string | number | Date;
    tzid?: string;
  };
  id: string;
  exdate?: Date[] | string[];
  allDay: boolean;
}

interface IOneTimeEventProps extends IBaseEventProps {
  startDate: Date;
}

interface IParseOneTimeEventProps {
  event: IOneTimeEventProps;
}

const parseBaseEvent = (event: IBaseEventProps) => ({
  id: event.id,
  type: event.type,
  quantity: event.quantity,
  availability: event.availability,
  minPurchase: event.minPurchase,
  maxPurchase: event.maxPurchase,
  minPurchaseTime: event.minPurchaseTime,
  maxPurchaseTime: event.maxPurchaseTime,
});

export const parseRecurringEvent = ({ event }: IParseRecurringEventProps, timezone: string): IParsedRecurringEvent => ({
  extendedProps: parseBaseEvent(event),
  rrule: {
    freq: event.freq,
    interval: event.interval,
    byweekday: event.byweekday,
    dtstart: moment(event.dtstart).toISOString(),
    until: event.until ? moment(event.until).toISOString() : undefined,
    tzid: timezone,
  },
  id: event.id,
  allDay: true,
  exdate: event.exdate?.map((date) => moment(date).toISOString()),
});

export const parseOneTimeEvent = ({ event }: IParseOneTimeEventProps, timezone: string): IParsedOneTimeEvent => ({
  extendedProps: parseBaseEvent(event),
  id: event.id,
  start: zonedTimeToUtc(moment(event.startDate).toDate(), timezone),
  allDay: true,
});

export const parseAccommodationEvent = (event: TAccommodationEvent, timezone: string) => {
  switch (event.type) {
    case EventType.ONE_TIME:
      return parseOneTimeEvent({ event }, timezone);
    case EventType.RECURRING:
      return parseRecurringEvent({ event }, timezone);
  }
};
