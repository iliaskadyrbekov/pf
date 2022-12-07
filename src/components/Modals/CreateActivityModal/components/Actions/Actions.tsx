import { Button } from '@components/common/Button';
import { FormLangSwitcherField } from '@components/common/FormFields/FormLangSwitcherField';
import { FormMultiLanguageField } from '@components/common/FormFields/FormMultiLanguageField';
import { Input } from '@components/common/Input';
import { SpinnerIcon } from '@components/Icons';
import { useFormikContext } from 'formik';
import React from 'react';
import ActionsLayout from './ActionsLayout';

interface IActionsProps {
  onClose(): void;
  loading: boolean;
}

const Actions = ({ onClose, loading }: IActionsProps) => {
  const { handleSubmit } = useFormikContext();
  return (
    <ActionsLayout
      nameInput={<FormMultiLanguageField component={Input} name="name" label="Activity name" />}
      langSwitcher={<FormLangSwitcherField />}
      actions={[
        <Button color="secondary" key="1" className="w-32" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          icon={loading ? <SpinnerIcon /> : null}
          color="primary"
          onClick={() => handleSubmit()}
          key="2"
          className="w-32"
        >
          Create
        </Button>,
      ]}
    />
  );
};

export default Actions;
