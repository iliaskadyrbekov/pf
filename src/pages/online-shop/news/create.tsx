import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import CloseIcon from '@components/Icons/CloseIcon';
import { CreateNews } from '@components/OnlineShop';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { withUserCheck } from 'src/lib/withUserCheck';
import { initializeApollo } from 'src/lib/apolloClient';
import { INewsMetaRes, NEWS_META } from 'src/graphql/queries/newsMeta';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop }) => {
  try {
    const client = initializeApollo(null, req);

    await client.query<INewsMetaRes>({ query: NEWS_META });

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

const CreateNewsPage = () => {
  const router = useRouter();

  const handleBack = React.useCallback(async () => {
    await router.push('/online-shop/news');
  }, [router]);

  return (
    <PageContentLayout
      header={<PageHeaderLayout title="Add article" goBack={<CloseIcon onClick={handleBack} />} />}
      content={<CreateNews />}
    />
  );
};

const CreateNewsPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);
CreateNewsPage.getLayout = CreateNewsPageLayout;

export default CreateNewsPage;
