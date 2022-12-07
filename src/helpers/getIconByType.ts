import {
  TicketIcon,
  ServicesIcon,
  RentalsIcon,
  MerchandiseIcon,
  MembershipIcon,
  AccommodationIcon,
} from '@components/Icons';
import { CakeIcon, FlagIcon, GiftIcon } from '@heroicons/react/solid';
import { ActivityType } from 'src/shared/enums/ActivityType';
import { OrderItemType } from 'src/shared/enums/OrderItemType';

type TType = ActivityType | OrderItemType;

export const getIconByType = (type: TType) => {
  switch (type) {
    case ActivityType.TICKET:
      return TicketIcon;
    case ActivityType.SERVICE:
      return ServicesIcon;
    case ActivityType.RENTAL:
      return RentalsIcon;
    case ActivityType.MERCHANDISE:
      return MerchandiseIcon;
    case ActivityType.MEMBERSHIP:
      return MembershipIcon;
    case ActivityType.ACCOMMODATION:
      return AccommodationIcon;
    case ActivityType.ADD_ON_PRODUCTS:
      return CakeIcon;
    case ActivityType.EVENTS:
      return FlagIcon;
    case ActivityType.GIFT_CARD:
      return GiftIcon;
    default:
      return () => null;
  }
};
