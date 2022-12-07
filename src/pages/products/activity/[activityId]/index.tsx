import { GetServerSideProps } from 'next';
import React from 'react';
import { useRouter } from 'next/router';

import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { ProductsSubMenu, MENU_ITEMS } from '@components/Menu';
import { Activity } from '@components/Products/Activity';
import { PRODUCTS, IProductsRes, IProductsVars, useProductsQuery } from 'src/graphql/queries/product/products.query';
import { getMultiLangFieldValue } from 'src/helpers';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';
import { ACTIVITY, IActivityRes, IActivityVars, useActivityQuery } from 'src/graphql/queries/activity';
import { ShopContext } from 'src/context';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop } = props;
  try {
    return handler(props);
  } catch (err) {
    return {
      redirect: { destination: `/products`, permanent: false },
      props: { user, shop },
    };
  }
};

const resoveFn = async ({ user, shop, params, client }: TWithProductsHandlerProps) => {
  const { data: activityData } = await client.query<IActivityRes, IActivityVars>({
    query: ACTIVITY,
    variables: { id: params.activityId as string, shopId: shop?.id },
  });

  await client.query<IProductsRes, IProductsVars>({
    query: PRODUCTS,
    variables: {
      activityId: params.activityId as string,
      shopId: shop?.id,
    },
  });

  if (!activityData?.activity) {
    return {
      redirect: { destination: '/products', permanent: false },
      props: { user, shop },
    };
  }

  return {
    props: {
      user,
      shop,
      initialApolloState: client.cache.extract(),
    },
  };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const ActivityPage = () => {
  const { query } = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { defaultLang, availableLangs } = React.useContext(FormLanguageContext);

  const { data: activityData } = useActivityQuery({ variables: { shopId: shop?.id, id: query.activityId as string } });
  const { data: productsData } = useProductsQuery({
    variables: {
      activityId: query.activityId as string,
      shopId: shop?.id,
    },
  });

  const activity = activityData?.activity;
  const products = productsData?.products ?? [];

  const title = getMultiLangFieldValue(defaultLang, activity?.name, availableLangs);
  const caption = getMultiLangFieldValue(defaultLang, activity?.description, availableLangs);

  if (!activity) {
    return null;
  }

  return (
    <PageContentLayout
      header={<PageHeaderLayout caption={caption} title={title} />}
      content={<Activity activity={activity} products={products} />}
    />
  );
};

const ActivityPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']} SubMenu={<ProductsSubMenu />}>
    {page}
  </AppLayout>
);
ActivityPage.getLayout = ActivityPageLayout;

export default ActivityPage;
