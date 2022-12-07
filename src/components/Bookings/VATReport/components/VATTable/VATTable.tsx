import React from 'react';

import { Table } from '@components/common/Table';
import { IVATReportOrderedProduct } from 'src/shared/interfaces/VATReport';
import { IncomeCell } from '../IncomeCell';
import { NumberCell } from '../NumberCell';
import { ProductCell } from '../ProductCell';

interface IVATTableProps {
  items: IVATReportOrderedProduct[];
}

const VATTable = ({ items }: IVATTableProps) => {
  const tableHeadRow = [
    { label: 'PRODUCT', renderCell: ProductCell },
    { label: 'UNITS', accessor: 'units', renderCell: NumberCell },
    {
      label: 'AMOUNT',
      accessor: (item: IVATReportOrderedProduct) => `${item.currency} ${item.amount}`,
      renderCell: NumberCell,
    },
    { label: 'VAT RATE', accessor: (item: IVATReportOrderedProduct) => `${item.VATRate}%`, renderCell: NumberCell },
    {
      label: 'VAT FEE',
      accessor: (item: IVATReportOrderedProduct) => `${item.currency} ${item.VATFee.toFixed(2)}`,
      renderCell: NumberCell,
    },
    { label: 'INCOME AFTER VAT', renderCell: IncomeCell },
  ];

  return <Table headRow={tableHeadRow} items={items} />;
};

export default VATTable;
