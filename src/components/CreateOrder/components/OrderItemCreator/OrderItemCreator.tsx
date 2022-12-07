import React from 'react';

import { ShopContext, ModalContext, FormLanguageContext, ModalType } from 'src/context';
import { useActivitiesQuery } from 'src/graphql/queries/activities';
import { ActivityBox } from './components/ActivityBox';
import OrderItemCreatorLayout from './OrderItemCreatorLayout';
import { getS3FileUrl } from '@utils/getS3FileUrl';
import { BlockLayout } from '@components/common/Block';

const OrderItemCreator = () => {
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);

  const { data } = useActivitiesQuery({ shopId: shop?.id });
  const activities = data?.activities || [];

  const openModal = (activityId: string) => {
    const activity = activities.find(({ id }) => id === activityId);

    if (activity) {
      handleOpenModal({
        type: ModalType.CREATE_ORDER_ITEM,
        props: {
          activityId,
          activityType: activity.type,
        },
      });
    }
  };

  return (
    <BlockLayout>
      <OrderItemCreatorLayout
        title="New order item"
        activities={activities.map(({ id, name, headImage }) => (
          <ActivityBox
            key={id}
            id={id}
            onClick={openModal}
            name={getMultiLanguageValue(name)}
            imageUrl={getS3FileUrl(headImage)}
          />
        ))}
      />
    </BlockLayout>
  );
};

export default OrderItemCreator;
