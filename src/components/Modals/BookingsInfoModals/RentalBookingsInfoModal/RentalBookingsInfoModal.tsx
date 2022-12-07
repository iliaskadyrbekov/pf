import React from 'react';

import { Button } from '@components/common';
import RentalBookingsInfoModalLayout from './RentalBookingsInfoModalLayout';
import { RentalBookingsInfo } from './components';
import { ShopContext } from 'src/context';
import { useRentalOrderItemsInfoQuery } from './queries/rentalOrderItemsInfo';

interface IRentalBookingsInfoModalProps {
  onClose: () => void;
  eventId: string;
  date: {
    from: Date;
    to: Date;
  };
}

const RentalBookingsInfoModal = ({ eventId, date, onClose }: IRentalBookingsInfoModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { data, loading } = useRentalOrderItemsInfoQuery({
    variables: { shopId: shop?.id, filter: { shopId: shop?.id, eventId, strictDate: date } },
  });

  const rentalOrderItemsInfo = data?.rentalOrderItems;

  if (loading) {
    return null;
  }

  if (!rentalOrderItemsInfo) {
    return (
      <Button variant="contained" color="default" key="1" onClick={onClose}>
        Close
      </Button>
    );
  }

  return (
    <RentalBookingsInfoModalLayout
      mainInfo={<RentalBookingsInfo orderItems={rentalOrderItemsInfo} />}
      actions={[
        <Button variant="contained" color="default" key="1" onClick={onClose}>
          Close
        </Button>,
      ]}
    />
  );
};

export default RentalBookingsInfoModal;
