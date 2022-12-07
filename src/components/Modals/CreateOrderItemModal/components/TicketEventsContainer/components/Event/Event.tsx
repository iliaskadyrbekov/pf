import React from 'react';
import { Formik } from 'formik';
import moment from 'moment-timezone';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import EventLayout from './EventLayout';
import { Button } from '@components/common/Button';
import { VariationSelect } from './components/VariationSelect';
import IconWithTextLayout from 'src/layouts/IconWithTextLayout';
import { AvailablePlaces, TimeSelect } from '../../../components';

import { isNumber } from '@utils/isNumber';
import { isDefined } from '@utils/isDefined';
import { OrderItemStatus } from 'src/shared/enums/OrderItemStatus';
import { ITicketProduct } from 'src/shared/interfaces/Product';
import { ITicketOrderItem } from 'src/shared/interfaces/OrderItem';
import { FormLanguageContext, ModalContext, ModalType, ShopContext } from 'src/context';
import { ICreateOrderItemsInput, useCreateOrderItems } from './mutations/createOrderItems';
import { IOrderRes, IOrderVars, ORDER } from '@components/Modals/CreateOrderItemModal/queries/order';
import { getCounterInitialValue, getMaxPlaces } from '@components/Modals/CreateOrderItemModal/helpers/helpers';
import { IEvent } from 'src/shared/interfaces';

interface IEventProps {
  product: ITicketProduct;
}

export interface ITicketVariations {
  id: string;
  name: string;
  value: number;
  leftPlaces: number;
  pricing: number;
  comparedWithPrice?: number;
}

const Event = ({ product }: IEventProps) => {
  const { shop } = React.useContext(ShopContext);

  if (!shop) {
    return null;
  }

  const availableDates = product.events.flatMap((event) =>
    event.availableDates.map((date) => ({ ...date, eventId: event.id, isAllDay: event.allDay })),
  );

  const curDate = availableDates.find(
    ({ date, isMinPurchaseTimeValid, isMaxPurchaseTimeValid, isAllDay }) =>
      isMaxPurchaseTimeValid && isMinPurchaseTimeValid && (isAllDay || moment().isSameOrBefore(date)),
  );

  const router = useRouter();

  const orderId = router.query.orderId as string;

  const [currentDate, setCurrentDate] = React.useState(curDate);
  const { mutate: createOrderItems } = useCreateOrderItems();

  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  const { handleOpenModal, handleCloseModal } = React.useContext(ModalContext);

  const { data: orderData } = useQuery<IOrderRes, IOrderVars>(ORDER, {
    variables: { id: orderId },
  });

  const cartOrderItems = orderData?.order?.orderItems || [];

  const { name, pricing, shortDescription } = product;

  const curEvent = product.events.find(({ id }) => id === currentDate?.eventId);
  const minPurchase = curEvent?.minPurchase;
  const maxPurchase = curEvent?.maxPurchase;

  const getAlreadyBookedOrderItems = (eventId?: string, date?: Date) => {
    return cartOrderItems.filter(
      ({ event, orderItem }) =>
        (event as IEvent)?.event.id === eventId && (orderItem as ITicketOrderItem).date === date,
    );
  };

  const getMinimumCount = (value: number, countChosenProducts: number) => {
    const alreadyBookedItemsLength = getAlreadyBookedOrderItems(curEvent?.id, currentDate?.date).length;

    return minPurchase && isNumber(minPurchase)
      ? Math.max(0, value + minPurchase - countChosenProducts - alreadyBookedItemsLength)
      : 0;
  };

  const getCommonProps = () => {
    return {
      availablePlaces: isDefined(currentDate?.availablePlaces) ? currentDate?.availablePlaces : Infinity,
      alreadyBookedItemsLength: getAlreadyBookedOrderItems(curEvent?.id, currentDate?.date).length,
      minPurchase,
      maxPurchase,
    };
  };

  const variations = [...pricing]
    .sort((current, next) => current.order - next.order)
    .map((variation, index) => ({
      id: variation.id,
      name: getMultiLanguageValue(variation.name),
      value: index === 0 ? getCounterInitialValue(getCommonProps()) : 0,
      leftPlaces: getMaxPlaces(getCommonProps()),
      pricing: variation.price,
      comparedWithPrice: variation.comparedWithPrice,
    }));

  const getPrice = (variations: ITicketVariations[]) => {
    const totalAmount = variations
      .filter((variation) => variation.value)
      .reduce((acc, variation) => acc + variation.pricing * variation.value, 0);
    return `${shop.currency.symbolNative} ${totalAmount}`;
  };

  const getComparedWithPrice = (variations: ITicketVariations[]) => {
    const selectedVariations = variations.filter((variation) => variation.value);
    const isExistComparedWithPrice = selectedVariations.some((variation) => variation.comparedWithPrice);

    if (isExistComparedWithPrice) {
      const totalAmount = selectedVariations.reduce(
        (acc, variation) =>
          acc + (variation.comparedWithPrice ? variation.comparedWithPrice : variation.pricing) * variation.value,
        0,
      );

      return `${shop.currency.symbolNative} ${totalAmount}`;
    }

    return '';
  };

  const getTotalCount = (variations: ITicketVariations[]) => variations.reduce((acc, { value }) => acc + value, 0);

  return (
    <Formik
      initialValues={{
        variations,
      }}
      enableReinitialize
      onSubmit={async (values) => {
        if (!currentDate) {
          return;
        }

        const variations = values.variations
          .filter((variation) => variation.value)
          .reduce<ICreateOrderItemsInput[]>(
            (acc: ICreateOrderItemsInput[], { id, value }: { id: string; value: number }) => {
              return [
                ...acc,
                ...Array.from({ length: value }).map(() => ({
                  date: currentDate.date,
                  event: currentDate.eventId,
                  pricing: id,
                })),
              ];
            },
            [],
          );

        const orderInfoInput: { orderId?: string; shopId?: string } = { orderId };

        const { data } = await createOrderItems({
          variables: {
            orderInfoInput,
            input: variations,
          },
        });

        if (data) {
          const openModal = data?.createOrderItems.orderItems.some(
            ({ orderItem: { status } }) => status === OrderItemStatus.CHECKOUT_FORM,
          );

          if (openModal) {
            handleOpenModal({ type: ModalType.CHECKOUT, props: { orderId } });
          } else {
            handleCloseModal();
          }
        }
      }}
    >
      {({ handleSubmit, values }) => (
        <EventLayout
          name={getMultiLanguageValue(name)}
          description={shortDescription ? getMultiLanguageValue(shortDescription) : ''}
          comparedWithPrice={getComparedWithPrice(values.variations)}
          price={getPrice(values.variations)}
          variationSelect={
            <VariationSelect
              variations={values.variations}
              currency={shop.currency.symbolNative}
              text="Choose amount."
              countChosenProducts={getTotalCount(values.variations)}
              getMinimumCount={getMinimumCount}
            />
          }
          timeDropdown={
            <TimeSelect
              availableDates={availableDates}
              allDay={curEvent?.allDay}
              onChange={setCurrentDate}
              selectedDate={currentDate}
              text="Choose start time."
            />
          }
          availablePlaces={
            currentDate && (
              <AvailablePlaces total={curEvent?.availability || 0} leftPlaces={currentDate.availablePlaces} />
            )
          }
          button={
            <Button
              disabled={
                !currentDate ||
                (isDefined(currentDate.availablePlaces) && !currentDate.availablePlaces) ||
                getTotalCount(values.variations) === 0
              }
              onClick={() => handleSubmit()}
              className="font-inter lg:font-roboto"
            >
              <IconWithTextLayout text="Select" />
            </Button>
          }
        />
      )}
    </Formik>
  );
};

export default Event;
