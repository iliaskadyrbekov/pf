import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Input } from '@components/common/Input';
import { NumberInput, SelectNative } from '@components/common';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { FieldWithDescription } from '../components';
import { CreateProductModalLayout } from '@components/Modals';
import { FormField } from '@components/common/FormFields/FormField';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { InputRightIconLayout, InputLeftIconLayout } from '@components/common/FormFields/FormPricingField/components';

import { TariffType } from 'src/shared/enums';
import { ShopContext } from 'src/context/ShopContext';
import { MultiLanguageField } from 'src/shared/interfaces';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { isEmptyField } from 'src/helpers';
import { useCreateAccommodationProduct } from '@components/Modals/CreateProductModals/components/CreateAccommodationProductModal/mutations/createAccommodationProduct';
import { useAccommodationProductMetaFields } from 'src/graphql/queries/accommodationProductMetaFields';
import { numberFromString } from '@utils/numberFromString';

interface ICreateAccommodationProductModalProps {
  onClose: () => void;
}

const CreateAccommodationProductModal = ({ onClose }: ICreateAccommodationProductModalProps) => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const { data } = useAccommodationProductMetaFields();
  const { mutate: createAccommodationProduct, loading } = useCreateAccommodationProduct();

  if (!data) {
    return null;
  }

  const tariffOptions = data?.accommodationProductMetaFields.tariff.options.map(({ id, label }) => ({
    value: id,
    label,
  }));

  const initialValues = {
    name: [] as MultiLanguageField[],
    price: '',
    tariff: TariffType.PER_NIGHT,
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { name?: unknown; duration?: string[]; price?: string[] } = {};

    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    if (values.price === '') {
      errors.price = ['Enter price'];
    }

    return { ...errors };
  };

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
              const { data } = await createAccommodationProduct({
                variables: {
                  shopId: shop?.id,
                  input: {
                    activityId: activityId,
                    pricing: {
                      name: [
                        {
                          lang: defaultLanguage.languageId,
                          value: values.tariff,
                          country: defaultLanguage.countryId,
                        },
                      ],
                      price: numberFromString(values.price),
                      tariff: values.tariff,
                    },
                    name: values.name,
                  },
                },
              });

              onClose();
              await router.push(
                `/products/activity/${router.query.activityId}/product/${data?.createAccommodationProduct.id}/edit`,
              );
            } catch (err) {
              setStatus(getValidationErrors(err as IGraphqlError));
            }
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <CreateProductModalLayout
              title="New accommodation"
              langSwitcher={<FormLangSwitcherField />}
              fields={[
                <FieldWithDescription
                  key="1"
                  field={<FormMultiLanguageField component={Input} label="Product name" name="name" />}
                  description={
                    <>
                      Give a good product name that describes time + what you do.
                      <br />
                      Ex.: 1 hour bikeride, 1 day hiking.
                    </>
                  }
                />,
                <FieldWithDescription
                  key="3"
                  field={
                    <div className="flex space-x-4">
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
                      <FormField name="tariff" label="Tariff" options={tariffOptions} component={SelectNative} />
                    </div>
                  }
                  description={'Set price  of the activity.'}
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

export default CreateAccommodationProductModal;
