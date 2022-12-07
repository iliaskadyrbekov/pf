import React from 'react';
import { Formik } from 'formik';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import { useLazyQuery, useQuery } from '@apollo/client';

import EventLayout from '../../EventLayout';
import { Button } from '@components/common/Button';
import IconWithTextLayout from 'src/layouts/IconWithTextLayout';
import { FormField } from '@components/common/FormFields/FormField';
import ProductSelect from './components/ProductSelect/ProductSelect';
import StartTimeSelect from './components/StartTimeSelect/StartTimeSelect';
import VariationSelect from './components/VariationSelect/VariationSelect';
import { AvailablePlaces } from '@components/Modals/CreateOrderItemModal/components/components';

import { isNumber } from '@utils/isNumber';
import { getS3FileUrl } from '@utils/getS3FileUrl';
import { IRentalProduct } from 'src/shared/interfaces/Product';
import { OrderItemStatus } from 'src/shared/enums/OrderItemStatus';
import { IRentalOrderItem } from 'src/shared/interfaces/OrderItem';
import { IProductPricing, IRentalPricingVariation } from 'src/shared/interfaces';
import { FormLanguageContext, ModalContext, ModalType, ShopContext } from 'src/context';
import { IOrderRes, IOrderVars, ORDER } from '@components/Modals/CreateOrderItemModal/queries/order';
import { getMaxPlaces, getCounterInitialValue } from '@components/Modals/CreateOrderItemModal/helpers/helpers';
import { useCreateRentalOrderItems, ICreateRentalOrderItemsInput } from '../../mutations/createRentalOrderItems';
import {
  IRentalEventsRes,
  RENTAL_EVENTS,
  IRentalEventsVars,
} from '@components/Modals/CreateOrderItemModal/queries/rentalEvents';

interface ISimpleEventProps {
  product: IRentalProduct;
  from: Date;
  to: Date;
  initialVariationId: string;
}

const SimpleEvent = ({ product, from, to, initialVariationId }: ISimpleEventProps) => {
  const { shop } = React.useContext(ShopContext);

  if (!shop) {
    return null;
  }

  const router = useRouter();

  const orderId = router.query.orderId as string;

  const [getRentalEvents, { data }] = useLazyQuery<IRentalEventsRes, IRentalEventsVars>(RENTAL_EVENTS);
  const [variationId, setVariationId] = React.useState(initialVariationId);
  const { mutate: createRentalOrderItems } = useCreateRentalOrderItems();

  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  const { handleOpenModal, handleCloseModal } = React.useContext(ModalContext);

  React.useEffect(() => {
    getRentalEvents({ variables: { productId: [product.id], from, to, variationId } });
  }, [from, to, variationId, setVariationId]);

  const { data: orderData } = useQuery<IOrderRes, IOrderVars>(ORDER, {
    variables: { id: orderId },
  });

  const cartOrderItems = orderData?.order?.orderItems || [];

  const getAlreadyBookedOrderItems = (eventId?: string, date?: Date) => {
    return cartOrderItems.filter(
      ({ orderItem }) =>
        (orderItem as IRentalOrderItem)?.event?.id === eventId &&
        (orderItem as IRentalOrderItem).date === date &&
        (orderItem as IRentalOrderItem).pricing.id === variationId,
    );
  };

  const { name, media, pricing, category, shortDescription } = product;
  const rentalEvents =
    data?.rentalEvents.filter((event) => event.id === product.events.find((event) => event.id)?.id) || [];

  const handleVariationChange = React.useCallback(
    (variationId: string) => {
      setVariationId(variationId);
      return variationId;
    },
    [setVariationId, variationId],
  );

  const availableDates = React.useMemo(() => {
    const availableDates = rentalEvents.flatMap((event) => event.availableDates);

    if (!availableDates.length) {
      return [];
    }

    return availableDates.map(({ date, availablePlaces, isAvailableByTime }) => ({
      date,
      availablePlaces,
      formatDate: moment(date).format('HH:mm'),
      isDisabled: availablePlaces <= 0 || !isAvailableByTime,
    }));
  }, [rentalEvents]);

  const variations = pricing
    .sort((a: IRentalPricingVariation, b: IRentalPricingVariation) => a.order - b.order)
    .map(({ id, name, price, comparedWithPrice, minPurchase, maxPurchase }) => {
      return {
        id,
        name: getMultiLanguageValue(name),
        price,
        comparedWithPrice,
        minPurchase,
        maxPurchase,
      };
    });

  const currentVariation = variations.find((item) => item.id === variationId);

  const getLeftQuantity = (date: Date | null) => {
    if (!date) {
      return 0;
    }
    return availableDates.find((item) => item.date === date)?.availablePlaces || 0;
  };

  const getPricing = (count: number, property: string) => {
    if (!currentVariation) {
      return '';
    }

    const value = currentVariation[property as keyof IProductPricing] as number;

    if (!value) {
      return '';
    }

    return `${shop.currency.symbolNative} ${count > 0 ? value * count : value}`;
  };

  const getCommonProps = (date: Date) => {
    const id = rentalEvents.flatMap((event) => event.id)[0];
    const maxPurchase = currentVariation?.maxPurchase;
    const minPurchase = currentVariation?.minPurchase;
    const availablePlaces = availableDates.find((item) => item.date === date)?.availablePlaces;
    const alreadyBookedItemsLength = getAlreadyBookedOrderItems(id, date).length;

    return { maxPurchase, minPurchase, availablePlaces, alreadyBookedItemsLength };
  };

  const getLeftPlaces = (date: Date) => {
    if (!date) {
      return 0;
    }

    return getMaxPlaces(getCommonProps(date));
  };

  const getMinimumCount = (date: Date) => {
    const id = rentalEvents.flatMap((event) => event.id)[0];
    const minPurchase = currentVariation?.minPurchase;

    const alreadyBookedItemsLength = getAlreadyBookedOrderItems(id, date).length;

    return minPurchase && isNumber(minPurchase) ? Math.max(1, minPurchase - alreadyBookedItemsLength) : 0;
  };

  const getProducts = (date: Date, events: { id: string; value: number }[]) => {
    return [
      {
        id: events[0].id,
        name: multiName,
        leftPlaces: getLeftPlaces(date),
        minimumCount: getMinimumCount(date),
      },
    ];
  };

  const getInitialValues = () => {
    const date =
      (availableDates.length && availableDates.find((item) => !item.isDisabled)?.date) ||
      (moment().valueOf() as unknown as Date);
    const id = rentalEvents.flatMap((event) => event.id)[0];
    const value = getCounterInitialValue(getCommonProps(date));

    return {
      date,
      variationId,
      events: [{ id, value }],
    };
  };

  const multiName = getMultiLanguageValue(name);
  const totalQuantity = rentalEvents.find((event) => event.availableDays.length)?.quantity || 0; // TODO i am taking last result now, maybe we will change this

  return (
    <Formik
      initialValues={getInitialValues()}
      onSubmit={async (values) => {
        const orderInfoInput: { orderId?: string; shopId?: string } = {
          orderId,
        };

        const rentalEvents = values.events.reduce<ICreateRentalOrderItemsInput[]>(
          (acc: ICreateRentalOrderItemsInput[], { id, value }: { id: string; value: number }) => {
            return [
              ...acc,
              ...Array.from({ length: value }).map(() => ({
                date: values.date,
                pricing: values.variationId,
                event: id,
              })),
            ];
          },
          [],
        );

        const { data } = await createRentalOrderItems({
          variables: {
            input: rentalEvents,
            orderInfoInput,
          },
        });

        if (data) {
          const openModal = data?.createRentalOrderItems.orderItems.some(
            ({ orderItem: { status } }) => status === OrderItemStatus.CHECKOUT_FORM,
          );

          if (openModal) {
            handleOpenModal({ type: ModalType.CHECKOUT, props: { orderId } });
          } else {
            handleCloseModal();
          }
        }
      }}
      enableReinitialize
    >
      {({ handleSubmit, values: { date, events }, setFieldValue }) => (
        <EventLayout
          name={category ? getMultiLanguageValue(category.name) : getMultiLanguageValue(name)}
          description={shortDescription ? getMultiLanguageValue(shortDescription) : ''}
          image={getS3FileUrl(media)}
          comparedWithPrice={getPricing(events[0].value, 'comparedWithPrice')}
          price={getPricing(events[0].value, 'price')}
          availablePlaces={<AvailablePlaces total={totalQuantity} leftPlaces={getLeftQuantity(date)} />}
          productSelect={
            <ProductSelect
              productItems={getProducts(date, events)}
              text="Choose option."
              countChosenProducts={events[0].value}
            />
          }
          variationSelect={
            <FormField
              name="variationId"
              component={VariationSelect}
              onChange={handleVariationChange}
              variations={variations}
              text="Choose duration."
            />
          }
          startTimeSelect={
            <StartTimeSelect
              onChange={(date) => setFieldValue('events[0].value', getCounterInitialValue(getCommonProps(date)))}
              name="date"
              availableDates={availableDates}
              text="Choose start time."
            />
          }
          button={
            <Button
              disabled={getLeftQuantity(date) <= 0}
              className="font-inter lg:font-roboto"
              onClick={() => handleSubmit()}
            >
              <IconWithTextLayout text="Select" classNames="uppercase" />
            </Button>
          }
        />
      )}
    </Formik>
  );
};

export default SimpleEvent;
