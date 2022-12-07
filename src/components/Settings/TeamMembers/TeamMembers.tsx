import React from 'react';

import { CountBadge } from './components';
import TeamMembersLayout from './TeamMembersLayout';
import { BarLayout, Button, FullTabBarLayout, PageActionsPortal, Tab, Tabs } from '@components/common';

// import { IShop } from 'src/shared/interfaces';
// import { useApollo } from 'src/lib/apolloClient';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { usersLengthByTab, usersTableByActiveTab } from './helpers';
// import { USERS_FIELDS } from 'src/graphql/fragments/users';

export enum InvitationStatusType {
  TEAMMATES = 'TEAMMATES',
  INVITE_SENT = 'INVITE_SENT',
}

const tabs = [InvitationStatusType.TEAMMATES, InvitationStatusType.INVITE_SENT];

const getTabName = {
  [InvitationStatusType.TEAMMATES]: 'Teammates',
  [InvitationStatusType.INVITE_SENT]: 'Invite sent',
};

const TeamMembers = () => {
  // const client = useApollo();
  const { shop } = React.useContext(ShopContext);

  // const users: IShop | null = client.cache.readFragment({
  //   id: `Shop:${shop?.id}`,
  //   fragment: USERS_FIELDS,
  //   fragmentName: 'UsersFields',
  // });

  const { handleOpenModal } = React.useContext(ModalContext);

  const [activeTab, setActiveTab] = React.useState<InvitationStatusType>(tabs[0]);

  const handleOpenAddTeamMemberModal = () => {
    handleOpenModal({
      type: ModalType.ADD_TEAM_MEMBER,
    });
  };

  const usersByTab = { shopUsers: shop?.users, invitedUsers: shop?.invitedUsers };

  return (
    <TeamMembersLayout
      tabsBar={
        <Tabs value={activeTab} onChange={setActiveTab} Layout={BarLayout}>
          {tabs.map((tab, index) => (
            <Tab key={tab} value={tab} Layout={<FullTabBarLayout index={index} length={tabs.length} key={index} />}>
              {getTabName[tab]}
              <CountBadge isActive={tab === activeTab} usersLength={usersLengthByTab(usersByTab)[tab]} />
            </Tab>
          ))}
        </Tabs>
      }
      usersTable={usersTableByActiveTab(usersByTab)[activeTab]}
      actions={
        <PageActionsPortal
          actions={[
            <Button onClick={handleOpenAddTeamMemberModal} key="1" variant="contained" color="primary">
              New User
            </Button>,
          ]}
        />
      }
    />
  );
};

export default TeamMembers;
