import React from 'react';
import { IVATReportOrderedProduct } from 'src/shared/interfaces/VATReport';

import { Widget } from './components';
import WidgetsLayout from './WidgetsLayout';

interface IWidgetsProps {
  items: IVATReportOrderedProduct[];
  amount?: number;
  processingFees?: number;
  applicationFees?: number;
}

interface ITotalValues {
  totalVATFees: number;
}

const Widgets = ({ amount, processingFees, applicationFees, items }: IWidgetsProps) => {
  const totalsByCurrencies = items.reduce((acc, cur) => {
    if (acc[cur.currency]) {
      acc[cur.currency] = {
        totalVATFees: acc[cur.currency].totalVATFees + cur.VATFee,
      };
    } else {
      acc[cur.currency] = {
        totalVATFees: cur.VATFee,
      };
    }

    return acc;
  }, {} as Record<string, ITotalValues>);

  const defaultTotals = { totalVATFees: 0 };
  const [currency, { totalVATFees }] = Object.entries(totalsByCurrencies)[0] || ['', defaultTotals];
  const totalAmount = amount || 0;
  const totalProcessingFees = (processingFees || 0) + (applicationFees || 0);
  const incomeAfterVAT = totalAmount - totalVATFees;

  return (
    <WidgetsLayout>
      <Widget title="Total amount" value={`${currency} ${totalAmount.toFixed(2)}`} />
      <Widget title="Total VAT Fees" value={`${currency} ${totalVATFees.toFixed(2)}`} />
      <Widget title="Income after VAT" value={`${currency} ${incomeAfterVAT.toFixed(2)}`} />
      <Widget title="Total processing fees" value={`${currency} ${totalProcessingFees.toFixed(2)}`} />
    </WidgetsLayout>
  );
};

export default Widgets;
