import React from 'react';

import { NameCell } from '../NameCell';
import { Table } from '@components/common';

import { IInvitedUser } from 'src/shared/interfaces';

interface IInvitedTableProps {
  users?: IInvitedUser[];
}

const InvitedTable = ({ users = [] }: IInvitedTableProps) => {
  const tableHeadRow = [
    {
      label: 'NAME',
      accessor: (user: IInvitedUser) => ({ email: user.email, profile: user.user?.profile }),
      renderCell: NameCell,
    },
    {
      label: 'ROLE',
      accessor: () => 'Admin',
    },
  ];

  return <Table headRow={tableHeadRow} items={users} emptyValue="-" />;
};

export default InvitedTable;
