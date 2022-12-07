import React from 'react';

import { CellLayout } from '@components/common/Table/components';
import { MultiLanguageField } from 'src/shared/interfaces';
import { FormLanguageContext } from 'src/context/FormLanguageContext';

interface IVariationNameCellProps {
  name: MultiLanguageField[];
}

const VariationNameCell = ({ name }: IVariationNameCellProps) => {
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  return (
    <CellLayout>
      <span className="text-base leading-normal text-gray-900">{getMultiLanguageValue(name)}</span>
    </CellLayout>
  );
};

export default VariationNameCell;
