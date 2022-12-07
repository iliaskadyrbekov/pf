import React from 'react';

import { Input } from '@components/common/Input';
import { IInputProps } from '@components/common/Input/Input';
import { useCustomField } from 'src/lib/useCustomField';
import { ErrorMessage } from '../ErrorMessage';

type TValue = number | undefined | string;

interface IFormNumberFieldProps<ValueType> {
  name: string;
  min?: number;
  max?: number;
  disableNegative?: boolean;
  disableFractional?: boolean;
  onChange?: (val: ValueType, { prevValue }: { prevValue?: ValueType }) => TValue;
}

const FormNumberField = (props: IFormNumberFieldProps<TValue> & IInputProps) => {
  const { min, max, disableFractional, disableNegative, onChange, ...restProps } = props;

  const [field, { apiError, error = [] }] = useCustomField<TValue, string[]>(props.name);

  const { value, ...restField } = field;
  const errors = [...(apiError || []), ...error];

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onBlur(event);

    const targetValue = Number.parseFloat(event.target.value);
    handleValue(getSafeValue(targetValue));
  };

  const getSafeValue = (value: number | string) => {
    if (!Number.isNaN(value)) {
      if (max && +value > max) {
        value = max;
      }
      if (min && +value < min) {
        value = min;
      }
    } else {
      value = '';
    }
    return value.toString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const getRegExp = (cond: boolean, regExp: string) => (cond ? regExp : '');

    const negativePart = /-?/;
    const integerPart = /(?:\d+)?/;
    const fractionalPart = /(\.)?(\d+)*/;

    const negative = getRegExp(!disableNegative, negativePart.source);
    const integer = integerPart.source;
    const fractional = getRegExp(!disableFractional, fractionalPart.source);

    const validateRegExp = new RegExp(`^${negative}${integer}${fractional}$`);

    if (!validateRegExp.test(value) && value !== '') {
      return;
    }

    handleValue(value);
  };

  const handleValue = (currentValue: string) => {
    if (currentValue !== value) {
      field.onChange(currentValue);
      onChange?.(currentValue, { prevValue: value });
    }
  };

  return (
    <div className="w-full flex flex-col items-start">
      <Input
        {...restProps}
        {...restField}
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        isError={!!errors.length}
      />
      {!!errors.length && <ErrorMessage message={errors} />}
    </div>
  );
};

export default FormNumberField;
