import React from 'react';
import { useFormikContext } from 'formik';
import { EventClickArg } from '@fullcalendar/react';

import { BlockLayout } from '@components/common/Block';
import { Media, CheckoutForm, Calendar, BoxLayout } from '../../components';
import { Accordion, FormField, SelectNative, Toggle } from '@components/common';
import { EventContent, MainInfo, Pricing } from '../components';

import { ShopContext } from 'src/context/ShopContext';
import { parseRentalEvent } from '../helpers/parseEvent';
import { IRentalProductMetaFields, IVAT } from 'src/shared/interfaces';
import { IRentalProduct } from 'src/shared/interfaces/Product';
import CreateEntityLayout from 'src/layouts/CreateEntityLayout';
import { TRentalEvent } from 'src/shared/interfaces/RentalEvent';
import { ModalContext, ModalType } from 'src/context/ModalContext';
import { SettingsLayout } from 'src/layouts';
import { VATSelect } from '@components/common/VATSelect';

interface IRentalProductFormProps {
  VATOptions: IVAT[];
  meta?: IRentalProductMetaFields;
  actions: React.ReactNode[];
  events: TRentalEvent[];
}

const RentalProductForm = ({ meta, actions, events, VATOptions }: IRentalProductFormProps) => {
  const { values, setFieldValue } = useFormikContext<IRentalProduct>();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const handleDateClick = React.useCallback((eventInfo) => {
    handleOpenModal({
      type: ModalType.ADD_RENTAL_EVENT,
      props: { calendarEvent: eventInfo },
    });
  }, []);

  const handleEventClick = (eventInfo: EventClickArg) => {
    const event = events.find(({ id }) => id === eventInfo.event.id);

    if (event) {
      handleOpenModal({
        type: ModalType.EDIT_RENTAL_EVENT,
        props: {
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
        <Media key="2" />,
        <Pricing key="3" />,
        <BlockLayout key="4" title="Schedule & Availability">
          <Calendar
            renderEventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
            timezone={shop?.timezone.id}
            events={events.map(parseRentalEvent)}
            initialView="dayGridMonth"
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </BlockLayout>,
        <Accordion
          key="5"
          expanded={values.checkoutEnabled}
          title="Checkout form"
          toggle={
            <FormField name="checkoutEnabled" onChange={(val) => val} component={Toggle} label="Enable checkout form" />
          }
          content={
            <CheckoutForm
              name="checkoutForm"
              checkoutForm={values.checkoutForm}
              onChange={(checkoutForm) => setFieldValue('checkoutForm', checkoutForm)}
            />
          }
        />,
      ]}
      settings={
        <SettingsLayout>
          {[
            <BoxLayout key="0">
              <FormField
                label="Visibility"
                name="visibility"
                options={meta?.visibility.options?.map(({ id, label }) => ({ value: id, label }))}
                component={SelectNative}
              />
            </BoxLayout>,
            <BoxLayout key="VAT">
              <FormField
                label="Sales Tax / VAT"
                name="VAT"
                placeholder="Select tax rate..."
                component={VATSelect}
                options={VATOptions}
              />
            </BoxLayout>,
          ]}
        </SettingsLayout>
      }
      actions={actions}
    />
  );
};

export default RentalProductForm;
