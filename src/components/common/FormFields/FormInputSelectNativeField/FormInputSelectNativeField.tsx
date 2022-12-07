import React from 'react';

import { FormField } from '@components/common/FormFields/FormField';
import { SelectNative } from '@components/common/SelectNative';
import { Input } from '@components/common/Input';

import { InputSelectLeftLayout } from './components';

interface IFormInputSelectNativeFieldProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, props?: { prevValue?: any }) => void;
  options?: { value: string | number; label: string }[];
  inputName: string;
  selectName: string;
  label?: string;
}

const FormInputSelectNativeField = ({
  onChange,
  inputName,
  selectName,
  label,
  options,
}: IFormInputSelectNativeFieldProps) => {
  return (
    <FormField
      onChange={onChange}
      name={inputName}
      component={Input}
      className="pl-[7.5rem]"
      leftElement={
        <InputSelectLeftLayout>
          {
            <FormField
              component={SelectNative}
              className="w-[7rem] border-none focus:ring-2 ml-[1px]"
              options={options}
              name={selectName}
            />
          }
        </InputSelectLeftLayout>
      }
      label={label}
    />
  );
};

export default FormInputSelectNativeField;
