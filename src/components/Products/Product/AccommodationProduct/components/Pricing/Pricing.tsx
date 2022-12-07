import React from 'react';
import { useFormikContext } from 'formik';

import PricingLayout from './PricingLayout';
import { BlockLayout } from '@components/common/Block';
import { FormField, FormMultiLanguageField, FormPricingField, Input, SelectNative } from '@components/common';

import { tariffOptions } from 'src/shared/constants';
import { IAccommodationPricing } from 'src/shared/interfaces';

interface IFormikContext {
  pricing: [IAccommodationPricing];
}

const Pricing = () => {
  const { values, status, setStatus } = useFormikContext<IFormikContext>();

  React.useEffect(() => {
    if (values.pricing) {
      setStatus({ ['pricing']: null });
    }
  }, [values.pricing]);

  return (
    <BlockLayout
      error={status && status['pricing']}
      title="Pricing"
      caption={
        <span>
          Choose price of this product.
          <br />
          Ex: Different price on age groups (Child, Adult, Student)
        </span>
      }
    >
      <PricingLayout
        pricingName={<FormMultiLanguageField component={Input} name="pricing.name" label="Accommodation name" />}
        pricing={<FormPricingField name="pricing" />}
        pricingTariff={<FormField name="pricing.tariff" options={tariffOptions} component={SelectNative} />}
      />
    </BlockLayout>
  );
};

export default Pricing;
