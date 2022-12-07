import React from 'react';

import { Input } from '@components/common/Input';
import { BlockLayout } from '@components/common/Block';
import { FormField } from '@components/common/FormFields/FormField';
import { InputLeftIconLayout, InputRightIconLayout } from '@components/common/FormFields/FormPricingField/components';

import { ShopContext } from 'src/context';

const Pricing = () => {
  const { shop } = React.useContext(ShopContext);

  const handleChange = React.useCallback((e) => {
    const value = e.target.value && parseInt(e.target.value);
    return !value || isNaN(value as number) ? 0 : value;
  }, []);

  return (
    <BlockLayout
      title="Pricing"
      caption={
        <span>
          Duration based pricing where you can define hours or days of your equipment/property to be out for rent.
          <br />
          Ex: 1 hour, 3 hours, 1 day
        </span>
      }
    >
      <FormField
        name="pricing.0.price"
        component={Input}
        onChange={handleChange}
        className="pl-7 pr-12"
        rightElement={<InputRightIconLayout>{shop?.currency.id}</InputRightIconLayout>}
        leftElement={<InputLeftIconLayout>{shop?.currency.symbolNative}</InputLeftIconLayout>}
        label="Price"
      />
    </BlockLayout>
  );
};

export default Pricing;
