import React from 'react';
import { Formik } from 'formik';
import moment from 'moment-timezone';
import { format, startOfDay } from 'date-fns';

import RecurringEventFormLayout from './RecurringEventFormLayout';
import { FormWeekDaysField } from '@components/Modals/CreateRentalEventModal/components/RecurringEventForm/components/FormWeekDaysField';
import {
  ConnectedResources,
  FormField,
  FormInputSelectNativeField,
  Input,
  Radio,
  Select,
  TextAccordion,
} from '@components/common';

import { getDurationOptions } from 'src/helpers';
import { TWeekday } from 'src/shared/types/Weekday';
import { EventType } from 'src/shared/enums/EventType';
import { ShopContext } from 'src/context/ShopContext';
import { IConnectedAvailabilityResource } from 'src/shared/interfaces/ConnectedAvailabilityResource';
import { useAvailabilityResourcesQuery } from 'src/graphql/queries/availabilityResources';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { EventFrequencyType } from 'src/shared/enums/EventFrequencyType';
import { AVAILABILITY_TOOLTIP_CONTENT, RESOURCES_TOOLTIP_CONTENT } from '@components/common/Tooltip/constants';

interface IRecurringEventFormProps {
  onCreateEvent(values: ICreatedRecurringEvent): void;
  onClose: () => void;
  initialValues: IInitialValues;
  actions: (props: { handleSubmit(): void }) => React.ReactNode;
  availabilityType: AvailabilityType;
}
export interface ICreatedRecurringEvent {
  allDay: boolean;
  type: EventType.RECURRING;
  dtstart: Date;
  freq: EventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  until?: Date;
  quantity: number | null;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources: { order: number; resource: string }[];
}

export interface IInitialValues {
  allDay: boolean;
  type: EventType.RECURRING;
  dtstart: Date;
  freq: EventFrequencyType;
  interval: number;
  byweekday: TWeekday[];
  until?: Date;
  untilEnabled?: '0' | '1';
  quantity: number | null;
  minPurchase?: number | null;
  maxPurchase?: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources: IConnectedAvailabilityResource[];
}

const freqOptions = [
  { value: EventFrequencyType.YEAR, label: 'Year' },
  { value: EventFrequencyType.MONTH, label: 'Month' },
  { value: EventFrequencyType.WEEK, label: 'Week' },
  { value: EventFrequencyType.DAY, label: 'Day' },
  { value: EventFrequencyType.HOUR, label: 'Hour' },
];

const RecurringEventForm = ({
  onClose,
  initialValues,
  onCreateEvent,
  actions,
  availabilityType,
}: IRecurringEventFormProps) => {
  const { shop } = React.useContext(ShopContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const handleNumberFieldChange = React.useCallback(
    // TODO create number field
    (e: React.ChangeEvent<HTMLInputElement>, { prevValue }) => {
      const value = e.target.value && parseInt(e.target.value);
      return isNaN(value as number) ? prevValue : value;
    },
    [],
  );

  const handleTimeFieldChange = (startDate: Date) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = moment(startDate).tz('utc');

    const hours = +e.target.value.split(':')[0];
    const minutes = +e.target.value.split(':')[1];

    date.set({ hours, minutes });

    return date.toDate();
  };

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

  const filterResources = (
    connectedResources: IConnectedAvailabilityResource[],
    resourcesOpts: { value: string }[],
  ) => {
    return resourcesOpts.filter(({ value }) => !connectedResources.find(({ resource }) => value === resource.id));
  };

  const { data } = useAvailabilityResourcesQuery({ shopId: shop?.id });
  const resources = data?.availabilityResources || [];
  const resourcesOptions = resources.map(({ name, id, availability }) => ({
    label: `${getMultiLanguageValue(name)} ${availability}`,
    value: id,
  }));

  const prepareVariables = (values: IInitialValues): ICreatedRecurringEvent => {
    return {
      allDay: values.allDay,
      type: values.type,
      dtstart: values.dtstart,
      freq: values.freq,
      interval: values.interval,
      byweekday: values.byweekday,
      until: values.until,
      quantity: values.quantity ? +values.quantity : null,
      minPurchase: values.minPurchase ? +values.minPurchase : null,
      maxPurchase: values.maxPurchase ? +values.maxPurchase : null,
      minPurchaseTime: values.minPurchaseTime && {
        type: values.minPurchaseTime.type,
        value: values.minPurchaseTime.value ? +values.minPurchaseTime.value : null,
      },
      maxPurchaseTime: values.maxPurchaseTime && {
        type: values.maxPurchaseTime.type,
        value: values.maxPurchaseTime.value ? +values.maxPurchaseTime.value : null,
      },
      connectedResources: values.connectedResources?.map(({ order, resource: { id } }) => ({
        order,
        resource: id,
      })),
    };
  };

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
      {({ handleSubmit, setFieldValue, values: { untilEnabled, connectedResources, dtstart } }) => (
        <RecurringEventFormLayout
          startTime={
            availabilityType === AvailabilityType.FIXED && (
              <FormField
                type="time"
                name="dtstart"
                label="Start time"
                component={Input}
                transformValue={(val) =>
                  moment(val as unknown as Date)
                    .tz('utc')
                    .format('HH:mm')
                }
                onChange={handleTimeFieldChange(dtstart)}
              />
            )
          }
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
              transformValue={() => undefined}
              onChange={(selectedId: string) => [
                ...connectedResources,
                { resource: resources.find(({ id }) => id === selectedId), order: connectedResources.length },
              ]}
              name="connectedResources"
              label="Resources"
              placeholder="Select resources..."
              tooltipContent={RESOURCES_TOOLTIP_CONTENT}
              options={filterResources(connectedResources, resourcesOptions)}
              component={Select}
            />
          }
          connectedResources={
            <ConnectedResources
              connectedResources={connectedResources}
              getResourceName={(connectedResource) =>
                `${getMultiLanguageValue(connectedResource.resource.name)} ${connectedResource.resource.availability}`
              }
              onChange={(connectedResources) => setFieldValue('connectedResources', connectedResources)}
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
