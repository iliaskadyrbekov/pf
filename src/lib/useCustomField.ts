import { SyntheticEvent, useCallback } from 'react';
import {
  useField as useFieldFormik,
  useFormikContext,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
} from 'formik';

interface IFiledMetaProps<T> extends FieldMetaProps<T> {
  apiError?: string[];
}

interface IHelperProps<T, Error> {
  setValue: FieldHelperProps<T>['setValue'];
  setTouched: FieldHelperProps<T>['setTouched'];
  setError: FieldHelperProps<Error>['setError'];
}

const isEvent = (event: SyntheticEvent) => event && (event instanceof Event || event.nativeEvent instanceof Event);

export function useCustomField<T, Error>(
  name: string,
): [FieldInputProps<T>, IFiledMetaProps<T>, IHelperProps<T, Error>] {
  const { status, setStatus, setFieldTouched } = useFormikContext();
  const [{ onBlur: onBlurFormik, onChange: onChangeFormik, ...field }, meta, helpers] = useFieldFormik(name);

  const apiError = status && status[name];

  const onBlurMemo = useCallback(
    (e) => {
      setStatus({
        ...status,
        [name]: null,
      });
      if (isEvent(e)) {
        onBlurFormik(e);
      } else {
        setFieldTouched(e);
      }
    },
    [status, name, setStatus, onBlurFormik, setFieldTouched],
  );

  const onChangeMemo = useCallback(
    (e) => {
      setStatus({
        ...status,
        [name]: null,
      });
      if (isEvent(e)) {
        onChangeFormik(e);
      } else {
        helpers.setValue(e);
      }
    },
    [status, name, setStatus, onChangeFormik, helpers.setValue],
  );

  return [{ onBlur: onBlurMemo, onChange: onChangeMemo, ...field }, { apiError, ...meta }, helpers];
}
