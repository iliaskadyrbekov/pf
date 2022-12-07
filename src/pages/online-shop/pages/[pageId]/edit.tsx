import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import { EditCustomPage } from '@components/OnlineShop';
import CloseIcon from '@components/Icons/CloseIcon';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { ShopContext } from 'src/context';
import { withUserCheck } from 'src/lib/withUserCheck';
import { initializeApollo } from 'src/lib/apolloClient';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { IPageMetaRes, PAGE_META } from 'src/graphql/queries/pageMeta';
import { ISinglePageRes, ISinglePageVars, SINGLE_PAGE, useSinglePageQuery } from 'src/graphql/queries/singlePage';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop, query }) => {
  try {
    const client = initializeApollo(null, req);

    await client.query<IPageMetaRes>({ query: PAGE_META });

    const { data } = await client.query<ISinglePageRes, ISinglePageVars>({
      query: SINGLE_PAGE,
      variables: {
        id: query.pageId as string,
        shopId: shop?.id,
        withDraft: true,
      },
    });

    if (!data.singlePage) {
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

const EditCustomPages = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { data: singlePageData } = useSinglePageQuery({
    id: router.query.pageId as string,
    shopId: shop?.id,
    withDraft: true,
  });

  const handleBack = React.useCallback(async () => {
    await router.push('/online-shop/pages');
  }, [router]);

  const name = singlePageData?.singlePage.name;
  const currentPageName = name ? getMultiLanguageValue(name) : '';

  return (
    <PageContentLayout
      header={<PageHeaderLayout title={`Edit page: ${currentPageName}`} goBack={<CloseIcon onClick={handleBack} />} />}
      content={<EditCustomPage />}
    />
  );
};

const EditCustomPagesLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);

EditCustomPages.getLayout = EditCustomPagesLayout;

export default EditCustomPages;
