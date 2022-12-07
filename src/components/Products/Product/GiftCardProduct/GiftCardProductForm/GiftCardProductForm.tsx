import React from 'react';

import { CreateEntityLayout, SettingsLayout } from 'src/layouts';
import { MainInfo, Pricing, Validity } from '../components';

import { FormField, SelectNative } from '@components/common';
import { BoxLayout } from '../../components';
import { IGiftCardProductMetaFields, IVAT } from 'src/shared/interfaces';
import { VATSelect } from '@components/common/VATSelect';

interface IGiftCardProductFormProps {
  meta?: IGiftCardProductMetaFields;
  actions: React.ReactNode[];
  VATOptions: IVAT[];
}

const GiftCardProductForm = ({ meta, actions, VATOptions }: IGiftCardProductFormProps) => {
  return (
    <CreateEntityLayout
      infoBlocks={[<MainInfo key="1" />, <Pricing key="2" />, <Validity key="3" />]}
      settings={
        <SettingsLayout>
          {[
            <BoxLayout key="0">
              <FormField
                label="Visibility"
                name="visibility"
                options={meta?.visibility.options.map(({ id, label }) => ({ value: id, label })) || []}
                component={SelectNative}
              />
            </BoxLayout>,
            <BoxLayout key="VAT">
              <FormField
                label="Sales Tax / VAT"
                name="VAT"
                placeholder="Select tax rate..."
                component={VATSelect}
                options={VATOptions}
              />
            </BoxLayout>,
          ]}
        </SettingsLayout>
      }
      actions={actions}
    />
  );
};

export default GiftCardProductForm;
