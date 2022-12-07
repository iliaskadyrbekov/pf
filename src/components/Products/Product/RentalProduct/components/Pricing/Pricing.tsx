import React from 'react';
import { useFormikContext } from 'formik';

import { Variations } from './components';
import { BlockLayout } from '@components/common/Block';

import { IRentalPricingVariation } from 'src/shared/interfaces';

interface IFormikContext {
  pricing: [IRentalPricingVariation];
}

const Pricing = () => {
  const { values, status, setStatus } = useFormikContext<IFormikContext>();

  React.useEffect(() => {
    if (values.pricing) {
      setStatus({ ...status, ['pricing']: null });
    }
  }, [values.pricing]);

  return (
    <BlockLayout
      error={status && status['pricing']}
      title="Pricing"
      caption={
        <span>
          Duration based pricing where you can define hours or days of your equipment/property to be out for rent.
          <br />
          Ex: 1 hour, 3 hours, 1 day
        </span>
      }
    >
      <Variations />
    </BlockLayout>
  );
};

export default Pricing;
