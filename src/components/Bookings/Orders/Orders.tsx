import React from 'react';
import { useQuery } from '@apollo/client';

import { Table } from '@components/common/Table';
import { ShopContext } from 'src/context/ShopContext';
import { IOrdersRes, IOrdersVars, ORDERS } from 'src/graphql/queries/orders';
import { AmountCell, BuyerCell, DetailsCell, OrderStatusCell } from './components';
import { PaymentCell, DateTimeCell } from '../components';
import { IPaymentResult } from 'src/shared/interfaces/Order';

const Orders = () => {
  const { shop } = React.useContext(ShopContext);
  const { data } = useQuery<IOrdersRes, IOrdersVars>(ORDERS, { variables: { shopId: shop?.id } });

  const tableHeadRow = [
    { label: 'ORDER ID', accessor: 'shortId' },
    {
      label: 'PURCHASED',
      accessor: 'payment',
      renderCell: (props: { item: IPaymentResult[]; index: number }) => (
        <DateTimeCell item={props.item[0]?.created} index={props.index} />
      ),
    },
    { label: 'BUYER', renderCell: BuyerCell },
    { label: 'AMOUNT', renderCell: AmountCell },
    { label: 'PAYMENT', accessor: 'paymentStatus', renderCell: PaymentCell },
    { label: 'ORDER STATUS', renderCell: OrderStatusCell },
    { label: '', renderCell: DetailsCell },
  ];

  if (!data?.orders) {
    return null;
  }

  return <Table headRow={tableHeadRow} items={data?.orders} emptyValue="-" />;
};

export default Orders;
