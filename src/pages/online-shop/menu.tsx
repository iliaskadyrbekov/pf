import React from 'react';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { Menu } from '@components/OnlineShop';
import { initializeApollo } from 'src/lib/apolloClient';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { ACTIVITIES, IActivitiesRes, IActivitiesVars } from 'src/graphql/queries/activities';
import { IMenuItemsRes, IMenuItemsVars, MENU_ITEMS as MENU_ITEMS_QUERY } from 'src/graphql/queries/menuItems';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop }) => {
  try {
    const client = initializeApollo(null, req);

    await client.query<IActivitiesRes, IActivitiesVars>({
      query: ACTIVITIES,
      variables: { shopId: shop?.id },
    });

    await client.query<IMenuItemsRes, IMenuItemsVars>({
      query: MENU_ITEMS_QUERY,
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
      redirect: { destination: `/online-shop`, permanent: false },
    };
  }
});

const MenuPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Menu" />} content={<Menu />} />;
};

const MenuPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);
MenuPage.getLayout = MenuPageLayout;

export default MenuPage;
