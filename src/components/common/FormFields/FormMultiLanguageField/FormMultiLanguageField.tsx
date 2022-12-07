import React from 'react';

import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { getLanguageParam } from 'src/helpers';
import { useMultiLanguageField } from 'src/lib/useMultiLanguageField';
import { ErrorMessage } from '../ErrorMessage';

interface IFormMultiLanguageFieldProps {
  name: string;
  component: any;
}

const FormMultiLanguageField = <T,>(props: T & IFormMultiLanguageFieldProps) => {
  const [{ onChange, value, ...field }, { apiError = {}, error = [] }] = useMultiLanguageField<
    { value: string; lang: string; country: string }[],
    string[]
  >(props.name);

  const { lang } = React.useContext(FormLanguageContext);

  const { component: Component, ...restProps } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      const val = typeof e === 'string' ? e : e.target.value;

      const curValue = value || [];

      if (!curValue.some((v) => lang.languageId === v.lang && lang.countryId === v.country)) {
        onChange([...curValue, { value: val, lang: lang.languageId, country: lang.countryId }]);
      } else {
        onChange(
          curValue.map((v) => (lang.languageId === v.lang && lang.countryId === v.country ? { ...v, value: val } : v)),
        );
      }
    },
    [onChange, lang, value],
  );

  const generalError = apiError.generalError || [];
  const langError = apiError[getLanguageParam(lang.languageId, lang.countryId)] || [];

  const errors = [...langError, ...generalError, ...error];

  return (
    <div className="w-full flex flex-col items-start">
      <Component
        {...restProps}
        {...field}
        value={value?.find((v) => lang.languageId === v.lang && lang.countryId === v.country)?.value || ''}
        onChange={handleChange}
        isError={!!errors.length}
      />
      {!!errors.length && <ErrorMessage message={errors} />}
    </div>
  );
};

export default FormMultiLanguageField;
