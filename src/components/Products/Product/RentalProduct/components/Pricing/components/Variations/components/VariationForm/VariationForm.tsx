import { useFormikContext } from 'formik';
import React from 'react';

import { BlockLayout } from '@components/common/Block';
import { FormPricingField } from '@components/common/FormFields/FormPricingField';
import { MultiLanguageBlock } from '@components/common/MultiLanguageBlock';
import { FormVariationInfoField } from '../FormVariationInfoField';
import VariationFormLayout from './VariationFormLayout';
import DefaultLayout from '@components/common/Sideover/layouts/DefaultLayout';
import { Actions } from '../Actions';
import { FormNumberField } from '@components/common/FormFields/FormNumberField';

interface IVariationFormProps {
  index?: number;
  onClose(): void;
  onRemove(index?: number): void;
}

const VariationForm = ({ index, onRemove, onClose }: IVariationFormProps) => {
  const { handleSubmit } = useFormikContext();
  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <DefaultLayout actions={<Actions onRemove={handleRemove} onClose={onClose} onSubmit={handleSubmit} />}>
      <VariationFormLayout
        variationInfo={
          <MultiLanguageBlock>
            <FormVariationInfoField />
          </MultiLanguageBlock>
        }
        variationPricing={
          <BlockLayout title="Pricing">
            <FormPricingField className="w-80" />
          </BlockLayout>
        }
        minMaxPurchase={
          <BlockLayout title="Purchase">
            <div className="w-80 flex space-x-4">
              <FormNumberField disableNegative disableFractional name="minPurchase" label="Minimum purchase" />
              <FormNumberField disableNegative disableFractional name="maxPurchase" label="Maximum purchase" />
            </div>
          </BlockLayout>
        }
      />
    </DefaultLayout>
  );
};

export default VariationForm;
