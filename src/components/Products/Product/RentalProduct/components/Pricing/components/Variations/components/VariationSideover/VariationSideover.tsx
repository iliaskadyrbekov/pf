import { Formik, useFormikContext } from 'formik';
import React from 'react';

import { IDuration } from 'src/shared/interfaces/Duration';
import { VariationForm } from '../VariationForm';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { IRentalPricingVariation, MultiLanguageField } from 'src/shared/interfaces';
import { getEmptyFields, getSameFields, mapToErrorsObject } from 'src/helpers';

interface IVariationSideoverProps {
  name: MultiLanguageField[];
  duration: IDuration;
  price: number | string;
  comparedWithPrice?: number | string;
  minPurchase?: number | string;
  maxPurchase?: number | string;
  index?: number;

  onClose(): void;
}

export interface IValues {
  name: MultiLanguageField[];
  duration: IDuration;
  price: number | string;
  comparedWithPrice?: number | string;
  minPurchase?: number | string;
  maxPurchase?: number | string;
}

interface IFormikContext {
  pricing: [IRentalPricingVariation];
}

const isNumber = (number: unknown) => typeof number === 'number';

const VariationSideover = ({
  name,
  duration,
  price,
  comparedWithPrice,
  minPurchase,
  maxPurchase,
  index,
  onClose,
}: IVariationSideoverProps) => {
  const { setFieldValue, values } = useFormikContext<IFormikContext>();
  const variations = values.pricing || [];

  const { availableLangs } = React.useContext(FormLanguageContext);

  const handleValidate = (variation: IValues, index?: number) => {
    const errors: { [key: string]: unknown } = {};

    const emptyNameLangs = getEmptyFields(variation.name);

    if (emptyNameLangs.length === availableLangs.length) {
      errors.name = { generalError: ['Required'] };
    }

    if (variation.price === '') {
      errors.price = ['Required'];
    }

    if (!variation.duration?.value) {
      errors['duration.value'] = ['Required'];
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

  const prepareVariables = (values: IValues) => {
    const result: Omit<IRentalPricingVariation, 'id'> = {
      name: values.name,
      duration: values.duration,
      price: +values.price,
      comparedWithPrice: values.comparedWithPrice ? +values.comparedWithPrice : undefined,
      minPurchase: values.minPurchase ? +values.minPurchase : undefined,
      maxPurchase: values.maxPurchase ? +values.maxPurchase : undefined,
      order: variations.length,
    };

    return result;
  };

  const handleSaveVariation = (variation: IValues, index?: number) => {
    if (!isNumber(index)) {
      setFieldValue('pricing', [...variations, { ...variation, order: variations.length }]);
    } else {
      setFieldValue(
        'pricing',
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

    setFieldValue('pricing', orderedResult);
    onClose();
  };

  return (
    <Formik
      initialValues={{
        name,
        duration,
        price,
        comparedWithPrice,
        minPurchase,
        maxPurchase,
      }}
      onSubmit={(values, { setStatus }) => {
        const errors = handleValidate(values, index);
        if (errors && Object.keys(errors).length) {
          setStatus(errors);
        } else {
          const preparedValues = prepareVariables(values);
          handleSaveVariation(preparedValues, index);
        }
      }}
    >
      <VariationForm index={index} onClose={onClose} onRemove={handleRemoveVariation} />
    </Formik>
  );
};

export default VariationSideover;
