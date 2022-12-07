import { TWeekday } from '../types/Weekday';
import { IOptionalDuration } from './Duration';
import { IAccommodationProduct } from './Product';
import { AccommodationEventFrequencyType, EventType } from '../enums';
import { IConnectedAreaResource } from './ConnectedAreaResource';

export type TAccommodationEvent = IAccommodationOneTimeEvent | IAccommodationRecurringEvent;

export interface IAccommodationOneTimeEvent extends IAccommodationEvent {
  type: EventType.ONE_TIME;
  startDate: Date;
}

export interface IAccommodationRecurringEvent extends IAccommodationEvent {
  type: EventType.RECURRING;
  byweekday: TWeekday[];
  dtstart: Date;
  exdate?: Date[];
  interval: number;
  until: Date;
  freq: AccommodationEventFrequencyType;
}

export interface IAccommodationEvent {
  id: string;
  quantity: number;
  type: EventType;
  maxPurchase: number;
  minPurchase: number;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
  product: IAccommodationProduct;
  connectedResources: IConnectedAreaResource[];
}
