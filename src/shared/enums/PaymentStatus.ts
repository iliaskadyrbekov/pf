import { TColor } from '@components/common/Badge/Badge';

export enum EPaymentStatus {
  WAITING = 'WAITING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  FREE = 'FREE',

  DRAFT = 'DRAFT',
  PARTLY_PAID = 'PARTLY_PAID',
  CANCELED = 'CANCELED',
  REFUNDED = 'REFUNDED',
}

export const badgeColorByPaymentStatus: Record<EPaymentStatus, TColor> = {
  [EPaymentStatus.PAID]: 'green',
  [EPaymentStatus.FREE]: 'green',
  [EPaymentStatus.WAITING]: 'blue',
  [EPaymentStatus.PROCESSING]: 'blue',

  [EPaymentStatus.DRAFT]: 'yellow',
  [EPaymentStatus.PARTLY_PAID]: 'blue',
  [EPaymentStatus.CANCELED]: 'red',
  [EPaymentStatus.REFUNDED]: 'red',
};

export const labelByPaymentStatus = {
  [EPaymentStatus.PAID]: 'Paid',
  [EPaymentStatus.WAITING]: 'Waiting',
  [EPaymentStatus.PROCESSING]: 'Authorizing',
  [EPaymentStatus.FREE]: 'Free',

  [EPaymentStatus.DRAFT]: 'Draft',
  [EPaymentStatus.PARTLY_PAID]: 'Partly paid',
  [EPaymentStatus.CANCELED]: 'Cancelled',
  [EPaymentStatus.REFUNDED]: 'Refunded',
};
