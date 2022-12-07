import { EPaymentStatus } from 'src/shared/enums';

export enum GeneralPaymentStatus {
  ALL_PAID = 'ALL_PAID',
  NOT_ALL_PAID = 'NOT_ALL_PAID',
  ALL_UNPAID = 'ALL_UNPAID',
}

export const getGeneralPaymentStatus = (paymentStatus: EPaymentStatus, prevPaymentStatus?: GeneralPaymentStatus) => {
  switch (paymentStatus) {
    case EPaymentStatus.PAID:
    case EPaymentStatus.FREE:
      if (!prevPaymentStatus || prevPaymentStatus === GeneralPaymentStatus.ALL_PAID) {
        return GeneralPaymentStatus.ALL_PAID;
      }

      return GeneralPaymentStatus.NOT_ALL_PAID;
    case EPaymentStatus.PARTLY_PAID:
      return GeneralPaymentStatus.NOT_ALL_PAID;
    default:
      if (!prevPaymentStatus || prevPaymentStatus === GeneralPaymentStatus.ALL_UNPAID) {
        return GeneralPaymentStatus.ALL_UNPAID;
      } else {
        return GeneralPaymentStatus.NOT_ALL_PAID;
      }
  }
};
