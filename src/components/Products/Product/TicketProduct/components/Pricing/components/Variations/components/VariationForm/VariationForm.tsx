import { useFormikContext } from 'formik';
import React from 'react';

import { BlockLayout } from '@components/common/Block';
import { FormPricingField } from '@components/common/FormFields/FormPricingField';
import { MultiLanguageBlock } from '@components/common/MultiLanguageBlock';
import { FormVariationInfoField } from '../FormVariationInfoField';
import VariationFormLayout from './VariationFormLayout';
import DefaultLayout from '@components/common/Sideover/layouts/DefaultLayout';
import { Actions } from '@components/Products/Product/RentalProduct/components/Pricing/components/Variations/components';

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
      />
    </DefaultLayout>
  );
};

export default VariationForm;
