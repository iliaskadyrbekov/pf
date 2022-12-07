import React from 'react';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import { withUserCheck } from 'src/lib/withUserCheck';
import { BookingsSubMenu } from '@components/Menu/BookingsSubMenu';
import { withApolloClient } from 'src/lib/withApolloClient';
import { TicketBookings } from '@components/Bookings/TicketBookings';
import { AppWithHorizontalSubMenuLayout } from 'src/layouts';

export const getServerSideProps: GetServerSideProps = withUserCheck(
  withApolloClient(async ({ user, shop, client }) => {
    return { props: { user, shop, initialApolloState: client.cache.extract() } };
  }),
);

const TicketBookingsPage = () => {
  return <TicketBookings />;
};

const TicketBookingsPageLayout = (page: React.ReactNode) => (
  <AppWithHorizontalSubMenuLayout menuItem={MENU_ITEMS['BOOKINGS']} SubMenu={<BookingsSubMenu />}>
    {page}
  </AppWithHorizontalSubMenuLayout>
);
TicketBookingsPage.getLayout = TicketBookingsPageLayout;

export default TicketBookingsPage;
