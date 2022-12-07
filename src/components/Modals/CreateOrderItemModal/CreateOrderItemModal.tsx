import React from 'react';

import { Button } from '@components/common/Button';
import { BlockLayout } from '@components/common/Block';
import CreateOrderItemModalLayout from './CreateOrderItemModalLayout';
import {
  GiftCardEventsContainer,
  TicketEventsContainer,
  RentalEventsContainer,
  AccommodationEventsContainer,
} from './components';

import { ActivityType } from 'src/shared/enums/ActivityType';

interface ICreateOrderItemModalProps {
  onClose(): void;
  activityType: ActivityType;
  activityId: string;
}

const CreateOrderItemModal = ({ onClose, activityType, activityId }: ICreateOrderItemModalProps) => {
  const componentByActivityType = {
    [ActivityType.TICKET]: <TicketEventsContainer activityId={activityId} />,
    [ActivityType.RENTAL]: <RentalEventsContainer activityId={activityId} />,
    [ActivityType.GIFT_CARD]: <GiftCardEventsContainer activityId={activityId} />,
    [ActivityType.ACCOMMODATION]: <AccommodationEventsContainer activityId={activityId} />,
    [ActivityType.MERCHANDISE]: null,
    [ActivityType.MEMBERSHIP]: null,
    [ActivityType.SERVICE]: null,
    [ActivityType.ADD_ON_PRODUCTS]: null,
    [ActivityType.EVENTS]: null,
  };

  return (
    <BlockLayout>
      <CreateOrderItemModalLayout
        title="Choose product"
        closeButton={
          <Button variant="contained" color="default" onClick={onClose}>
            Cancel
          </Button>
        }
        events={componentByActivityType[activityType]}
      />
    </BlockLayout>
  );
};

export default CreateOrderItemModal;
