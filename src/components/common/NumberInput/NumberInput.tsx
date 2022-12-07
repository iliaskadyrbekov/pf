import React from 'react';

import Input, { IInputProps } from '../Input/Input';

type TValue = number | string;

interface INumberInputProps extends Omit<IInputProps, 'value' | 'onChange' | 'onBlur'> {
  value: TValue;
  min?: number;
  max?: number;
  disableNegative?: boolean;
  disableFractional?: boolean;
  onChange?: (val: string) => void;
  onBlur?: (val: string) => void;
  validateOnChange?: boolean;
}

const NumberInput = ({
  value,
  onChange,
  min,
  max,
  disableNegative,
  disableFractional,
  validateOnChange,
  onBlur,
  ...restProps
}: INumberInputProps) => {
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const targetValue = Number.parseFloat(event.target.value);
    const value = getSafeValue(targetValue);
    onBlur?.(value);

    if (!validateOnChange) {
      handleValue(value);
    }
  };

  const getSafeValue = (val: number | string) => {
    if (!Number.isNaN(val)) {
      if (max && +val > max) {
        val = max;
      }
      if (min && +val < min) {
        val = min;
      }
    } else {
      val = '';
    }
    return val.toString();
  };

  const isValid = (val: string) => {
    const getRegExp = (cond: boolean, regExp: string) => (cond ? regExp : '');

    const negativePart = /-?/;
    const integerPart = /(?:\d+)?/;
    const fractionalPart = /(\.)?(\d+)*/;

    const negative = getRegExp(!disableNegative, negativePart.source);
    const integer = integerPart.source;
    const fractional = getRegExp(!disableFractional, fractionalPart.source);

    const validateRegExp = new RegExp(`^${negative}${integer}${fractional}$`);

    if (!validateRegExp.test(val) && val !== '') {
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    if (!isValid(val)) {
      return;
    }

    return handleValue(val);
  };

  const handleValue = (currentValue: string) => {
    if (currentValue !== value) {
      if (validateOnChange) {
        return onChange?.(getSafeValue(currentValue));
      }
      return onChange?.(currentValue);
    }
  };

  return <Input {...restProps} value={value} onBlur={handleBlur} onChange={handleChange} />;
};

export default NumberInput;
