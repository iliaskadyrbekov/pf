import React from 'react';
import { useFormikContext } from 'formik';
import { EventClickArg } from '@fullcalendar/react';

import { Pricing } from '../components/Pricing';
import { CheckoutForm, Calendar, BoxLayout } from '../../components';
import CreateEntityLayout from 'src/layouts/CreateEntityLayout';
import { EventContent, MainInfo } from '../components';
import {
  Accordion,
  BlockLayout,
  FormField,
  FormInputSelectNativeField,
  SelectNative,
  Toggle,
} from '@components/common';

import { parseEvent } from '../helpers/parseEvent';
import { ShopContext } from 'src/context/ShopContext';
import { IEvent } from 'src/shared/interfaces/TicketEvent';
import { IDuration } from 'src/shared/interfaces/Duration';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { AvailabilityType } from 'src/shared/enums/AvailabilityType';
import { TCheckoutFormField } from 'src/shared/interfaces/CheckoutForm';
import { IProductPricing, ITicketProductMetaFields, IVAT, MultiLanguageField } from 'src/shared/interfaces';
import { SettingsLayout } from 'src/layouts';
import { VATSelect } from '@components/common/VATSelect';

interface ITicketProductFormProps {
  meta?: ITicketProductMetaFields;
  loading: boolean;
  events: IEvent[];
  actions: React.ReactNode[];
  VATOptions: IVAT[];
}

interface IFormikContext {
  product: {
    name: MultiLanguageField[];
    shortDescription: MultiLanguageField[];
    visibility: string | undefined;
    pricing: IProductPricing;
    duration: IDuration;
    checkoutEnabled: boolean;
    availabilityType: AvailabilityType;
    checkoutForm: TCheckoutFormField[];
  };
}

const TicketProductForm = ({ meta, events, actions, VATOptions }: ITicketProductFormProps) => {
  const { values, setFieldValue } = useFormikContext<IFormikContext>();

  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const handleDateClick = React.useCallback(
    (eventInfo) => {
      handleOpenModal({
        type: ModalType.ADD_TICKET_EVENT,
        props: { calendarEvent: eventInfo, availabilityType: values.product.availabilityType },
      });
    },
    [values.product.availabilityType],
  );

  const getInitialView = React.useCallback((availabilityType: AvailabilityType) => {
    switch (availabilityType) {
      case AvailabilityType.FIXED:
        return 'timeGridWeek';
      case AvailabilityType.OPEN:
        return 'dayGridMonth';
    }
  }, []);

  const handleDurationChange = React.useCallback(
    // TODO create number field
    (e: React.ChangeEvent<HTMLInputElement>, { prevValue }) => {
      const value = e.target.value && parseInt(e.target.value);
      return isNaN(value as number) ? prevValue : value;
    },
    [values],
  );

  const handleEventClick = (eventInfo: EventClickArg) => {
    const event = events.find(({ event: { id } }) => id === eventInfo.event.id);
    if (event) {
      handleOpenModal({
        type: ModalType.EDIT_TICKET_EVENT,
        props: {
          availabilityType: values.product.availabilityType,
          calendarEvent: eventInfo,
          event,
        },
      });
    }
  };

  return (
    <CreateEntityLayout
      infoBlocks={[
        <MainInfo key="1" />,
        <Pricing key="2" />,
        <BlockLayout key="3" title="Schedule & Availability">
          <Calendar
            renderEventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
            timezone={shop?.timezone.id}
            events={events.map(({ event }) => parseEvent(event, values.product))}
            initialView={getInitialView(values.product.availabilityType)}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </BlockLayout>,
        <Accordion
          key="4"
          expanded={values.product.checkoutEnabled}
          title="Checkout form"
          toggle={
            <FormField
              name="product.checkoutEnabled"
              onChange={(val) => val}
              component={Toggle}
              label="Enable checkout form"
            />
          }
          content={
            <CheckoutForm
              name="product.checkoutForm"
              checkoutForm={values.product.checkoutForm}
              onChange={(checkoutForm) => setFieldValue('product.checkoutForm', checkoutForm)}
            />
          }
        />,
      ]}
      settings={
        <SettingsLayout>
          {[
            <BoxLayout key="visibility">
              <FormField
                label="Visibility"
                name="product.visibility"
                options={meta?.visibility.options.map(({ id, label }) => ({ value: id, label }))}
                component={SelectNative}
              />
            </BoxLayout>,
            <BoxLayout key="VAT">
              <FormField
                label="Sales Tax / VAT"
                name="product.VAT"
                placeholder="Select tax rate..."
                component={VATSelect}
                options={VATOptions}
              />
            </BoxLayout>,
            <BoxLayout key="duration">
              <FormInputSelectNativeField
                onChange={handleDurationChange}
                inputName="product.duration.value"
                options={meta?.durationType.options}
                selectName="product.duration.type"
                label="Duration"
              />
            </BoxLayout>,
            <BoxLayout key="availabilityType">
              <FormField
                label="Scheduling option"
                name="product.availabilityType"
                options={meta?.availabilityType.options}
                component={SelectNative}
              />
            </BoxLayout>,
          ]}
        </SettingsLayout>
      }
      actions={actions}
    />
  );
};

export default TicketProductForm;
