import React from 'react';

import { BlockLayout } from '@components/common/Block';
import { FormInputSelectNativeField } from '@components/common/FormFields/FormInputSelectNativeField';

import { getDurationOptions } from 'src/helpers';

const Validity = () => {
  const handleNumberFieldChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value && parseInt(e.target.value);
    return !value || isNaN(value as number) ? 0 : value;
  }, []);

  return (
    <BlockLayout title="Validity">
      <FormInputSelectNativeField
        onChange={handleNumberFieldChange}
        inputName="expiresAt.value"
        options={getDurationOptions()}
        selectName="expiresAt.type"
      />
    </BlockLayout>
  );
};

export default Validity;
