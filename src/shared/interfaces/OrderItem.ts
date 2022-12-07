import { IAccommodationProduct, IAreaResource } from '.';
import { CHECKOUT_FORM_FIELD_TYPE } from '../enums/CheckoutFormFieldType';
import { OrderItemStatus } from '../enums/OrderItemStatus';
import { OrderItemType } from '../enums/OrderItemType';
import { EPaymentStatus } from '../enums/PaymentStatus';
import { IAccommodationEvent } from './AccommodationEvent';
import { IDiscount } from './Discount';
import { IEvent, TNewTicketEvent } from './TicketEvent';
import { MultiLanguageField } from './MultiLanguageField';
import { IOrder } from './Order';
import { IGiftCardProduct } from './Product';
import { TRentalEvent } from './RentalEvent';
import { IVAT } from './Shop';

export type TOrderItem = ITicketOrderItem | IRentalOrderItem | IGiftCardOrderItem | IAccommodationOrderItem;

export interface IOrderItem {
  orderItem: TOrderItem;
  event: TRentalEvent | IEvent;
  order: IOrder;
}

export interface IAssignee {
  fullName: string;
  phone: string;
  email: string;
}

export interface IBaseOrderItem {
  shortId: string;
  id: string;
  type: OrderItemType;
  status: OrderItemStatus;
  paymentStatus: EPaymentStatus;
  purchased: Date;
  discount?: IDiscount;
  assignee?: IAssignee;
  VAT?: IVAT;
}

export interface IOrderItemCheckoutFormField {
  type: CHECKOUT_FORM_FIELD_TYPE;
  name: MultiLanguageField[];
}

export interface IOrderItemCheckoutFormCommonField extends IOrderItemCheckoutFormField {
  type: Exclude<CHECKOUT_FORM_FIELD_TYPE, CHECKOUT_FORM_FIELD_TYPE.CALENDAR>;
  value: string;
}

export interface IOrderItemCheckoutFormCalendarField extends IOrderItemCheckoutFormField {
  type: CHECKOUT_FORM_FIELD_TYPE.CALENDAR;
  dateValue: Date;
}

export type TOrderItemCheckoutFormField = IOrderItemCheckoutFormCommonField | IOrderItemCheckoutFormCalendarField;

export interface ITicketOrderItemPricing {
  name: MultiLanguageField[];
  price: number;
}

export interface ITicketOrderItem extends IBaseOrderItem {
  order: IOrder;
  type: OrderItemType.TICKET;
  date: Date;
  dateEnd: Date;
  checkoutForm: [TOrderItemCheckoutFormField];
  isRegistered: boolean;
  pricing: ITicketOrderItemPricing;
  event: TNewTicketEvent;
}

export interface IGiftCardOrderItem extends IBaseOrderItem {
  order: IOrder;
  type: OrderItemType.GIFT_CARD;
  checkoutForm: [TOrderItemCheckoutFormField];
  pricing: ITicketOrderItemPricing;
  product: IGiftCardProduct;
}

export interface IRentalOrderItemPricing {
  id: string;
  name: MultiLanguageField[];
  duration: Duration;
  price: number;
}

export interface IRentalOrderItem extends IBaseOrderItem {
  type: OrderItemType.RENTAL;
  order: IOrder;
  date: Date;
  dateEnd: Date;
  event: TRentalEvent;
  checkoutForm: [TOrderItemCheckoutFormField];
  checkOut: boolean;
  checkIn: boolean;
  pricing: IRentalOrderItemPricing;
}

export interface IAccommodationOrderItemPricing {
  id: string;
  name: MultiLanguageField[];
  price: number;
}

export interface IAccommodationOrderItem extends IBaseOrderItem {
  type: OrderItemType.ACCOMMODATION;
  order: IOrder;
  date: Date;
  dateEnd: Date;
  events: IAccommodationEvent[];
  product: IAccommodationProduct;
  checkoutForm: [TOrderItemCheckoutFormField];
  checkOut: boolean;
  checkIn: boolean;
  pricing: IAccommodationOrderItemPricing;
  resource?: IAreaResource;
}
