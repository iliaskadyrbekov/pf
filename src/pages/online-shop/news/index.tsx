import React from 'react';
import { GetServerSideProps } from 'next';

import { News } from '@components/OnlineShop';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { MENU_ITEMS } from '@components/Menu/';
import { withUserCheck } from 'src/lib/withUserCheck';
import { initializeApollo } from 'src/lib/apolloClient';
import { IListNewsRes, IListNewsVars, LIST_NEWS } from 'src/graphql/queries/listNews';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop }) => {
  try {
    const client = initializeApollo(null, req);

    const { data } = await client.query<IListNewsRes, IListNewsVars>({
      query: LIST_NEWS,
      variables: { shopId: shop?.id, withDraft: true },
    });

    if (!data.listNews) {
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

const NewsPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="News" />} content={<News />} />;
};

const NewsPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);

NewsPage.getLayout = NewsPageLayout;

export default NewsPage;
