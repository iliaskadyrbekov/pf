import { HistoryEventType } from '../enums/HistoryEventType';
import { OrderHistoryEventEntity } from '../enums/OrderHistoryEventEntity';
import { IOrder, IPaymentResult } from './Order';

export interface IHistoryEvent {
  type: HistoryEventType;
  date: Date;
}

export interface IOrderHistoryEvent extends IHistoryEvent {
  type:
    | HistoryEventType.ORDER_CREATED
    | HistoryEventType.ORDER_COMPLETED
    | HistoryEventType.ORDER_CHECKOUT_SESSION_CREATED
    | HistoryEventType.ORDER_CHECKOUT_SESSION_EXPIRED
    | HistoryEventType.ORDER_PAID_ONLINE_BY_CREDIT_CARD
    | HistoryEventType.ORDER_PAID_BY_GIFT_CARD
    | HistoryEventType.ORDER_ZERO_PAID
    | HistoryEventType.ORDER_CANCELED
    | HistoryEventType.ORDER_REOPENED
    | HistoryEventType.DEPOSIT_PAID_ONLINE_BY_CREDIT_CARD
    | HistoryEventType.ORDER_PAYMENT_SEND_BY_LINK;
  order: IOrder;
  action: string;
  entity: OrderHistoryEventEntity;
}

export interface OrderCheckoutSessionCreatedHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_CHECKOUT_SESSION_CREATED;
  entity: OrderHistoryEventEntity.PAYMENT;
  sessionId: string;
}

export interface OrderCheckoutSessionExpiredHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_CHECKOUT_SESSION_EXPIRED;
  entity: OrderHistoryEventEntity.PAYMENT;
  sessionId: string;
}

export interface OrderPaidOnlineByCreditCardHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_PAID_ONLINE_BY_CREDIT_CARD;
  entity: OrderHistoryEventEntity.PAYMENT;
  payment: IPaymentResult;
}

export interface OrderZeroPaidHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_ZERO_PAID;
  entity: OrderHistoryEventEntity.PAYMENT;
  payment: IPaymentResult;
}

export interface DepositPaidOnlineByCreditCardHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.DEPOSIT_PAID_ONLINE_BY_CREDIT_CARD;
  entity: OrderHistoryEventEntity.PAYMENT;
  payment: IPaymentResult;
}

export interface OrderPaidByGiftCardHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_PAID_BY_GIFT_CARD;
  entity: OrderHistoryEventEntity.PAYMENT;
  payment: IPaymentResult;
}

export interface OrderCreatedHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_CREATED;
  entity: OrderHistoryEventEntity.ORDER;
}

export interface OrderCanceledHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_CANCELED;
  entity: OrderHistoryEventEntity.ORDER;
}

export interface OrderCompletedHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_COMPLETED;
  entity: OrderHistoryEventEntity.ORDER;
}

export interface OrderReopenedHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_REOPENED;
  entity: OrderHistoryEventEntity.ORDER;
}

export interface OrderPaymentSendByLinkHistoryEvent extends IOrderHistoryEvent {
  type: HistoryEventType.ORDER_PAYMENT_SEND_BY_LINK;
  entity: OrderHistoryEventEntity.TRANSMITTED;
}

export type TOrderHistoryEvent =
  | OrderPaymentSendByLinkHistoryEvent
  | OrderCheckoutSessionCreatedHistoryEvent
  | OrderCompletedHistoryEvent
  | OrderCreatedHistoryEvent
  | OrderCanceledHistoryEvent
  | OrderCheckoutSessionExpiredHistoryEvent
  | OrderPaidByGiftCardHistoryEvent
  | DepositPaidOnlineByCreditCardHistoryEvent
  | OrderReopenedHistoryEvent
  | OrderZeroPaidHistoryEvent
  | OrderPaidOnlineByCreditCardHistoryEvent;
