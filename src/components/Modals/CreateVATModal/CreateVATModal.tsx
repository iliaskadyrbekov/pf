import React from 'react';
import { Formik } from 'formik';

import { Button } from '@components/common/Button';
import CreateVATModalLayout from './CreateVATModalLayout';
import { Spinner } from '@components/common/Spinner';
import { ShopContext } from 'src/context/ShopContext';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { ICreateVATInput, useCreateVAT } from './mutations/createVAT';
import { FormField } from '@components/common/FormFields/FormField';
import { InputRightIconLayout } from '@components/common/FormFields/FormPricingField/components';
import { IVAT } from 'src/shared/interfaces/Shop';
import { NumberInput } from '@components/common';
import { numberFromString } from '@utils/numberFromString';

interface ICreateVATModalProps {
  onClose: () => void;
  onCreate: (vat?: IVAT) => void;
}

const CreateVATModal = ({ onClose, onCreate }: ICreateVATModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: createVAT, loading } = useCreateVAT();

  const initialValues = {
    value: '',
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { value?: string[] } = {};

    if (!values.value) {
      errors.value = ['Required'];
    }

    return { ...errors };
  };

  const prepareValues = (values: typeof initialValues): ICreateVATInput => {
    return { value: numberFromString(values.value) };
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setStatus }) => {
        const errors = handleValidate(values);
        if (errors && Object.keys(errors).length) {
          setStatus(errors);
          return;
        }

        try {
          const { data } = await createVAT({
            variables: {
              shopId: shop?.id,
              input: prepareValues(values),
            },
          });

          onCreate(data?.createVAT);

          onClose();
        } catch (err) {
          setStatus(getValidationErrors(err as IGraphqlError));
        }
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <CreateVATModalLayout
          title="Create new VAT"
          VATValue={
            <FormField
              rightElement={<InputRightIconLayout>%</InputRightIconLayout>}
              name="value"
              className="pr-7"
              component={NumberInput}
              validateOnChange={true}
              disableFractional
              disableNegative
              min={0}
              max={100}
              label="VAT percentage"
            />
          }
          actions={[
            <Button variant="contained" color="default" key="1" onClick={onClose}>
              Close
            </Button>,
            <Button
              disabled={isSubmitting}
              icon={loading ? <Spinner /> : null}
              variant="contained"
              color="primary"
              key="2"
              onClick={() => handleSubmit()}
            >
              Add
            </Button>,
          ]}
        />
      )}
    </Formik>
  );
};

export default CreateVATModal;
