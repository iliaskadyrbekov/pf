import React from 'react';
import { useRouter } from 'next/router';

import EventLayout from './EventLayout';
import { Button } from '@components/common';
import { IconWithTextLayout } from 'src/layouts';
import { EventFooterLayout } from './components';
import { AvailablePlaces } from '../../../components';
import { SpecificationItemLayout } from './components/SpecificationItem';

import { getS3FileUrl } from '@utils/getS3FileUrl';
import { accommodationTariffs } from '../../helpers';
import { specificationLabelByTypeMap } from './helpers';
import { useCreateAccommodationOrderItems } from './mutations';
import { OrderItemStatus } from 'src/shared/enums/OrderItemStatus';
import { IAccommodationProduct } from 'src/shared/interfaces/Product';
import { FormLanguageContext, ModalContext, ModalType, ShopContext } from 'src/context';

interface IEventProps {
  product: IAccommodationProduct;
  to: Date;
  from: Date;
}

const Event = ({ to, from, product }: IEventProps) => {
  const { shop } = React.useContext(ShopContext);

  if (!shop) {
    return null;
  }

  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { mutate: createAccommodationOrderItems } = useCreateAccommodationOrderItems();

  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  const { handleOpenModal, handleCloseModal } = React.useContext(ModalContext);

  const { currency } = shop;
  const { id, name, accommodationPricing, accommodationMedia, specifications, availablePlaces } = product;

  const pricingToString = (price?: number) => (price ? `${currency.symbolNative}${price} ${currency.id}` : '');

  const handleSubmit = async () => {
    const orderInfoInput: { orderId?: string; shopId?: string } = { orderId };

    const { data } = await createAccommodationOrderItems({
      variables: {
        orderInfoInput,
        input: [{ dateStart: from, dateEnd: to, product: id }],
      },
    });

    if (data) {
      const openModal = data?.createAccommodationOrderItems.orderItems.some(
        ({ orderItem: { status } }) => status === OrderItemStatus.CHECKOUT_FORM,
      );

      if (openModal) {
        handleOpenModal({ type: ModalType.CHECKOUT, props: { orderId } });
      } else {
        handleCloseModal();
      }
    }
  };

  return (
    <EventLayout
      name={getMultiLanguageValue(name)}
      media={getS3FileUrl(accommodationMedia?.find((item) => item.isMain)?.key)}
      specifications={
        specifications?.length
          ? specifications.map((specification) => (
              <SpecificationItemLayout
                value={`${specification.amount} ${specificationLabelByTypeMap[specification.type]}`}
                key={specification.order}
              />
            ))
          : null
      }
      footer={
        <EventFooterLayout
          price={pricingToString(accommodationPricing.price)}
          tariff={accommodationTariffs[accommodationPricing.tariff]}
          comparedWithPrice={pricingToString(accommodationPricing.comparedWithPrice)}
          availablePlaces={<AvailablePlaces total={0} leftPlaces={availablePlaces} />}
          button={
            <Button disabled={!availablePlaces} onClick={handleSubmit} className="font-inter lg:font-roboto">
              <IconWithTextLayout text="Select" />
            </Button>
          }
        />
      }
    />
  );
};

export default Event;
