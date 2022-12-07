import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/outline';

import OrderItemsLayout from './OrderItemsLayout';
import { BlockLayout, Table } from '@components/common';
import { CellLayout, CollapsableTableRow } from '@components/common/Table/components';
import { AmountCellLayout } from '@components/CreateOrder/components/OrderItems/components';

import { ShopContext } from 'src/context';
import { IOrderItem } from 'src/shared/interfaces';
import { useOrderQuery } from 'src/graphql/queries/order';
import { getDiscountSign } from 'src/helpers/getDiscountSign';
import { getDiscountPrice, getOrderCurrency } from 'src/helpers';
import {
  getInfoCell,
  getOrderSum,
  getGroupedOrderItems,
  getPriceWithCurrency,
} from '@components/CreateOrder/components/OrderItems/helpers';
import { CheckoutFormCell } from '@components/common/Table/components';
import { classNames } from '@utils/classNames';
import WithoutOverflowTalbeLayout from '@components/common/Table/layouts/WithoutOverflowTableLayout';

const OrderItems = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const orderId = router.query.orderId as string;

  const { data } = useOrderQuery({ id: orderId });
  const orderItems = data?.order?.orderItems || [];

  const currency = getOrderCurrency(data?.order, shop?.currency.symbolNative);

  const getOrderSumCell = ({ orderItem: { pricing, discount } }: IOrderItem) => {
    return (
      <AmountCellLayout
        price={discount ? getPriceWithCurrency(pricing.price, currency) : null}
        discountPrice={
          discount
            ? getPriceWithCurrency(getDiscountPrice(pricing.price, discount), currency)
            : getPriceWithCurrency(pricing.price, currency)
        }
      />
    );
  };

  const handleRenderOpenSubTable = (orderItems: IOrderItem[]) => {
    return orderItems.map((orderItem, index) => (
      <tr key={index}>
        <CellLayout />
        <CellLayout>{getInfoCell(orderItem)}</CellLayout>
        <CheckoutFormCell item={orderItem.orderItem} />
        <CellLayout>1</CellLayout>
        <CellLayout className="mx-auto w-32">
          {`${orderItem.orderItem.discount?.value || 0}  ${
            orderItem.orderItem.discount?.type ? getDiscountSign(orderItem.orderItem.discount.type) : '%'
          }`}
        </CellLayout>
        <CellLayout>{getOrderSumCell(orderItem)}</CellLayout>
      </tr>
    ));
  };

  const tableHeadRow = [
    {
      renderCell: ({ props: { isOpenExpander } }: { props: { isOpenExpander: boolean } }) => (
        <CellLayout className="w-8">
          <ChevronRightIcon className={classNames('h-5 w-5 mx-auto', isOpenExpander && 'rotate-90')} />
        </CellLayout>
      ),
    },
    {
      label: 'Products',
      renderCell: ({ item }: { item: IOrderItem[] }) => <CellLayout>{getInfoCell(item[0])}</CellLayout>,
    },
    {
      label: 'Checkout form',
      renderCell: () => <CellLayout />,
    },
    {
      label: 'Items',
      renderCell: ({ item }: { item: IOrderItem[] }) => <CellLayout>{item.length}</CellLayout>,
    },
    {
      label: 'Discount',
      renderCell: () => <CellLayout />,
    },
    {
      label: 'Order sum',
      renderCell: ({ item }: { item: IOrderItem[] }) => (
        <CellLayout>{getPriceWithCurrency(getOrderSum(item), currency)}</CellLayout>
      ),
    },
  ];

  return (
    <BlockLayout>
      <OrderItemsLayout
        title="Order items"
        emptyLabel="No order items"
        isEmpty={!orderItems.length}
        items={
          !!orderItems.length && (
            <Table
              headRow={tableHeadRow}
              Layout={WithoutOverflowTalbeLayout}
              items={Object.entries(getGroupedOrderItems(orderItems)).map(([, orderItems]) => orderItems)}
              renderRow={(orderItems, index, headRow) => (
                <CollapsableTableRow
                  headRow={headRow}
                  items={orderItems}
                  renderContent={handleRenderOpenSubTable}
                  key={index}
                />
              )}
            />
          )
        }
      />
    </BlockLayout>
  );
};

export default OrderItems;
