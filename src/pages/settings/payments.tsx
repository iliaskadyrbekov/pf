import React from 'react';
import { GetServerSideProps } from 'next';

import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { MENU_ITEMS, SETTINGS_ITEMS, SubMenu } from '@components/Menu';
import { Payments } from '@components/Settings';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop }) => {
  return { props: { user, shop } };
});

const LanguagesPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Payments" />} content={<Payments />} />;
};

const LanguagesPageLayout = (page: React.ReactNode) => (
  <AppLayout
    SubMenu={<SubMenu menuItem={MENU_ITEMS['SETTINGS']} subMenuItem={SETTINGS_ITEMS['PAYMENTS']} />}
    menuItem={MENU_ITEMS['SETTINGS']}
  >
    {page}
  </AppLayout>
);
LanguagesPage.getLayout = LanguagesPageLayout;

export default LanguagesPage;
