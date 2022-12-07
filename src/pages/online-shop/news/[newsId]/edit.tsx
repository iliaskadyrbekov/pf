import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { ShopContext } from 'src/context';
import { MENU_ITEMS } from '@components/Menu/';
import { EditNews } from '@components/OnlineShop';
import CloseIcon from '@components/Icons/CloseIcon';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { withUserCheck } from 'src/lib/withUserCheck';
import { initializeApollo } from 'src/lib/apolloClient';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { INewsMetaRes, NEWS_META } from 'src/graphql/queries/newsMeta';
import { ISingleNewsRes, ISingleNewsVars, SINGLE_NEWS, useSingleNewsQuery } from 'src/graphql/queries/singleNews';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ req, user, shop, query }) => {
  try {
    const client = initializeApollo(null, req);

    await client.query<INewsMetaRes>({ query: NEWS_META });

    const { data } = await client.query<ISingleNewsRes, ISingleNewsVars>({
      query: SINGLE_NEWS,
      variables: {
        id: query.newsId as string,
        shopId: shop?.id,
        withDraft: true,
      },
    });

    if (!data.singleNews) {
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

const EditNewsPage = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { data: singleNewsData } = useSingleNewsQuery({
    id: router.query.newsId as string,
    shopId: shop?.id,
    withDraft: true,
  });

  const handleBack = React.useCallback(async () => {
    await router.push('/online-shop/news');
  }, [router]);

  const name = singleNewsData?.singleNews.name;
  const currentArticleName = name ? getMultiLanguageValue(name) : '';

  return (
    <PageContentLayout
      header={
        <PageHeaderLayout title={`Edit article: ${currentArticleName}`} goBack={<CloseIcon onClick={handleBack} />} />
      }
      content={<EditNews />}
    />
  );
};

const EditNewsPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);

EditNewsPage.getLayout = EditNewsPageLayout;

export default EditNewsPage;
