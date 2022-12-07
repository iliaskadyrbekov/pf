import { GetServerSideProps } from 'next';
import React from 'react';

import { MENU_ITEMS } from '@components/Menu';
import { AppLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { ComingSoon } from '@components/ComingSoon';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop }) => {
  return { props: { user, shop } };
});

const OnlineShopPage = () => {
  return <ComingSoon />;
};

const OnlineShopPageLayout = (page: React.ReactNode) => (
  <AppLayout SubMenu={<OnlineShopSubMenu />} menuItem={MENU_ITEMS['ONLINE_SHOP']}>
    {page}
  </AppLayout>
);
OnlineShopPage.getLayout = OnlineShopPageLayout;

export default OnlineShopPage;
