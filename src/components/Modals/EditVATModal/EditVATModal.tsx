import React from 'react';
import { Formik } from 'formik';

import { Button } from '@components/common/Button';
import EditVATModalLayout from './EditVATModalLayout';
import { Spinner } from '@components/common/Spinner';
import { ShopContext } from 'src/context/ShopContext';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { IEditVATInput, useEditVAT } from './mutations/editVAT';
import { FormField } from '@components/common/FormFields/FormField';
import { InputRightIconLayout } from '@components/common/FormFields/FormPricingField/components';
import { NumberInput } from '@components/common';
import { numberFromString } from '@utils/numberFromString';
import { useDeleteVAT } from './mutations/deleteVAT';
import { ActionsLayout } from './components/Actions';

interface IEditVATModalProps {
  onClose(): void;
  onDelete(): void;
  VAT: { id: string; value: string };
}

const EditVATModal = ({ onClose, onDelete, VAT }: IEditVATModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { mutate: deleteVAT, loading: deleteLoading } = useDeleteVAT();
  const { mutate: editVAT, loading: editLoading } = useEditVAT();

  const initialValues = {
    id: VAT.id,
    value: VAT.value,
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { value?: string[] } = {};

    if (!values.value) {
      errors.value = ['Required'];
    }

    return { ...errors };
  };

  const prepareValues = (values: typeof initialValues): IEditVATInput => {
    return { value: numberFromString(values.value), id: values.id };
  };

  const handleDelete = (setStatus: (props: Record<string, string[]> | undefined) => void) => {
    try {
      deleteVAT({ variables: { shopId: shop?.id, input: { id: VAT.id } } });
      onDelete();
      onClose();
    } catch (err) {
      setStatus(getValidationErrors(err as IGraphqlError));
    }
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
          await editVAT({
            variables: {
              shopId: shop?.id,
              input: prepareValues(values),
            },
          });

          onClose();
        } catch (err) {
          setStatus(getValidationErrors(err as IGraphqlError));
        }
      }}
    >
      {({ handleSubmit, isSubmitting, setStatus }) => (
        <EditVATModalLayout
          title="Edit VAT"
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
          actions={
            <ActionsLayout
              left={[
                <Button
                  icon={deleteLoading ? <Spinner /> : null}
                  variant="contained"
                  color="delete"
                  key="delete"
                  onClick={() => handleDelete(setStatus)}
                >
                  Delete
                </Button>,
              ]}
              right={[
                <Button variant="contained" color="default" key="close" onClick={onClose}>
                  Close
                </Button>,
                <Button
                  disabled={isSubmitting}
                  icon={editLoading ? <Spinner /> : null}
                  variant="contained"
                  color="primary"
                  key="edit"
                  onClick={() => handleSubmit()}
                >
                  Edit
                </Button>,
              ]}
            />
          }
        />
      )}
    </Formik>
  );
};

export default EditVATModal;
