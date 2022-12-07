import React from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { Spinner } from '@components/common/Spinner';
import { FieldWithDescription } from '../components';
import { CreateProductModalLayout } from '@components/Modals';
import { SelectNative } from '@components/common/SelectNative';
import { FormField } from '@components/common/FormFields/FormField';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { FormInputSelectNativeField } from '@components/common/FormFields/FormInputSelectNativeField';
import { InputRightIconLayout, InputLeftIconLayout } from '@components/common/FormFields/FormPricingField/components';

import { ShopContext } from 'src/context/ShopContext';
import { MultiLanguageField } from 'src/shared/interfaces';
import { DurationType } from 'src/shared/enums/DurationType';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { useCreateTicketProduct } from './mutations/createTicketProduct';
import { durationToString, getDurationOptions, isEmptyField } from 'src/helpers';
import { NumberInput } from '@components/common';
import { numberFromString } from '@utils/numberFromString';

interface ICreateTicketProductModalProps {
  onClose: () => void;
}

const schedulingOptions = [
  { value: AvailabilityType.OPEN, label: 'Open day' },
  { value: AvailabilityType.FIXED, label: 'Fixed time slots' },
];

const CreateTicketProductModal = ({ onClose }: ICreateTicketProductModalProps) => {
  const router = useRouter();

  const { shop } = React.useContext(ShopContext);

  const initialValues = {
    name: [] as MultiLanguageField[],
    price: '',
    availabilityType: AvailabilityType.OPEN,
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

  const { mutate: createTicketProduct, loading } = useCreateTicketProduct();

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
              const { data } = await createTicketProduct({
                variables: {
                  shopId: shop?.id,
                  activityId: activityId,
                  pricing: [
                    {
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
                  duration: values.duration,
                  availabilityType: values.availabilityType,
                  name: values.name,
                },
              });

              onClose();

              await router.push(
                `/products/activity/${router.query.activityId}/product/${data?.createTicketProduct.id}/edit`,
              );
            } catch (err) {
              setStatus(getValidationErrors(err as IGraphqlError));
            }
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <CreateProductModalLayout
              title="New ticket"
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
                  description="Set duration so the system can programmatically calculate the end time of the activity."
                />,
                <FieldWithDescription
                  key="3"
                  field={
                    <FormField
                      label="Scheduling option"
                      name="availabilityType"
                      options={schedulingOptions}
                      component={SelectNative}
                    />
                  }
                  description="Choose if this event is open to come for the whole day or guests needs to select a specific time slot."
                />,
                <FieldWithDescription
                  key="4"
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

export default CreateTicketProductModal;
