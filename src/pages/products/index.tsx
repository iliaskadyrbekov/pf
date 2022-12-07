import React from 'react';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS, ProductsSubMenu } from '@components/Menu/';
import { AppLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { Products } from '@components/Products';
import { TWithProductsHandlerProps, withProductsMenu } from 'src/lib/withProductsMenu';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop } = props;

  try {
    return handler(props);
  } catch (err) {
    return {
      redirect: { destination: `/`, permanent: false },
      props: { user, shop },
    };
  }
};

const resoveFn = async ({ user, shop, client }: TWithProductsHandlerProps) => {
  return { props: { user, shop, initialApolloState: client.cache.extract() } };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(withProductsMenu(resoveFn)));

const ProductsPage = () => {
  return <Products />;
};

const ProductsPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['PRODUCTS']} SubMenu={<ProductsSubMenu />}>
    {page}
  </AppLayout>
);
ProductsPage.getLayout = ProductsPageLayout;

export default ProductsPage;
