import React from 'react';

import { CellLayout } from '@components/common/Table/components';
import PaidOnlineByCreditCardCellLayout from './PaidOnlineByCreditCardCellLayout';

interface IPaidOnlineByCreditCardCellProps {
  action: string;
  paymentId?: string;
  amount: string;
}

const PaidOnlineByCreditCardCell = ({ action, paymentId, amount }: IPaidOnlineByCreditCardCellProps) => {
  return (
    <CellLayout>
      <PaidOnlineByCreditCardCellLayout action={action} paymentId={paymentId} amount={amount} />
    </CellLayout>
  );
};

export default PaidOnlineByCreditCardCell;
