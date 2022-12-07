import moment from 'moment-timezone';

import { DurationType } from 'src/shared/enums/DurationType';
import { EventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { EventType } from 'src/shared/enums/EventType';
import { IDuration, IOptionalDuration } from 'src/shared/interfaces/Duration';
import { TEvent } from 'src/shared/interfaces/TicketEvent';
import { TWeekday } from 'src/shared/types/Weekday';

interface IBaseEventProps {
  id: string;
  type: EventType;
  quantity: number | null;
  availability: number | null;
  minPurchase: number | null;
  maxPurchase: number | null;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
}

interface IExtendedProps {
  type: EventType;
  id: string;
  quantity: number | null;
  minPurchase: number | null;
  maxPurchase: number | null;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
}

interface IRecurringEventProps extends IBaseEventProps {
  freq: EventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  dtstart: Date;
  allDay: boolean;
  until?: Date;
  exdate?: Date[];
  tzid?: string;
}

interface IParseRecurringEventProps {
  event: IRecurringEventProps;
  product: {
    duration: IDuration;
  };
}

interface IParsedOneTimeEvent {
  extendedProps: IExtendedProps;
  start: Date;
  allDay: boolean;
  end: Date;
  id: string;
}

interface IParsedRecurringEvent {
  extendedProps: IBaseEventProps;
  rrule: {
    freq: EventFrequencyType;
    interval: number;
    byweekday: TWeekday[];
    dtstart: string | number | Date;
    until?: string | number | Date;
    tzid?: string;
  };
  // duration: Record<DurationType, number>;
  duration: any;
  allDay: boolean;
  id: string;
  exdate?: Date[] | string[];
}

interface IOneTimeEventProps extends IBaseEventProps {
  allDay: boolean;
  startDate: Date;
  endDate?: Date;
}

interface IParseOneTimeEventProps {
  event: IOneTimeEventProps;
  product: {
    duration: IDuration;
  };
}

const parseBaseEvent = (event: IBaseEventProps) => ({
  extendedProps: {
    type: event.type,
    id: event.id,
    quantity: event.quantity,
    availability: event.availability,
    minPurchase: event.minPurchase,
    maxPurchase: event.maxPurchase,
    minPurchaseTime: event.minPurchaseTime,
    maxPurchaseTime: event.maxPurchaseTime,
  },
});

export const parseRecurringEvent = ({ event, product }: IParseRecurringEventProps): IParsedRecurringEvent => ({
  ...parseBaseEvent(event),
  rrule: {
    freq: event.freq,
    interval: event.interval,
    byweekday: event.byweekday,
    dtstart: moment(event.dtstart).toISOString(),
    until: event.until ? moment(event.until).toISOString() : undefined,
    tzid: event.tzid,
  },
  duration: event.allDay ? { day: 1 } : (getProductDuration(product.duration) as any),
  allDay: event.allDay,
  exdate: event.exdate?.map((date) => moment(date).toISOString()),
  id: event.id,
});

export const parseOneTimeEvent = ({ event, product }: IParseOneTimeEventProps): IParsedOneTimeEvent => ({
  ...parseBaseEvent(event),
  start: event.allDay ? moment(event.startDate).startOf('day').toDate() : moment(event.startDate).toDate(),
  allDay: event.allDay,
  end: getEventEnd(event.startDate, product.duration),
  id: event.id,
});

export const parseEvent = (event: TEvent, product: { duration: IDuration }) => {
  switch (event.type) {
    case EventType.ONE_TIME:
      return parseOneTimeEvent({ event, product });
    case EventType.RECURRING:
      return parseRecurringEvent({ event, product });
  }
};

export const getProductDuration = (duration: IDuration) => {
  return { [duration.type.toLowerCase()]: duration.value };
};

export const getEventEnd = (start: number | string | Date, duration: IDuration) => {
  const startDate = new Date(start);

  let getDateFn: 'getHours' | 'getMinutes' | 'getDate';
  let setDateFn: 'setHours' | 'setMinutes' | 'setDate';

  switch (duration.type) {
    case DurationType.DAYS:
      getDateFn = 'getDate';
      setDateFn = 'setDate';
      break;
    case DurationType.HOURS:
      getDateFn = 'getHours';
      setDateFn = 'setHours';
      break;
    case DurationType.MINUTES:
      getDateFn = 'getMinutes';
      setDateFn = 'setMinutes';
      break;
  }

  return new Date(startDate[setDateFn](startDate[getDateFn]() + duration.value));
};
