import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CalendarIcon, ScaleIcon } from '@heroicons/react/outline';

import BookingsSubMenuLayout from './BookingsSubMenuLayout';
import { FullTabLayout, Tab, Tabs } from '@components/common';
import { AccommodationIcon, RentalsIcon, TicketIcon } from '@components/Icons';

const BOOKING_TABS = [
  {
    Icon: TicketIcon,
    name: 'Ticket',
    link: '/bookings/ticket',
  },
  {
    Icon: RentalsIcon,
    name: 'Rental',
    link: '/bookings/rental',
  },
  {
    Icon: AccommodationIcon,
    name: 'Accommodation',
    link: '/bookings/accommodation',
  },
  {
    Icon: CalendarIcon,
    name: 'Orders',
    link: '/bookings/orders',
  },
  {
    Icon: ScaleIcon,
    name: 'VAT Report',
    link: '/bookings/vat-report',
  },
];

const BookingsSubMenu = () => {
  const router = useRouter();

  return (
    <BookingsSubMenuLayout>
      <Tabs value={router.asPath} isSelected={(v) => !!router.asPath.match(v)}>
        {BOOKING_TABS.map(({ Icon, name, link }) => (
          <Tab key={link} value={link} Layout={FullTabLayout}>
            <Link href={link}>
              <a className="flex py-4 px-4 space-x-3 justify-center">
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </a>
            </Link>
          </Tab>
        ))}
      </Tabs>
    </BookingsSubMenuLayout>
  );
};

export default BookingsSubMenu;
