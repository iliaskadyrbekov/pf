import React from 'react';
import { Formik } from 'formik';
import { format, startOfDay } from 'date-fns';

import RecurringEventFormLayout from './RecurringEventFormLayout';
import { FormField } from '@components/common/FormFields/FormField';
import { Input } from '@components/common/Input';
import { FormInputSelectNativeField } from '@components/common/FormFields/FormInputSelectNativeField';
import { FormWeekDaysField } from './components/FormWeekDaysField';
import { Radio } from '@components/common/Radio';
import { TWeekday } from 'src/shared/types/Weekday';
import { EventType } from 'src/shared/enums/EventType';
import { RentalEventFrequencyType } from 'src/shared/enums';
import { TextAccordion } from '@components/common/TextAccordion';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { NonNullableProps } from 'src/shared/types/NonNullableProps';
import { getDurationOptions } from 'src/helpers';

export interface ICreatedRentalEvent {
  type: EventType.RECURRING;
  dtstart: Date;
  freq: RentalEventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  until?: Date;
  quantity: number;
  startTime: string;
  endTime: string;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
}

export interface IInitialValues {
  type: EventType.RECURRING;
  dtstart: Date;
  freq: RentalEventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  until?: Date;
  untilEnabled: '0' | '1';
  quantity: number | null;
  startTime: string | null;
  endTime: string | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
}

interface IRecurringEventFormProps {
  onCreateEvent(values: ICreatedRentalEvent): void;
  onClose: () => void;
  initialValues: IInitialValues;
  actions: (props: { handleSubmit(): void }) => React.ReactNode;
}

const freqOptions = [
  { value: RentalEventFrequencyType.YEARLY, label: 'Year' },
  { value: RentalEventFrequencyType.MONTHLY, label: 'Month' },
  { value: RentalEventFrequencyType.WEEKLY, label: 'Week' },
  { value: RentalEventFrequencyType.DAILY, label: 'Day' },
];

const RecurringEventForm = ({ onClose, initialValues, onCreateEvent, actions }: IRecurringEventFormProps) => {
  const handleNumberFieldChange = React.useCallback(
    // TODO create number field
    (e: React.ChangeEvent<HTMLInputElement>, { prevValue }) => {
      const value = e.target.value && parseInt(e.target.value);
      return isNaN(value as number) ? prevValue : value;
    },
    [],
  );

  const prepareVariables = (
    values: NonNullableProps<IInitialValues, 'startTime' | 'endTime' | 'quantity'>,
  ): ICreatedRentalEvent => {
    return {
      startTime: values.startTime,
      endTime: values.endTime,
      type: values.type,
      dtstart: values.dtstart,
      freq: values.freq,
      interval: values.interval,
      byweekday: values.byweekday,
      until: values.until,
      quantity: +values.quantity,
      minPurchaseTime: values.minPurchaseTime && {
        type: values.minPurchaseTime.type,
        value: values.minPurchaseTime.value ? +values.minPurchaseTime.value : null,
      },
      maxPurchaseTime: values.maxPurchaseTime && {
        type: values.maxPurchaseTime.type,
        value: values.maxPurchaseTime.value ? +values.maxPurchaseTime.value : null,
      },
    };
  };

  const handleValidate = (values: typeof initialValues) => {
    const errors: { [key in keyof Partial<IInitialValues>]: string[] } = {};

    if (!values.quantity) {
      errors.quantity = ['Required'];
    }

    if (!values.interval) {
      errors.interval = ['Required'];
    }

    if (!values.byweekday?.length) {
      errors.byweekday = ['Required'];
    }

    if (!values.startTime) {
      errors.startTime = ['Required'];
    }

    if (!values.endTime) {
      errors.endTime = ['Required'];
    }

    return { ...errors };
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setStatus }) => {
        const errors = handleValidate(values);
        if (errors && Object.keys(errors).length) {
          setStatus(errors);
        } else {
          const event = prepareVariables(
            values as NonNullableProps<IInitialValues, 'startTime' | 'endTime' | 'quantity'>,
          );
          onCreateEvent(event);
          onClose();
        }
      }}
    >
      {({ handleSubmit, values: { untilEnabled }, setFieldValue }) => (
        <RecurringEventFormLayout
          freq={
            <FormInputSelectNativeField
              onChange={handleNumberFieldChange}
              label="Repeat every"
              inputName="interval"
              selectName="freq"
              options={freqOptions}
            />
          }
          weekDays={<FormWeekDaysField name="byweekday" label="Repeat on" />}
          untilLabel="Ends"
          disableUntil={
            <FormField
              name="untilEnabled"
              label="Never"
              id="0"
              component={Radio}
              onAfterChange={() => setFieldValue('until', null)}
            />
          }
          enableUntil={<FormField name="untilEnabled" label="On" id="1" component={Radio} />}
          until={
            <FormField
              transformValue={(val) => val && format(new Date(val), 'yyyy-MM-dd')}
              onChange={(e: any) => startOfDay(new Date(e.target.value))}
              name="until"
              type="date"
              component={Input}
              disabled={untilEnabled === '0'}
            />
          }
          quantity={
            <FormField onChange={handleNumberFieldChange} name="quantity" label="Availability" component={Input} />
          }
          startTime={<FormField name="startTime" label="Start time" component={Input} type="time" />}
          endTime={<FormField name="endTime" label="End time" component={Input} type="time" />}
          additionalOptions={
            <TextAccordion title="Additional options">
              <FormInputSelectNativeField
                inputName="minPurchaseTime.value"
                selectName="minPurchaseTime.type"
                label="Minimum purchase time"
                options={getDurationOptions()}
                onChange={handleNumberFieldChange}
              />
              <FormInputSelectNativeField
                inputName="maxPurchaseTime.value"
                selectName="maxPurchaseTime.type"
                label="Maximum purchase time"
                options={getDurationOptions()}
                onChange={handleNumberFieldChange}
              />
            </TextAccordion>
          }
          actions={actions({ handleSubmit })}
        />
      )}
    </Formik>
  );
};

export default RecurringEventForm;
