import { TWeekday } from '../types/Weekday';
import { IDuration } from './Duration';
import { ITicketProduct, TProduct } from './Product';
import { EventFrequencyType, EventType } from '../enums';
import { IConnectedAvailabilityResource } from './ConnectedAvailabilityResource';

export interface IBaseEvent {
  id: string;
  type: EventType;
  allDay: boolean;
  quantity: number;
  availability: number;
  minPurchase: number;
  maxPurchase: number;
  minPurchaseTime: IDuration;
  maxPurchaseTime: IDuration;
  connectedResources: IConnectedAvailabilityResource[];
}

export interface IOneTimeEvent extends IBaseEvent {
  type: EventType.ONE_TIME;
  startDate: Date;
  endDate: Date;
}

export interface IRecurringEvent extends IBaseEvent {
  type: EventType.RECURRING;
  freq: EventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  dtstart: Date;
  until?: Date;
  exdate?: Date[];
  tzid?: string;
}

export type TEvent = IOneTimeEvent | IRecurringEvent;

export interface ITicketAvailableDate {
  date: Date;
  availablePlaces: number;
  isMinPurchaseTimeValid: boolean;
  isMaxPurchaseTimeValid: boolean;
}

export interface IEvent {
  availableDates: ITicketAvailableDate[];
  event: TEvent;
  product: TProduct;
}

export interface INewTicketBaseEvent {
  id: string;
  type: EventType;
  quantity: number;
  availability?: number;
  allDay: boolean;
  minPurchase: number;
  maxPurchase: number;
  minPurchaseTime: IDuration;
  maxPurchaseTime: IDuration;
  availableDates: ITicketAvailableDate[];
  product: ITicketProduct;
}

export interface INewTicketOneTimeEvent extends INewTicketBaseEvent {
  type: EventType.ONE_TIME;
  startDate: Date;
  endDate: Date;
}

export interface INewTicketRecurringEvent extends INewTicketBaseEvent {
  type: EventType.RECURRING;
  freq: EventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  dtstart: Date;
  until?: Date;
  exdate?: number;
}

export type TNewTicketEvent = INewTicketOneTimeEvent | INewTicketRecurringEvent;
