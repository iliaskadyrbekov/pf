import React from 'react';
import { Formik, useFormikContext } from 'formik';

import { VariationForm } from '../VariationForm';

import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { getEmptyFields, getSameFields, mapToErrorsObject } from 'src/helpers';
import { IRentalPricingVariation, MultiLanguageField } from 'src/shared/interfaces';
import { isDefined } from '@utils/isDefined';

interface IVariationSideoverProps {
  name: MultiLanguageField[];
  price: number | null;
  comparedWithPrice?: number | null;
  index?: number;

  onClose(): void;
}

export interface IValues {
  name: MultiLanguageField[];
  price: number | null;
  comparedWithPrice?: number | null;
}

interface IFormikContext {
  product: {
    pricing: [IRentalPricingVariation];
  };
}

const isNumber = (number: unknown) => typeof number === 'number';

const VariationSideover = ({ name, price, comparedWithPrice, index, onClose }: IVariationSideoverProps) => {
  const { setFieldValue, values } = useFormikContext<IFormikContext>();
  const variations = values.product.pricing || [];

  const { availableLangs } = React.useContext(FormLanguageContext);

  const handleValidate = (variation: IValues, index?: number) => {
    const errors: { [key in keyof Partial<IValues>]: unknown } = {};

    const emptyNameLangs = getEmptyFields(variation.name);

    if (emptyNameLangs.length === availableLangs.length) {
      errors.name = { generalError: ['Required'] };
    }

    if (!isDefined(variation.price)) {
      errors.price = ['Required'];
    }

    const sameNameVariations = variations.reduce<MultiLanguageField[]>((acc, cur) => {
      const sameNames = getSameFields(cur.name, variation.name);
      if (sameNames.length) {
        return [...acc, ...sameNames];
      }
      return acc;
    }, []);

    if (!isNumber(index) && sameNameVariations.length) {
      errors.name = mapToErrorsObject(sameNameVariations, ['Variation with this name already exist']);
    }

    return errors;
  };

  const handleSaveVariation = (variation: IValues, index?: number) => {
    if (!isNumber(index)) {
      setFieldValue('product.pricing', [...variations, { ...variation, order: variations.length }]);
    } else {
      setFieldValue(
        'product.pricing',
        variations.map((v, i) => (index === i ? { ...v, ...variation } : v)),
      );
    }

    onClose();
  };

  const handleRemoveVariation = (index?: number) => {
    if (!(typeof index === 'number')) {
      onClose();
      return;
    }

    const result = Array.from(variations);
    result.splice(index, 1);

    const orderedResult = result.map((el, index) => ({ ...el, order: index }));

    setFieldValue('product.pricing', orderedResult);
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name,
        price,
        comparedWithPrice,
      }}
      onSubmit={(values, { setStatus }) => {
        const errors = handleValidate(values, index);
        if (errors && Object.keys(errors).length) {
          setStatus(errors);
        } else {
          handleSaveVariation(values, index);
        }
      }}
    >
      <VariationForm index={index} onClose={onClose} onRemove={handleRemoveVariation} />
    </Formik>
  );
};

export default VariationSideover;
