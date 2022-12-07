import React from 'react';

import { InputLeftIconLayout } from '@components/common/FormFields/FormPricingField/components';
import { BoxLayout } from '@components/Products/Product/components';

import { FormNumberField } from '@components/common/FormFields/FormNumberField';
import { SettingsLayout } from 'src/layouts';

const Settings = () => {
  return (
    <SettingsLayout>
      {[
        <BoxLayout key="sku">
          <FormNumberField
            disableNegative
            disableFractional
            leftElement={<InputLeftIconLayout>SKU</InputLeftIconLayout>}
            className="pl-12"
            label="Stock Keeping Unit"
            name="SKU"
          />
        </BoxLayout>,
      ]}
    </SettingsLayout>
  );
};

export default Settings;
