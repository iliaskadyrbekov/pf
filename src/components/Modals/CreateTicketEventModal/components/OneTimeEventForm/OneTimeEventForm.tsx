import React from 'react';
import { Formik } from 'formik';
import moment from 'moment-timezone';

import {
  ConnectedResources,
  FormField,
  FormInputSelectNativeField,
  Input,
  Select,
  TextAccordion,
} from '@components/common';
import OneTimeEventFormLayout from './OneTimeEventFormLayout';

import { getDurationOptions } from 'src/helpers';
import { ShopContext } from 'src/context/ShopContext';
import { EventType } from 'src/shared/enums/EventType';
import { IConnectedAvailabilityResource } from 'src/shared/interfaces/ConnectedAvailabilityResource';
import { useAvailabilityResourcesQuery } from 'src/graphql/queries/availabilityResources';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { AVAILABILITY_TOOLTIP_CONTENT, RESOURCES_TOOLTIP_CONTENT } from '@components/common/Tooltip/constants';

export interface IOneTimeEventForm {
  onClose: () => void;
  onCreateEvent(values: ICreatedOneTimeEvent): void;
  initialValues: IInitialValues;
  actions: (props: { handleSubmit: () => void }) => React.ReactNode;
  availabilityType: AvailabilityType;
}

export interface ICreatedOneTimeEvent {
  startDate: Date;
  allDay: boolean;
  type: EventType.ONE_TIME;
  quantity: number | null;
  minPurchase: number | null;
  maxPurchase: number | null;
  minPurchaseTime?: IOptionalDuration;
  maxPurchaseTime?: IOptionalDuration;
  connectedResources: { order: number; resource: string }[];
}

interface IInitialValues {
  startDate: Date;
  allDay: boolean;
  type: EventType.ONE_TIME;
  quantity: number | null;
  minPurchase: number | null;
  maxPurchase: number | null;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
  connectedResources: IConnectedAvailabilityResource[];
}

const OneTimeEventForm = ({ onClose, initialValues, onCreateEvent, actions, availabilityType }: IOneTimeEventForm) => {
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
    const date = moment(startDate);

    const hours = +e.target.value.split(':')[0];
    const minutes = +e.target.value.split(':')[1];

    date.set({ hours, minutes });

    return date.toDate();
  };

  const prepareVariables = (values: IInitialValues): ICreatedOneTimeEvent => {
    return {
      startDate: values.startDate,
      allDay: values.allDay,
      type: values.type,
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

  const handleValidate = (_: typeof initialValues) => {
    const errors: { [key in keyof Partial<IInitialValues>]: string[] } = {};

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setStatus }) => {
        const errors = handleValidate(values);
        if (errors && Object.keys(errors).length) {
          setStatus(errors);
          return;
        } else {
          const event = prepareVariables(values);
          onCreateEvent(event);
          onClose();
        }
      }}
    >
      {({ values: { connectedResources, startDate }, handleSubmit, setFieldValue }) => (
        <OneTimeEventFormLayout
          startTime={
            availabilityType === AvailabilityType.FIXED && (
              <FormField
                type="time"
                name="startDate"
                label="Start time"
                component={Input}
                transformValue={(val) => moment(val as any).format('HH:mm')}
                onChange={handleTimeFieldChange(startDate)}
              />
            )
          }
          quantity={
            <FormField
              name="quantity"
              label="Availability"
              tooltipContent={AVAILABILITY_TOOLTIP_CONTENT}
              component={Input}
              onChange={handleNumberFieldChange}
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
              getResourceName={(connectedResource) =>
                `${getMultiLanguageValue(connectedResource.resource.name)} ${connectedResource.resource.availability}`
              }
              connectedResources={connectedResources}
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

export default OneTimeEventForm;
