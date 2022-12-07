import { useFormikContext } from 'formik';
import React from 'react';
import { LangSwitcher } from '../../LangSwitcher';

const FormLangSwitcherField = () => {
  const { status = {} } = useFormikContext();

  const errors = Object.values(status as { [key: string]: string }).reduce((langErrors, field) => {
    if (!field) {
      return langErrors;
    }
    return {
      ...langErrors,
      ...Object.entries(field).reduce((errors, [lang, error]) => ({ ...errors, [lang]: !!error }), {}),
    };
  }, {});

  return <LangSwitcher errors={errors} />;
};

export default FormLangSwitcherField;
