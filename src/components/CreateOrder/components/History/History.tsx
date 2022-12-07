import { useRouter } from 'next/router';
import React from 'react';

import { Table } from '@components/common/Table';
import { useOrderQuery } from 'src/graphql/queries/order';
import { DateTimeCell } from '@components/Bookings/components';
import { TOrderHistoryEvent } from 'src/shared/interfaces/HistoryEvent';
import { HistoryEventType } from 'src/shared/enums/HistoryEventType';
import {
  CreatedCheckoutSessionCell,
  OrderCompletedCell,
  OrderCreatedCell,
  PaidOnlineByCreditCardCell,
  SentByLinkCell,
} from './components';
import HistoryLayout from './HistoryLayout';

const getActivityCell = (props: { index: number; item: TOrderHistoryEvent }) => {
  const { item, index } = props;

  switch (item.type) {
    case HistoryEventType.ORDER_CHECKOUT_SESSION_CREATED:
    case HistoryEventType.ORDER_CHECKOUT_SESSION_EXPIRED:
      return <CreatedCheckoutSessionCell key={index} action={item.action} sessionId={`Session id ${item.sessionId}`} />;
    case HistoryEventType.ORDER_COMPLETED:
      return <OrderCompletedCell key={index} action="Order" status="Completed" />;
    case HistoryEventType.ORDER_CANCELED:
      return <OrderCompletedCell key={index} action="Order" status="Cancelled" />;
    case HistoryEventType.ORDER_REOPENED:
      return <OrderCompletedCell key={index} action="Order" status="Reopened" />;
    case HistoryEventType.ORDER_CREATED:
      return <OrderCreatedCell key={index} action={item.action} />;
    case HistoryEventType.DEPOSIT_PAID_ONLINE_BY_CREDIT_CARD:
    case HistoryEventType.ORDER_PAID_ONLINE_BY_CREDIT_CARD:
    case HistoryEventType.ORDER_PAID_BY_GIFT_CARD:
      return (
        <PaidOnlineByCreditCardCell
          key={index}
          action={item.action}
          paymentId={`Payment id ${item.payment.id}`}
          amount={`${item.payment.amount}${item.payment.currency.symbolNative}`}
        />
      );
    case HistoryEventType.ORDER_ZERO_PAID:
      return (
        <PaidOnlineByCreditCardCell
          key={index}
          action={item.action}
          amount={`${item.payment.amount}${item.payment.currency.symbolNative}`}
        />
      );
    case HistoryEventType.ORDER_PAYMENT_SEND_BY_LINK:
      return <SentByLinkCell key={index} action={item.action} />;
  }
};

const History = () => {
  const router = useRouter();

  const orderId = router.query.orderId as string;

  const { data } = useOrderQuery({ id: orderId });
  const historyEvents = data?.order?.historyEvents || [];

  const tableHeadRow = [
    { label: 'DATE', accessor: 'date', renderCell: DateTimeCell },
    { label: 'TYPE', accessor: 'entity' },
    {
      label: 'ACTIVITY',
      renderCell: getActivityCell,
    },
  ];

  return (
    <HistoryLayout table={<Table headRow={tableHeadRow} items={historyEvents} />} title="Order and payment history" />
  );
};

export default History;
