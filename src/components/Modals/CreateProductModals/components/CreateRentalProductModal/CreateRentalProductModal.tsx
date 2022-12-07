import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { FieldWithDescription } from '../components';
import { CreateProductModalLayout } from '@components/Modals';
import { FormField } from '@components/common/FormFields/FormField';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { FormInputSelectNativeField } from '@components/common/FormFields/FormInputSelectNativeField';
import { InputRightIconLayout, InputLeftIconLayout } from '@components/common/FormFields/FormPricingField/components';

import { ShopContext } from 'src/context/ShopContext';
import { MultiLanguageField } from 'src/shared/interfaces';
import { DurationType } from 'src/shared/enums/DurationType';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useCreateRentalProduct } from './mutations/createRentalProduct';
import { durationToString, getDurationOptions, isEmptyField } from 'src/helpers';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { NumberInput } from '@components/common';
import { numberFromString } from '@utils/numberFromString';

interface ICreateRentalProductModalProps {
  onClose: () => void;
}

const CreateRentalProductModal = ({ onClose }: ICreateRentalProductModalProps) => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);

  const initialValues = {
    name: [] as MultiLanguageField[],
    price: '',
    duration: {
      value: 2,
      type: DurationType.HOURS,
    },
  };

  const handleNumberFieldChange = React.useCallback(
    // TODO create number field
    (e: React.ChangeEvent<HTMLInputElement>, { prevValue }) => {
      const value = e.target.value && parseInt(e.target.value);
      return isNaN(value as number) ? prevValue : value;
    },
    [],
  );

  const handleValidate = (values: typeof initialValues) => {
    const errors: { name?: unknown; duration?: string[]; price?: string[] } = {};

    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    if (values.price === '') {
      errors.price = ['Enter price'];
    }

    if (!values.duration.value) {
      errors.duration = ['Enter duration'];
    }

    return { ...errors };
  };

  const { mutate: createRentalProduct, loading } = useCreateRentalProduct();

  return (
    <FormLanguageSwitcherProviderComponent>
      {({ defaultLanguage }) => (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { setStatus }) => {
            const errors = handleValidate(values);
            if (errors && Object.keys(errors).length) {
              setStatus(errors);
              return;
            }

            const activityId = router.query.activityId as string;

            try {
              const { data } = await createRentalProduct({
                variables: {
                  shopId: shop?.id,
                  input: {
                    activityId: activityId,
                    pricing: [
                      {
                        duration: values.duration,
                        name: [
                          {
                            lang: defaultLanguage.languageId,
                            value: durationToString(values.duration),
                            country: defaultLanguage.countryId,
                          },
                        ],
                        order: 0,
                        price: numberFromString(values.price),
                      },
                    ],
                    name: values.name,
                  },
                },
              });

              onClose();
              await router.push(
                `/products/activity/${router.query.activityId}/product/${data?.createRentalProduct.id}/edit`,
              );
            } catch (err) {
              setStatus(getValidationErrors(err as IGraphqlError));
            }
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <CreateProductModalLayout
              title="New rental"
              langSwitcher={<FormLangSwitcherField />}
              fields={[
                <FieldWithDescription
                  key="1"
                  field={<FormMultiLanguageField component={Input} label="Product name" name="name" />}
                  description={
                    <>
                      Give a good product name that describes the product well.
                      <br />
                      Ex.: KTM 500cc, Electric scooter.
                    </>
                  }
                />,
                <FieldWithDescription
                  key="2"
                  field={
                    <FormInputSelectNativeField
                      onChange={handleNumberFieldChange}
                      inputName="duration.value"
                      options={getDurationOptions()}
                      selectName="duration.type"
                      label="Duration"
                    />
                  }
                  description="Set duration so the system can programmatically calculate the end time of the renting period."
                />,
                <FieldWithDescription
                  key="3"
                  field={
                    <div className="w-40">
                      <FormField
                        name="price"
                        component={NumberInput}
                        validateOnChange={true}
                        disableFractional
                        disableNegative
                        min={0}
                        className="pl-7 pr-12 max-w-40"
                        rightElement={<InputRightIconLayout>{shop?.currency.id}</InputRightIconLayout>}
                        leftElement={<InputLeftIconLayout>{shop?.currency.symbolNative}</InputLeftIconLayout>}
                        label="Price"
                      />
                    </div>
                  }
                  description={
                    'Set price based on duration of the activity, on the next page you will be able to configure variations.'
                  }
                />,
              ]}
              actions={[
                <Button className="w-28" variant="contained" color="secondary" key="1" onClick={onClose}>
                  Cancel
                </Button>,
                <Button
                  className="w-28"
                  disabled={isSubmitting}
                  icon={loading ? <Spinner /> : null}
                  variant="contained"
                  color="primary"
                  key="2"
                  onClick={() => handleSubmit()}
                >
                  Create
                </Button>,
              ]}
            />
          )}
        </Formik>
      )}
    </FormLanguageSwitcherProviderComponent>
  );
};

export default CreateRentalProductModal;
