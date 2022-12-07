import React from 'react';

import { Table } from '@components/common';
import { IVATReportPaymentInfoByPymentMethod } from 'src/shared/interfaces';
import { NumberCell } from '../NumberCell';
import { BoldCell } from '@components/Customers/components';
import { PaymentType } from 'src/shared/enums';

interface IPaymentMethodTableProps {
  items: IVATReportPaymentInfoByPymentMethod[];
}

const PaymentMethodTable = ({ items }: IPaymentMethodTableProps) => {
  const tableHeadRow = [
    {
      label: 'PAYMENT METHOOD',
      accessor: (item: IVATReportPaymentInfoByPymentMethod) => {
        switch (item.type) {
          case PaymentType.STRIPE:
            return 'Stripe';
          case PaymentType.GIFT_CARD: // Shouldn't be invoked
            return 'Gift card';
        }
      },
      renderCell: BoldCell,
    },
    { label: 'TIMES', accessor: 'times', renderCell: NumberCell },
    {
      label: 'COLLECTED',
      accessor: (item: IVATReportPaymentInfoByPymentMethod) => `${item.currency} ${item.collected.toFixed(2)}`,
      renderCell: NumberCell,
    },
    {
      label: 'PROCESSING FEES',
      accessor: (item: IVATReportPaymentInfoByPymentMethod) => `${item.currency} ${item.processingFees.toFixed(2)}`,
      renderCell: NumberCell,
    },
    {
      label: 'APPLICATION FEES',
      accessor: (item: IVATReportPaymentInfoByPymentMethod) => `${item.currency} ${item.applicationFees.toFixed(2)}`,
      renderCell: NumberCell,
    },
  ];

  return <Table headRow={tableHeadRow} items={items} />;
};

export default PaymentMethodTable;
