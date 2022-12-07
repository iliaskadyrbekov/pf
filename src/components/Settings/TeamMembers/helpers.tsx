import React from 'react';
import { InvitationStatusType } from './TeamMembers';

import { InvitedTable, TeammatesTable } from './components';

import { ShopRoleStatus } from 'src/shared/enums/ShopRoleStatusType';
import { IInvitedUser, IShopUserWithRole } from 'src/shared/interfaces';

interface ITabsUsers {
  invitedUsers?: IInvitedUser[];
  shopUsers?: IShopUserWithRole[];
}

export const usersTableByActiveTab = (users: ITabsUsers) => ({
  [InvitationStatusType.TEAMMATES]: <TeammatesTable users={users.shopUsers} />,
  [InvitationStatusType.INVITE_SENT]: <InvitedTable users={users.invitedUsers} />,
});

export const shopRoleToString = {
  [ShopRoleStatus.ADMIN]: 'Admin',
  [ShopRoleStatus.OWNER]: 'Owner',
};

export const usersLengthByTab = (users: ITabsUsers) => ({
  [InvitationStatusType.TEAMMATES]: users.shopUsers?.length || 0,
  [InvitationStatusType.INVITE_SENT]: users.invitedUsers?.length || 0,
});
