import React from 'react';
import { useRouter } from 'next/router';

import { PayButtonLayout } from './components';
import PaymentBarLayout from './PaymentBarLayout';
import { PagePortal } from '@components/common/PagePortal';
import { PaymentInfoBlock } from '@components/CreateOrder/components/PaymentBar/components';

import { ShopContext } from 'src/context';
import { useOrderQuery } from 'src/graphql/queries/order';
import { EOrderStatus } from 'src/shared/enums/OrderStatus';
import { TColors } from './components/PayButton/PayButtonLayout';
import { getOrderAmount, getOrderCurrency, getOrderPaid, getTotalVAT } from 'src/helpers';

const PaymentBar = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const orderId = router.query.orderId as string;

  const { data } = useOrderQuery({ id: orderId });
  const order = data?.order;

  if (!order) {
    return null;
  }

  const currency = getOrderCurrency(order, shop?.currency.symbolNative);
  const totalOrderAmount = getOrderAmount(order);
  const paid = getOrderPaid(order.payment);
  const totalVAT = getTotalVAT(order);

  const getPaymentProps = (status: EOrderStatus): { caption: string; color: TColors } => {
    switch (status) {
      case EOrderStatus.OFFER_SENT:
        return { caption: 'Pay', color: 'gray' };
      default:
        return { caption: 'Paid', color: 'green' };
    }
  };

  const isExistPayButton = order.status === EOrderStatus.OFFER_SENT || order.status === EOrderStatus.COMPLETED;

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
        pay={isExistPayButton ? <PayButtonLayout {...getPaymentProps(order.status)} /> : null}
      />
    </PagePortal>
  );
};

export default PaymentBar;
