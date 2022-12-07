import React from 'react';
import { useRouter } from 'next/router';

import { PagePortal } from '@components/common/PagePortal';
import PaymentBarLayout from './PaymentBarLayout';
import { PayButtonLayout, PaymentInfoBlock } from './components';
import { ModalContext, ModalType, ShopContext } from 'src/context';
import { useOrderQuery } from 'src/graphql/queries/order';
import { useFormikContext } from 'formik';
import { useKeepOrderOpen } from './mutations/keepOrderOpen';
import { Popover } from '@components/common/Popover';
import { BlockLayout } from '@components/common/Block';
import { getValidationErrors, IGraphqlError } from '@utils/graphql';
import { getOrderAmount, getOrderCurrency, getOrderPaid, getTotalVAT } from 'src/helpers';
import { EOrderStatus } from 'src/shared/enums';
import { Action } from './components/Action';

interface IBuyerInfoProps {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  address: string;
  note: string;
  partialPayment?: {
    firstPaymentAmount: number;
    endPaymentDate: Date;
    endPaymentReminderDate: Date;
  };
}

export enum EPaymentType {
  KEEP_OPEN,
  SEND_OFFER_BY_EMAIL,
}

interface IPaymentBarProps extends IBuyerInfoProps {
  expiresAt?: Date;
}

const PaymentBar = ({
  fullName,
  email,
  phone,
  companyName,
  address,
  note,
  expiresAt,
  partialPayment,
}: IPaymentBarProps) => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);
  const { handleOpenModal, handleCloseModal } = React.useContext(ModalContext);

  const { values, setStatus } = useFormikContext<IBuyerInfoProps>();

  const orderId = router.query.orderId as string;

  const { mutate: keepOrderOpen } = useKeepOrderOpen();

  const { data } = useOrderQuery({ id: orderId });
  const order = data?.order;

  if (!order) {
    return null;
  }

  const canSendPaymentOffer = () => {
    const errors: { [key in keyof Partial<IBuyerInfoProps>]: string[] } = {};

    if (!values.fullName) {
      errors.fullName = ['Enter full name'];
    }

    if (!values.email) {
      errors.email = ['Enter email'];
    }

    if (!values.phone) {
      errors.phone = ['Enter phone'];
    }

    if (Object.values(errors).length) {
      setStatus(errors);

      return false;
    }

    return true;
  };

  const currency = getOrderCurrency(order, shop?.currency.symbolNative);
  const totalOrderAmount = getOrderAmount(order);
  const paid = getOrderPaid(order.payment);
  const totalVAT = getTotalVAT(order);

  const handleSendPaymentByEmail = () => {
    if (canSendPaymentOffer()) {
      handleOpenModal({
        type: ModalType.SEND_OFFER_BY_EMAIL,
        props: {
          onCloseWithRedirect: () => {
            router.push('/bookings/orders/');
            handleCloseModal();
          },
          orderId,
          fullName,
          email,
          phone,
          companyName,
          note,
          amount: totalOrderAmount,
          currency,
          expiresAt,
          partialPayment,
        },
      });
    }
  };

  const handleUpdateDepositOpenedOrder = () => {
    if (!expiresAt || !partialPayment) {
      return;
    }

    if (canSendPaymentOffer()) {
      handleOpenModal({
        type: ModalType.UPDATE_DEPOSIT_REOPENED_ORDER,
        props: {
          onCloseWithRedirect: () => {
            router.push('/bookings/orders/');
            handleCloseModal();
          },
          orderId,
          fullName,
          email,
          phone,
          companyName,
          note,
          amount: totalOrderAmount,
          currency,
          expiresAt,
          partialPayment,
        },
      });
    }
  };

  const handleKeepOrderOpen = async () => {
    const buyer = fullName || email || phone ? { fullName, email, phone, companyName, address } : undefined;

    try {
      await keepOrderOpen({
        variables: { shopId: shop?.id, input: { buyer, orderId, note } },
      });
      router.push('/bookings/orders/');
    } catch (err) {
      setStatus(getValidationErrors(err as IGraphqlError));
    }
  };

  const actionsByOrderStatus = (status: EOrderStatus) => {
    switch (status) {
      case EOrderStatus.DRAFT:
      case EOrderStatus.OPEN_ORDER:
        return [
          <Action key="0" onClick={handleKeepOrderOpen}>
            Keep order open
          </Action>,
          <Action key="1" onClick={handleSendPaymentByEmail} isDisabled={!order.orderItems.length}>
            Send offer by email
          </Action>,
        ];
      case EOrderStatus.DEPOSIT_REOPENED:
        return [
          <Action key="0" onClick={handleUpdateDepositOpenedOrder} isDisabled={!order.orderItems.length}>
            Update offer
          </Action>,
        ];
      default:
        return [];
    }
  };

  return (
    <PagePortal querySelector="#page-footer">
      <PaymentBarLayout
        orderAmount={`${currency}${totalOrderAmount.toFixed(2)}`}
        VAT={`${currency}${totalVAT.toFixed(2)}`}
        totalOrderAmount={`${currency}${totalOrderAmount.toFixed(2)}`}
        paid={<PaymentInfoBlock caption="Paid" price={`${currency}${paid.toFixed(2)}`} color="green" />}
        leftToPay={
          <PaymentInfoBlock
            caption="Left to Pay"
            price={`${currency}${(totalOrderAmount - paid).toFixed(2)}`}
            color="yellow"
          />
        }
        pay={
          <Popover
            renderLabel={() => <PayButtonLayout>Pay</PayButtonLayout>}
            buttonClassName="h-full"
            panelClassName="w-max"
          >
            <BlockLayout className="shadow-lg p-0">{actionsByOrderStatus(order.status)}</BlockLayout>
          </Popover>
        }
      />
    </PagePortal>
  );
};

export default PaymentBar;
