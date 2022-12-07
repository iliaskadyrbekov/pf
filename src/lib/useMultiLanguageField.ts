import React, { SyntheticEvent } from 'react';
import {
  useField as useFieldFormik,
  useFormikContext,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
} from 'formik';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { getLanguageParam } from '../helpers';

interface IFiledMetaProps<T> extends FieldMetaProps<T> {
  apiError?: { [key: string]: string[] };
}

interface IHelperProps<T, Error> {
  setValue: FieldHelperProps<T>['setValue'];
  setTouched: FieldHelperProps<T>['setTouched'];
  setError: FieldHelperProps<Error>['setError'];
}

const isEvent = (event: SyntheticEvent) => event && (event instanceof Event || event.nativeEvent instanceof Event);

export function useMultiLanguageField<T, Error>(
  name: string,
): [FieldInputProps<T>, IFiledMetaProps<T>, IHelperProps<T, Error>] {
  const { status = {}, setStatus, setFieldTouched } = useFormikContext();
  const [{ onBlur: onBlurFormik, onChange: onChangeFormik, ...field }, meta, helpers] = useFieldFormik(name);
  const { lang } = React.useContext(FormLanguageContext);

  const apiError = status && status[name];

  const onBlurMemo = React.useCallback(
    (e) => {
      if (isEvent(e)) {
        onBlurFormik(e);
      } else {
        setFieldTouched(e);
      }
      setStatus({
        ...status,
        [name]: {
          ...status[name],
          generalError: null,
          [getLanguageParam(lang.languageId, lang.countryId)]: null,
        },
      });
    },
    [status, name, setStatus, onBlurFormik, lang, setFieldTouched],
  );

  const onChangeMemo = React.useCallback(
    (e) => {
      if (isEvent(e)) {
        onChangeFormik(e);
      } else {
        helpers.setValue(e);
      }
      setStatus({
        ...status,
        [name]: {
          ...status[name],
          generalError: null,
          [getLanguageParam(lang.languageId, lang.countryId)]: null,
        },
      });
    },
    [status, name, setStatus, onChangeFormik, lang, helpers],
  );

  return [{ onBlur: onBlurMemo, onChange: onChangeMemo, ...field }, { apiError, ...meta }, helpers];
}
