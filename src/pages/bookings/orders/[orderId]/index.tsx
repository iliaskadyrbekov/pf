import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { MENU_ITEMS } from '@components/Menu/';
import { AppWithHorizontalSubMenuLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { BookingsSubMenu } from '@components/Menu/BookingsSubMenu';
import { ORDER, IOrderRes, IOrderVars, useOrderQuery } from 'src/graphql/queries/order';
import CloseIcon from '@components/Icons/CloseIcon';
import { withApolloClient } from 'src/lib/withApolloClient';
import { Badge } from '@components/common/Badge';
import { CreateOrder } from '@components/CreateOrder';
import { ViewOrder } from '@components/ViewOrder';
import { useRouter } from 'next/router';
import { badgeColorByOrderStatus, labelByOrderStatus, EOrderStatus } from 'src/shared/enums/OrderStatus';
import {
  ICheckoutOrderItemsRes,
  ICheckoutOrderItemsVars,
  CHECKOUT_ORDER_ITEMS,
} from '@components/Modals/CreateOrderItemModal/queries/checkoutOrderItems';

export const getServerSideProps: GetServerSideProps = withUserCheck(
  withApolloClient(async ({ user, shop, query, client }) => {
    try {
      const { data } = await client.query<IOrderRes, IOrderVars>({
        query: ORDER,
        variables: { id: query?.orderId as string },
      });

      await client.query<ICheckoutOrderItemsRes, ICheckoutOrderItemsVars>({
        query: CHECKOUT_ORDER_ITEMS,
        variables: {
          orderId: query?.orderId as string,
        },
      });

      if (!data?.order) {
        return {
          redirect: { destination: `/bookings/orders`, permanent: false },
          props: {
            user,
            shop,
          },
        };
      }

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
        redirect: { destination: `/bookings/orders`, permanent: false },
      };
    }
  }),
);

const OrderDetailsPage = () => {
  const router = useRouter();
  const { data } = useOrderQuery({ id: router.query.orderId as string });

  React.useEffect(() => {
    window.Intercom && window.Intercom('update', { hide_default_launcher: true });

    return () => {
      window.Intercom && window.Intercom('update', { hide_default_launcher: false });
    };
  }, []);

  const order = data?.order;

  if (!order) {
    return null;
  }

  const Status = (
    <Badge variant="contained" color={badgeColorByOrderStatus[order.status]}>
      {labelByOrderStatus[order.status]}
    </Badge>
  );

  const GoBack = (
    <Link href="/bookings/orders">
      <a>
        <CloseIcon />
      </a>
    </Link>
  );

  const pageHeaderTitleByOrderStatus = (status: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.DRAFT:
      case EOrderStatus.OPEN_ORDER:
        return 'New order';
      default:
        return 'Order';
    }
  };

  const Header = (
    <PageHeaderLayout title={pageHeaderTitleByOrderStatus(order.status)} goBack={GoBack} status={Status} />
  );

  switch (order.status) {
    case EOrderStatus.DRAFT:
    case EOrderStatus.OPEN_ORDER:
    case EOrderStatus.DEPOSIT_REOPENED:
      return <PageContentLayout header={Header} content={<CreateOrder />} />;
    default:
      return <PageContentLayout header={Header} content={<ViewOrder />} />;
  }
};

const OrderDetailsPageLayout = (page: React.ReactNode) => (
  <AppWithHorizontalSubMenuLayout menuItem={MENU_ITEMS['BOOKINGS']} SubMenu={<BookingsSubMenu />}>
    {page}
  </AppWithHorizontalSubMenuLayout>
);
OrderDetailsPage.getLayout = OrderDetailsPageLayout;

export default OrderDetailsPage;
