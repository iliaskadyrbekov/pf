import React from 'react';
import { Formik } from 'formik';

import { FormField } from '@components/common/FormFields/FormField';
import { Input } from '@components/common/Input';
import OneTimeEventFormLayout from './OneTimeEventFormLayout';
import { EventType } from 'src/shared/enums/EventType';
import { FormInputSelectNativeField } from '@components/common/FormFields/FormInputSelectNativeField';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { TextAccordion } from '@components/common/TextAccordion';
import { NonNullableProps } from 'src/shared/types/NonNullableProps';
import { getDurationOptions } from 'src/helpers';

export interface ICreatedOneTimeEvent {
  startDate: Date;
  type: EventType.ONE_TIME;
  startTime: string;
  endTime: string;
  quantity: number;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
}

interface IInitialValues {
  startDate: Date;
  type: EventType.ONE_TIME;
  startTime: string | null;
  endTime: string | null;
  quantity: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
}

export interface IOneTimeEventForm {
  onClose: () => void;
  onCreateEvent(values: ICreatedOneTimeEvent): void;
  initialValues: IInitialValues;
  actions: (props: { handleSubmit: () => void }) => React.ReactNode;
}

const OneTimeEventForm = ({ onClose, initialValues, onCreateEvent, actions }: IOneTimeEventForm) => {
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
  ): ICreatedOneTimeEvent => {
    return {
      startDate: values.startDate,
      type: values.type,
      startTime: values.startTime,
      endTime: values.endTime,
      quantity: values.quantity,
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
          return;
        } else {
          const event = prepareVariables(
            values as NonNullableProps<IInitialValues, 'startTime' | 'endTime' | 'quantity'>,
          );
          onCreateEvent(event);
          onClose();
        }
      }}
    >
      {({ handleSubmit }) => (
        <OneTimeEventFormLayout
          quantity={
            <FormField name="quantity" label="Availability" component={Input} onChange={handleNumberFieldChange} />
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

export default OneTimeEventForm;
