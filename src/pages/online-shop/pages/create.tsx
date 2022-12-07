import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import CloseIcon from '@components/Icons/CloseIcon';
import { CreateCustomPage } from '@components/OnlineShop';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { withUserCheck } from 'src/lib/withUserCheck';
import { initializeApollo } from 'src/lib/apolloClient';
import { IPageMetaRes, PAGE_META } from 'src/graphql/queries/pageMeta';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop }) => {
  try {
    const client = initializeApollo(null, req);

    await client.query<IPageMetaRes>({ query: PAGE_META });

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

const CreateCustomPages = () => {
  const router = useRouter();

  const handleBack = React.useCallback(async () => {
    await router.push('/online-shop/pages');
  }, [router]);

  return (
    <PageContentLayout
      header={<PageHeaderLayout title="Add page" goBack={<CloseIcon onClick={handleBack} />} />}
      content={<CreateCustomPage />}
    />
  );
};

const CreateCustomPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);

CreateCustomPages.getLayout = CreateCustomPageLayout;

export default CreateCustomPages;
