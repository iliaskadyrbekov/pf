import React from 'react';
import { GetServerSideProps } from 'next';

import { TeamMembers } from '@components/Settings';
import { AppLayout, PageContentLayout, PageHeaderLayout } from 'src/layouts';

import { withUserCheck } from 'src/lib/withUserCheck';
import { MENU_ITEMS, SETTINGS_ITEMS, SubMenu } from '@components/Menu';

export const getServerSideProps: GetServerSideProps = withUserCheck(async ({ user, client, shop }) => {
  return { props: { user, shop, initialApolloState: client.cache.extract() } };
});

const TeamMembersPage = () => {
  return <PageContentLayout header={<PageHeaderLayout title="Team members" />} content={<TeamMembers />} />;
};

const TeamMembersPageLayout = (page: React.ReactNode) => (
  <AppLayout
    SubMenu={<SubMenu menuItem={MENU_ITEMS['SETTINGS']} subMenuItem={SETTINGS_ITEMS['TEAM_MEMBERS']} />}
    menuItem={MENU_ITEMS['SETTINGS']}
  >
    {page}
  </AppLayout>
);

TeamMembersPage.getLayout = TeamMembersPageLayout;

export default TeamMembersPage;
