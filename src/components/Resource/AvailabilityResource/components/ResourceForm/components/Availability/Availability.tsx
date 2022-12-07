import React from 'react';

import { InputLeftIconLayout } from '@components/common/FormFields/FormPricingField/components';
import { FormNumberField } from '@components/common/FormFields/FormNumberField';
import { BlockLayout } from '@components/common/Block';

const Availability = () => {
  return (
    <BlockLayout title="Availability" caption="Choose if products have limited or unlimited availability">
      <FormNumberField
        disableNegative
        disableFractional
        leftElement={<InputLeftIconLayout>Limit</InputLeftIconLayout>}
        wrapperClassName="w-44"
        className="pl-12"
        label="Availability"
        name="availability"
      />
    </BlockLayout>
  );
};

export default Availability;
