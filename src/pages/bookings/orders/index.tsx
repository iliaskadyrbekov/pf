import React from 'react';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import { AppWithHorizontalSubMenuLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { BookingsSubMenu } from '@components/Menu/BookingsSubMenu';
import { Orders } from '@components/Bookings';
import { IOrdersRes, IOrdersVars, ORDERS } from 'src/graphql/queries/orders';
import { withApolloClient } from 'src/lib/withApolloClient';

export const getServerSideProps: GetServerSideProps = withUserCheck(
  withApolloClient(async ({ user, shop, client }) => {
    try {
      await client.query<IOrdersRes, IOrdersVars>({
        query: ORDERS,
        variables: { shopId: shop?.id },
      });

      return {
        props: {
          user,
          shop,
          initialApolloState: client.cache.extract(),
        },
      };
    } catch (err) {
      return {
        props: { user, shop },
        redirect: { destination: `/bookings`, permanent: false },
      };
    }
  }),
);

const OrdersPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Orders" />} content={<Orders />} />;
};

const OrdersPageLayout = (page: React.ReactNode) => (
  <AppWithHorizontalSubMenuLayout menuItem={MENU_ITEMS['BOOKINGS']} SubMenu={<BookingsSubMenu />}>
    {page}
  </AppWithHorizontalSubMenuLayout>
);
OrdersPage.getLayout = OrdersPageLayout;

export default OrdersPage;
