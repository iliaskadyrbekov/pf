import { GetServerSideProps } from 'next';
import React from 'react';

import { MENU_ITEMS, SubMenu } from '@components/Menu';
import { AppLayout } from 'src/layouts';
import { withUserCheck } from 'src/lib/withUserCheck';
import { ComingSoon } from '@components/ComingSoon';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, shop }) => {
  return { props: { user, shop } };
});

const SettingsPage = () => {
  return <ComingSoon />;
};

const SettingsPageLayout = (page: React.ReactNode) => (
  <AppLayout SubMenu={<SubMenu menuItem={MENU_ITEMS['SETTINGS']} />} menuItem={MENU_ITEMS['SETTINGS']}>
    {page}
  </AppLayout>
);
SettingsPage.getLayout = SettingsPageLayout;

export default SettingsPage;
