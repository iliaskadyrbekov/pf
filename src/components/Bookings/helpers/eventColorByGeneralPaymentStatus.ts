import { BOOKINGS_EVENT_COLORS } from './bookingEventColors';
import { GeneralPaymentStatus } from './getGeneralPaymentStatus';

export const eventColorByGeneralPaymentStatus = (paymentStatus: GeneralPaymentStatus) => {
  switch (paymentStatus) {
    case GeneralPaymentStatus.ALL_PAID:
      return BOOKINGS_EVENT_COLORS.green;
    case GeneralPaymentStatus.NOT_ALL_PAID:
      return BOOKINGS_EVENT_COLORS.yellow;
    case GeneralPaymentStatus.ALL_UNPAID:
      return BOOKINGS_EVENT_COLORS.red;
  }
};
