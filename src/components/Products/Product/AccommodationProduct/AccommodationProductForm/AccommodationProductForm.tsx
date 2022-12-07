import React from 'react';
import { useRouter } from 'next/router';
import { useFormikContext } from 'formik';
import { EventClickArg } from '@fullcalendar/react';

import { Pricing } from '../components/Pricing';
import { CheckoutForm, Calendar, BoxLayout } from '../../components';
import { EventContent } from '../../TicketProduct/components';
import CreateEntityLayout from 'src/layouts/CreateEntityLayout';
import { MainInfo, Specification } from '../components';
import { Accordion, BlockLayout, FormField, MultipleMedia, SelectNative, Toggle } from '@components/common';

import { ShopContext } from 'src/context/ShopContext';
import { ModalContext, ModalType } from 'src/context';
import { TCheckoutFormField } from 'src/shared/interfaces/CheckoutForm';
import { TAccommodationEvent } from 'src/shared/interfaces/AccommodationEvent';
import { parseAccommodationEvent } from '../helpers/parseAccommodationEvent';
import { useProductMediaPresignedUploadUrl } from '../../components/Media/mutations';
import {
  IAccommodationProductMetaFields,
  IAccommodationPricing,
  IAccommodationSpecification,
  IVAT,
  MultiLanguageField,
} from 'src/shared/interfaces';
import { SettingsLayout } from 'src/layouts';
import { VATSelect } from '@components/common/VATSelect';

interface IAccommodationProductFormProps {
  meta?: IAccommodationProductMetaFields;
  loading: boolean;
  events: TAccommodationEvent[];
  actions: React.ReactNode[];
  VATOptions: IVAT[];
}

interface IFormikContext {
  name: MultiLanguageField[];
  shortDescription: MultiLanguageField[];
  visibility?: string;
  pricing: IAccommodationPricing;
  checkoutEnabled: boolean;
  checkoutForm: TCheckoutFormField[];
  specificationsEnabled: boolean;
  specifications: IAccommodationSpecification[];
}

const AccommodationProductForm = ({ meta, events, actions, VATOptions }: IAccommodationProductFormProps) => {
  const router = useRouter();
  const { values, setFieldValue } = useFormikContext<IFormikContext>();

  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const { mutate: getPresignedUploadUrl } = useProductMediaPresignedUploadUrl();

  const handleDateClick = React.useCallback((eventInfo) => {
    handleOpenModal({
      type: ModalType.ADD_ACCOMMODATION_EVENT,
      props: { calendarEvent: eventInfo },
    });
  }, []);

  const handleEventClick = (eventInfo: EventClickArg) => {
    const event = events.find(({ id }) => id === eventInfo.event.id);
    if (event) {
      handleOpenModal({
        type: ModalType.EDIT_ACCOMMODATION_EVENT,
        props: {
          calendarEvent: eventInfo,
          event,
        },
      });
    }
  };

  const handleGetUploadImageUrl = React.useCallback(
    async (file: File) => {
      const { data } = await getPresignedUploadUrl({
        variables: {
          productId: router.query.productId as string,
          shopId: shop?.id,
          fileType: file.type,
          fileName: file.name,
        },
      });

      return data?.productMediaPresignedUploadUrl;
    },
    [shop],
  );

  const handleUploadImage = React.useCallback((imageKey: string) => {
    return imageKey;
  }, []);

  return (
    <CreateEntityLayout
      infoBlocks={[
        <MainInfo key="1" />,
        <FormField
          name="media"
          component={MultipleMedia}
          handleUploadImage={handleUploadImage}
          handleGetUploadImageUrl={handleGetUploadImageUrl}
          maxCountMedia={10}
          key="2"
        />,
        <Pricing key="3" />,
        <BlockLayout key="4" title="Schedule & Availability">
          <Calendar
            renderEventContent={(eventInfo) => <EventContent eventInfo={eventInfo} />}
            timezone={shop?.timezone.id}
            events={events.map((event) => parseAccommodationEvent(event, shop?.timezone.id as string))}
            initialView="dayGridMonth"
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        </BlockLayout>,
        <Accordion
          key="5"
          expanded={values.specificationsEnabled}
          title="Specification"
          toggle={
            <FormField
              name="specificationsEnabled"
              onChange={(val) => val}
              component={Toggle}
              label="Enable specifications"
            />
          }
          content={
            <Specification
              name="specifications"
              specifications={values.specifications}
              onChange={(specificationForm) => setFieldValue('specifications', specificationForm)}
            />
          }
        />,
        <Accordion
          key="6"
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
                options={meta?.visibility.options.map(({ id, label }) => ({ value: id, label }))}
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

export default AccommodationProductForm;
