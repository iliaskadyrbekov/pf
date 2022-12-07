import React from 'react';
import { Formik } from 'formik';

import { Input } from '@components/common/Input';
import { Select } from '@components/common/Select';
import { Button } from '@components/common/Button';
import { FormField } from '@components/common/FormFields/FormField';
import { IconTextOption } from '@components/common/Select/components';
import AddSpecificationFieldModalLayout from './AddSpecificationFieldModalLayout';

import { handleNumberFieldChange } from 'src/helpers';
import { AccommodationSpecificationType } from 'src/shared/enums';
import { ISpecificationOption } from '@components/Products/Product/AccommodationProduct/components/Specification/Specification';

interface IAddSpecificationFieldModalProps {
  onClose: () => void;
  onSave: (field: ISpecificationField) => void;
  specificationOptions: ISpecificationOption[];
}

export interface ISpecificationField {
  amount: number;
  type: AccommodationSpecificationType;
}

const AddSpecificationFieldModal = ({ onClose, onSave, specificationOptions }: IAddSpecificationFieldModalProps) => {
  const handleValidate = (values: { type: string | null; amount: number }) => {
    const errors: { amount?: unknown; type?: string[] } = {};

    if (!values.type) {
      errors.type = ['Select type'];
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ type: null, amount: 0 }}
      onSubmit={(values, { setStatus }) => {
        try {
          const errors = handleValidate(values);

          if (errors && Object.keys(errors).length) {
            setStatus(errors);
          } else {
            onClose();
            onSave(values as unknown as ISpecificationField);
          }
        } catch (err) {
          setStatus(err);
        }
      }}
      validateOnChange={false}
    >
      {({ handleSubmit }) => (
        <AddSpecificationFieldModalLayout
          title="Add form"
          type={
            <FormField
              label="Type"
              options={specificationOptions}
              name="type"
              placeholder="Select type..."
              renderSelectedOption={(
                opt: any, // TODO add typescript to FormField
              ) => (
                <IconTextOption Icon={specificationOptions.find(({ value }) => value === opt.value)?.Icon} {...opt} />
              )}
              renderOption={(opt: any) => (
                <IconTextOption Icon={specificationOptions.find(({ value }) => value === opt.value)?.Icon} {...opt} />
              )}
              component={Select}
            />
          }
          amount={<FormField label="Amount" name="amount" component={Input} onChange={handleNumberFieldChange} />}
          actions={[
            <Button variant="contained" color="default" key="1" onClick={onClose}>
              Close
            </Button>,
            <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="2">
              Save
            </Button>,
          ]}
        />
      )}
    </Formik>
  );
};

export default AddSpecificationFieldModal;
