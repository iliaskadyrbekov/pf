import React from 'react';

import FormPricingFieldLayout from './FormPricingFieldLayout';
import { Input } from '@components/common/Input';
import { ShopContext } from 'src/context/ShopContext';
import { InputLeftIconLayout, InputRightIconLayout } from './components';
import { FormField } from '@components/common/FormFields/FormField';

interface IFormPricingFieldProps {
  name?: string;
  comparedWithPriceName?: string;
  priceName?: string;
  comparedWithPriceLabel?: string;
  priceLabel?: string;
  className?: string;
}

const FormPricingField = ({
  name,
  priceName = 'price',
  priceLabel = 'Price',
  comparedWithPriceName = 'comparedWithPrice',
  comparedWithPriceLabel = 'Compared with',
  className,
}: IFormPricingFieldProps) => {
  const { shop } = React.useContext(ShopContext);

  const handleChange = React.useCallback((e) => {
    const value = e.target.value && parseInt(e.target.value);
    return !value || isNaN(value as number) ? 0 : value;
  }, []);

  const getName = (name?: string) => (name ? `${name}.` : '');

  return (
    <FormPricingFieldLayout
      className={className}
      comparedWithPrice={
        <FormField
          name={`${getName(name)}${comparedWithPriceName}`}
          component={Input}
          onChange={handleChange}
          className="pl-7 pr-12"
          rightElement={<InputRightIconLayout>{shop?.currency.id}</InputRightIconLayout>}
          leftElement={<InputLeftIconLayout>{shop?.currency.symbolNative}</InputLeftIconLayout>}
          label={comparedWithPriceLabel}
        />
      }
      price={
        <FormField
          name={`${getName(name)}${priceName}`}
          component={Input}
          onChange={handleChange}
          className="pl-7 pr-12"
          rightElement={<InputRightIconLayout>{shop?.currency.id}</InputRightIconLayout>}
          leftElement={<InputLeftIconLayout>{shop?.currency.symbolNative}</InputLeftIconLayout>}
          label={priceLabel}
        />
      }
    />
  );
};

export default FormPricingField;
