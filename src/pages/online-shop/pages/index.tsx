import React from 'react';
import { GetServerSideProps } from 'next';

import { CustomPages } from '@components/OnlineShop';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { MENU_ITEMS } from '@components/Menu/';
import { withUserCheck } from 'src/lib/withUserCheck';
import { initializeApollo } from 'src/lib/apolloClient';
import { IListPageRes, IListPageVars, LIST_PAGE } from 'src/graphql/queries/listPage';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop }) => {
  try {
    const client = initializeApollo(null, req);

    const { data } = await client.query<IListPageRes, IListPageVars>({
      query: LIST_PAGE,
      variables: { shopId: shop?.id, withDraft: true },
    });

    if (!data.listPage) {
      return {
        props: { user, shop },
        redirect: { destination: '/online-shop', permanent: false },
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
      redirect: { destination: '/online-shop', permanent: false },
    };
  }
});

const CustomPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Pages" />} content={<CustomPages />} />;
};

const CustomPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);

CustomPage.getLayout = CustomPageLayout;

export default CustomPage;
