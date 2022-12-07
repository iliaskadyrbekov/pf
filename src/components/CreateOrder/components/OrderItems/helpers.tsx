import React from 'react';

import { AccommodationProductCell, GiftCardProductCell, RentalProductCell, TicketProductCell } from './components';

import { OrderItemType } from 'src/shared/enums';
import { FormLanguageContext } from 'src/context';
import {
  IAccommodationOrderItem,
  IGiftCardOrderItem,
  IOrderItem,
  IRentalOrderItem,
  ITicketOrderItem,
  MultiLanguageField,
} from 'src/shared/interfaces';
import { getDiscountPrice } from 'src/helpers';
import { createOrPush } from '@utils/createOrPush';

export const getPriceWithCurrency = (price: number, currency: string) => `${price} ${currency}`;

export const getOrderSum = (orderItems: IOrderItem[]) => {
  return orderItems.reduce(
    (acc, { orderItem }: IOrderItem) => acc + getDiscountPrice(orderItem.pricing.price, orderItem.discount),
    0,
  );
};

export const getTicketCode = (
  { type, pricing, event, date }: ITicketOrderItem,
  getMultiLanguageValue: (name: MultiLanguageField[]) => string,
) => `${type}.${getMultiLanguageValue(pricing.name)}.${pricing.price}${event.id}.${date}`;

export const getRentalCode = ({ type, pricing, event, date }: IRentalOrderItem) =>
  `${type}.${pricing.id}.${event.id}.${date}`;

export const getGiftCardCode = ({ type, product }: IGiftCardOrderItem) => `${type}.${product.id}`;

export const getAccommodationCode = (
  { type, pricing, product, date, dateEnd }: IAccommodationOrderItem,
  getMultiLanguageValue: (name: MultiLanguageField[]) => string,
) => `${type}.${getMultiLanguageValue(pricing.name)}.${pricing.price}.${product.id}.${date}.${dateEnd}`;

export const getCodeByType = ({ orderItem }: IOrderItem) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  switch (orderItem.type) {
    case OrderItemType.TICKET:
      return getTicketCode(orderItem, getMultiLanguageValue);
    case OrderItemType.RENTAL:
      return getRentalCode(orderItem);
    case OrderItemType.ACCOMMODATION:
      return getAccommodationCode(orderItem, getMultiLanguageValue);
    case OrderItemType.GIFT_CARD:
      return getGiftCardCode(orderItem);
    default:
      return '';
  }
};

export const getInfoCell = ({ orderItem }: IOrderItem) => {
  switch (orderItem.type) {
    case OrderItemType.TICKET:
      return <TicketProductCell key={`${orderItem.id}-info`} orderItem={orderItem} />;
    case OrderItemType.RENTAL:
      return <RentalProductCell key={`${orderItem.id}-info`} orderItem={orderItem} />;
    case OrderItemType.GIFT_CARD:
      return <GiftCardProductCell key={`${orderItem.id}-info`} orderItem={orderItem} />;
    case OrderItemType.ACCOMMODATION:
      return <AccommodationProductCell key={`${orderItem.id}-info`} orderItem={orderItem} />;
  }
};

export const getGroupedOrderItems = (items: IOrderItem[]) =>
  items.reduce<{ [key: string]: IOrderItem[] }>((acc, cur) => {
    const code = getCodeByType(cur);

    return createOrPush(acc, code, cur);
  }, {});
