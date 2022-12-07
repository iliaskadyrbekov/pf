import { classNames } from '@utils/classNames';
import React from 'react';

import { useCustomField } from 'src/lib/useCustomField';
import { ErrorMessage } from '../ErrorMessage';

// TODO add typescript;
interface IFormFieldProps<ValueType> {
  name: string;
  valueName?: string;
  onChange?: (val: ValueType, { prevValue }: { prevValue?: ValueType }) => any;
  onAfterChange?: (val: ValueType, { prevValue }: { prevValue?: ValueType }) => any;
  transformValue?: (value: any) => any;
  fieldWrapperClassName?: string;
  valueNameToValue?: (value: any) => { [key: string | number]: unknown };

  component: React.ComponentType<any>;

  [x: string]: any;
}

const FormField = <ValueType,>(props: IFormFieldProps<ValueType>) => {
  const [field, { apiError, error = [] }, { setValue }] = useCustomField<ValueType, string[]>(props.name);

  const { value, ...restField } = field;
  const errors = [...(apiError || []), ...error];

  const {
    component: Component,
    fieldWrapperClassName,
    valueName = 'value',
    valueNameToValue,
    transformValue,
    onAfterChange,
    ...restProps
  } = props;

  const transformedValue = transformValue ? transformValue(value) : value;

  const handleChange = React.useCallback(
    (e: ValueType) => {
      if (props.onChange) {
        field.onChange(props.onChange(e, { prevValue: value }));
      } else {
        field.onChange(e);
      }

      if (onAfterChange) {
        onAfterChange(e, { prevValue: value });
      }
    },
    [props.onChange, setValue, field.onChange, value, onAfterChange],
  );

  const valueObj = valueNameToValue ? valueNameToValue(transformedValue) : { [valueName]: transformedValue };

  return (
    <div className={classNames('w-full flex flex-col items-start', fieldWrapperClassName)}>
      <Component {...restProps} {...restField} {...valueObj} onChange={handleChange} isError={!!errors.length} />
      {!!errors.length && <ErrorMessage message={errors} />}
    </div>
  );
};

export default FormField;
