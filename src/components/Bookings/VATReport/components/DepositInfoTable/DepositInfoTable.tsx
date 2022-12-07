import React from 'react';

import { Table } from '@components/common';
import { IVATReportDepositInfo } from 'src/shared/interfaces';
import { NumberCell } from '../NumberCell';
import { BoldCell } from '@components/Customers/components';

interface IDepositInfoTableProps {
  depositInfo: IVATReportDepositInfo[];
}

const DepositInfoTable = ({ depositInfo }: IDepositInfoTableProps) => {
  const tableHeadRow = [
    {
      label: 'DEPOSIT',
      accessor: () => 'Deposit',
      renderCell: BoldCell,
    },
    {
      label: 'AMOUNT',
      accessor: (item: IVATReportDepositInfo) => `${item.currency} ${item.value.toFixed(2)}`,
      renderCell: NumberCell,
    },
  ];

  return <Table headRow={tableHeadRow} items={depositInfo} />;
};

export default DepositInfoTable;
