import { AccommodationIcon, MembershipIcon, MerchandiseIcon, RentalsIcon, TicketIcon } from '@components/Icons';
import { FlagIcon, CakeIcon, GiftIcon } from '@heroicons/react/solid';
import { ActivityType } from 'src/shared/enums/ActivityType';

export const ACTIVITIES = [
  {
    Icon: TicketIcon,
    name: 'Tickets',
    type: ActivityType.TICKET,
    description:
      'To manage access and availability to your activities you can use our tickets module to solve your needs.',
    isReady: true,
  },
  {
    Icon: RentalsIcon,
    name: 'Rentals',
    type: ActivityType.RENTAL,
    description:
      'To manage rentals if it’s an bicycle, vehicle or a helmet you can use our rentals module to set it up.',
    isReady: true,
  },
  {
    Icon: AccommodationIcon,
    name: 'Accommodations',
    type: ActivityType.ACCOMMODATION,
    description:
      'Manage your accommodations - if it’s an apartment, cabin, parking or other property related bookings.',
    isReady: true,
  },
  {
    Icon: MerchandiseIcon,
    name: 'Merchandise',
    type: ActivityType.MERCHANDISE,
    description:
      'Sell any kind of merchandises, if it’s a toy, equipment, pizza or a soda using our merchandise module.',
    isReady: false,
  },
  {
    Icon: MembershipIcon,
    name: 'Membership',
    type: ActivityType.MEMBERSHIP,
    description: 'If your business offers membership, we will help you with recurring payments and keep track of them.',
    isReady: false,
  },
  {
    Icon: CakeIcon,
    name: 'Add-on products',
    type: ActivityType.ADD_ON_PRODUCTS,
    description: 'For managing appointments, reservations or pickup of goods - use our services module.',
    isReady: false,
  },
  {
    Icon: FlagIcon,
    name: 'Events',
    type: ActivityType.EVENTS,
    description: 'For managing appointments, reservations or pickup of goods - use our services module.',
    isReady: false,
  },
  {
    Icon: GiftIcon,
    name: 'Gift card',
    type: ActivityType.GIFT_CARD,
    description: 'Create gift cards so your customers can use it on the shop for buying any products',
    isReady: true,
  },
];
