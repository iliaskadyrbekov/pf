import { OrderItemType } from 'src/shared/enums/OrderItemType';
import { EOrderStatus } from 'src/shared/enums/OrderStatus';
import { TOrderItem } from 'src/shared/interfaces';
import { IOrder } from 'src/shared/interfaces/Order';
import { getDiscountPrice } from './getDiscountPrice';

interface IPaymentInfo {
  amount: number;
  currency: {
    symbolNative: string;
  };
}

export const getOrderCurrency = (order?: IOrder, shopCurrency = '') => {
  return order && order.payment && order.status === EOrderStatus.COMPLETED
    ? `${order.payment[0].currency.symbolNative}` // TODO here can be many currencies in payments
    : `${shopCurrency}`;
};

export const getOrderAmount = (order: IOrder) => {
  return order.payment && order.status === EOrderStatus.COMPLETED
    ? getOrderPaid(order.payment)
    : order.orderItems.reduce(
        (acc, cur) => (acc += getDiscountPrice(cur.orderItem.pricing.price, cur.orderItem.discount)),
        0,
      );
};

export const getOrderPaid = (payments?: IPaymentInfo[]) => {
  return payments?.reduce((acc, cur) => (acc += cur.amount), 0) || 0;
};

const getOrderItemPrice = (item: TOrderItem) => {
  return getDiscountPrice(item.pricing.price, item.discount);
};

export const getTotalVAT = (order: IOrder) => {
  return order.status === EOrderStatus.COMPLETED
    ? order.orderItems.reduce(
        (acc, cur) => (acc += ((cur.orderItem.VAT?.value || 0) * getOrderItemPrice(cur.orderItem)) / 100),
        0,
      )
    : order.orderItems.reduce((acc, cur) => {
        switch (cur.orderItem.type) {
          case OrderItemType.TICKET:
            return (acc += ((cur.orderItem.event.product.VAT?.value || 0) * getOrderItemPrice(cur.orderItem)) / 100);
          case OrderItemType.GIFT_CARD:
            return (acc += ((cur.orderItem.product.VAT?.value || 0) * getOrderItemPrice(cur.orderItem)) / 100);
          case OrderItemType.RENTAL:
            return (acc += ((cur.orderItem.event.product.VAT?.value || 0) * getOrderItemPrice(cur.orderItem)) / 100);
          case OrderItemType.ACCOMMODATION:
            return (acc += ((cur.orderItem.product.VAT?.value || 0) * getOrderItemPrice(cur.orderItem)) / 100);
        }
      }, 0);
};
