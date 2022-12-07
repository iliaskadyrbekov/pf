import React from 'react';
import { useRouter } from 'next/router';

import ActivityLayout from './ActivityLayout';
import { Button } from '@components/common/Button';
import {
  TicketActivityTable,
  RentalActivityTable,
  Widgets,
  GiftCardActivityTable,
  AccommodationActivityTable,
} from './components';

import { TProduct } from 'src/shared/interfaces/Product';
import { IActivity } from 'src/shared/interfaces/Activity';
import { ActivityType } from 'src/shared/enums/ActivityType';
import { ModalContext, ModalType } from 'src/context/ModalContext';

interface IActivityProps {
  activity: IActivity;
  products: TProduct[];
}

const Activity = ({ activity, products }: IActivityProps) => {
  const router = useRouter();
  const orderedProducts = React.useMemo(() => Array.from(products).sort((a, b) => a.order - b.order), products);

  const { handleOpenModal } = React.useContext(ModalContext);

  const handleEdit = React.useCallback(async () => {
    await router.push(`${router.asPath}/edit`);
  }, [router]);

  const getTableByActivityType = (type: ActivityType) => {
    switch (type) {
      case ActivityType.TICKET: {
        return <TicketActivityTable products={orderedProducts} activityId={activity.id} />;
      }
      case ActivityType.RENTAL: {
        return <RentalActivityTable products={orderedProducts} activity={activity} />;
      }
      case ActivityType.GIFT_CARD: {
        return <GiftCardActivityTable products={orderedProducts} activityId={activity.id} />;
      }
      case ActivityType.ACCOMMODATION: {
        return <AccommodationActivityTable products={orderedProducts} activityId={activity.id} />;
      }
      default:
        return null;
    }
  };

  const handleCreateNewProduct = () => {
    switch (activity.type) {
      case ActivityType.TICKET: {
        handleOpenModal({ type: ModalType.CREATE_TICKET_PRODUCT });
        break;
      }
      case ActivityType.RENTAL: {
        handleOpenModal({ type: ModalType.CREATE_RENTAL_PRODUCT });
        break;
      }
      case ActivityType.GIFT_CARD: {
        handleOpenModal({ type: ModalType.CREATE_GIFT_CARD_PRODUCT });
        break;
      }
      case ActivityType.ACCOMMODATION: {
        handleOpenModal({ type: ModalType.CREATE_ACCOMMODATION_PRODUCT });
        break;
      }
    }
  };

  return (
    <ActivityLayout
      products={getTableByActivityType(activity.type)}
      widgets={<Widgets visibility={activity.visibility} />}
      actions={[
        <Button variant="contained" color="default" key="1" onClick={handleEdit}>
          Edit
        </Button>,
        <Button variant="contained" color="primary" key="2" onClick={handleCreateNewProduct}>
          New product
        </Button>,
      ]}
    />
  );
};

export default Activity;
