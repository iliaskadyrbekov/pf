import { OrderCreatedFrom } from '../enums/OrderCreatedFrom';
import { EOrderStatus } from '../enums/OrderStatus';
import { EPaymentStatus } from '../enums/PaymentStatus';
import { TOrderHistoryEvent } from './HistoryEvent';
import { IOffer } from './Offer';
import { IOrderItem } from './OrderItem';

export interface IBuyer {
  fullName: string;
  phone: string;
  email: string;
  companyName?: string;
  address?: string;
}

export interface IPaymentMethod {
  type: string;
}

export interface IPaymentResult {
  id: string;
  amount: number;
  created: Date;
  currency: { symbolNative: string };
  paymentMethod: IPaymentMethod;
}

export interface IOrder {
  id: string;
  shortId: string;
  status: EOrderStatus;
  orderItems: IOrderItem[];
  paymentStatus: EPaymentStatus;
  payment?: IPaymentResult[];
  historyEvents: TOrderHistoryEvent[];
  createdFrom: OrderCreatedFrom;
  note?: string;
  buyer?: IBuyer;
  offer?: IOffer;
}
