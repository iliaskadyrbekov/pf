import { TColor } from '@components/common/Badge/Badge';

export enum EOrderStatus {
  CHECKOUT_FORM = 'CHECKOUT_FORM',
  IN_CART = 'IN_CART',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',

  DRAFT = 'DRAFT',
  OPEN_ORDER = 'OPEN_ORDER',
  OFFER_SENT = 'OFFER_SENT',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  DEPOSIT_PAID = 'DEPOSIT_PAID',
  DEPOSIT_REOPENED = 'DEPOSIT_REOPENED',
  REMAINING_EXPIRED = 'REMAINING_EXPIRED',
  REMAINING_CANCELLED = 'REMAINING_CANCELLED',
}

export const badgeColorByOrderStatus: Record<EOrderStatus, TColor> = {
  [EOrderStatus.DRAFT]: 'yellow',
  [EOrderStatus.COMPLETED]: 'green',
  [EOrderStatus.OPEN_ORDER]: 'blue',
  [EOrderStatus.CHECKOUT_FORM]: 'blue',
  [EOrderStatus.IN_CART]: 'blue',
  [EOrderStatus.CANCELLED]: 'red',
  [EOrderStatus.FAILED]: 'red',
  [EOrderStatus.OFFER_SENT]: 'purple',
  [EOrderStatus.EXPIRED]: 'red',
  [EOrderStatus.DEPOSIT_PAID]: 'purple',
  [EOrderStatus.REMAINING_EXPIRED]: 'red',
  [EOrderStatus.DEPOSIT_REOPENED]: 'blue',
  [EOrderStatus.REMAINING_CANCELLED]: 'red',
};

export const labelByOrderStatus = {
  [EOrderStatus.DRAFT]: 'Draft',
  [EOrderStatus.COMPLETED]: 'Completed',
  [EOrderStatus.OPEN_ORDER]: 'Open order',
  [EOrderStatus.CHECKOUT_FORM]: 'Chekout form',
  [EOrderStatus.IN_CART]: 'In cart',
  [EOrderStatus.CANCELLED]: 'Cancelled',
  [EOrderStatus.FAILED]: 'Failed',
  [EOrderStatus.OFFER_SENT]: 'Offer sent',
  [EOrderStatus.EXPIRED]: 'Expired',
  [EOrderStatus.DEPOSIT_PAID]: 'Deposit paid',
  [EOrderStatus.REMAINING_EXPIRED]: 'Remaining expired',
  [EOrderStatus.DEPOSIT_REOPENED]: 'Deposit reopened',
  [EOrderStatus.REMAINING_CANCELLED]: 'Remaining cancelled',
};
