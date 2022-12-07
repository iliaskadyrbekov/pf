import React from 'react';
import { PlusIcon } from '@heroicons/react/outline';

import { Form } from './components/Form';
import { Button } from '@components/common/Button';
import CheckoutFormLayout from './CheckoutFormLayout';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';

import { MultiLanguageField } from 'src/shared/interfaces';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { FormLanguageSwitcherProviderComponent } from 'src/context/FormLanguageContext';
import { CHECKOUT_FORM_FIELD_TYPE } from 'src/shared/enums/CheckoutFormFieldType';
import {
  ICheckoutExtraInfoField,
  ICheckoutOptionsField,
  ICheckoutTermsCheckboxField,
  TCheckoutFormField,
} from 'src/shared/interfaces/CheckoutForm';

interface IField {
  name: MultiLanguageField[];
  type: CHECKOUT_FORM_FIELD_TYPE;
}

interface ICheckoutFormProps {
  checkoutForm: TCheckoutFormField[];
  name: string;
  onChange(args: TCheckoutFormField[]): void;
}

const CheckoutForm = ({ checkoutForm = [], name, onChange }: ICheckoutFormProps) => {
  const { handleOpenModal } = React.useContext(ModalContext);

  const handleAddFieldClick = () => {
    handleOpenModal({
      type: ModalType.ADD_CHECKOUT_FIELD,
      props: { onSave: handleCreateCheckoutField, checkoutFields: checkoutForm },
    });
  };

  const handleMoveRow = React.useCallback(
    (dragIndex, hoverIndex) => {
      const result = Array.from(checkoutForm);
      const [removed] = result.splice(dragIndex, 1);
      result.splice(hoverIndex, 0, removed);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [onChange, checkoutForm],
  );

  const handleRemove = React.useCallback(
    (removeIndex: number) => {
      const result = Array.from(checkoutForm);
      result.splice(removeIndex, 1);

      const orderedResult = result.map((el, index) => ({ ...el, order: index }));

      onChange(orderedResult);
    },
    [onChange, checkoutForm],
  );

  const handleCreateCheckoutField = React.useCallback(
    (field: IField) => {
      const newField = {
        ...field,
        isRequired: false,
        shouldBePrinted: false,
        order: checkoutForm.length,
      } as TCheckoutFormField;

      switch (newField.type) {
        case CHECKOUT_FORM_FIELD_TYPE.OPTIONS:
          (newField as ICheckoutOptionsField).options = [];
          break;
        case CHECKOUT_FORM_FIELD_TYPE.TERMS_CHECKBOX:
          (newField as ICheckoutTermsCheckboxField).url = [];
          break;
        case CHECKOUT_FORM_FIELD_TYPE.EXTRA_INFO:
          (newField as ICheckoutExtraInfoField).text = [];
      }
      let newCheckoutForm;

      if (!checkoutForm) {
        newCheckoutForm = [newField];
      } else {
        newCheckoutForm = [...checkoutForm, newField];
      }

      onChange(newCheckoutForm);
    },
    [onChange, checkoutForm],
  );

  const orderedFields = [...checkoutForm].sort((a, b) => a.order - b.order);

  return (
    <FormLanguageSwitcherProviderComponent>
      <CheckoutFormLayout
        addButton={
          <Button variant="link" color="primary" icon={<PlusIcon />} onClick={handleAddFieldClick}>
            Add form
          </Button>
        }
        langSwitcher={<FormLangSwitcherField />}
        form={<Form onRemove={handleRemove} fieldName={name} moveRow={handleMoveRow} items={orderedFields} />}
      />
    </FormLanguageSwitcherProviderComponent>
  );
};

export default CheckoutForm;
