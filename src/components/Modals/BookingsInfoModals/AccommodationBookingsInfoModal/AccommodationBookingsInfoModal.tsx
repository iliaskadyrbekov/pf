import React from 'react';

import { Button } from '@components/common';
import AccommodationBookingsInfoModalLayout from './AccommodationBookingsInfoModalLayout';
import { ShopContext } from 'src/context';
import { useAccommodationOrderItemsInfoQuery } from './queries/accommodationOrderItemsInfo';
import { AccommodationBookingsInfo } from './components';

interface IAccommodationBookingsInfoModalProps {
  onClose: () => void;
  orderItemId: string;
}

const AccommodationBookingsInfoModal = ({ orderItemId, onClose }: IAccommodationBookingsInfoModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { data, loading } = useAccommodationOrderItemsInfoQuery({
    variables: { shopId: shop?.id, filter: { shopId: shop?.id, id: orderItemId } },
  });

  const accommodationOrderItemsInfo = data?.accommodationOrderItems;

  if (loading) {
    return null;
  }

  if (!accommodationOrderItemsInfo) {
    return (
      <Button variant="contained" color="default" key="close" onClick={onClose}>
        Close
      </Button>
    );
  }

  return (
    <AccommodationBookingsInfoModalLayout
      mainInfo={<AccommodationBookingsInfo orderItems={accommodationOrderItemsInfo} />}
      actions={[
        <Button variant="contained" color="default" key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    />
  );
};

export default AccommodationBookingsInfoModal;
