import { BadgesLayout } from '@components/common/Table/components';
import React from 'react';
import { badgeColorByPaymentStatus, EPaymentStatus, labelByPaymentStatus } from 'src/shared/enums/PaymentStatus';

interface IPaymentCellProps {
  item: EPaymentStatus;
  index: number;
}

const PaymentCell = ({ item, index }: IPaymentCellProps) => {
  return (
    <BadgesLayout variant="contained" className="capitalize" key={index} color={badgeColorByPaymentStatus[item]}>
      {labelByPaymentStatus[item]}
    </BadgesLayout>
  );
};

export default PaymentCell;
