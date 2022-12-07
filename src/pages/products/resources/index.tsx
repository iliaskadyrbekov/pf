import { GetServerSideProps } from 'next';
import React from 'react';

import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { ProductsSubMenu, MENU_ITEMS } from '@components/Menu';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';
import { Resources } from '@components/Resource';
import { IResourcesRes, IResourcesVars, RESOURCES } from 'src/graphql/queries/resources';

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

const resoveFn = async ({ user, shop, client }: TWithProductsHandlerProps) => {
  await client.query<IResourcesRes, IResourcesVars>({
    query: RESOURCES,
    variables: {
      shopId: shop?.id,
    },
  });

  return { props: { user, shop, initialApolloState: client.cache.extract() } };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const ResourcesPage = () => {
  return (
    <PageContentLayout
      header={
        <PageHeaderLayout
          caption="Use resources system to manage your resources or inventory of your products, and you can share the resources between different products to create combo products."
          title="Resources"
        />
      }
      content={<Resources />}
    />
  );
};

const ResourcesPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']} SubMenu={<ProductsSubMenu />}>
    {page}
  </AppLayout>
);
ResourcesPage.getLayout = ResourcesPageLayout;

export default ResourcesPage;
