import React from 'react';
import { Formik } from 'formik';

import CreateOrderLayout from './CreateOrderLayout';
import { BuyerInfo, Note, OrderItemCreator, OrderItems, History, PaymentBar } from './components';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { useOrderQuery } from 'src/graphql/queries/order';
import { useRouter } from 'next/router';
import { PageActionsPortal } from '@components/common/PageActionsPortal';
import { Button } from '@components/common/Button';
import { useDeleteOrder } from './mutations/deleteOrder';
import { Spinner } from '@components/common/Spinner';
import {
  CHECKOUT_ORDER_ITEMS,
  ICheckoutOrderItemsRes,
  ICheckoutOrderItemsVars,
} from '@components/Modals/CreateOrderItemModal/queries/checkoutOrderItems';
import { useApollo } from 'src/lib/apolloClient';
import { EOrderStatus } from 'src/shared/enums';
import { useCancelOrder } from '@components/ViewOrder/mutations/cancelOrder';

const CreateOrder = () => {
  const client = useApollo();
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal } = React.useContext(ModalContext);

  const orderId = router.query.orderId as string;

  const handleCheckCheckoutItems = async () => {
    const { data } = await client.query<ICheckoutOrderItemsRes, ICheckoutOrderItemsVars>({
      query: CHECKOUT_ORDER_ITEMS,
      variables: {
        orderId,
      },
    });

    if (data.checkoutOrderItems.length) {
      handleOpenModal({ type: ModalType.CHECKOUT, props: { orderId } });
    }
  };

  React.useEffect(() => {
    handleCheckCheckoutItems();
  }, []);

  const { data } = useOrderQuery({ id: orderId });
  const { mutate: deleteOrder, loading: deleteLoading } = useDeleteOrder();
  const { mutate: cancelOrder, loading: cancelLoading } = useCancelOrder();

  const handleCustomerSelect = (selectedId: string) => {
    const selected = shop?.customers.find(({ id }) => selectedId === id);

    if (selected) {
      return {
        fullName: selected.name,
        email: selected.email,
        phone: selected.phone,
      };
    }

    return {};
  };

  const handleDeleteOrder = async () => {
    handleOpenModal({
      type: ModalType.CONFIRM_MODAL,
      props: {
        title: 'Delete order',
        message: 'Are you sure you want to delete order?',
        onConfirm: async () => {
          await deleteOrder({ variables: { id: orderId, shopId: shop?.id } });
          router.push(`/bookings/orders/`);
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

  const buyer = data?.order?.buyer;

  const actionsByOrderStatus = (status: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.DRAFT:
      case EOrderStatus.OPEN_ORDER:
        return [
          <Button
            disabled={deleteLoading}
            icon={deleteLoading ? <Spinner /> : null}
            onClick={handleDeleteOrder}
            key="1"
            variant="contained"
            color="delete"
          >
            Delete
          </Button>,
        ];
      case EOrderStatus.DEPOSIT_REOPENED:
        return [
          <Button
            disabled={cancelLoading}
            icon={cancelLoading ? <Spinner /> : null}
            onClick={handleCancelOrder}
            key="0"
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
    <Formik
      enableReinitialize={true}
      initialValues={{
        fullName: buyer?.fullName || '',
        email: buyer?.email || '',
        phone: buyer?.phone || '',
        companyName: buyer?.companyName || '',
        address: buyer?.address || '',
        note: data?.order.note || '',
      }}
      onSubmit={() => {
        return;
      }}
    >
      {({ values, setValues, setStatus }) => (
        <CreateOrderLayout
          buyerInfo={
            <BuyerInfo
              onCustomerSelect={(id) => {
                setValues({ ...values, ...handleCustomerSelect(id) });
                setStatus({});
              }}
            />
          }
          note={<Note />}
          orderItemCreator={<OrderItemCreator />}
          orderItems={<OrderItems />}
          history={<History />}
          paymentBar={
            <PaymentBar
              {...values}
              expiresAt={data?.order?.offer?.expiresAt}
              partialPayment={data?.order.offer?.partialPayment}
            />
          }
          actions={data?.order && <PageActionsPortal actions={actionsByOrderStatus(data.order.status)} />}
        />
      )}
    </Formik>
  );
};

export default CreateOrder;
