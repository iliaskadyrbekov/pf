import React from 'react';
import { useRouter } from 'next/router';
import { ChevronRightIcon } from '@heroicons/react/outline';

import { SpinnerIcon } from '@components/Icons';
import OrderItemsLayout from './OrderItemsLayout';
import { BlockLayout, Table } from '@components/common';
import { CellLayout, CollapsableTableRow, CrossRemoveCell } from '@components/common/Table/components';
import { AmountCellLayout, DiscountCell } from './components';

import { ShopContext } from 'src/context';
import { useOrderQuery } from 'src/graphql/queries/order';
import { IDiscount, IOrderItem } from 'src/shared/interfaces';
import { getDiscountPrice, getOrderCurrency } from 'src/helpers';
import { useCancelOrderItems, useUpdateOrderItem } from 'src/graphql/mutations';
import { getGroupedOrderItems, getInfoCell, getOrderSum, getPriceWithCurrency } from './helpers';
import { CheckoutFormCell } from '@components/common/Table/components';
import { classNames } from '@utils/classNames';
import WithoutOverflowTalbeLayout from '@components/common/Table/layouts/WithoutOverflowTableLayout';

const OrderItems = () => {
  const router = useRouter();
  const { shop } = React.useContext(ShopContext);

  const { mutate: updateOrderItem } = useUpdateOrderItem();
  const { mutate: cancelOrderItems } = useCancelOrderItems();

  const orderId = router.query.orderId as string;

  const [loading, setLoading] = React.useState<Record<string, boolean>>({});

  const { data } = useOrderQuery({ id: orderId });
  const orderItems = data?.order?.orderItems || [];

  const currency = getOrderCurrency(data?.order, shop?.currency.symbolNative);

  const handleRemoveOrderItems = (ids: string[]) => () => {
    return cancelOrderItems({
      variables: { input: ids, notRemoveOrder: true, shopId: shop?.id },
      context: { orderId: router.query.orderId as string },
    });
  };

  const handleDiscountChange = (id: string, discount: IDiscount) => {
    return updateOrderItem({ variables: { input: { id, discount }, shopId: shop?.id } });
  };

  const getOrderSumCell = ({ orderItem: { id, pricing, discount } }: IOrderItem) => {
    if (loading[id]) {
      return <SpinnerIcon className="w-10 h-10 mx-auto" />;
    }

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
        <CellLayout className="w-36">
          <DiscountCell
            item={orderItem}
            onChange={handleDiscountChange}
            setLoading={(id: string) => setLoading({ ...loading, [id]: true })}
            setNotLoading={(id: string) => setLoading({ ...loading, [id]: false })}
          />
        </CellLayout>
        <CellLayout>{getOrderSumCell(orderItem)}</CellLayout>
        <CrossRemoveCell onRemove={handleRemoveOrderItems([orderItem.orderItem.id])} />
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
    {
      label: '',
      renderCell: ({ item }: { item: IOrderItem[] }) => (
        <CrossRemoveCell onRemove={handleRemoveOrderItems(item.map(({ orderItem: { id } }: IOrderItem) => id))} />
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
