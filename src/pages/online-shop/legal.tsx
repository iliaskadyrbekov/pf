import React from 'react';
import { GetServerSideProps } from 'next';

import { MENU_ITEMS } from '@components/Menu/';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { IHandlerProps, THandler, withUserCheck } from 'src/lib/withUserCheck';
import { Legal } from '@components/OnlineShop';
import { OnlineShopSubMenu } from '@components/Menu/OnlineShopSubMenu';

const withErrorCatch = (handler: THandler) => async (props: IHandlerProps) => {
  const { user, shop } = props;

  try {
    return handler(props);
  } catch (err) {
    return {
      redirect: { destination: `/online-shop`, permanent: false },
      props: { user, shop },
    };
  }
};

const resolveFn = async ({ user, shop }: IHandlerProps) => {
  return { props: { user, shop } };
};

export const getServerSideProps: GetServerSideProps = withUserCheck(withErrorCatch(resolveFn));

const LegalPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Legal" />} content={<Legal />} />;
};

const LegalPageLayout = (page: React.ReactNode) => (
  <AppLayout menuItem={MENU_ITEMS['ONLINE_SHOP']} SubMenu={<OnlineShopSubMenu />}>
    {page}
  </AppLayout>
);
LegalPage.getLayout = LegalPageLayout;

export default LegalPage;
