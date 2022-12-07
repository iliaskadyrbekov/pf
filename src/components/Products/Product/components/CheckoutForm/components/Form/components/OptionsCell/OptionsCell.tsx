import React from 'react';
import { StylesConfig } from 'react-select/src/styles';

import { Input } from '@components/common/Input';
import { TextArea } from '@components/common/TextArea';
import { CreatableInput } from '@components/common/CreatableInput';
import { CellLayout } from '@components/Products/Product/components';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { FormMultiLanguageArrayField } from '@components/common/FormFields/FormMultiLanguageArrayField';

import { MultiLanguageField } from 'src/shared/interfaces';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { MultiLanguageArrayField } from 'src/shared/interfaces/MultiLanguageArrayField';

interface IField {
  type: CHECKOUT_FORM_FIELD_TYPE;
  name: MultiLanguageField[];
  options?: MultiLanguageField[] | MultiLanguageArrayField[];
  isRequired: boolean;
  shouldBePrinted: boolean;
}

interface IOptionsCellProps {
  field: IField;
  name: string;
}

interface IOptionValue {
  value: string;
  label: string;
}

const OptionsCell = ({ field, name }: IOptionsCellProps) => {
  let Component;
  switch (field.type) {
    case CHECKOUT_FORM_FIELD_TYPE.OPTIONS:
      Component = (
        <FormMultiLanguageArrayField<{
          transform(value: IOptionValue[]): string[];
          id: string;
          placeholder: string;
          customStyles: StylesConfig<IOptionValue, false>;
        }>
          transform={(value) => value.map((val) => val.value)}
          transformValue={(value = []) => value.map((val) => ({ value: val, label: val }))}
          component={CreatableInput}
          id={`options-cell-${name}`}
          name={`${name}.options`}
          placeholder="Please add option and press Enter to separate them"
          customStyles={{
            placeholder: (defaultStyles) => ({
              ...defaultStyles,
              fontSize: 12,
            }),
          }}
        />
      );
      break;
    case CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO:
      Component = <FormMultiLanguageField component={TextArea} className="h-32 resize-none" name={`${name}.text`} />;
      break;
    case CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX:
      Component = <FormMultiLanguageField component={Input} name={`${name}.url`} />;
      break;
    default:
      Component = null;
      break;
  }

  return <CellLayout>{Component}</CellLayout>;
};

export default OptionsCell;
