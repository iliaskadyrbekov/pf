import React from 'react';

import { Input } from '@components/common/Input';
import { CellLayout } from '@components/Products/Product/components';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

interface INameCellProps {
  name: string;
}

const NameCell = ({ name }: INameCellProps) => {
  return (
    <CellLayout>
      <FormMultiLanguageField name={`${name}.name`} component={Input} />
    </CellLayout>
  );
};

export default NameCell;
