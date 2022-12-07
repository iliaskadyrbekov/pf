import React from 'react';

import { numberFromString } from '@utils/numberFromString';
import { getDiscountSign } from 'src/helpers/getDiscountSign';
import { DiscountType } from 'src/shared/enums';
import { IDiscount } from 'src/shared/interfaces';
import { NumberInput, SelectNative } from '..';
import { InputSelectRightLayout } from '../FormFields/FormInputSelectNativeField/components';

interface IAmountOrPercentageInputProps {
  value: IDiscount;
  label?: string;
  onChange(discout: IDiscount): void;
  maxByAmount?: number;
  disabled?: boolean;
}

const typeOptions = [
  { value: DiscountType.AMOUNT, label: getDiscountSign(DiscountType.AMOUNT) },
  { value: DiscountType.PERCENTAGE, label: getDiscountSign(DiscountType.PERCENTAGE) },
];

const AmountOrPercentageInput = ({ value, onChange, maxByAmount, label, disabled }: IAmountOrPercentageInputProps) => {
  const handleValueChange = (valueStr: string) => {
    onChange({ ...value, value: numberFromString(valueStr) });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ value: 0, type: e.target.value as DiscountType });
  };

  const numberInputPropsByType = {
    [DiscountType.AMOUNT]: {
      max: maxByAmount,
    },
    [DiscountType.PERCENTAGE]: {
      max: 100,
    },
  };

  return (
    <NumberInput
      {...numberInputPropsByType[value.type]}
      disabled={disabled}
      label={label}
      validateOnChange={true}
      disableFractional
      disableNegative
      min={0}
      value={value.value}
      onChange={handleValueChange}
      className="pr-12"
      rightElement={
        <InputSelectRightLayout>
          <SelectNative
            disabled={disabled}
            value={value.type}
            className="border-none focus:ring-2 ml-[-1px] pr-8"
            options={typeOptions}
            onChange={handleTypeChange}
          />
        </InputSelectRightLayout>
      }
    />
  );
};

export default AmountOrPercentageInput;
