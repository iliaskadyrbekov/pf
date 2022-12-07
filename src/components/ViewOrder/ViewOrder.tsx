import React from 'react';

import ViewOrderLayout from './ViewOrderLayout';
import { BuyerInfo, Note, OrderItems, PaymentBar } from './components';
import { History } from '../CreateOrder/components';
import { Button } from '@components/common/Button';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { Spinner } from '@components/common/Spinner';
import { useCancelOrder } from './mutations/cancelOrder';
import { useReopenOrder } from './mutations/reopenOrder';
import { useRouter } from 'next/router';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { useOrderQuery } from 'src/graphql/queries/order';
import { EOrderStatus } from 'src/shared/enums/OrderStatus';
import { useReopenDepositPaidOrder } from './mutations/reopenDepositPaidOrder';

const ViewOrder = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const orderId = router.query.orderId as string;

  const { mutate: cancelOrder, loading: cancelLoading } = useCancelOrder();
  const { mutate: reopenOrder, loading: reopenOrderLoading } = useReopenOrder();
  const { mutate: reopenDepositPaidOrder, loading: reopenDepositPaidOrderLoading } = useReopenDepositPaidOrder();

  const { data } = useOrderQuery({ id: orderId });
  const order = data?.order;

  if (!order) {
    return null;
  }

  const handleReopenOrder = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Reopen order',
        message: 'Are you sure you want to reopen order?',
        onConfirm: async () => {
          await reopenOrder({ variables: { input: { id: orderId }, shopId: shop?.id } });
        },
      },
    });
  };

  const handleReopenDepositPaidOrder = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Reopen order',
        message: 'Are you sure you want to reopen order?',
        onConfirm: async () => {
          await reopenDepositPaidOrder({ variables: { input: { id: orderId }, shopId: shop?.id } });
        },
      },
    });
  };

  const handleCancelOrder = () => {
    handleOpenModal({
      type: ModalType.CONFIRM_WITH_REASON_MODAL,
      props: {
        title: 'Cancel order',
        message: 'Are you sure you want to cancel order?',
        onConfirm: async (reason: string) => {
          await cancelOrder({ variables: { input: { id: orderId, reason }, shopId: shop?.id } });
          router.push(`/bookings/orders`);
        },
      },
    });
  };

  const actionsByOrderStatus = (orderStatus: EOrderStatus) => {
    switch (orderStatus) {
      case EOrderStatus.OFFER_SENT:
        return [
          <Button
            disabled={reopenOrderLoading}
            icon={reopenOrderLoading ? <Spinner /> : null}
            onClick={handleReopenOrder}
            key="1"
            variant="contained"
            color="primary"
          >
            Reopen
          </Button>,
          <Button
            disabled={cancelLoading}
            icon={cancelLoading ? <Spinner /> : null}
            onClick={handleCancelOrder}
            key="2"
            variant="contained"
            color="delete"
          >
            Cancel
          </Button>,
        ];
      case EOrderStatus.DEPOSIT_PAID:
        return [
          <Button
            disabled={reopenDepositPaidOrderLoading}
            icon={reopenDepositPaidOrderLoading ? <Spinner /> : null}
            onClick={handleReopenDepositPaidOrder}
            key="1"
            variant="contained"
            color="primary"
          >
            Reopen
          </Button>,
          <Button
            disabled={cancelLoading}
            icon={cancelLoading ? <Spinner /> : null}
            onClick={handleCancelOrder}
            key="2"
            variant="contained"
            color="delete"
          >
            Cancel
          </Button>,
        ];
      default:
        return [];
    }
  };

  return (
    <ViewOrderLayout
      buyerInfo={<BuyerInfo />}
      note={<Note />}
      orderItems={<OrderItems />}
      history={<History />}
      paymentBar={<PaymentBar />}
      actions={<PageActionsPortal actions={actionsByOrderStatus(order.status)} />}
    />
  );
};

export default ViewOrder;
