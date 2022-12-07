import React from 'react';
import { Formik } from 'formik';

import { FormField, FormInputSelectNativeField, GroupedSelect, Input, TextAccordion } from '@components/common';
import OneTimeEventFormLayout from './OneTimeEventFormLayout';

import { ShopContext } from 'src/context/ShopContext';
import { EventType } from 'src/shared/enums/EventType';
import { IConnectedAreaResource } from 'src/shared/interfaces/ConnectedAreaResource';
import { IOptionalDuration } from 'src/shared/interfaces/Duration';
import { FormLanguageContext } from 'src/context/FormLanguageContext';
import { getDurationOptions } from 'src/helpers';
import { AVAILABILITY_TOOLTIP_CONTENT, RESOURCES_TOOLTIP_CONTENT } from '@components/common/Tooltip/constants';
import { useAreaResourcesQuery } from 'src/graphql/queries/areaResources';
import { getGroupedResourcesOptions } from '../../helpers/getGroupedResourcesOptions';

export interface IOneTimeEventForm {
  onClose: () => void;
  onCreateEvent(values: ICreatedOneTimeEvent): void;
  initialValues: IInitialValues;
  actions: (props: { handleSubmit: () => void }) => React.ReactNode;
}

export interface ICreatedOneTimeEvent {
  startDate: Date;
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
  type: EventType.ONE_TIME;
  quantity: number | null;
  minPurchase: number | null;
  maxPurchase: number | null;
  minPurchaseTime: IOptionalDuration;
  maxPurchaseTime: IOptionalDuration;
  connectedResources: IConnectedAreaResource[];
}

const OneTimeEventForm = ({ onClose, initialValues, onCreateEvent, actions }: IOneTimeEventForm) => {
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

  const prepareVariables = (values: IInitialValues): ICreatedOneTimeEvent => {
    return {
      startDate: values.startDate,
      type: values.type,
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

  const { data } = useAreaResourcesQuery({ shopId: shop?.id });
  const resources = data?.areaResources || [];
  const resourcesOptions = getGroupedResourcesOptions(resources, getMultiLanguageValue);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        const event = prepareVariables(values);
        onCreateEvent(event);
        onClose();
      }}
    >
      {({ handleSubmit }) => (
        <OneTimeEventFormLayout
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
              transformValue={(connectedResources: IConnectedAreaResource[]) =>
                connectedResources.map((connected) => connected.resource.id)
              }
              onChange={(selectedIds: string[]) =>
                selectedIds.map((selectedId, index) => ({
                  resource: resources.find(({ id }) => id === selectedId),
                  order: index,
                }))
              }
              renderSelectedOptions={(options?: ({ label: string; value: string } | null)[]) =>
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

export default OneTimeEventForm;
