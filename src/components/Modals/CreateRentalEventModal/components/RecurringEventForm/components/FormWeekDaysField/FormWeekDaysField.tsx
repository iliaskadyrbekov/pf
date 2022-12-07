import React from 'react';

import { useCustomField } from 'src/lib/useCustomField';
import { WeekDays } from '../WeekDays';
import { TWeekday } from 'src/shared/types/Weekday';
import ErrorMessage from '@components/common/FormFields/ErrorMessage/ErrorMessage';

interface IFormWeekDaysFieldProps {
  name: string;
  label: React.ReactNode;
}

const FormWeekDaysField = (props: IFormWeekDaysFieldProps) => {
  const { name, ...restProps } = props;
  const [field, { apiError, error = [] }, { setValue }] = useCustomField<TWeekday[], string[]>(name);
  const errors = [...(apiError || []), ...error];

  const handleChange = React.useCallback(
    (day: TWeekday) => {
      const value = [...field.value];

      if (value?.length) {
        const exisingDayIndex = value.findIndex((val) => val === day);

        if (~exisingDayIndex) {
          value.splice(exisingDayIndex, 1);
          setValue(value);
        } else {
          setValue([...value, day]);
        }
      } else {
        setValue([day]);
      }
    },
    [setValue, field.value],
  );

  return (
    <>
      <WeekDays {...field} {...restProps} onChange={handleChange} isError={!!errors.length} />
      {!!errors.length && <ErrorMessage message={errors} />}
    </>
  );
};

export default FormWeekDaysField;
