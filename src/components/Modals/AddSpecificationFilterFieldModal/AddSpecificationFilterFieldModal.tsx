import React from 'react';
import { Formik } from 'formik';

import { Button, FormField, Select } from '@components/common';
import { IconTextOption } from '@components/common/Select/components';
import AddSpecificationFilterFieldModalLayout from './AddSpecificationFilterFieldModalLayout';

import { AccommodationSpecificationType } from 'src/shared/enums';
import { ISpecificationOption } from '@components/Products/Product/AccommodationProduct/components/Specification/Specification';

interface IAddSpecificationFilterFieldModalProps {
  onClose: () => void;
  onSave: (field: IFilterSpecificationField) => void;
  specificationOptions: ISpecificationOption[];
}

export interface IFilterSpecificationField {
  type: AccommodationSpecificationType;
}

const AddSpecificationFilterFieldModal = ({
  onClose,
  onSave,
  specificationOptions,
}: IAddSpecificationFilterFieldModalProps) => {
  const handleValidate = (values: { type: string | null }) => {
    const errors: { type?: string[] } = {};

    if (!values.type) {
      errors.type = ['Select type'];
    }

    return errors;
  };

  return (
    <Formik
      initialValues={{ type: null }}
      onSubmit={(values, { setStatus }) => {
        try {
          const errors = handleValidate(values);

          if (errors && Object.keys(errors).length) {
            setStatus(errors);
          } else {
            onClose();
            onSave(values as unknown as IFilterSpecificationField);
          }
        } catch (err) {
          setStatus(err);
        }
      }}
      validateOnChange={false}
    >
      {({ handleSubmit }) => (
        <AddSpecificationFilterFieldModalLayout
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

export default AddSpecificationFilterFieldModal;
