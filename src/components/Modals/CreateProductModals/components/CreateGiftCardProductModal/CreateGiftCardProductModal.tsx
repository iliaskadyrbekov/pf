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

import { MultiLanguageField } from 'src/shared/interfaces';
import { DurationType } from 'src/shared/enums/DurationType';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { useCreateGiftCardProduct } from './mutations/createGiftCardProduct';
import { FormLanguageSwitcherProviderComponent, ShopContext } from 'src/context';
import { durationToString, getDurationOptions, isEmptyField } from 'src/helpers';
import { NumberInput } from '@components/common';
import { numberFromString } from '@utils/numberFromString';

interface ICreateGiftCardProductModalProps {
  onClose: () => void;
}

const CreateGiftCardProductModal = ({ onClose }: ICreateGiftCardProductModalProps) => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);

  const initialValues = {
    name: [] as MultiLanguageField[],
    price: '',
    expiresAt: {
      value: 1,
      type: DurationType.DAYS,
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
    const errors: { name?: unknown; expiresAt?: string[]; price?: string[] } = {};

    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    if (values.price === '') {
      errors.price = ['Enter price'];
    }

    if (!values.expiresAt.value) {
      errors.expiresAt = ['Enter expiration date'];
    }

    return { ...errors };
  };

  const { mutate: createGiftCardProduct, loading } = useCreateGiftCardProduct();

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
              const { data } = await createGiftCardProduct({
                variables: {
                  shopId: shop?.id,
                  activityId: activityId,
                  pricing: [
                    {
                      name: [
                        {
                          lang: defaultLanguage.languageId,
                          value: durationToString(values.expiresAt),
                          country: defaultLanguage.countryId,
                        },
                      ],
                      order: 0,
                      price: numberFromString(values.price),
                    },
                  ],
                  expiresAt: values.expiresAt,
                  name: values.name,
                },
              });

              onClose();
              await router.push(
                `/products/activity/${router.query.activityId}/product/${data?.createGiftCardProduct.id}/edit`,
              );
            } catch (err) {
              setStatus(getValidationErrors(err as IGraphqlError));
            }
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <CreateProductModalLayout
              title="New gift card"
              langSwitcher={<FormLangSwitcherField />}
              fields={[
                <FieldWithDescription
                  key="1"
                  field={<FormMultiLanguageField component={Input} label="Product name" name="name" />}
                  description={
                    <React.Fragment>
                      Give a good product name that describes time + what you do.
                      <br />
                      Ex.: 1 hour bikeride, 1 day hiking.
                    </React.Fragment>
                  }
                />,
                <FieldWithDescription
                  key="2"
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
                  description={'Set price of the activity, on the next page you will be able to configure variations.'}
                />,
                <FieldWithDescription
                  key="3"
                  field={
                    <FormInputSelectNativeField
                      onChange={handleNumberFieldChange}
                      inputName="expiresAt.value"
                      options={getDurationOptions()}
                      selectName="expiresAt.type"
                      label="Validity"
                    />
                  }
                  description="Set expiration date so the system can programmatically calculate the end time of the activity."
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

export default CreateGiftCardProductModal;
