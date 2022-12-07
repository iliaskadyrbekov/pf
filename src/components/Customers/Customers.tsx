import React from 'react';

import { Table } from '@components/common/Table';
import { ShopContext } from 'src/context/ShopContext';
import { useCustomersQuery } from './queries/customers';
import { BuyerCell, PurchasedCell, EmailCell, PhoneCell, BoldCell } from './components';

const Customers = () => {
  const { shop } = React.useContext(ShopContext);

  const { data } = useCustomersQuery({ shopId: shop?.id });
  const customers = data?.customers || [];

  const tableHeadRow = [
    { label: 'NAME', accessor: 'name', renderCell: BuyerCell },
    { label: 'EMAIL', accessor: 'email', renderCell: EmailCell },
    { label: 'PHONE', accessor: 'phone', renderCell: PhoneCell },
    { label: 'COUNTRY', accessor: 'country', renderCell: BoldCell },
    {
      label: 'SUBSCRIBED',
      accessor: 'email',
      // eslint-disable-next-line react/display-name
      renderCell: (props: { index: number; emptyValue?: string }) => (
        <BoldCell key={props.index} emptyValue={props.emptyValue} index={props.index} item="Yes" />
      ),
    },
    { label: 'LAST PURCHASE', accessor: 'lastPurchase', renderCell: PurchasedCell },
  ];

  return <Table headRow={tableHeadRow} items={customers} />;
};

export default Customers;
