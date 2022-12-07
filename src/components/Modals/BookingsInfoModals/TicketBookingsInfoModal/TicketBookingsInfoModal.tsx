import React from 'react';

import { Button } from '@components/common';
import TicketBookingsInfoModalLayout from './TicketBookingsInfoModalLayout';
import { ShopContext } from 'src/context';
import { useTicketOrderItemsInfoQuery } from './queries/ticketOrderItemsInfo';
import { TicketBookingsInfo } from './components';

interface ITicketBookingsInfoModalProps {
  onClose: () => void;
  eventId: string;
  date: {
    from: Date;
    to: Date;
  };
}

const TicketBookingsInfoModal = ({ eventId, date, onClose }: ITicketBookingsInfoModalProps) => {
  const { shop } = React.useContext(ShopContext);

  const { data, loading } = useTicketOrderItemsInfoQuery({
    variables: { shopId: shop?.id, filter: { shopId: shop?.id, eventId, strictDate: date } },
  });

  const ticketOrderItemsInfo = data?.ticketOrderItems;

  if (loading) {
    return null;
  }

  if (!ticketOrderItemsInfo) {
    return (
      <Button variant="contained" color="default" key="close" onClick={onClose}>
        Close
      </Button>
    );
  }

  return (
    <TicketBookingsInfoModalLayout
      mainInfo={<TicketBookingsInfo orderItems={ticketOrderItemsInfo} />}
      actions={[
        <Button variant="contained" color="default" key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    />
  );
};

export default TicketBookingsInfoModal;
