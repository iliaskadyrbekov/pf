import { EventType } from '../shared/enums';

export const eventTypeToString = (eventType: EventType) =>
  ({
    [EventType.RECURRING]: 'Recurring',
    [EventType.ONE_TIME]: 'OneTime',
  }[eventType]);
