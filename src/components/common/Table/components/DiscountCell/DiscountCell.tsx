import React from 'react';

import { CellLayout } from '@components/common/Table/components';
import { IDiscount } from 'src/shared/interfaces/Discount';
import { AmountOrPercentageInput } from '@components/common/AmountOrPercentageInput';

interface IDiscountCellProps {
  value: IDiscount;
  onChange(discout: IDiscount): void;
  maxByAmount?: number;
}

const DiscountCell = ({ onChange, value, maxByAmount }: IDiscountCellProps) => {
  return (
    <CellLayout className="w-40">
      <AmountOrPercentageInput onChange={onChange} value={value} maxByAmount={maxByAmount} />
    </CellLayout>
  );
};

export default DiscountCell;
