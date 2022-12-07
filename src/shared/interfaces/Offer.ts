import { IOrder } from './Order';

interface IPartialPayment {
  firstPaymentAmount: number;
  endPaymentDate: Date;
  endPaymentReminderDate: Date;
}

export interface IOffer {
  id: string;
  expiresAt: Date;
  createdAt: Date;
  updateAt: Date;
  order: IOrder;
  partialPayment?: IPartialPayment;
}
