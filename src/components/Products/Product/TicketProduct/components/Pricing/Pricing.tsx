import React from 'react';
import { useFormikContext } from 'formik';

import { Variations } from './components';
import { BlockLayout } from '@components/common/Block';

import { ITicketPricingVariation } from 'src/shared/interfaces';

interface IFormikContext {
  product: {
    pricing: [ITicketPricingVariation];
  };
}

const Pricing = () => {
  const { values, status, setStatus } = useFormikContext<IFormikContext>();

  React.useEffect(() => {
    if (values.product.pricing) {
      setStatus({ ['product.pricing']: null });
    }
  }, [values.product.pricing]);

  return (
    <BlockLayout
      error={status && status['product.pricing']}
      title="Pricing"
      caption={
        <span>
          Choose how you want to price your variations of this product.
          <br />
          Ex: Different price on age groups (Child, Adult, Student)
        </span>
      }
    >
      <Variations />
    </BlockLayout>
  );
};

export default Pricing;
