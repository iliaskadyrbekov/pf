import React from 'react';
import { Formik } from 'formik';

import { Input } from '@components/common/Input';
import { Select } from '@components/common/Select';
import { Button } from '@components/common/Button';
import { FormField } from '@components/common/FormFields/FormField';
import { IconTextOption } from '@components/common/Select/components';
import AddCheckoutFieldModalLayout from './AddCheckoutFieldModalLayout';
import { CHECKOUT_FORM_TYPE_OPTIONS } from 'src/shared/constants/checkoutFormTypeOptions';

import { isEmptyField } from 'src/helpers';
import { MultiLanguageField } from 'src/shared/interfaces';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';

interface IAddCheckoutFieldModalProps {
  onClose: () => void;
  onSave: (field: IField) => void;
  checkoutFields: IField[];
}

export interface IField {
  name: MultiLanguageField[];
  type: CHECKOUT_FORM_FIELD_TYPE;
}

const AddCheckoutFieldModal = ({ onClose, onSave, checkoutFields }: IAddCheckoutFieldModalProps) => {
  const handleValidate = (values: { type: string | null; name: MultiLanguageField[] | null }) => {
    const errors: { name?: unknown; type?: string[] } = {};
    if (isEmptyField(values.name)) {
      errors.name = { generalError: ['Enter name'] };
    }

    if (!values.type) {
      errors.type = ['Select type'];
    }

    return errors;
  };

  const isNameTypeExist = checkoutFields.some(({ type }) => type === CHECKOUT_FORM_FIELD_TYPE.NAME);
  const options = isNameTypeExist
    ? CHECKOUT_FORM_TYPE_OPTIONS.filter(({ value }) => value !== CHECKOUT_FORM_FIELD_TYPE.NAME)
    : CHECKOUT_FORM_TYPE_OPTIONS;

  return (
    <Formik
      initialValues={{ type: null, name: null }}
      onSubmit={(values, { setStatus }) => {
        const errors = handleValidate(values);

        if (errors && Object.keys(errors).length) {
          setStatus(errors);
        } else {
          onSave(values as unknown as IField);
          onClose();
        }
      }}
      validateOnChange={false}
    >
      {({ handleSubmit }) => (
        <FormLanguageSwitcherProviderComponent>
          <AddCheckoutFieldModalLayout
            title="Add form"
            type={
              <FormField
                label="Type"
                options={options}
                name="type"
                placeholder="Select type..."
                renderSelectedOption={(
                  opt: any, // TODO add typescript to FormField
                ) => (
                  <IconTextOption
                    Icon={CHECKOUT_FORM_TYPE_OPTIONS.find(({ value }) => value === opt.value)?.Icon}
                    {...opt}
                  />
                )}
                renderOption={(opt: any) => (
                  <IconTextOption
                    Icon={CHECKOUT_FORM_TYPE_OPTIONS.find(({ value }) => value === opt.value)?.Icon}
                    {...opt}
                  />
                )}
                component={Select}
              />
            }
            name={<FormMultiLanguageField label="Question" name="name" component={Input} />}
            langSwitcher={<FormLangSwitcherField />}
            actions={[
              <Button variant="contained" color="default" key="1" onClick={onClose}>
                Close
              </Button>,
              <Button onClick={() => handleSubmit()} variant="contained" color="primary" key="2">
                Save
              </Button>,
            ]}
          />
        </FormLanguageSwitcherProviderComponent>
      )}
    </Formik>
  );
};

export default AddCheckoutFieldModal;
