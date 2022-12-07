import React from 'react';

import { Table, Toggle } from '@components/common';
import { FormLanguageContext, ModalContext, ShopContext } from 'src/context';
import { getBuyerNameFromCheckoutForm } from 'src/helpers/getBuyerNameFromCheckoutForm';
import { IAccommodationOrderItem } from 'src/shared/interfaces';
import { CellLayout, CheckoutFormCell, BuyerCell } from '@components/common/Table/components';
import { OrderInfoCell } from '../../../components';
import WithoutOverflowTalbeLayout from '@components/common/Table/layouts/WithoutOverflowTableLayout';
import { useCheckOutAccommodationOrderItem } from './mutations/checkOutAccommodationOrderItem';
import { useCheckInAccommodationOrderItem } from './mutations/checkInAccommodationOrderItem';

interface IAttendeesProps {
  orderItems: IAccommodationOrderItem[];
}

const Attendees = ({ orderItems }: IAttendeesProps) => {
  const { handleCloseModal } = React.useContext(ModalContext);
  const { getMultiLanguageValue } = React.useContext(FormLanguageContext);
  const { shop } = React.useContext(ShopContext);

  const { mutate: checkOutAccommodationOrderItem } = useCheckOutAccommodationOrderItem();
  const { mutate: checkInAccommodationOrderItem } = useCheckInAccommodationOrderItem();

  const handleCheckOut = (id: string, isCheckedOut: boolean) => {
    checkOutAccommodationOrderItem({ variables: { input: { id, isCheckedOut }, shopId: shop?.id } });
  };

  const handleCheckIn = (id: string, isCheckedIn: boolean) => {
    checkInAccommodationOrderItem({ variables: { input: { id, isCheckedIn }, shopId: shop?.id } });
  };

  const tableHeadRow = [
    { label: 'RES ID', accessor: 'shortId' },
    {
      label: 'NAME',
      accessor: (orderItem: IAccommodationOrderItem) => ({
        buyerName: getBuyerNameFromCheckoutForm(orderItem.checkoutForm) || orderItem.order.buyer?.fullName,
        pricingName: getMultiLanguageValue(orderItem.pricing.name),
      }),
      renderCell: BuyerCell,
    },
    {
      label: 'PRICE',
      accessor: (orderItem: IAccommodationOrderItem) =>
        `${orderItem.pricing.price}${
          orderItem.order.payment?.[0]?.currency.symbolNative ?? shop?.currency.symbolNative
        }`,
    },
    {
      label: 'CHECKOUT FORM',
      accessor: (orderItem: IAccommodationOrderItem) => ({ checkoutForm: orderItem.checkoutForm }),
      renderCell: CheckoutFormCell,
    },
    {
      label: 'ORDER ID',
      accessor: (orderItem: IAccommodationOrderItem) => ({
        shortId: orderItem.order.shortId,
        id: orderItem.order.id,
        note: orderItem.order.note,
      }),
      renderCell: ({ item, index }: { item: { shortId: string; id: string; note?: string }; index: number }) => (
        <OrderInfoCell item={item} index={index} onClick={handleCloseModal} />
      ),
    },
    {
      label: 'CHECK-IN',
      renderCell: ({ item }: { item: IAccommodationOrderItem }) => (
        <CellLayout>
          <Toggle value={item.checkIn} onChange={() => handleCheckIn(item.id, !item.checkIn)} />
        </CellLayout>
      ),
    },
    {
      label: 'CHECK-OUT',
      renderCell: ({ item }: { item: IAccommodationOrderItem }) => (
        <CellLayout>
          <Toggle value={item.checkOut} onChange={() => handleCheckOut(item.id, !item.checkOut)} />
        </CellLayout>
      ),
    },
  ];

  return <Table Layout={WithoutOverflowTalbeLayout} headRow={tableHeadRow} items={orderItems} />;
};

export default Attendees;
