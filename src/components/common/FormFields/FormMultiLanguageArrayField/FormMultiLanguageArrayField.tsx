import React from 'react';

import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { getLanguageParam } from 'src/helpers';
import { useMultiLanguageField } from 'src/lib/useMultiLanguageField';
import { ErrorMessage } from '../ErrorMessage';

interface IFormMultiLanguageArrayFieldProps {
  name: string;
  transformValue?: (value: string[]) => any;

  component: React.FC<any>;
}

const FormMultiLanguageArrayField = <Props,>(props: Props & IFormMultiLanguageArrayFieldProps) => {
  const [{ onChange, value, ...field }, { apiError = {}, error = [] }, { setValue }] = useMultiLanguageField<
    { value: string[]; lang: string; country: string }[],
    string[]
  >(props.name);

  const { lang } = React.useContext(FormLanguageContext);

  const { component: Component, transformValue, ...restProps } = props;

  const handleChange = React.useCallback(
    (val: string[] = []) => {
      let newVal;

      if (!value.some((v) => lang.languageId === v.lang && lang.countryId === v.country)) {
        newVal = [...value, { value: val, lang: lang.languageId, country: lang.countryId }];
      } else {
        newVal = value.map((v) =>
          lang.languageId === v.lang && lang.countryId === v.country ? { ...v, value: val } : v,
        );
      }

      setValue(newVal);
    },
    [onChange, setValue, lang, value],
  );

  const generalError = apiError.generalError || [];
  const langError = apiError[getLanguageParam(lang.languageId, lang.countryId)] || [];

  const errors = [...langError, ...generalError, ...error];

  const currentValue = value
    ? value.find((v) => lang.languageId === v.lang && lang.countryId === v.country)?.value || []
    : [];

  const transformedValue = transformValue ? transformValue(currentValue) : currentValue;

  return (
    <div className="items-start w-full">
      <Component {...restProps} {...field} value={transformedValue} onChange={handleChange} isError={!!errors.length} />
      {!!errors.length && <ErrorMessage message={errors} />}
    </div>
  );
};

export default FormMultiLanguageArrayField;
