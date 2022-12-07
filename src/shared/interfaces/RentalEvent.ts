import { TWeekday } from '../types/Weekday';
import { IOptionalDuration } from './Duration';
import { IRentalProduct } from './Product';
import { EventType, RentalEventFrequencyType } from '../enums';

export type TRentalEvent = IRentalOneTimeEvent | IRentalRecurringEvent;

export interface IRentalAvailableDate {
  date: Date;
  availablePlaces: number;
  isMinPurchaseTimeValid: boolean;
  isMaxPurchaseTimeValid: boolean;
  isAvailableByTime: boolean;
}

export interface IRentalEvent {
  id: string;
  type: EventType;
  quantity: number;
  startTime: string;
  endTime: string;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  availableDates: IRentalAvailableDate[];
  availableDays: [Date];
  product: IRentalProduct;
}

export interface IRentalOneTimeEvent extends IRentalEvent {
  type: EventType.ONE_TIME;
  startDate: Date;
  endDate?: Date;
}

export interface IRentalRecurringEvent extends IRentalEvent {
  type: EventType.RECURRING;
  freq: RentalEventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  dtstart: Date;
  until: Date;
  exdate?: Date[];
  tzid?: string;
}
