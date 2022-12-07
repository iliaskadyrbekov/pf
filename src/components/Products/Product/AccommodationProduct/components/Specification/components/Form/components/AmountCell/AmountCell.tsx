import React from 'react';

import { FormField } from '@components/common';
import { Input } from '@components/common/Input';
import { CellLayout } from '@components/Products/Product/components';

import { handleNumberFieldChange } from 'src/helpers';

interface IAmountCellProps {
  name: string;
}

const AmountCell = ({ name }: IAmountCellProps) => {
  return (
    <CellLayout>
      <FormField name={`${name}.amount`} component={Input} onChange={handleNumberFieldChange} />
    </CellLayout>
  );
};

export default AmountCell;
