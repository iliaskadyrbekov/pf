import React from 'react';

import { NameCell } from '../NameCell';
import { Table } from '@components/common';

import { shopRoleToString } from '../../helpers';
import { IShopUserWithRole } from 'src/shared/interfaces';

interface ITeammatesTableProps {
  users?: IShopUserWithRole[];
}

const TeammatesTable = ({ users = [] }: ITeammatesTableProps) => {
  const tableHeadRow = [
    {
      label: 'NAME',
      accessor: (user: IShopUserWithRole) => ({ email: user.user?.email, profile: user.user.profile }),
      renderCell: NameCell,
    },
    {
      label: 'ROLE',
      accessor: (user: IShopUserWithRole) => shopRoleToString[user?.shopRole],
    },
  ];

  return <Table headRow={tableHeadRow} items={users} emptyValue="-" />;
};

export default TeammatesTable;
