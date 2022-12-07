import { GetServerSideProps } from 'next';
import React from 'react';

import { MENU_ITEMS } from '@components/Menu';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { Customers } from '@components/Customers';
import { initializeApollo } from 'src/lib/apolloClient';
import { CUSTOMERS, ICustomersRes, ICustomersVars } from '@components/Customers/queries/customers';
import { CustomersSubMenu } from '@components/Menu/CustomersSubMenu';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop, req }) => {
  const client = initializeApollo(null, req);

  await client.query<ICustomersRes, ICustomersVars>({
    query: CUSTOMERS,
    variables: { shopId: shop?.id },
  });

  return { props: { user, shop, initialApolloState: client.cache.extract() } };
});

const CustomersPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Customers" />} content={<Customers />} />;
};

const CustomersPageLayout = (page: React.ReactNode) => (
  <AppLayout SubMenu={<CustomersSubMenu />} menuItem={MENU_ITEMS['CUSTOMERS']}>
    {page}
  </AppLayout>
);
CustomersPage.getLayout = CustomersPageLayout;

export default CustomersPage;
