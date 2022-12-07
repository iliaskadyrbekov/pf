import React from 'react';
import { Formik } from 'formik';
import { format, startOfDay } from 'date-fns';

import RecurringEventFormLayout from './RecurringEventFormLayout';
import { FormWeekDaysField } from '@components/Modals/CreateRentalEventModal/components/RecurringEventForm/components/FormWeekDaysField';
import { FormField, FormInputSelectNativeField, GroupedSelect, Input, Radio, TextAccordion } from '@components/common';

import { TWeekday } from 'src/shared/types/Weekday';
import { EventType } from 'src/shared/enums/EventType';
import { ShopContext } from 'src/context/ShopContext';
import { IConnectedAreaResource } from 'src/shared/interfaces/ConnectedAreaResource';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { useAreaResourcesQuery } from 'src/graphql/queries/areaResources';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { getDurationOptions } from 'src/helpers';
import { AccommodationEventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { AVAILABILITY_TOOLTIP_CONTENT, RESOURCES_TOOLTIP_CONTENT } from '@components/common/Tooltip/constants';
import { getGroupedResourcesOptions } from '../../helpers/getGroupedResourcesOptions';

interface IRecurringEventFormProps {
  onCreateEvent(values: ICreatedRecurringEvent): void;
  onClose: () => void;
  initialValues: IInitialValues;
  actions: (props: { handleSubmit(): void }) => React.ReactNode;
}

export interface ICreatedRecurringEvent {
  type: EventType.RECURRING;
  dtstart: Date;
  freq: AccommodationEventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  until?: Date;
  exdate?: Date[];
  quantity: number | null;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources: { order: number; resource: string }[];
}

export interface IInitialValues {
  type: EventType.RECURRING;
  dtstart: Date;
  freq: AccommodationEventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  until?: Date;
  untilEnabled?: '0' | '1';
  exdate?: Date[];
  quantity: number | null;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources: IConnectedAreaResource[];
}

const freqOptions = [
  { value: AccommodationEventFrequencyType.YEARLY, label: 'Year' },
  { value: AccommodationEventFrequencyType.MONTHLY, label: 'Month' },
  { value: AccommodationEventFrequencyType.WEEKLY, label: 'Week' },
  { value: AccommodationEventFrequencyType.DAILY, label: 'Day' },
];

const RecurringEventForm = ({ onClose, initialValues, onCreateEvent, actions }: IRecurringEventFormProps) => {
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const handleValidate = (values: typeof initialValues) => {
    const errors: { [key in keyof Partial<IInitialValues>]: string[] } = {};

    if (!values.interval) {
      errors.interval = ['Required'];
    }

    if (!values.byweekday?.length) {
      errors.byweekday = ['Required'];
    }

    return { ...errors };
  };

  const { data } = useAreaResourcesQuery({ shopId: shop?.id });
  const resources = data?.areaResources || [];
  const resourcesOptions = getGroupedResourcesOptions(resources, getMultiLanguageValue);

  const prepareVariables = (values: IInitialValues): ICreatedRecurringEvent => {
    return {
      type: values.type,
      dtstart: values.dtstart,
      freq: values.freq,
      interval: values.interval,
      byweekday: values.byweekday,
      until: values.until,
      quantity: values.quantity ? +values.quantity : null,
      minPurchase: values.minPurchase,
      maxPurchase: values.maxPurchase,
      minPurchaseTime: values.minPurchaseTime && {
        type: values.minPurchaseTime.type,
        value: values.minPurchaseTime.value ? +values.minPurchaseTime.value : 0,
      },
      maxPurchaseTime: values.maxPurchaseTime && {
        type: values.maxPurchaseTime.type,
        value: values.maxPurchaseTime.value ? +values.maxPurchaseTime.value : 0,
      },
      connectedResources: values.connectedResources?.map(({ order, resource: { id } }) => ({
        order,
        resource: id,
      })),
    };
  };

  const handleNumberFieldChange = React.useCallback(
    // TODO create number field
    (e: React.ChangeEvent<HTMLInputElement>, { prevValue }) => {
      const value = e.target.value && parseInt(e.target.value);
      return isNaN(value as number) ? prevValue : value;
    },
    [],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setStatus }) => {
        const errors = handleValidate(values);
        if (errors && Object.keys(errors).length) {
          setStatus(errors);
        } else {
          const event = prepareVariables(values);
          onCreateEvent(event);
          onClose();
        }
      }}
    >
      {({ handleSubmit, setFieldValue, values: { untilEnabled } }) => (
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
            <FormField
              onChange={handleNumberFieldChange}
              name="quantity"
              label="Availability"
              component={Input}
              tooltipContent={AVAILABILITY_TOOLTIP_CONTENT}
            />
          }
          resourcesSelect={
            <FormField
              transformValue={(connectedResources: IConnectedAreaResource[]) =>
                connectedResources.map((connected) => connected.resource.id)
              }
              onChange={(selectedIds: string[]) =>
                selectedIds.map((selectedId, index) => ({
                  resource: resources.find(({ id }) => id === selectedId),
                  order: index,
                }))
              }
              renderSelectedOptions={(options?: { label: string; value: string }[]) =>
                !!options && options.map((opt) => (opt ? <p key={opt.value}>{opt.label}</p> : null))
              }
              name="connectedResources"
              label="Resources"
              placeholder="Select resources..."
              tooltipContent={RESOURCES_TOOLTIP_CONTENT}
              options={resourcesOptions}
              component={GroupedSelect}
            />
          }
          additionalOptions={
            <TextAccordion title="Additional options">
              <FormField
                name="minPurchase"
                label="Minimum purchase"
                component={Input}
                onChange={handleNumberFieldChange}
              />
              <FormField
                name="maxPurchase"
                label="Maximum purchase"
                component={Input}
                onChange={handleNumberFieldChange}
              />
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
