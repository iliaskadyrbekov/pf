import React from 'react';
import FormVariationInfoFieldLayout from './FormVariationInfoFieldLayout';
import { Input } from '@components/common/Input';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

interface IFormVariationInfoFieldProps {
  name?: string;
}

const FormVariationInfoField = ({ name }: IFormVariationInfoFieldProps) => {
  const getName = (name?: string) => (name ? `${name}.` : '');

  return (
    <FormVariationInfoFieldLayout
      variationName={<FormMultiLanguageField component={Input} name={`${getName(name)}name`} label="Variation name" />}
    />
  );
};

export default FormVariationInfoField;
