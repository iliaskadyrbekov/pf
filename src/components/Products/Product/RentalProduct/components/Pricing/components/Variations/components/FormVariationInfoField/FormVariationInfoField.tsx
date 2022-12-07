import React from 'react';

import { Input } from '@components/common/Input';
import FormVariationInfoFieldLayout from './FormVariationInfoFieldLayout';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { FormInputSelectNativeField } from '@components/common/FormFields/FormInputSelectNativeField';

import { getDurationOptions } from 'src/helpers';

interface IFormVariationInfoFieldProps {
  name?: string;
}

const FormVariationInfoField = ({ name }: IFormVariationInfoFieldProps) => {
  const handleDurationChange = React.useCallback(
    // TODO create number field
    (e: React.ChangeEvent<HTMLInputElement>, { prevValue }) => {
      const value = e.target.value && parseInt(e.target.value);
      return isNaN(value as number) ? prevValue : value;
    },
    [],
  );

  const getName = (name?: string) => (name ? `${name}.` : '');

  return (
    <FormVariationInfoFieldLayout
      variationName={<FormMultiLanguageField component={Input} name={`${getName(name)}name`} label="Variation name" />}
      duration={
        <FormInputSelectNativeField
          onChange={handleDurationChange}
          inputName={`${getName(name)}duration.value`}
          options={getDurationOptions()}
          selectName={`${getName(name)}duration.type`}
          label="Duration"
        />
      }
    />
  );
};

export default FormVariationInfoField;
